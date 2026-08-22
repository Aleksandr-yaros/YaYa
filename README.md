# ЯЯ Реестр

Текущая версия: **v4.2.0 Stepwise Repository Memory**

`Aleksandr-yaros/YaYa` — управляющий реестр экосистемы ∞ЯЯ.

Он хранит архитектуру, правила, маршрутизацию, карту проектов, стандарты GitHub и безопасные ссылки. Он не является общим складом договоров, клиентских материалов, кода или рабочих файлов проектов.

## Короткое обращение

```text
А <действие> <объект>.
```

## Два действия записи

```text
А запомни <материал>.
А запиши <материал>.
```

`А запомни` — сделать информацию постоянной версионируемой памятью проекта.

`А запиши` — сохранить конкретный артефакт проекта: документ, фото, рисунок, схема, скан, таблица, исходник и т.п.

## CURRENT_PROJECT

Последний однозначно определённый проект становится `CURRENT_PROJECT`.

```text
А покажи YaKassa.
А запомни это там.
```

`там`, `туда`, `сюда`, `здесь`, `в этот проект` относятся только к последнему однозначному проекту.

## 12 шагов каждой записи

`намерение → объект → проект → репозиторий → приватность → категория/путь → имя/версия → C/E/Salim → Commit Boundary → запись → проверка → доказательство`

Полный протокол: `docs/GITHUB_OPERATING_PROCEDURE.md`.

Тесты: `docs/ROUTING_TEST_MATRIX.md`.

## Проекты

- `ЯЯ Реестр` → `Aleksandr-yaros/YaYa`;
- `Договоры Ярос` → private `Aleksandr-yaros/dogovory`;
- `Фабрика ботов ЯЯ · черновик` → private `Aleksandr-yaros/logos-pandre`;
- `Фабрика ботов ЯЯ · чистовик` → private `Aleksandr-yaros/logos-fabric`;
- `YaKassa·WORKSPACE` → private `Aleksandr-yaros/YaKassa-Workspace`;
- `CallCenter` → `Aleksandr-yaros/CallCenter` с privacy-проверкой;
- `ЯЯ Оплата` → целевой private `Aleksandr-yaros/YaYa-Pay` — P0 Gate открыт (`docs/YAYA_PAY_P0_GATE.md`).

Полная карта: `docs/REPOSITORY_CATALOG.md`.

## Медиа

Фото, рисунки, схемы, сканы и скриншоты хранятся в репозитории соответствующего проекта.

```text
assets/images/source/
assets/images/edited/
assets/images/diagrams/
assets/images/screenshots/
assets/images/scans/
```

Стандарт: `docs/MEDIA_STORAGE_STANDARD.md`.

## Фабрика ботов

```text
LOGOS·PANDRE → проверка → Commit Boundary → LOGOS·FABRIC
```

Черновики и эксперименты → `logos-pandre`.
Утверждённый канон → `logos-fabric`.

## Quarantine

`Dogovora`, `Pesochnica`, `-gpt`, `-1`, `-`, `-2` не участвуют в автоматической маршрутизации.

## Главные источники истины

- `VERSION.json` — текущая версия и машинный статус;
- `docs/ALIBABA_ROUTER_PROTOCOL.md` — язык и маршрутизация;
- `docs/GITHUB_OPERATING_PROCEDURE.md` — пошаговое исполнение;
- `docs/ROUTING_TEST_MATRIX.md` — тесты;
- `docs/REPOSITORY_CATALOG.md` — карта проектов;
- `docs/MEDIA_STORAGE_STANDARD.md` — фото и другие визуальные материалы;
- `docs/COMMANDS.md` — команды;
- `CHANGELOG.md` — история.

## Команда «Где я?»

Проверить `VERSION.json`, показать текущую версию, CURRENT_PROJECT при наличии, проекты, репозитории, блокировки, риски, последние изменения и один следующий шаг.
