# YAYA — контур полного прохождения истории v1

Статус: BUILD READY, deployment blocked by Cloudflare account binding.

## 1C 7.7 logic model

| Объект | Реализация |
|---|---|
| Форма | Карточка истории с прогрессом `3/8` и одним главным действием |
| Реквизиты | journeyId, actorId, storyId, currentStep, totalSteps, status, helpVariant |
| Табличная часть | Шаги, режим выполнения, попытки, запросы помощи, причина блокировки |
| Команды | Назад, Подсказать, Далее, Выполнить безопасный шаг |
| События | started, viewed, attempted, blocked, help, completed, friction_detected |
| Проверки | порядок шагов, запрет ложного auto-complete, идемпотентное состояние |
| Переход | следующий шаг или полное завершение |
| Выход | D1-журнал, PostHog-метрика, структурированный Cloudflare log |

## Wireframe

```text
┌──────────────────────────────────┐
│ История «Первый подарок»    3/8  │
│ ● ● ● ○ ○ ○ ○ ○                 │
│                                  │
│ [крупная фотография подарка]     │
│                                  │
│ Шаг 3. Выберите подарок          │
│ Осталось около 20 секунд         │
│                                  │
│ [         ДАЛЕЕ         ]        │
│ [Показать как] [Сделать за меня] │
│                                  │
│ Всё сохранено · можно продолжить │
└──────────────────────────────────┘
```

`Сделать за меня` показывается только для `safe_auto`. На платеже, согласии, передаче и фискализации кнопка становится `Открыть нужный экран`.

## Замкнутый цикл обучения

`Показали шаг → записали просмотр → увидели попытку/паузу → определили причину → выбрали helpVariant → вернули к шагу → записали завершение → сравнили completion rate`.

## Pareto: первые улучшения

1. Постоянный прогресс `N/8`.
2. Одна большая кнопка `Далее`.
3. Сохранение и возврат на незавершённый шаг.
4. Фотография конкретного подарка, а не заглушка.
5. Контекстная помощь после второй просьбы или третьей неудачной попытки.

## Acceptance

- 8/8 шагов существуют в D1 сразу после старта;
- каждый переход имеет событие;
- пропуск порядка блокируется;
- безопасный auto-step проходит, критический блокируется;
- незавершение создаёт friction analysis;
- завершение переводит session в `completed`;
- PostHog получает четыре канонических события без чувствительных данных;
- health endpoint показывает Worker, D1 binding и конфигурацию PostHog.

## Breadcrumbs

BC-JOURNEY-001 | G0 | START | восстановить существующую 8-шаговую историю -> точный сохранённый сценарий не найден
state: unchanged
evidence: personal context search; repository scan
resume: создать канонический runtime-контур

BC-JOURNEY-002 | G2 | ERROR | подтвердить запись шагов -> в репозитории отсутствовал исполняемый журнал
state: unchanged
evidence: repository file scan
resume: добавить Worker, D1 schema, tests

BC-JOURNEY-003 | G3 | DECISION | разрешить «Далее за меня» -> только safe_auto; критические действия не подделываются
state: changed
evidence: logic.ts and tests
resume: validate build and local D1 recording

BC-JOURNEY-004 | G4 | ERROR | установить заявленную версию Workers types 4.x -> npm registry содержит актуальную ветку 5.x
state: unchanged
evidence: npm ETARGET before build or deployment
resume: pin 5.20260829.1 and repeat full check
prevention: verify the complete package version, not only Wrangler major version

BC-JOURNEY-005 | G4 | ERROR | combine generated runtime types with workers-types package -> duplicate global declarations
state: unchanged
evidence: tsc duplicate declaration errors; Wrangler migration instruction
resume: remove workers-types package and rely on worker-configuration.d.ts
prevention: generated Wrangler runtime types are the single type source

BC-JOURNEY-006 | G4 | ERROR | type-check Worker and Node tests in one DOM environment -> Node/DOM/runtime declarations conflicted
state: unchanged
evidence: tsc URLPattern and DOM duplicate errors
resume: isolate Worker type-check; execute tests through tsx runtime
prevention: Worker and Node test environments use separate compilation boundaries

BC-JOURNEY-007 | G4 | ERROR | run tsx tests -> sandbox denied IPC socket
state: unchanged
evidence: EPERM on /tmp/tsx pipe
resume: run TypeScript tests with Node 24 native type stripping
prevention: use zero-IPC test runner in restricted execution environments

BC-JOURNEY-008 | G4 | CHECKPOINT | prove code, behavior, D1 write, and bundle -> all local checks passed
state: changed
evidence: evidence/YAYA-JOURNEY-CENTER-PROOF-2026-08-29.md
resume: publish branch and deploy staging after Cloudflare account binding
