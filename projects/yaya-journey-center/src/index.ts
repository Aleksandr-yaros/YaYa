import { analyzeFriction, canAutoComplete, validateSteps, type CompletionMode, type StepInput } from "./logic";

type StartJourneyBody = { actorId: string; storyId: string; steps: StepInput[] };
type StepActionBody = { action: "view" | "attempt" | "block" | "help" | "complete" | "auto_complete"; reason?: string };

const JSON_HEADERS = { "content-type": "application/json; charset=utf-8" };

function json(body: unknown, status = 200): Response {
  return Response.json(body, { status, headers: JSON_HEADERS });
}

async function readJson<T>(request: Request): Promise<T> {
  const length = Number(request.headers.get("content-length") ?? "0");
  if (length > 32_768) throw new Error("payload too large");
  return request.json<T>();
}

function route(pathname: string): { journeyId?: string; stepNumber?: number } {
  const match = pathname.match(/^\/v1\/journeys\/([^/]+)(?:\/steps\/(\d+))?$/);
  return match ? { journeyId: match[1], stepNumber: match[2] ? Number(match[2]) : undefined } : {};
}

async function capturePostHog(env: Env, event: string, distinctId: string, properties: Record<string, unknown>): Promise<void> {
  if (!env.POSTHOG_API_KEY) return;
  const response = await fetch(`${env.POSTHOG_HOST}/capture/`, {
    method: "POST",
    headers: JSON_HEADERS,
    body: JSON.stringify({ api_key: env.POSTHOG_API_KEY, event, distinct_id: distinctId, properties: { ...properties, environment: env.ENVIRONMENT } }),
  });
  if (!response.ok) console.error(JSON.stringify({ type: "posthog_capture_failed", status: response.status, event }));
}

async function recordEvent(env: Env, journeyId: string, eventName: string, stepNumber: number | null, payload: Record<string, unknown>): Promise<void> {
  await env.DB.prepare("INSERT INTO journey_events (id, journey_id, event_name, step_number, occurred_at, payload_json) VALUES (?, ?, ?, ?, ?, ?)")
    .bind(crypto.randomUUID(), journeyId, eventName, stepNumber, new Date().toISOString(), JSON.stringify(payload)).run();
}

async function startJourney(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
  const body = await readJson<StartJourneyBody>(request);
  if (!body.actorId?.trim() || !body.storyId?.trim()) return json({ error: "actorId and storyId are required" }, 400);
  validateSteps(body.steps);
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  const statements = [
    env.DB.prepare("INSERT INTO journey_sessions (id, actor_id, story_id, status, total_steps, current_step, started_at, last_activity_at) VALUES (?, ?, ?, 'active', ?, 1, ?, ?)")
      .bind(id, body.actorId, body.storyId, body.steps.length, now, now),
    ...body.steps.map((step, index) => env.DB.prepare("INSERT INTO journey_steps (journey_id, step_number, title, completion_mode) VALUES (?, ?, ?, ?)")
      .bind(id, index + 1, step.title.trim(), step.completionMode)),
  ];
  await env.DB.batch(statements);
  await recordEvent(env, id, "journey_started", 1, { totalSteps: body.steps.length });
  ctx.waitUntil(capturePostHog(env, "yaya_journey_started", body.actorId, { journey_id: id, story_id: body.storyId, total_steps: body.steps.length }));
  return json({ journeyId: id, status: "active", currentStep: 1, totalSteps: body.steps.length }, 201);
}

async function getJourney(env: Env, journeyId: string): Promise<Response> {
  const session = await env.DB.prepare("SELECT * FROM journey_sessions WHERE id = ?").bind(journeyId).first();
  if (!session) return json({ error: "journey not found" }, 404);
  const steps = await env.DB.prepare("SELECT step_number, title, completion_mode, status, attempts, help_requests, blocked_reason FROM journey_steps WHERE journey_id = ? ORDER BY step_number")
    .bind(journeyId).all();
  const unresolved = await env.DB.prepare("SELECT step_number, reason_code, recommended_action, help_variant, created_at FROM friction_analysis WHERE journey_id = ? AND resolved_at IS NULL ORDER BY created_at DESC")
    .bind(journeyId).all();
  return json({ session, steps: steps.results, unresolvedFriction: unresolved.results });
}

