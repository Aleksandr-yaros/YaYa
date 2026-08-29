# YAYA Journey Center — proof 2026-08-29

## Verified locally

| Check | Result | Evidence |
|---|---|---|
| Cloudflare types | PASS | `wrangler types` + `tsc --noEmit` |
| Behavior rules | PASS 5/5 | native Node test runner |
| D1 schema | PASS | 4 product tables created |
| Eight-step write | PASS | `first-gift-8`: `total_steps=8`, `recorded_steps=8` |
| Initial event write | PASS | `recorded_events=1` |
| Staging bundle | PASS | 13.87 KiB; D1 and PostHog host bindings detected |

## Exact D1 read-back

```json
{
  "id": "proof-8-step-001",
  "story_id": "first-gift-8",
  "total_steps": 8,
  "recorded_steps": 8,
  "recorded_events": 1
}
```

## Not yet claimed

- No production Cloudflare deployment was performed.
- Remote D1 IDs are placeholders until the Cloudflare account creates the databases.
- The PostHog organization `Yaros` is connected to ChatGPT, but the Worker secret `POSTHOG_API_KEY` still must be set in Cloudflare staging/production.
- Sentry runtime instrumentation is not claimed because its project/API connection was not exposed.

BC-JOURNEY-008 | G4 | CHECKPOINT | prove code, behavior, D1 write, and bundle -> all local checks passed
state: changed
evidence: this file; test output; D1 read-back; Wrangler dry-run
resume: publish branch, create Cloudflare D1 resources, set secrets, deploy staging, run remote 8-step probe
