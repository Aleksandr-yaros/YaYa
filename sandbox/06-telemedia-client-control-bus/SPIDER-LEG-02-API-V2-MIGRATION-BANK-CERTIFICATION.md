# SPIDER LEG 02 — API v2 MIGRATION & BANK CERTIFICATION

## Mission
Move partner-bank devices running Telemedia KKM from legacy integration to API v2 through a controlled, evidence-based migration program. A bank is either CERTIFIED_V2 or has explicit failed gates.

## Strategic intent
API v2 is a real product/security/payment-fiscal upgrade, not an artificial incompatibility.
Migration deadline is used to synchronize partner banks with Telemedia's new Payment/Fiscal contract and rollout schedule.

## Scope
IN:
- API v2 specification delivery
- bank adapter/sandbox integration
- certification
- pilot
- staged rollout
- telemetry
- rollback/stop-wave
- v1 support/sunset governance

OUT:
- changing commercial/legal terms without approved contract process
- disabling lawful merchant fiscal scenarios without legal/contractual validation
- mass rollout before certification
- bank-specific logic inside KKM core

## Canonical lifecycle
SPEC_SENT
-> ACKNOWLEDGED
-> SANDBOX_CONNECTED
-> CERT_TESTING
-> CERTIFIED_V2
-> PILOT
-> WAVE_1
-> WAVE_2
-> WAVE_3
-> MASS_ROLLOUT
-> V1_SUNSET

Any failed critical gate -> ROLLOUT_BLOCKED.

## Proposed migration calendar
Dates are relative until management assigns T0.

T-60:
- formal API v2 notice
- spec + changelog + sandbox credentials/process
- named owners on both sides
- preliminary T0 and v1 sunset policy
- request written acknowledgement

T-30:
- sandbox must be connected
- merchant binding + PAYMENT_PAID basic flow working
- unresolved gaps escalated

T-14:
- full 10-test certification attempt
- security/integrity check
- reconciliation feed check
- bank receives failure report

T-7:
- certification freeze for Wave 0
- production credentials/change window prepared
- rollback rehearsal
- support contacts confirmed

T0:
- Wave 0 starts only for CERTIFIED_V2 banks/devices
- telemetry war room
- no automatic expansion on critical errors

Post-T0:
Wave 0: 10 devices
Wave 1: 50
Wave 2: 200
Wave 3: 1,000
Mass: remaining approved fleet

Wave sizes are starting defaults; Acceptance Owner may reduce/increase only with evidence.

## 10 certification tests
C01 Normal paid payment -> exactly one verified noncash receipt.
C02 Failed payment -> no verified-paid receipt.
C03 Duplicate callback -> no duplicate receipt.
C04 Delayed callback -> correct recovery/correlation.
C05 Wrong merchant/INN -> BLOCK, no automatic fiscalization.
C06 Wrong amount/currency -> BLOCK.
C07 Cancelled payment -> correct state, no false PAID.
C08 Refund/reversal -> linked to original payment and fiscal return/correction workflow.
C09 Telemedia outage -> bank retry/status-query recovery without loss/duplication.
C10 Reconciliation -> PaymentEvent <-> ReceiptEvent <-> bank settlement closes correctly.

CERTIFIED_V2 = 10/10 with evidence and no unresolved critical security/data-integrity defect.

## Rollout wave gate
Before next wave:
- 0 critical payment-loss defects
- 0 duplicate fiscal receipts caused by v2
- 0 unresolved merchant-misbinding incidents
- rollback tested
- callback success/latency within agreed operational threshold
- reconciliation sample passes
- bank and Telemedia support owners available

Otherwise STOP_WAVE.

## Rollback
Rollback is mandatory.
Must support:
1. stop new deployments;
2. preserve persisted PaymentEvents/ReceiptEvents;
3. revert compatible application component/config where safe;
4. prevent duplicate processing during rollback;
5. maintain audit trail;
6. reconcile transactions spanning rollback window.

Never solve rollback by deleting transaction history.

## Bank dashboard
Fields:
bank
owner_bank
owner_telemedia
spec_ack
sandbox
cert_score
critical_fail
pilot_devices
current_wave
payment_events
callback_success
p50_latency
p95_latency
duplicate_suppressed
unmatched
reconciliation_pass
rollout_status
next_action

Statuses:
NOT_ACKNOWLEDGED
INTEGRATING
CERT_TESTING
CERTIFIED_V2
PILOT
ROLLOUT
BLOCKED
PRODUCTION

## Partner communication principle
Preferred wording:
"Telemedia is releasing KKM/API v2. To maintain compatibility of the integrated bank-payment functionality with the new version, the partner integration must pass API v2 certification before the applicable rollout wave."

Do not state that all bank devices or all fiscal functionality will cease unless that exact consequence is validated against contracts, technical dependencies and applicable requirements.

## Handoff / responsibility
Source Owner: Telemedia product/business owner
Delivery Owner: Telemedia API/KKM technical lead
Bank Delivery Owner: named bank integration owner
Review Owner: security + QA + product
Acceptance Owner: Telemedia designated release owner
Escalation Owner: executive sponsor on each side

NO OWNER = NOT READY.

## Evidence pack per bank
- written acknowledgement
- API adapter version
- sandbox evidence
- C01-C10 results
- timestamps/log references
- known gaps
- rollback rehearsal result
- pilot device list
- wave approval
- post-wave metrics

## Synergy contract
Reusable outputs:
CERTIFIED BankAdapter v2
PaymentEvent
MerchantBinding
ReceiptAck
ReconciliationFeed

Consumers:
7k KKM fleet
partner-bank terminals
YaKassa
Telemedia
Online KKM
vending/car wash integrations
OneBank
1C
AI Payment Matching
merchant analytics

Synergy is PROVEN only when >=2 real consumers reuse the same canonical contract without bank-specific changes to their core.

## Anti-SALYM
"Bank promised" != ACKNOWLEDGED
"API endpoint responds" != CERTIFIED
9/10 with critical failure != CERTIFIED
pilot success on one payment != rollout ready
new API != permission to break contractual/legal obligations
rollback plan on paper != rollback tested
1000 updated devices != successful migration if payment/receipt evidence is broken

## Programmer/team read-back
Before implementation, team must answer:
1. What changes from v1 to v2?
2. What exact bank output becomes canonical PaymentEvent?
3. What are C01-C10?
4. What blocks rollout?
5. How is rollback executed without losing/duplicating transactions?
6. What evidence advances 10 -> 50 -> 200 -> 1000?
7. Which consumers reuse the same adapter/events?

SOURCE -> READ-BACK -> CONFIRM -> FREEZE.

## Gates
G0 INTENT READY
G1 HANDOFF READY after owner confirms
G2 SPEC READY
G3 BUILD READY after bank owners + test environment + rollback owner assigned
G4 PROVE READY after C01-C10 harness exists
G5 ACCEPTED only after production wave evidence
G6 LEARNED after post-rollout review

## Breadcrumb
BC-SPIDER-LEG02-001 | START | accepted API v2 migration + bank certification as standalone Spider leg
BC-SPIDER-LEG02-002 | SPEC | T-60/T-30/T-14/T-7/T0 + C01-C10 + waves + rollback defined
resume: create bank-facing one-page notice and internal certification dashboard
