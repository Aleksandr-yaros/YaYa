# Индекс знаний ЯЯ Реестра

Текущая версия системы: **v2.7.0 Employee Factory OS**

| ID | Раздел | Статус | Источник истины |
|---|---|---|---|
| YAYA-REGISTRY | ЯЯ Реестр: архитектура и карта экосистемы | approved | `Aleksandr-yaros/YaYa` |
| YAYA-NAMESPACE | Разделение обращения и проектов | approved | `docs/YAYA_NAMESPACE_CANON.md` |
| YAYA-ROUTING-INTEGRITY | Аудит маршрутизации и routing tests | approved | `docs/YAYA_ROUTING_INTEGRITY_AUDIT.md` |
| YAYA-DUAL-TARGET | Раздельная работа с базами №1 и №2 | approved | `docs/YAYA_DUAL_TARGET_COMMAND.md` |
| YAYA-PAY | ЯЯ Оплата | registered / blocked | целевой private `Aleksandr-yaros/YaYa-Pay` |
| YAYA-BOT-FACTORY | Фабрика ботов ЯЯ v0.3.0 | registered / blocked | целевой private `Aleksandr-yaros/YaYa-Bot-Factory` |
| YAYA-BOT-FACTORY-COMMAND | Постоянная мастер-команда Фабрики | approved | `docs/YAYA_BOT_FACTORY_MASTER_COMMAND.md` |
| YAYA-BOT-FACTORY-TASK | Итоговое мастер-ТЗ Фабрики | approved | `projects/bot-factory/BOT_FACTORY_MASTER_TASK.md` |
| YAROS-CONTRACTS | Договоры компании «Ярос» | active | private `Aleksandr-yaros/dogovory` |

## Каноническое обращение к Фабрике

```text
Яя, Фабрика ботов ЯЯ: <задание>.
```

Короткие формы:

- `Яя, база номер два: <задание>`;
- `Яя, Фабрика ботов: <задание>`;
- `Яя, электронные сотрудники ЯЯ: <задание>`.

## Производственный контракт

Каждый запрос рассматривается как заказ на электронного сотрудника и проходит:

`LEXA → ORLIKIN·SPIDER 8/8 → SPEC → SPEC·GUARD → Build → Test → IMPACT → dry-run → подтверждение → Commit Boundary → Release → Observability → Improve Desk / Rollback`.

Для C2–C4 обязательны C/E, SPEC·GUARD, IMPACT, dry-run, подтверждение, Commit Boundary и план отката.

## Ограничение

Private-репозиторий `Aleksandr-yaros/YaYa-Bot-Factory` ещё не создан. До его создания рабочий код, production-промпты и конфигурации блокируются статусом `BLOCKED_BY_REPOSITORY`; в `YaYa` допускаются только паспорта, мастер-документы, ADR, ссылки и явные демонстрационные материалы.
