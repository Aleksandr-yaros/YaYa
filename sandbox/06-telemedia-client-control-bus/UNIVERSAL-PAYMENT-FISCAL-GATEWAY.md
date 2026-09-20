# UNIVERSAL PAYMENT FISCAL GATEWAY — TELEMEDIA

## Ideology
Separate three truths:
1. BANK TRUTH — money actually received.
2. FISCAL TRUTH — sale actually fiscalized by KKM.
3. TAX CLASSIFICATION — payment method recorded correctly for tax/accounting.

The gateway reconciles them but never invents one from another.

## Core rule
BANK_EVENT -> VERIFIED PAYMENT -> FISCAL DECISION -> RECEIPT -> RECONCILIATION

For integrated payment methods:
No verified bank/payment event -> no automatic "cashless verified" state.

Manual/external cashless remains possible only as a distinct explicit status if current law/business rules permit, never disguised as bank-verified.

## Merchant setup
Merchant can have multiple bank devices/QR providers:
- Bakai terminal
- MBANK terminal/QR
- Optima/O!Bank/etc.
- Telemedia KKM

All banks connect through adapters to one canonical PaymentEvent bus.
KKM remains one fiscal output point.

## Static QR
Static QR belongs to verified merchant/bank binding.
Customer scans any supported interoperable QR path.
Payment provider/operator returns evidence.
Gateway maps evidence to merchant and, where possible, order.
Only then fiscal flow proceeds automatically.

## Dynamic QR
KKM creates order/amount.
Gateway chooses verified bank binding/provider.
Provider returns QR/payment link.
Payment confirmation maps 1:1 to order.
Receipt is fiscalized automatically after confirmed payment.

## External POS/QR mode
If bank does not provide integration:
status = EXTERNAL_NONCASH_UNVERIFIED
Cashier may record payment method only under applicable KKM/tax rules.
No PAYMENT_VERIFIED badge.
Goal is diplomatic migration: offer automatic confirmation, reconciliation and reduced manual errors as benefit.

## Five depth levels
L1 — Three Truths separated.
L2 — Canonical PaymentEvent across banks.
L3 — Payment -> Fiscal Gateway automatic receipt.
L4 — Multi-bank static/dynamic QR + reconciliation.
L5 — Tax/shift/AI control: anomalies, missing receipts, mismatches, adoption optimization.

## Anti-SALYM
- QR scan != payment.
- bank terminal slip != fiscal receipt.
- KKM cashless flag != bank evidence.
- same amount != same transaction.
- lower tax rate != universal for all merchants.
- blocking cashless without bank API must not be implemented without legal/contractual basis.

## Synergy
Consumers:
KKM, OneBank, 1C, AI Payment Matching, shift reconciliation, WhatsApp/merchant cabinet, analytics.
Shared primitives:
MerchantBinding, PaymentEvent, ReceiptEvent, ReconciliationCase.

## North Star
QR Migration Rate + Verified Cashless Coverage
where Verified Cashless Coverage =
fiscal receipts linked to verified bank PaymentEvent / cashless fiscal receipts.

## Breadcrumb
BC-TCCB-005 | Universal Payment Fiscal Gateway | bank truth + fiscal truth + tax classification
state: concept created
resume: L1 screen/state model for three truths and external-vs-verified cashless
