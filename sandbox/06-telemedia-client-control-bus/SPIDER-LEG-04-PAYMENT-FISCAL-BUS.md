# SPIDER LEG 04 — PAYMENT / FISCAL BUS (SPIDER BODY)

## Mission
Create the smallest shared body that connects SaleEvent, verified PaymentEvent and ReceiptEvent without becoming a monolith.

## Five physical services

### S1 Merchant Registry
Owns MerchantBinding truth:
merchant_id, inn, devices, bank_bindings, fiscal_bindings.
Does NOT decide payment status.

### S2 Bank Adapter Gateway
One adapter per bank/provider.
Normalizes bank payloads into canonical PaymentEvent.
Only trusted bank/provider evidence may originate PAYMENT_PAID.

### S3 Commerce Correlator
Links SaleEvent <-> PaymentEvent.
Outputs MATCHED / UNMATCHED / AMBIGUOUS / BLOCKED.
Does NOT invent PAID or FISCALIZED.

### S4 Fiscal Orchestrator
Consumes eligible matched verified payment + sale.
Calls physical KKM/Online KKM fiscal adapter.
Only verified fiscal response may originate FISCALIZED.

### S5 Event Ledger / Distribution
Durably stores canonical events and distributes them to consumers:
KKM, OneBank, 1C, Reconciliation, AI Exception Engine, Merchant Cabinet, Analytics.
Consumers cannot rewrite source truth.

## Authority matrix
SALE_CREATED -> selling device/order system
PAYMENT_PAID -> bank/payment provider via certified adapter
PAYMENT_MATCHED -> Commerce Correlator
FISCALIZED -> KKM/Online KKM via Fiscal Orchestrator
DISPENSED/SERVICE_DELIVERED -> physical device
SETTLED -> bank reconciliation/settlement source

No service may self-assert another service's truth.

## Example: coffee 180 KGS via Bakai
T0 Coffee -> SaleEvent S1 amount=180.
T1 Gateway requests/associates payment.
T2 Bakai -> certified adapter -> PaymentEvent P1 PAID.
T3 Merchant Registry validates merchant binding.
T4 Correlator links S1<->P1.
T5 Fiscal Orchestrator -> Online KKM.
T6 Online KKM -> ReceiptEvent R1 FISCALIZED.
T7 Ledger distributes same P1/R1 to OneBank + reconciliation (+ 1C when consumer exists).
T8 Coffee controller gets approved business state and reports DISPENSED/FAILED.
T9 Closed loop only when required truths for that scenario are present.

## Data ownership
Merchant DB: Merchant Registry.
Raw bank payload/evidence: Bank Adapter audit store.
Canonical immutable event history: Event Ledger.
Correlation state: Commerce Correlator.
Fiscal request/result: Fiscal Orchestrator audit.
Consumer projections: each consumer owns its projection only.

Do not use one mutable mega-table as system truth.

## Delivery guarantees
- unique event_id
- idempotency key
- durable persistence before ACK
- replay support
- consumer checkpoint/offset
- dead-letter/exception queue
- trace/correlation_id across Sale/Payment/Receipt
- schema_version on every canonical event

## Failure isolation
Bank A down -> Bank B/C remain operational.
OneBank down -> fiscal path continues; events queue for OneBank.
1C down -> events queue; no impact on bank confirmation.
AI down -> no impact on payment/fiscal truth.
Fiscal service down -> payment remains verified but FISCAL_PENDING; recovery policy applies.
Ledger/distribution degraded -> no ACK until durable storage according to architecture; prevent silent event loss.

## Anti-monolith rule
Shared body contains only reusable truth/events/orchestration.
Device UI, bank-specific payload mapping, accounting-specific posting logic, AI prompts/models and merchant marketing flows stay outside.

## Minimal canonical contracts
SaleEvent:
event_id, schema_version, correlation_id, sale_id, merchant_id, device_id, amount, currency, created_at, status.

PaymentEvent:
event_id, schema_version, correlation_id, payment_id, merchant_id, bank_id, amount, currency, status, paid_at, bank_reference, integrity_evidence.

ReceiptEvent:
event_id, schema_version, correlation_id, receipt_id, merchant_id, sale_id, payment_id, fiscal_device_id, amount, currency, fiscal_status, fiscalized_at, fiscal_reference.

## PASS tests
B01 Bakai 180 -> Sale/Payment/Receipt linked exactly once.
B02 Duplicate PAID -> one receipt.
B03 Bank A unavailable -> Bank B flow unaffected.
B04 OneBank unavailable -> fiscal flow succeeds and event later replays to OneBank.
B05 1C unavailable -> core payment/fiscal flow unaffected.
B06 AI unavailable -> core flow unaffected.
B07 Fiscal timeout -> PAYMENT_PAID retained, state FISCAL_PENDING, no duplicate on retry.
B08 Wrong merchant/amount -> BLOCKED, no automatic fiscalization.
B09 Event replay rebuilds consumer projection without creating a second fiscal operation.
B10 Same canonical PaymentEvent is consumed by >=2 real consumers without bank-specific schema forks.

## Synergy proof
S is PROVEN when:
- >=2 banks normalize to the same PaymentEvent;
- >=2 sale sources use the same SaleEvent;
- physical KKM and Online KKM emit compatible ReceiptEvent;
- >=2 downstream consumers reuse canonical events;
- outage of a noncritical consumer does not stop core payment/fiscal path.

## KPIs
Closed Loop Rate
Verified Cashless Coverage
P50/P95 Payment->Receipt latency
Unmatched rate
Ambiguous rate
Duplicate suppression
Event delivery lag per consumer
Replay success
Critical event loss = target 0
Cross-project reuse count

## Programmer read-back
Before build:
1. Name the five services and one responsibility of each.
2. Who alone may say PAID?
3. Who alone may say FISCALIZED?
4. What happens if OneBank/1C/AI is down?
5. Where is immutable event history?
6. How are duplicates/replays safe?
7. What proves this is shared infrastructure rather than a monolith?

## Gates
G0 INTENT READY
G1 HANDOFF READY after owner confirmation
G2 SPEC READY
G3 BUILD READY after technology choice + owners + real Bakai/KKM test inputs
G4 PROVE READY after B01-B10 harness
G5 ACCEPTED after two banks + two sale sources + two consumers pass
G6 LEARNED after outage/replay drill

## Breadcrumb
BC-SPIDER-LEG04-001 | START | accepted Payment/Fiscal Bus as Spider body
BC-SPIDER-LEG04-002 | SPEC | five-service authority-separated body defined
resume: implement smallest vertical S1->P1->R1 and outage/replay harness
