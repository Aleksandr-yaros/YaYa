# DIGITAL IDENTITY + SIGNATURE LAYER

## Decision
Treat biometric/remote identity and electronic signature as an ACCELERATION LAYER for QR migration, not as the product goal and not as a proprietary lock-in mechanism.

North Star remains:
FIRST VERIFIED QR PAYMENT and QR MIGRATION RATE.

## What this layer can accelerate
- prove that the person is the intended individual;
- link a verified person to a merchant workflow;
- sign Telemedia service agreements/consents electronically when the applicable signature type and contract permit;
- hand off to bank eKYC / bank-authenticated flows;
- reduce branch visits and paper handling.

## What it does NOT prove by itself
- that the person is authorized to act for a specific legal entity;
- that a settlement account belongs to the merchant;
- that the bank has activated merchant QR;
- that payment was received;
- that Telemedia may issue its own legally sufficient biometric identity credential.

## Trust chain
PERSON_IDENTITY_VERIFIED
-> AUTHORITY_FOR_MERCHANT_VERIFIED
-> DOCUMENT_SIGNED
-> BANK_MERCHANT_VERIFIED
-> QR_READY
-> FIRST_VERIFIED_QR_PAYMENT

## Architecture
Identity Broker:
- Tunduk/ESI or other authorized identity provider where integration is legally/technically available
- bank eKYC / bank identity
- qualified/cloud e-sign provider
- manual fallback

Signature Broker:
- document hash/version
- signer identity
- signer authority
- signature type
- certificate/provider evidence
- timestamp
- verification result

Telemedia stores evidence/reference, not biometric templates unless a separate lawful necessity and security design is approved.

## Fastest UX hypothesis
KKM owner-claim QR
-> phone
-> choose identity method
-> verified identity
-> verify authority for INN
-> sign consent/agreement
-> choose/confirm bank
-> bank verification/eKYC
-> QR ready
-> first verified QR payment

## Spider gate
Mission 1: face match succeeds but merchant authority absent -> cannot sign as merchant.
Mission 2: valid signature on changed document hash -> verification fails.
Mission 3: identity verified but bank account belongs to another INN -> QR route blocked.
Mission 4: fully verified identity+authority+signature+bank -> QR activation path proceeds without operator call where provider contracts permit.

## Anti-SALYM
FACE_MATCH != LEGAL_AUTHORITY
IDENTIFIED != SIGNED
SIGNED != BANK_VERIFIED
BANK_VERIFIED != PAID

## Security
Prefer external authorized identity/signature providers and bank eKYC over building a proprietary face database.
Minimize biometric storage.
Require explicit consent, audit, purpose limitation, access control, retention/deletion policy, and incident response before any biometric processing.

## KPI impact
Measure:
- QR Migration Rate uplift
- Time to First Verified QR reduction
- Zero-visit activation rate
- operator touches per migrated merchant
- identity/signature failure rate

If the layer does not improve QR migration or speed, it is not P0.

## Breadcrumb
BC-TCCB-003 | DIGITAL IDENTITY LAYER | acceleration, not lock-in
state: created
evidence: owner hypothesis + legal/regulatory public-source review required for provider-specific implementation
resume: test identity/signature providers and design one 60-second owner activation path
prevention: never equate face recognition with authority to bind a merchant
