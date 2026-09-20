# SPIDER LEG 01 — MERCHANT ACTIVATION

## One-line mission
Use the recurring Telemedia service touchpoint to identify the correct decision maker and start one Merchant Activation flow without disrupting normal KKM work.

## Why this is one Spider leg
This leg does NOT build QR, bank API, personal cabinet, WhatsApp automation, AI or ESF integration.
It creates the verified handoff object those later legs consume.

INPUT:
Known Telemedia merchant + KKM + service due date.

OUTPUT:
ActivationClaim with merchant/KKM context + selected role + verified contact/handoff state.

## Screen 1 — Service trigger
Trigger: 5 days before service/billing due date.

Wireframe:
┌────────────────────────────────┐
│ TELEMEDIA                      │
│                                │
│ Через 5 дней обслуживание ККМ  │
│                                │
│ Обновите данные организации    │
│ для счетов, документов и       │
│ подключения сервисов           │
│                                │
│ [ ПРОДОЛЖИТЬ — 1 МИН ]         │
│                                │
│ Для владельца / бухгалтера     │
│ [ Я КАССИР ]                   │
└────────────────────────────────┘

Rules:
- no bank question yet;
- no account number;
- no forced cabinet registration;
- no blocking normal sale flow merely for non-completion unless separately legally/contractually approved;
- show once per configured cadence, not on every receipt.

## Screen 2 — Who handles company payments/documents?
┌────────────────────────────────┐
│ Кто занимается оплатой         │
│ и документами организации?     │
│                                │
│ [ Я ВЛАДЕЛЕЦ / РУКОВОДИТЕЛЬ ]  │
│ [ Я БУХГАЛТЕР ]                │
│ [ Я КАССИР ]                   │
└────────────────────────────────┘

Role semantics:
OWNER/MANAGER -> may continue to owner activation.
ACCOUNTANT -> may continue to accounting/contact flow; authority for bank/legal actions is NOT assumed.
CASHIER -> must not be asked for bank/legal/accounting secrets; create Owner Claim handoff.

## Screen 3A — Owner/accountant contact
┌────────────────────────────────┐
│ ИП А***                        │
│ ИНН ••••••821                  │
│ ККМ №004821                    │
│                                │
│ Телефон / WhatsApp             │
│ +996 [____________]            │
│                                │
│ [ ПОЛУЧИТЬ КОД ]               │
└────────────────────────────────┘

Then OTP/verification as configured.
Do not mark legal authority solely from phone OTP.

## Screen 3B — Cashier handoff
┌────────────────────────────────┐
│ Передайте владельцу /          │
│ бухгалтеру                     │
│                                │
│          [OWNER QR]            │
│                                │
│ Можно сфотографировать QR      │
│ или отправить ссылку           │
└────────────────────────────────┘

Owner Claim contains opaque claim_id only; backend maps it to merchant_id/INN/KKM. No secrets in QR.

## 1C 7.7 logic model
FORM: Merchant Activation.
REQUISITES:
activation_id
merchant_id
inn
kkm_id
terminal_id
service_due_at
role_selected
contact_phone
contact_verification_status
claim_id
claim_expires_at
activation_status
created_at
updated_at

COMMANDS:
Start
SelectRole
SendOTP
VerifyOTP
CreateOwnerClaim
CompleteHandoff
Skip/RemindLater

EVENTS:
SERVICE_DUE_MINUS_5D
ROLE_SELECTED
OTP_SENT
CONTACT_VERIFIED
OWNER_CLAIM_CREATED
HANDOFF_COMPLETED

CHECKS:
merchant exists
KKM belongs to merchant
claim not expired
phone format
OTP validity/rate limit
role != authority proof

OUTPUT:
ActivationClaim {
 activation_id,
 merchant_id,
 inn_masked,
 kkm_id,
 role,
 verified_contact?,
 claim_id?,
 next_action
}

## State machine
ELIGIBLE
-> SHOWN
-> ROLE_SELECTED
-> CONTACT_PENDING or OWNER_HANDOFF
-> CONTACT_VERIFIED
-> HANDOFF_COMPLETE

Alternative:
SHOWN -> REMIND_LATER
SHOWN -> DISMISSED according to product policy.

## API boundary
POST /activation/start
POST /activation/{id}/role
POST /activation/{id}/contact
POST /activation/{id}/otp/verify
POST /activation/{id}/owner-claim
GET  /activation/claim/{claim_id}

Endpoint names are proposed internal contract names, not existing production APIs.

## Evidence / analytics
activation_shown
activation_started
role_selected
owner_claim_created
contact_submitted
contact_verified
handoff_completed
remind_later

Measure:
Start Rate
Role Completion Rate
Verified Contact Rate
Owner Handoff Completion Rate
Median Time to Handoff
Sales-flow interruption/error rate

## PASS tests
PASS-1: Existing merchant sees service trigger 5 days before configured due date.
PASS-2: Owner can select role and reach verified-contact state without re-entering known INN/KKM.
PASS-3: Cashier can hand off via Owner Claim without seeing/entering bank data.
PASS-4: ActivationClaim persists and can be consumed by the next leg.
PASS-5: completing/skipping activation does not corrupt or duplicate normal KKM sale state.

## Anti-tests
FAIL if:
- cashier is forced to provide bank account;
- user retypes known INN/KKM;
- phone OTP is treated as proof of legal authority;
- repeated popup blocks every sale;
- screen claims QR/bank/cabinet are connected before later legs complete;
- activation completion is counted as QR migration.

## Responsibility
Source Owner: Product/Telemedia business owner
Delivery Owner: KKM/backend team
Review Owner: Product + security
Acceptance Owner: designated Telemedia owner
Escalation Owner: product/technical lead

NO OWNER = NOT READY.

## Synergy contract
This leg produces one reusable ActivationClaim.
Consumers:
LEG-02 Merchant Bank Map
LEG-03 Bank Binding
LEG-04 Cabinet
LEG-05 Billing/ESF channel
LEG-06 WhatsApp channel
LEG-07 QR activation
LEG-08 AI eligibility

Synergy is NOT counted until a consumer actually reads the same ActivationClaim/interface.

## Gate
G0 intent: READY
G1 handoff: READY after owner confirms this leg
G2 spec: READY
G3 build: NOT YET
G4 prove: NOT YET

## Programmer read-back
Before build, programmer must reply with:
1. what triggers the screen;
2. what data are already known and must NOT be asked again;
3. the three role branches;
4. exact output object;
5. five PASS tests;
6. what this leg explicitly does NOT build.

SOURCE -> READ-BACK -> CONFIRM -> FREEZE.

## Breadcrumb
BC-SPIDER-LEG01-001 | start | isolate recurring-service activation leg
BC-SPIDER-LEG01-002 | spec | service trigger + role + owner handoff frozen as proposed scope
resume: programmer read-back, then low-fi implementation/prototype
