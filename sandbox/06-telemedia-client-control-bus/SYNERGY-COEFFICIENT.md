# SYNERGY COEFFICIENT — МУДРЕЦ

## Permanent rule
Every meaningful YAYA/Telemedia project decision must calculate cross-project synergy before prioritization.

## Formula
S = R × N × A × T × E

R = Reuse: how much of the solution can be reused without rebuilding (0..1)
N = Network reach: how many relevant projects/surfaces gain value (1..N, capped for scoring)
A = Acceleration: reduction of time/cost for connected projects (1..3)
T = Trust transfer: whether verified identity/payment/data/evidence can be safely reused (0.5..2)
E = Evidence: strength of proof that the synergy is real (0.25 hypothesis; 0.5 prototype; 0.75 pilot; 1 production)

For management display normalize to Synergy Score 0..10.

## SALYM integration
SALYM-S = B4 × V4 × ΔM4 × K × S_norm

Synergy cannot rescue a feature with weak direct value or unacceptable risk. It is a multiplier after direct value and evidence.

## Mandatory Sage questions
For every problem/feature:
1. What other current project has the same primitive/problem?
2. Can we solve it once as a shared service?
3. What exact artifact/API/data/evidence is reusable?
4. Which projects become faster/cheaper/safer?
5. What coupling/new dependency does reuse create?
6. Is synergy proven or only hypothesized?
7. What is the smallest shared primitive that captures 80% of synergy without creating a platform too early?

## Synergy graph
Use nodes = projects/capabilities.
Use edges = reusable primitive with owner, interface, evidence and consumers.
No unnamed edge counts as synergy.

## Current high-synergy primitives
- Merchant Profile -> QR migration, billing, WhatsApp, cabinet, OneBank, reconciliation
- Verified Identity/Authority -> e-sign, bank onboarding, contracts, cabinet administration
- Bank Verified Merchant Binding -> static QR, dynamic QR, payment confirmation, OneBank, 1C bank flows
- Payment Event Bus -> KKM confirmation, AI Payment Node, reconciliation, Telegram/WhatsApp notifications, analytics
- Role/Contact Graph -> billing, owner claim, WhatsApp, operator routing
- Task/Channel Orchestrator -> QR migration, 650 KGS billing, service alerts, onboarding
- AI Payment Matching -> TOP-20 pilot, reconciliation, operator assistant, restaurant/voice-order payment matching where applicable

## Anti-synergy
Penalize:
- shared component that forces unrelated projects into one release cycle;
- one provider becoming a single point of failure without fallback;
- data reuse without permission/purpose;
- premature generic platform;
- duplicated "shared" services with different schemas.

## Decision rule
A backlog item must show:
DIRECT IMPACT + SYNERGY SCORE + CONSUMERS + REUSABLE PRIMITIVE + EVIDENCE + COUPLING RISK.

If synergy >= 8/10 and direct value is P0/P1, evaluate shared implementation first.
If synergy is hypothetical, mark HYPOTHESIS and do not inflate priority.

## Breadcrumb
BC-TCCB-004 | SAGE SYNERGY | mandatory cross-project multiplier
state: frozen as methodology rule for this sandbox
resume: apply synergy graph to AI Payment Node and QR migration
