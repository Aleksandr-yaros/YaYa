# QR MIGRATION KPI — NORTH STAR

## North Star
QR MIGRATION RATE (QMR)
= merchants with at least one verified QR payment in period / active Telemedia merchants

Do not count:
- message sent
- cabinet registration
- bank selected
- QR displayed
- merchant configured
as migrated.

A merchant becomes MIGRATED only after:
1. merchant/bank binding verified;
2. at least one successful QR payment;
3. payment is linked to the correct merchant/KKM;
4. no unresolved critical mismatch.

## Speed
TIME TO FIRST VERIFIED QR (TFVQ)
= first_verified_qr_payment_at - migration_start_at

Track:
P50 / P80 / P95 TFVQ.

## Weekly target
QMR-7D = merchants migrated in last 7 days / eligible active merchants at start of week.

## Migration funnel
ELIGIBLE
-> REACHED
-> DECISION_MAKER_VERIFIED
-> BANK_IDENTIFIED
-> BANK_VERIFIED
-> QR_READY
-> FIRST_QR_PAYMENT
-> ACTIVE_QR_7D
-> ACTIVE_QR_30D

## Anti-SALYM
"Configured" is not "Migrated".
"First QR shown" is not "Migrated".
"QR payment claimed by cashier" is not "Migrated".
Only verified payment evidence closes migration.

## Channel score
For each channel/campaign measure:
- migrated merchants
- median time to migration
- operator touches per migrated merchant
- cost per migrated merchant
- drop-off stage

CHANNEL SALYM SCORE should optimize:
Migrated merchants * Speed * Evidence / Human Effort / Cost

## Control dashboard
Primary:
- Total active merchants
- Migrated merchants
- QMR %
- Migrated today
- Migrated this week
- P50 TFVQ
- Active QR 7D
Secondary:
- conversion by channel
- conversion by bank
- conversion by role
- conversion by merchant segment
- blockers

## Rule
Any feature proposal must state expected effect on:
1. migrated merchants;
2. time to first verified QR;
3. human effort;
4. critical risk.
If no measurable effect -> NOT P0.

## Breadcrumb
BC-TCCB-002 | NORTH STAR | QR migration replaces feature-output metrics
state: changed
evidence: owner decision
resume: build L1 Channel Orchestrator around fastest migration path
prevention: reject vanity metrics such as registrations/messages/QR displays as success
