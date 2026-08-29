import assert from "node:assert/strict";
import test from "node:test";
import { analyzeFriction, canAutoComplete, validateSteps } from "../src/logic.ts";

test("only safe_auto steps can be automated", () => {
  assert.equal(canAutoComplete("safe_auto"), true);
  assert.equal(canAutoComplete("manual"), false);
  assert.equal(canAutoComplete("guided"), false);
});

test("repeated failures simplify a manual step", () => {
  assert.deepEqual(analyzeFriction({ attempts: 3, helpRequests: 0, idleMinutes: 5 }, "manual"), {
    reasonCode: "repeated_failure",
    helpVariant: "simplify",
    recommendedAction: "Разделить шаг и оставить одно главное действие",
  });
});

test("blocked safe step offers automation", () => {
  const result = analyzeFriction({ attempts: 1, helpRequests: 1, idleMinutes: 60, blockedReason: "Не вижу кнопку" }, "safe_auto");
  assert.equal(result.helpVariant, "safe_auto");
  assert.equal(result.reasonCode, "blocked");
});

test("eight-step story is valid", () => {
  assert.doesNotThrow(() => validateSteps(Array.from({ length: 8 }, (_, index) => ({ title: `Шаг ${index + 1}`, completionMode: "guided" }))));
});

test("empty story is rejected", () => {
  assert.throws(() => validateSteps([]));
});
