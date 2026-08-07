# Индекс знаний ЯЯ Реестра

Текущая версия системы: **v4.0.0 Alibaba Universal Router**

| ID | Раздел | Статус | Источник истины |
|---|---|---|---|
| YAYA-REGISTRY | ЯЯ Реестр | approved | `Aleksandr-yaros/YaYa` |
| ALIBABA-ROUTER | ALIBABA·ROUTER v2.0.0 | approved | `docs/ALIBABA_ROUTER_PROTOCOL.md` |
| YAYA-NAMESPACE | Разделение обращения и проектов | approved | `docs/YAYA_NAMESPACE_CANON.md` |
| YAYA-ROUTING-INTEGRITY | Аудит маршрутизации | approved | `docs/YAYA_ROUTING_INTEGRITY_AUDIT.md` |
| YAYA-DUAL-TARGET | Раздельная работа с базами №1 и №2 | approved | `docs/YAYA_DUAL_TARGET_COMMAND.md` |
| YAYA-PAY | ЯЯ Оплата | registered / blocked | целевой private `Aleksandr-yaros/YaYa-Pay` |
| YAYA-BOT-FACTORY-DRAFT | LOGOS·PANDRE — рабочий черновик Фабрики v0.5.0 | registered / blocked | целевой private `Aleksandr-yaros/logos-pandre` |
| YAYA-BOT-FACTORY-CANON | LOGOS·FABRIC — чистовой канон Фабрики v0.5.0 | registered / blocked | целевой private `Aleksandr-yaros/logos-fabric` |
| YAYA-BOT-FACTORY-ACCESS | Карточка обращения и команда извлечения | approved | `docs/YAYA_BOT_FACTORY_ACCESS_CARD.md` |
| YAYA-BOT-FACTORY-COMMAND | Постоянная мастер-команда v2.0.0 | approved | `docs/YAYA_BOT_FACTORY_MASTER_COMMAND.md` |
| YAYA-BOT-FACTORY-TASK | Итоговое мастер-ТЗ | approved | `projects/bot-factory/BOT_FACTORY_MASTER_TASK.md` |
| YAROS-CONTRACTS | Договоры компании «Ярос» | active | private `Aleksandr-yaros/dogovory` |
| YAKASSA-WORKSPACE | YaKassa·WORKSPACE v1.0.0 — рабочая память | active | private `Aleksandr-yaros/YaKassa-Workspace` |
| YAKASSA-WORKSPACE-PROTOCOL | Команды, структура, версии и извлечение YaKassa | approved | `docs/YAKASSA_WORKSPACE_PROTOCOL.md` |

## Каноническое обращение к Фабрике

```text
Яя, Фабрика ботов ЯЯ: <НАМЕРЕНИЕ> <задание>.
```

Намерения:

`ДОСТАНЬ · СТАТУС · ПРОАНАЛИЗИРУЙ · СПРОЕКТИРУЙ · СОЗДАЙ · ПРОВЕРЬ · СОХРАНИ · ВЫПУСТИ · УЛУЧШИ · ОСТАНОВИ · АРХИВИРУЙ`

## Достать обращение

```text
Яя, Фабрика ботов ЯЯ: ДОСТАНЬ ОБРАЩЕНИЕ.
```

```text
Яя, ЯЯ Реестр: ДОСТАНЬ ОБРАЩЕНИЕ «Фабрика ботов ЯЯ».
```

```text
Яя, база номер два: ДОСТАНЬ ОБРАЩЕНИЕ.
```

## Три уровня

1. Естественный — короткая команда обычным языком.
2. Управляемый — цель, пользователи, канал, интеграции, права и критерий готовности.
3. Промышленный — полный цикл LEXA, ORLIKIN·SPIDER, SPEC·GUARD, IMPACT, dry-run, C/E, Commit Boundary и rollback.

## Производственный контракт

`LEXA → ORLIKIN·SPIDER 8/8 → SPEC → SPEC·GUARD → Build → Test → IMPACT → dry-run → подтверждение → Commit Boundary → Release → Observability → Improve Desk / Rollback`

## Ограничение

Private-репозитории `Aleksandr-yaros/logos-pandre` и `Aleksandr-yaros/logos-fabric` ещё не созданы. До их создания рабочие оригиналы блокируются статусом `BLOCKED_BY_REPOSITORY`. После создания действует маршрут `LOGOS·PANDRE → проверка → Commit Boundary → LOGOS·FABRIC`.

## Рабочий архив YaKassa

```text
Привет, Алибаба, YaKassa: ПОКАЖИ АРХИВ.
Привет, Алибаба, достань информацию по YaKassa: <тема>.
```

Маршрут: `запрос → MANIFEST/INDEX → категория → версия материала → источник`.


## Универсальная команда

```text
Алибаба, <действие> <объект> [контур] [условия].
```

Маршрут: `естественная речь → действие → объект → контур → repository/category → privacy/version → Commit Boundary → proof`.
