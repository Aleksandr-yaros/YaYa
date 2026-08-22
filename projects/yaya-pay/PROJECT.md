# ЯЯ Оплата

- **Каноническое название:** ЯЯ Оплата
- **Алиасы:** Проект ЯЯ; ЯЯ QR; ЯЯ Баллы; ЯЯ Точка; ЯЯ ePOS; платёжный ЯЯ
- **Целевой GitHub-репозиторий:** `Aleksandr-yaros/YaYa-Pay`
- **Текущая версия:** `v0.1.0`
- **Статус:** `REGISTERED / REPOSITORY_CREATION_PENDING`
- **Дата регистрации:** 2026-08-06
- **Владелец:** Александр / Ярос
- **Видимость целевого репозитория:** private
- **Экосистема:** ∞ЯЯ

## Назначение

Самостоятельный платёжный продукт экосистемы ЯЯ для формирования динамического QR, серверного подтверждения оплаты, синхронного уведомления продавца и покупателя, фискализации, передачи проверяемого чека и управления баллами ЯЯ.

## Основной жизненный цикл

`ORDER_CREATED → QR_PRESENTED → CUSTOMER_CONFIRMED → PROCESSING → PAID → FISCALIZED → RECEIPT_DELIVERED → POINTS_POSTED → COMPLETED`

## Источник истины

Только серверно подтверждённое событие банка или платёжного провайдера. Скриншот, нажатие клиента или SMS без серверной проверки не подтверждают оплату.

## Обязательные модули

- Orders;
- Dynamic QR;
- Payment Gateway Adapters;
- Payment Confirmation;
- YaYa Point / ePOS;
- Fiscalization / KKM;
- Receipt Delivery and Sharing;
- YaYa Points Ledger;
- Refunds and Reversals;
- Reconciliation;
- Audit and Anti-Fraud;
- Notifications.

## Границы

В проекте не хранятся универсальные промпты и код электронных сотрудников, договорные оригиналы и общая архитектура всей экосистемы.

## Salim/SLM

`SLM = (B × C × E) × V × ΔM × L × R × T × A`

- Воздействие: `C4` — деньги, чеки, баллы и доверие пользователей.
- Доказательность: `E4` — подтверждено владельцем и существующей архитектурой ЯЯ ePOS.
- `ΔM = 1.8` — самостоятельный контур позволяет независимо защищать, тестировать и выпускать платежи.
- Обязательны idempotency, аудит, сверка, откат, защита персональных данных и разделение сред.

## Правило обращения

Обращения «ЯЯ Оплата», «Проект ЯЯ», «ЯЯ QR», «ЯЯ Баллы», «ЯЯ Точка», «ЯЯ ePOS» и «платёжный ЯЯ» означают этот проект, если контекст относится к платежам, QR, чекам или баллам.

## Следующий Commit Boundary

Создать приватный репозиторий `Aleksandr-yaros/YaYa-Pay`, перенести туда платёжную архитектуру и назначить первый релиз `v0.1.0` без удаления истории из реестра ЯЯ.


## Owner GO — Hardware Trust Slice

- **Decision timestamp:** 2026-08-22 22:30 Asia/Bishkek
- **Decision:** GO
- **Approved Evolution Card:** `EV-20260822-YAYA-003 — YAYA Hardware Trust Slice`
- **Decision Evidence ID:** `EVID-20260822-YAYA-DECISION-004`
- **Source of Truth:** `YY-TZ-009 v0.9.0`
- **Implementation status:** `BLOCKED_BY_REPOSITORY`

Approved minimum hardware vertical slice:

`YAYA Hub Pro → YAYA Tap Duo → YAYA Pocket → YAYA Evidence`

First required traceability chain:

`YY-HW-001 → task → commit/PR → CI → hardware simulator → Evidence Pack`

Acceptance boundary:

- duplicate confirmation produces one redemption effect;
- expired QR/NFC changes no ledger;
- cross-partner access is denied;
- camera shutter closed still permits QR/NFC;
- offline retry does not duplicate pickup;
- evidence matches operation_id, rule_version and ledger;
- refund creates a compensating entry;
- one-device failure preserves a safe fallback.

This Registry file is public-safe metadata only. Product code, secrets, device credentials, customer data and private implementation evidence must remain in the future private repository.