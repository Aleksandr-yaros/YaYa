import type { StepInput } from "./logic";

export type PaymentSliceStep = StepInput & {
  id: string;
  actor: "seller" | "buyer" | "system" | "device";
  screen: string;
  event: string;
  critical: boolean;
};

export const PAYMENT_CONFIRMATION_STORY_ID = "payment-confirmation-3s-v1";
export const CONFIRMATION_BUDGET_MS = 3_000;

export const PAYMENT_CONFIRMATION_STEPS: readonly PaymentSliceStep[] = [
  { id: "amount", actor: "seller", screen: "Сумма и заказ", event: "payment_amount_entered", title: "Продавец подтверждает сумму", completionMode: "manual", critical: true },
  { id: "qr", actor: "system", screen: "QR готов", event: "payment_qr_issued", title: "Система показывает одноразовый QR", completionMode: "safe_auto", critical: false },
  { id: "scan", actor: "buyer", screen: "Проверка оплаты", event: "payment_qr_scanned", title: "Покупатель проверяет продавца и сумму", completionMode: "manual", critical: true },
  { id: "authorize", actor: "buyer", screen: "Подтверждение банка", event: "payment_authorized", title: "Покупатель подтверждает платёж", completionMode: "manual", critical: true },
  { id: "verify", actor: "system", screen: "Оплата подтверждена", event: "payment_server_verified", title: "Сервер проверяет подпись и идемпотентность", completionMode: "safe_auto", critical: true },
  { id: "signal", actor: "device", screen: "Сигнал продавцу", event: "merchant_signal_delivered", title: "Устройство подаёт световой и звуковой сигнал", completionMode: "safe_auto", critical: false },
  { id: "receipt", actor: "system", screen: "Чек и ЯЯ", event: "receipt_and_reward_issued", title: "Покупатель получает чек, продавец — подтверждение, начисляются ЯЯ", completionMode: "safe_auto", critical: true },
  { id: "result", actor: "seller", screen: "Результат смены", event: "payment_result_recorded", title: "Продажа попадает в результат смены и повторное полезное действие", completionMode: "safe_auto", critical: false },
] as const;

export function paymentJourneySteps(): StepInput[] {
  return PAYMENT_CONFIRMATION_STEPS.map(({ title, completionMode }) => ({ title, completionMode }));
}

export function confirmationWithinBudget(serverVerifiedAt: number, sellerVisibleAt: number): boolean {
  return serverVerifiedAt >= 0 && sellerVisibleAt >= serverVerifiedAt && sellerVisibleAt - serverVerifiedAt <= CONFIRMATION_BUDGET_MS;
}

export function validatePaymentSlice(): void {
  if (PAYMENT_CONFIRMATION_STEPS.length !== 8) throw new Error("payment slice must contain exactly 8 steps");
  const ids = new Set(PAYMENT_CONFIRMATION_STEPS.map((step) => step.id));
  const events = new Set(PAYMENT_CONFIRMATION_STEPS.map((step) => step.event));
  if (ids.size !== 8 || events.size !== 8) throw new Error("payment slice ids and events must be unique");
  for (const step of PAYMENT_CONFIRMATION_STEPS) {
    if (step.critical && step.actor !== "system" && step.completionMode === "safe_auto") {
      throw new Error(`critical human action ${step.id} cannot be auto-completed`);
    }
  }
}