async function actOnStep(request: Request, env: Env, ctx: ExecutionContext, journeyId: string, stepNumber: number): Promise<Response> {
  const body = await readJson<StepActionBody>(request);
  const step = await env.DB.prepare("SELECT js.actor_id, js.story_id, js.total_steps, js.current_step, js.status AS journey_status, st.completion_mode, st.status, st.attempts, st.help_requests FROM journey_sessions js JOIN journey_steps st ON st.journey_id = js.id WHERE js.id = ? AND st.step_number = ?")
    .bind(journeyId, stepNumber).first<{ actor_id: string; story_id: string; total_steps: number; current_step: number; journey_status: string; completion_mode: CompletionMode; status: string; attempts: number; help_requests: number }>();
  if (!step) return json({ error: "journey or step not found" }, 404);
  if (step.journey_status !== "active") return json({ error: "journey is not active" }, 409);
  if (stepNumber !== step.current_step) return json({ error: "steps must be completed in order", currentStep: step.current_step }, 409);
  if (body.action === "auto_complete" && !canAutoComplete(step.completion_mode)) {
    await recordEvent(env, journeyId, "unsafe_auto_blocked", stepNumber, { completionMode: step.completion_mode });
    return json({ error: "This step requires a real user or verified business action", assistance: "Open the required form and show one exact action" }, 409);
  }
  const now = new Date().toISOString();
  if (body.action === "view") {
    await env.DB.prepare("UPDATE journey_steps SET status = CASE WHEN status = 'pending' THEN 'viewed' ELSE status END, viewed_at = COALESCE(viewed_at, ?) WHERE journey_id = ? AND step_number = ?").bind(now, journeyId, stepNumber).run();
  } else if (body.action === "attempt") {
    await env.DB.prepare("UPDATE journey_steps SET attempts = attempts + 1 WHERE journey_id = ? AND step_number = ?").bind(journeyId, stepNumber).run();
  } else if (body.action === "help") {
    await env.DB.prepare("UPDATE journey_steps SET help_requests = help_requests + 1 WHERE journey_id = ? AND step_number = ?").bind(journeyId, stepNumber).run();
  } else if (body.action === "block") {
    await env.DB.prepare("UPDATE journey_steps SET status = 'blocked', blocked_reason = ? WHERE journey_id = ? AND step_number = ?").bind(body.reason?.slice(0, 500) || "unknown", journeyId, stepNumber).run();
  } else if (body.action === "complete" || body.action === "auto_complete") {
    const nextStep = Math.min(stepNumber + 1, step.total_steps);
    const completed = stepNumber === step.total_steps;
    await env.DB.batch([
      env.DB.prepare("UPDATE journey_steps SET status = 'completed', completed_at = ?, blocked_reason = NULL WHERE journey_id = ? AND step_number = ?").bind(now, journeyId, stepNumber),
      env.DB.prepare("UPDATE journey_sessions SET current_step = ?, status = ?, last_activity_at = ?, completed_at = ? WHERE id = ?")
        .bind(nextStep, completed ? "completed" : "active", now, completed ? now : null, journeyId),
      env.DB.prepare("UPDATE friction_analysis SET resolved_at = ? WHERE journey_id = ? AND step_number = ? AND resolved_at IS NULL").bind(now, journeyId, stepNumber),
    ]);
    await recordEvent(env, journeyId, completed ? "journey_completed" : "step_completed", stepNumber, { automated: body.action === "auto_complete" });
    ctx.waitUntil(capturePostHog(env, completed ? "yaya_journey_completed" : "yaya_step_completed", step.actor_id, { journey_id: journeyId, story_id: step.story_id, step_number: stepNumber, automated: body.action === "auto_complete" }));
    return json({ journeyId, status: completed ? "completed" : "active", completedStep: stepNumber, currentStep: nextStep, progress: `${stepNumber}/${step.total_steps}` });
  } else {
    return json({ error: "unsupported action" }, 400);
  }
  await env.DB.prepare("UPDATE journey_sessions SET last_activity_at = ? WHERE id = ?").bind(now, journeyId).run();
  await recordEvent(env, journeyId, `step_${body.action}`, stepNumber, { reason: body.reason ?? null });
  return getJourney(env, journeyId);
}

