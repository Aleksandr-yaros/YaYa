# SPIDER LEG 03 — ONLINE KKM / VENDING PROOF

## Accepted direction
Prove that the same canonical commerce chain used by partner-bank KKM works without a cashier on at least two different unattended devices: coffee vending and self-service car wash.

## Mission
One device-specific sale must become the same shared objects:
SALE -> PAYMENT -> RECEIPT
without embedding bank-specific or fiscal-provider-specific logic into the vending device.

## Independence rule
The vending/car-wash adapter knows its device protocol.
The BankAdapter knows its bank protocol.
The FiscalAdapter/Online KKM knows fiscal protocol.
They meet only through canonical IDs/events.

## Scenario A — coffee machine
1. Customer selects Cappuccino 180 KGS.
2. Device creates SaleEvent S-COF-001.
3. Payment layer creates/uses QR/payment request.
4. Bank sends verified PaymentEvent P-001 = PAID.
5. Gateway correlates P-001 <-> S-COF-001.
6. Fiscal engine/Online KKM creates ReceiptEvent R-001.
7. Device receives business decision to dispense only according to configured safe state.
8. Evidence chain closes.

## Scenario B — self-service car wash
1. Customer selects/starts service for configured amount or tariff.
2. Wash controller creates SaleEvent S-WASH-001.
3. Payment confirmed as P-002.
4. Gateway correlates.
5. Online KKM creates R-002.
6. Controller receives authorization/state appropriate to service model.
7. Final amount adjustments, if variable, must use explicit adjustment/finalization flow rather than silently changing a paid SaleEvent.

## Canonical SaleEvent v0.1
event_id
sale_id
merchant_id
device_id
point_id
amount
currency
created_at
status
items_or_service_ref optional
external_reference optional

## Canonical PaymentEvent v0.1
event_id
payment_id
merchant_id
sale_id/correlation_reference
bank_id
amount
currency
status
paid_at
bank_reference
signature/integrity

## Canonical ReceiptEvent v0.1
event_id
receipt_id
merchant_id
sale_id
payment_id
kkm_id/online_kkm_id
amount
currency
fiscal_status
fiscalized_at
fiscal_reference

## Hard rule
Device core must not contain:
if MBANK
if BAKAI
if OPTIMA
or bank API credentials.

Bank core must not contain:
if coffee_machine
if car_wash
if vending_model_X.

## State model
SALE_CREATED
-> PAYMENT_PENDING
-> PAYMENT_VERIFIED
-> FISCAL_PENDING
-> FISCALIZED
-> SERVICE/DISPENSE_ALLOWED (where business/fiscal rules require this order)
-> CLOSED

Failure branches:
PAYMENT_FAILED
PAYMENT_TIMEOUT
PAYMENT_AMBIGUOUS
FISCAL_FAILED
DEVICE_FAILED
REFUND_REQUIRED

Exact dispense/fiscal order must be validated for the specific device/business and applicable fiscal rules before production.

## Critical vending exception
Payment may succeed while product/service delivery fails.
Therefore PAYMENT_PAID != SALE_SUCCESS.

Required evidence may include:
payment_received
fiscal_receipt
device_delivery_result

Example:
P-001 PAID
R-001 FISCALIZED
DISPENSE_FAILED
=> exception + refund/service recovery workflow, not CLOSED_SUCCESS.

## Offline
No bank evidence -> never invent PAYMENT_VERIFIED.
No fiscal response -> preserve transaction and follow approved fiscal fallback.
No device response after payment -> exception requiring deterministic recovery/refund policy.

## PASS tests
V01 Coffee: 180 KGS payment -> one PaymentEvent -> one ReceiptEvent -> one dispense decision.
V02 Coffee duplicate callback -> no duplicate receipt/no double dispense.
V03 Coffee paid but dispense fails -> exception created and evidence preserved.
V04 Wash normal payment -> payment/receipt/service chain linked by IDs.
V05 Wash variable/final amount case cannot mutate original paid event invisibly.
V06 Wrong merchant -> block.
V07 Bank timeout -> no false PAID.
V08 Fiscal timeout -> transaction recoverable without duplicate receipt.
V09 Refund/reversal -> original payment/receipt chain remains traceable.
V10 Same canonical events are consumed by at least one second system (e.g. OneBank/reconciliation) without device-specific schema fork.

## Synergy proof
HYPOTHESIS becomes PROVEN only if:
- normal KKM,
- coffee vending,
- car wash,
use the same PaymentEvent and ReceiptEvent contracts;
AND at least two downstream consumers reuse them.

Target shared consumers:
OneBank
1C
Reconciliation
AI Exception Engine
Merchant Cabinet
Analytics

## AI role
AI may classify anomalies/prioritize exceptions.
AI must not invent PAYMENT_PAID, fiscal success or physical dispense success.
Sources of truth remain bank/payment provider, fiscal system, and device telemetry.

## KPI
Closed Loop Rate
Payment-to-Receipt latency P50/P95
Paid-but-not-dispensed rate
Fiscal-failure rate
Automatic refund/recovery rate
Unmatched events
Human touches per 100 transactions
Schema reuse count

## Anti-SALYM
"QR shown" != paid
"PAID" != product delivered
"receipt created" != machine dispensed
one coffee-machine demo != platform proof
same JSON names with different semantics != shared contract
device-specific bank code != synergy
manual reconciliation != closed loop

## Programmer read-back
Before build answer:
1. What does the device know?
2. What must it never know about banks?
3. What are SaleEvent, PaymentEvent, ReceiptEvent?
4. What happens when paid but coffee is not dispensed?
5. How are duplicate callbacks prevented from double receipt/dispense?
6. What proves the same contract works for car wash?
7. Which second consumer reuses the exact same events?

## Gates
G0 INTENT READY
G1 HANDOFF READY after owner confirms
G2 SPEC READY
G3 BUILD READY after selecting one real coffee machine integration and one wash integration
G4 PROVE READY when V01-V10 test harness exists
G5 ACCEPTED when both device classes pass with evidence
G6 LEARNED after comparing schema/device exceptions

## Breadcrumb
BC-SPIDER-LEG03-001 | START | accepted Online KKM/Vending as cross-domain synergy proof
BC-SPIDER-LEG03-002 | SPEC | coffee + car wash share Sale/Payment/Receipt contract
resume: identify real device protocols/current Online KKM API and build first vertical test
