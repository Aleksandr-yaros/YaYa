export type CompletionMode = "manual" | "guided" | "safe_auto";

export type StepInput = {
  title: string;
  completionMode: CompletionMode;
};

export type FrictionSignals = {
  attempts: number;
  helpRequests: number;
  idleMinutes: number;
  blockedReason?: string | null;
};

export type FrictionDecision = {
  reasonCode: "blocked" | "confusing" | "inactive" | "repeated_failure";
  helpVariant: "explain" | "show_example" | "simplify" | "safe_auto";
  recommendedAction: string;
};

export function validateSteps(steps: StepInput[]): void {
  if (steps.length < 1 || steps.length > 50) throw new Error("steps must contain 1..50 items");
  for (const [index, step] of steps.entries()) {
    if (!step.title.trim()) throw new Error(`step ${index + 1} title is required`);
    if (!["manual", "guided", "safe_auto"].includes(step.completionMode)) {
      throw new Error(`step ${index + 1} completionMode is invalid`);
    }
  }
}

export function canAutoComplete(mode: CompletionMode): boolean {
  return mode === "safe_auto";
}

export function analyzeFriction(signals: FrictionSignals, mode: CompletionMode): FrictionDecision {
  if (signals.blockedReason) {
    return {
      reasonCode: "blocked",
      helpVariant: mode === "safe_auto" ? "safe_auto" : "show_example",
      recommendedAction: mode === "safe_auto" ? "Предложить безопасное автоматическое выполнение" : "Показать точный пример и открыть нужную форму",
    };
  }
  if (signals.attempts >= 3) {
    return {
      reasonCode: "repeated_failure",
      helpVariant: mode === "safe_auto" ? "safe_auto" : "simplify",
      recommendedAction: mode === "safe_auto" ? "Выполнить безопасный шаг после подтверждения" : "Разделить шаг и оставить одно главное действие",
    };
  }
  if (signals.helpRequests >= 2) {
    return {
      reasonCode: "confusing",
      helpVariant: "show_example",
      recommendedAction: "Показать пример прямо на экране и подсветить единственную кнопку",
    };
  }
  return {
    reasonCode: "inactive",
    helpVariant: "explain",
    recommendedAction: signals.idleMinutes >= 1440 ? "Вернуть пользователя к сохранённому шагу с кратким объяснением выгоды" : "Показать мягкую подсказку следующего действия",
  };
}
