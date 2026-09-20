# TELEMEDIA BANK PAYMENT CONTRACT v1

## Purpose
One canonical bank-to-Telemedia contract for partner-bank terminals running Telemedia KKM and for supported QR/payment channels.

## Three truths
BANK TRUTH = payment status from bank/payment provider.
FISCAL TRUTH = receipt status from Telemedia KKM.
RECONCILIATION TRUTH = bank settlement/statement reconciled to PaymentEvent and ReceiptEvent.

## Core closed loop
ORDER -> PAYMENT -> VERIFIED -> FISCALIZE -> RECEIPT -> RECEIPT_ACK -> SETTLEMENT/RECONCILIATION

## Required PaymentEvent fields (12)
1. event_id
2. event_type
3. bank_id
4. merchant_id
5. merchant_inn
6. payment_id
7. bank_reference
8. amount
9. currency
10. payment_status
11. event_at
12. signature

Recommended correlation fields:
order_id, kkm_id, terminal_id, qr_session_id, point_id, original_payment_id.

## Canonical events
PAYMENT_CREATED
PAYMENT_PENDING
PAYMENT_PAID
PAYMENT_FAILED
PAYMENT_CANCELLED
PAYMENT_REVERSED
PAYMENT_REFUNDED
SETTLEMENT_POSTED

## Fiscalization gate
Automatic VERIFIED_NONCASH fiscalization is allowed only when:
- event = PAYMENT_PAID;
- event signature/integrity passes;
- merchant binding is verified;
- amount/currency match;
- event is not already consumed;
- correlation to order is deterministic OR approved matching policy resolves it;
- no blocking reversal/cancel state exists.

Result:
FISCALIZE_NONCASH -> ReceiptEvent -> receipt_id linked to payment_id.

## Receipt acknowledgment back to bank
payment_id
receipt_id
kkm_id
fiscal_status
fiscalized_at
receipt_reference/signature where applicable

## Idempotency / duplicate protection
event_id and payment_id must be idempotent.
Repeated PAYMENT_PAID must never create a second fiscal receipt.
Telemedia returns the existing processing result for duplicate events.

## Retry
Bank retries unacknowledged callbacks with agreed backoff.
Telemedia stores event before processing and returns durable ACK only after persistence.

## Offline
No connectivity:
- do not invent VERIFIED payment;
- keep order/payment state pending;
- recover by callback retry or status query;
- fiscal fallback follows applicable KKM/tax rules, not an invented technical restriction.

## Refund/reversal
PAYMENT_REFUNDED/PAYMENT_REVERSED references original_payment_id.
Telemedia starts the legally applicable return/correction workflow.
Never delete original fiscal evidence.

## Reconciliation API/feed
Daily/period feed must include payment_id, bank_reference, merchant_id, amount, currency, final status, paid_at, settlement status/date and refund/reversal references.
Telemedia matches:
Bank Payment <-> PaymentEvent <-> ReceiptEvent <-> Settlement.

## Security
- TLS;
- signed events / bank-approved integrity mechanism;
- timestamp + replay protection;
- credentials per bank/environment;
- secret rotation;
- least privilege;
- audit log;
- no bank passwords stored by Telemedia.

## SLA to negotiate
- real-time event latency target;
- availability;
- retry window;
- status-query availability;
- incident response;
- planned change notice;
- API version support;
- reconciliation delivery time.

## Partner certification
A bank adapter is PRODUCTION READY only after:
1. paid payment;
2. failed payment;
3. duplicate callback;
4. delayed callback;
5. wrong merchant;
6. wrong amount;
7. cancellation;
8. refund/reversal;
9. Telemedia temporary outage + retry;
10. reconciliation match.

## Example: 1,250 KGS
T0 14:31:02 KKM creates order O-87291 for 1250 KGS.
T1 bank creates payment P-992871.
T2 bank confirms PAYMENT_PAID.
T3 Telemedia validates signature + merchant + amount + correlation.
T4 Telemedia fiscalizes VERIFIED_NONCASH.
T5 receipt F-55120 created.
T6 Telemedia sends RECEIPT_ACK to bank.
T7 reconciliation later closes Payment P-992871 <-> Receipt F-55120.

Do not promise a fixed 0.8s until measured with each bank. Track P50/P95 event-to-receipt latency.

## Metrics
Verified Cashless Coverage (VCC)
Closed Loop Rate (CLR)
P50/P95 Payment-to-Receipt Latency
Duplicate Suppression Rate
Unmatched Payment Rate
Refund/Reversal Reconciliation Rate
Partner Bank Coverage

## Synergy consumers
KKM, QR Migration, OneBank, 1C, AI Payment Matching, shift close, merchant cabinet, dispute evidence, analytics.

## Anti-SALYM
terminal success screen != verified event
PAID != safe fiscalization without merchant/correlation checks
duplicate callback != second receipt
refund != deletion
statement next day != real-time confirmation
API connected != production ready

## Breadcrumb
BC-TCCB-007 | TELEMEDIA BANK PAYMENT CONTRACT v1
state: canonical contract drafted
resume: run 10 transaction simulations and define bank certification matrix
