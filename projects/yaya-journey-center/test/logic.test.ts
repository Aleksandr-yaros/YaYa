import assert from "node:assert/strict";
import test from "node:test";
import { analyzeFriction, canAutoComplete, validateSteps } from "../src/logic.ts";
import { PAYMENT_CONFIRMATION_STEPS, confirmationWithinBudget, paymentJourneySteps, validatePaymentSlice } from "../src/paymentSlice.ts";

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

test("payment confirmation slice has eight unique and safe steps", () => {
  assert.doesNotThrow(validatePaymentSlice);
  assert.equal(PAYMENT_CONFIRMATION_STEPS.length, 8);
  assert.doesNotThrow(() => validateSteps(paymentJourneySteps()));
});

test("payment and consent remain real human actions", () => {
  for (const step of PAYMENT_CONFIRMATION_STEPS.filter((item) => item.actor === "buyer" || item.actor === "seller")) {
    if (step.critical) assert.notEqual(step.completionMode, "safe_auto");
  }
});

test("seller-visible confirmation must arrive within three seconds", () => {
  assert.equal(confirmationWithinBudget(10_000, 12_999), true);
  assert.equal(confirmationWithinBudget(10_000, 13_001), false);
  assert.equal(confirmationWithinBudget(10_000, 9_999), false);
});
