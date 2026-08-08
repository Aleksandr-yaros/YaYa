# Индекс знаний ЯЯ Реестра

Текущая версия системы: **v4.1.0 Repository Steward+**

| ID | Раздел | Статус | Источник истины |
|---|---|---|---|
| YAYA-REGISTRY | ЯЯ Реестр | approved | `Aleksandr-yaros/YaYa` |
| ALIBABA-ROUTER | ALIBABA·ROUTER v2.1.0 | approved | `docs/ALIBABA_ROUTER_PROTOCOL.md` |
| REPOSITORY-CATALOG | Каталог проектов и репозиториев | approved | `docs/REPOSITORY_CATALOG.md` |
| MEDIA-STANDARD | Хранение фото, рисунков, схем и сканов | approved | `docs/MEDIA_STORAGE_STANDARD.md` |
| YAYA-NAMESPACE | Разделение обращения и проектов | approved | `docs/YAYA_NAMESPACE_CANON.md` |
| YAYA-ROUTING-INTEGRITY | Аудит маршрутизации | approved | `docs/YAYA_ROUTING_INTEGRITY_AUDIT.md` |
| YAYA-DUAL-TARGET | Раздельная работа с базами | approved | `docs/YAYA_DUAL_TARGET_COMMAND.md` |
| YAYA-PAY | ЯЯ Оплата | registered / blocked | целевой private `Aleksandr-yaros/YaYa-Pay` |
| YAYA-BOT-FACTORY-DRAFT | LOGOS·PANDRE — рабочий черновик | repository exists / bootstrap pending | private `Aleksandr-yaros/logos-pandre` |
| YAYA-BOT-FACTORY-CANON | LOGOS·FABRIC — чистовой канон | repository exists / bootstrap pending | private `Aleksandr-yaros/logos-fabric` |
| YAROS-CONTRACTS | Договоры компании «Ярос» | repository exists / bootstrap pending | private `Aleksandr-yaros/dogovory` |
| YAKASSA-WORKSPACE | YaKassa·WORKSPACE v1.1.0 | active | private `Aleksandr-yaros/YaKassa-Workspace` |
| CALLCENTER | CallCenter | separate project / privacy review required | `Aleksandr-yaros/CallCenter` |

## Короткое обращение

```text
А <действие> <объект>.
```

Команды записи:

```text
А запомни <материал>.
А запиши <материал>.
```

Команды извлечения:

```text
А достань <материал>.
А покажи последнее по <проекту>.
```

## Маршрутизация

`естественная речь → действие → объект → проект → repository/category → privacy/version → C/E при необходимости → Commit Boundary → proof`

## Фабрика ботов

```text
LOGOS·PANDRE → LEXA → ORLIKIN·SPIDER → SPEC → SPEC·GUARD → Test → IMPACT → dry-run → Commit Boundary → LOGOS·FABRIC
```

## Медиа

Фото, рисунки, сканы, схемы и скриншоты хранятся в репозитории соответствующего проекта. Базовый стандарт: `docs/MEDIA_STORAGE_STANDARD.md`.

## Quarantine

До отдельного решения автоматическая запись запрещена в `Dogovora`, `Pesochnica`, `-gpt`, `-1`, `-`, `-2`.