async function analyzeStaleJourneys(env: Env, ctx: ExecutionContext): Promise<void> {
  const stale = await env.DB.prepare("SELECT js.id, js.actor_id, js.story_id, js.current_step, js.last_activity_at, st.completion_mode, st.attempts, st.help_requests, st.blocked_reason FROM journey_sessions js JOIN journey_steps st ON st.journey_id = js.id AND st.step_number = js.current_step WHERE js.status = 'active' AND js.last_activity_at < datetime('now', '-30 minutes') LIMIT 100").all<{
    id: string; actor_id: string; story_id: string; current_step: number; last_activity_at: string; completion_mode: CompletionMode; attempts: number; help_requests: number; blocked_reason: string | null;
  }>();
  for (const item of stale.results) {
    const idleMinutes = Math.max(0, Math.floor((Date.now() - Date.parse(item.last_activity_at)) / 60_000));
    const decision = analyzeFriction({ attempts: item.attempts, helpRequests: item.help_requests, idleMinutes, blockedReason: item.blocked_reason }, item.completion_mode);
    const now = new Date().toISOString();
    await env.DB.batch([
      env.DB.prepare("INSERT INTO friction_analysis (id, journey_id, step_number, reason_code, evidence_json, recommended_action, help_variant, created_at) SELECT ?, ?, ?, ?, ?, ?, ?, ? WHERE NOT EXISTS (SELECT 1 FROM friction_analysis WHERE journey_id = ? AND step_number = ? AND resolved_at IS NULL)")
        .bind(crypto.randomUUID(), item.id, item.current_step, decision.reasonCode, JSON.stringify({ attempts: item.attempts, helpRequests: item.help_requests, idleMinutes, blockedReason: item.blocked_reason }), decision.recommendedAction, decision.helpVariant, now, item.id, item.current_step),
      env.DB.prepare("UPDATE journey_sessions SET help_variant = ?, recovery_count = recovery_count + 1 WHERE id = ?").bind(decision.helpVariant, item.id),
    ]);
    await recordEvent(env, item.id, "friction_detected", item.current_step, decision);
    ctx.waitUntil(capturePostHog(env, "yaya_friction_detected", item.actor_id, { journey_id: item.id, story_id: item.story_id, step_number: item.current_step, ...decision }));
  }
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    try {
      const url = new URL(request.url);
      if (request.method === "GET" && url.pathname === "/health") return json({ ok: true, service: "yaya-journey-center", environment: env.ENVIRONMENT, checks: { worker: "pass", databaseBinding: Boolean(env.DB), posthogConfigured: Boolean(env.POSTHOG_API_KEY) } });
      if (request.method === "POST" && url.pathname === "/v1/journeys") return startJourney(request, env, ctx);
      const matched = route(url.pathname);
      if (request.method === "GET" && matched.journeyId && matched.stepNumber === undefined) return getJourney(env, matched.journeyId);
      if (request.method === "POST" && matched.journeyId && matched.stepNumber !== undefined) return actOnStep(request, env, ctx, matched.journeyId, matched.stepNumber);
      return json({ error: "not found" }, 404);
    } catch (error) {
      console.error(JSON.stringify({ type: "request_failed", message: error instanceof Error ? error.message : "unknown" }));
      return json({ error: error instanceof Error ? error.message : "internal error" }, error instanceof SyntaxError ? 400 : 500);
    }
  },
  async scheduled(_controller: ScheduledController, env: Env, ctx: ExecutionContext): Promise<void> {
    await analyzeStaleJourneys(env, ctx);
  },
} satisfies ExportedHandler<Env>;
