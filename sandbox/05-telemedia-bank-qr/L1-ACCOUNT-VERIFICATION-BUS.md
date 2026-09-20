# L1 — ACCOUNT VERIFICATION BUS

## Core decision
Telemedia must NOT trust a manually typed settlement account for payment routing.

Preferred activation paths:
1. Existing merchant QR: scan/import bank-issued merchant QR -> identify provider/merchant -> verify with bank/operator -> bind only after INN/legal-entity match.
2. Existing bank account but no merchant QR: bank-authenticated link/deep-link/API -> bank returns verified merchant/account token -> Telemedia stores token + masked account, not user-entered routing truth.
3. No supported merchant relationship: remote bank onboarding/KYC flow.

Manual account entry may be collected only as a search hint / claim, never as PAYMENT_ROUTE_VERIFIED.

## Canonical Merchant Binding
client_id
inn
kkm_id
terminal_id
bank_id
merchant_id
account_masked
account_token
verification_source
verified_owner_inn
verification_status
verified_at
capabilities
last_payment_at

## Verification states
UNKNOWN
SELF_DECLARED
ACCOUNT_CLAIMED
BANK_VERIFIED
MERCHANT_VERIFIED
PAYMENT_VERIFIED
BLOCKED

## Rule
CASHLESS=true is not sufficient for payment/fiscal automation.
For integrated QR:
PAYMENT_ROUTE_VERIFIED is required before Telemedia may render a dynamic payment route.

## Fast segmentation
A — Merchant QR already exists -> QR scan/import + bank verify -> fastest.
B — Bank relationship exists, merchant QR absent -> bank activation flow.
C — No bank relationship -> onboarding.
D — conflict (INN/account/merchant mismatch) -> manual review.

## Anti-SALYM
- typed account without bank verification must never become VERIFIED.
- account belonging to another INN must BLOCK.
- bank name selected without merchant capability must not enable dynamic QR.
- QR scan alone is not payment confirmation.
- noncash flag without bank evidence must remain UNVERIFIED_EXTERNAL_NONCASH.

## 1C 7.7 form
"Безналичная оплата"
- Способ: Внешний терминал / QR Telemedia
- Банк
- Статус связи
- ИНН владельца
- Счет (маска)
- Merchant ID
- Источник проверки
- Последняя проверка
Buttons:
[Проверить банк]
[Сканировать существующий QR]
[Подключить QR]
[История доказательств]

## Gate
L1 verified only when tester can distinguish:
- external noncash claimed,
- bank account verified,
- merchant QR verified,
- first payment verified.

"Почти verified" = previous state.
