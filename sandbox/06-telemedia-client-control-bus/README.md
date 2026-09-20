# TELEMEDIA CLIENT CONTROL BUS — SPIDER SANDBOX

Status: G0 INTENT READY / CANDIDATE

## Goal
Turn Telemedia's 7,000 KKM clients into a controlled digital relationship where cashier, accountant and owner can be reached through different channels, but all actions converge into one verified Merchant Profile.

Primary channels:
1. KKM/TMS
2. Owner/Accountant Personal Cabinet
3. WhatsApp Business Platform

Supporting channels:
4. Monthly ESF/service invoice trigger
5. Email/SMS fallback and recovery
6. Bank deep-link/API/KYC channel

## Core object
MERCHANT PROFILE:
client_id
inn
legal_entity
kkm_ids[]
terminal_ids[]
owner_contacts[]
accountant_contacts[]
cashier_contacts[]
billing_contact
whatsapp_opt_in
personal_cabinet_users[]
bank_bindings[]
merchant_qr_bindings[]
service_subscription_status
tms_control_status
verification_level
last_verified_at
next_action
evidence

## Role rule
Do not ask cashier for accounting/bank data when the role is unknown.
First identify role:
CASHIER / OWNER / ACCOUNTANT / OTHER.
Route bank/account/contract tasks to OWNER or ACCOUNTANT.

## TMS governance
TMS is a privileged control plane.
Required:
- authoritative owner of TMS
- complete account inventory
- RBAC
- remove/revoke access that is not contractually/operationally required
- no shared admin credentials
- audit log for login/config/update/rollout
- emergency access with time limit and evidence
- change/rollback proof

Any removal of third-party/government personnel must follow the actual authorization/contract and be recorded; do not silently lock out a legitimately authorized party.

## Monthly billing trigger
Service fee (example: 650 KGS/month) is a recurring authenticated touchpoint.
Five days before due date:
- KKM notice
- Personal Cabinet notice
- WhatsApp approved template (if opted in and allowed)
- fallback channel
Each message carries one secure action link to the same Merchant Profile task.

## WhatsApp rule
WhatsApp is a notification/conversation channel, NOT a trusted source of bank-account truth.
Never request full bank account numbers or sensitive credentials in WhatsApp.
Use secure link/deep-link to Personal Cabinet or bank-authenticated flow.

## Spider ladder
L0 — CONTACT MAP: know who is cashier/owner/accountant and how to reach them.
L1 — IDENTITY LINK: owner/accountant account is linked to correct INN/client.
L2 — MULTI-CHANNEL DELIVERY: same task reaches KKM + cabinet + WhatsApp with de-duplication.
L3 — BILLING TRIGGER: monthly service invoice creates controlled action workflow.
L4 — MERCHANT BANK DISCOVERY: owner/accountant declares/selects existing bank; claim remains unverified.
L5 — BANK VERIFIED BINDING: bank confirms merchant/account/INN relation.
L6 — STATIC QR ACTIVATION.
L7 — DYNAMIC QR ACTIVATION.
L8 — PAYMENT CONFIRMATION -> KKM fiscal flow.
L9 — OPERATOR EXCEPTION QUEUE.
L10 — SHIFT/RECONCILIATION.
L11 — FLEET OPTIMIZATION / adoption / retention metrics.

## Anti-SALYM
"Message sent" != "user reached".
"User clicked" != "identity verified".
"Bank selected" != "merchant verified".
"Account typed" != "payment route verified".
"QR displayed" != "payment received".
"KKM noncash checkbox" != "bank evidence".

## First KPI
VERIFIED OWNER/ACCOUNTANT COVERAGE
= merchants with at least one verified decision-maker contact / active merchants.

## Second KPI
ZERO-HUMAN-TOUCH COMPLETION RATE
= merchants completing requested bank/QR/billing setup without operator call.

## Breadcrumb
BC-TCCB-001 | G0 START | multi-channel merchant control bus
state: created
evidence: owner intent + sandbox file
resume: design L0 Contact/Role Map and channel orchestration
prevention: never route bank-account setup to an unverified cashier role by default
