# YAYA / ЯЯ — публичный реестр

Текущая версия: **v5.0.0 — Unified Spirit & Routing**

Статус: **ACTIVE ROUTER / SAFE EVOLUTION**

`Aleksandr-yaros/YaYa` — публичный реестр и маршрутизатор YAYA. Приватная топология, договоры, клиентские данные, платёжные секреты и production-код здесь не публикуются.

## Единый дух

> YAYA = серверно подтверждённая оплата → доказательство → реальная ценность/подарок бизнеса → использование или передача → повторное полезное действие → измеримый результат.

## Один канон

Один проект: **YAYA / ЯЯ**. Один MASTER CANON.

Статусы материалов:

`CURRENT → CANDIDATE → EXPERIMENT → SUPERSEDED → ARCHIVE`

AIA используется как контур продолжения и восстановления, но не заменяет продуктовый канон YAYA.

## Три продуктовые оболочки

- Seller App — счёт, QR, server confirmation, подарок и результат.
- Buyer App — проверка оплаты, чек, подарок, использование или передача.
- Web Owner — доказательства, кампании, партнёры, воронка и release gate.

## Визуальный канон

Текущий кандидат: **VIS-235…VIS-258**, всего 24 логических экрана:

- 8 Seller;
- 8 Buyer;
- 8 Owner.

Палитра: **YAYA-PALETTE-04-SOURCE-v1**.

- Seller: `#071426`, действие `#FF4D00`;
- Buyer: `#FFFDF8`, действие `#16C784`;
- деньги и ЯЯ: `#D4AF37`.

## Публичная маршрутизация

Машинный реестр: [`registry/repositories.yaml`](registry/repositories.yaml).

Он содержит только публично безопасные маршруты. Приватная топология намеренно исключена.

## Правило доказательства

- **SAVED** = запись + независимый read-back.
- **WORKING** = read-back + CI/status evidence.
- Иначе = **NOT VERIFIED**.

Каждое улучшение показывается как:

`BEFORE → CHANGE → AFTER → SOURCE QUOTE → EVIDENCE`

## Release Gate

`решение → канон/роль → requirement → визуал/спека → implementation → CI → staging → Evidence Pack → analytics event → GO / REWORK / STOP`

Если звено отсутствует, проект получает статус **NOT READY**.

Текущий статус выпуска: **NOT READY** — успешный CI run, staging и Evidence Pack ещё не подтверждены независимо.

## Главная метрика

**Repeat Useful Action Rate** — доля пользователей, совершивших повторное полезное действие.

## Публичная безопасность

- приватная топология: OMITTED;
- credentials: FORBIDDEN;
- customer data: FORBIDDEN;
- production secrets: FORBIDDEN.

## Команда «Где я?»

Прочитать `VERSION.json`, показать текущую версию, статус, последнее доказательство, красные зоны и один следующий P0-шаг.
