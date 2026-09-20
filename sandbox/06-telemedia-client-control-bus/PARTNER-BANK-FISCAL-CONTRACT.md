# PARTNER BANK -> TELEMEDIA FISCAL CONTRACT

## Context
Partner banks deploy terminals/devices that already run Telemedia KKM software and act as Telemedia dealers. This creates a contractual and technical opportunity to standardize payment confirmation before automatic fiscalization of noncash transactions.

## Core principle
For integrated partner-bank flows:
BANK CONFIRMATION is the source of truth for PAYMENT_RECEIVED.
Telemedia KKM is the source of truth for FISCAL_RECEIPT.
The bridge is a signed canonical PaymentEvent.

## Required partner capabilities
1. Merchant binding
2. Dynamic/static QR support status
3. Payment confirmation callback or status API
4. Payment unique reference
5. Amount/currency
6. Merchant identity/INN reference
7. Terminal/point reference where available
8. Payment timestamp
9. Reversal/refund event
10. Timeout/failure/cancel states
11. Daily statement / reconciliation export or API
12. Signature / integrity verification of events

## Canonical events
PAYMENT_PENDING
PAYMENT_PAID
PAYMENT_FAILED
PAYMENT_CANCELLED
PAYMENT_REVERSED
PAYMENT_REFUNDED
SETTLEMENT_POSTED

## Canonical IDs
bank_id
merchant_binding_id
payment_id
bank_reference
order_id
kkm_id
terminal_id
receipt_id
shift_id

## Automatic fiscalization rule
For a partner-bank integrated payment:
PAYMENT_PAID + verified signature + merchant/amount/order match
-> FISCALIZE_NONCASH
-> RECEIPT_CREATED
-> RECEIPT_ID linked back to PaymentEvent

## Manual/external noncash
Do not globally block legal fiscal receipt creation merely because an unintegrated bank is unavailable.
Use explicit state:
EXTERNAL_NONCASH_UNVERIFIED
until applicable legal/contractual rule permits stronger restriction.

## Contract clauses to negotiate
- bank must provide real-time confirmation or status API;
- SLA and callback retry policy;
- cryptographic integrity/signature;
- idempotency and duplicate handling;
- event retention and audit;
- merchant/INN binding;
- reversal/refund notification;
- settlement/reconciliation feed;
- test sandbox and certification;
- versioning/change notice;
- incident escalation;
- data protection and purpose limitation;
- commercial model;
- fallback behavior;
- right for Telemedia to refuse automatic 'verified noncash' status when confirmation is absent.

## Important distinction
Telemedia may contractually require bank confirmation as a condition for AUTOMATIC VERIFIED-NONCASH fiscal flow on partner integrations.
Do not assume Telemedia may lawfully prevent all manual/external noncash fiscalization across all scenarios without confirming KKM/tax rules and the merchant contract.

## Synergy
This contract feeds:
- KKM auto-fiscalization
- QR migration
- OneBank
- 1C bank import/reconciliation
- AI Payment Matching
- shift closing
- owner dashboard
- dispute evidence

## KPI
Verified Cashless Coverage (VCC)
= noncash fiscal receipts linked to signed PaymentEvent / all noncash fiscal receipts

Partner Bank Coverage
= partner-bank transactions using signed canonical PaymentEvent / all partner-bank noncash transactions

## Anti-SALYM
Bank terminal success screen != trusted callback
Callback without signature != verified event
PAID without merchant/order match != safe auto-fiscalization
Refund without reversal event != reconciled
Statement-only next day != real-time confirmation

## Breadcrumb
BC-TCCB-006 | Partner bank fiscal contract
state: created
resume: L1 partner-bank payment-to-receipt state machine for first bank
