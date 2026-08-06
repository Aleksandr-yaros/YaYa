# Индекс знаний ЯЯ Реестра

Текущая версия системы: **v2.5.0 Routing Integrity**

| ID | Раздел | Статус | Источник истины |
|---|---|---|---|
| YAYA-REGISTRY | ЯЯ Реестр: архитектура и карта экосистемы | approved | `Aleksandr-yaros/YaYa` |
| YAYA-NAMESPACE | Разделение обращения и проектов | approved | `docs/YAYA_NAMESPACE_CANON.md` |
| YAYA-ROUTING-INTEGRITY | Аудит недостатков, блокировки и routing tests | approved | `docs/YAYA_ROUTING_INTEGRITY_AUDIT.md` |
| YAYA-PAY | ЯЯ Оплата: QR, подтверждение оплаты, чек, возвраты и баллы | registered / blocked | целевой private `Aleksandr-yaros/YaYa-Pay`; паспорт `projects/yaya-pay/PROJECT.md` |
| YAYA-BOT-FACTORY | Фабрика ботов ЯЯ: электронные сотрудники | registered / blocked | целевой private `Aleksandr-yaros/YaYa-Bot-Factory`; паспорт `projects/bot-factory/PROJECT.md` |
| YAROS-CONTRACTS | Договоры компании «Ярос» | active | private `Aleksandr-yaros/dogovory` |
| YAYA-ROUTER | Маршрутизация заданий | approved v2.0.0 | `docs/YAYA_REPOSITORY_ROUTER.md` |
| YAYA-COMMANDS | Канонические команды агента | approved v2.0.0 | `docs/COMMANDS.md` |
| YAYA-PERMANENT-COMMAND | Постоянная команда маршрутизации | approved v2.0.0 | `docs/YAYA_PERMANENT_ROUTING_COMMAND.md` |

## Каноническое обращение

```text
Яя, <канонический контур>: <задание>
```

Контуры:

- `ЯЯ Реестр`;
- `ЯЯ Оплата`;
- `Фабрика ботов ЯЯ`;
- `Договоры Ярос`.

## Правила точности

- `Яя,`, `Яя:` и `Привет, Яя.` — вызов агента.
- `ЯЯ:` само по себе не является однозначным вызовом и не разрешает запись.
- `Проект ЯЯ` — устаревающий алиас, допустимый для `ЯЯ Оплата` только при явном платёжном контексте.
- Явный канонический контур имеет приоритет, но проверяется на конфликт с содержанием.
- При отсутствии `YaYa-Pay` или `YaYa-Bot-Factory` рабочая запись получает статус `BLOCKED_BY_REPOSITORY` и не перенаправляется в `YaYa`.

## Карта маршрутизации

- общая архитектура, стандарты, паспорта и ADR → `Aleksandr-yaros/YaYa`;
- QR, платежи, ePOS, чеки, возвраты, сверка и баллы → `Aleksandr-yaros/YaYa-Pay`;
- боты, промпты, роли, код и электронные сотрудники → `Aleksandr-yaros/YaYa-Bot-Factory`;
- договоры, приложения, акты и юридические оригиналы → `Aleksandr-yaros/dogovory`.

## Routing tests

Перед изменением маршрутов проверяются:

1. стандарт → `ЯЯ Реестр`;
2. платёж/QR/чек/баллы → `ЯЯ Оплата`;
3. бот/промпт/сотрудник → `Фабрика ботов ЯЯ`;
4. договор/акт → `Договоры Ярос`;
5. `ЯЯ:` → неоднозначность и запрет записи;
6. отсутствующий репозиторий → `BLOCKED_BY_REPOSITORY`.

## Правило источника истины

Каждый оригинал имеет один источник истины. В других контурах допускаются только ссылки, ID, версии интерфейсов, тесты совместимости, ADR и безопасные выдержки.

## Следующий шаг

Создать private-репозитории `Aleksandr-yaros/YaYa-Pay` и `Aleksandr-yaros/YaYa-Bot-Factory`, затем провести контролируемую миграцию и routing tests.
