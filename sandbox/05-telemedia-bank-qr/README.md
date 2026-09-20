# TELEMEDIA BANK QR — SPIDER SANDBOX

Статус: INTENT CLARIFIED / G0 READY

## Уточненная цель
Telemedia уже имеет ККМ в государственном парке терминалов и работает с существующей клиентской базой. Основная задача — максимально быстро встроить банковскую QR-оплату в текущий ККМ-сценарий так, чтобы клиент получал реальную дополнительную ценность: выбор банка, быстрый запуск QR, подтверждение оплаты, фискальная связь, операторский контроль и сверка.

Защитный эффект должен возникать через реальную полезность и интеграционную ценность продукта, а не через искусственную невозможность законной миграции.

## Главный объект управления
Не терминал сам по себе, а связь:

CLIENT/MERCHANT -> ИП/ИНН -> KKM -> TERMINAL -> BANK -> ACCOUNT -> QR_STATUS -> PAYMENT_FLOW

## Две группы клиентов
### A. Уже банковские
У клиента уже есть расчетный счет/merchant QR в одном или нескольких банках.
Цель: не отправлять его повторно в отделение и не заставлять повторно регистрироваться, если банк позволяет безопасно подтвердить/привязать существующий merchant profile.

### B. Не подключенные
У клиента нет подходящего merchant QR/счета/подключения.
Цель: сделать управляемый remote onboarding через поддерживаемые банком механизмы KYC/идентификации/подписания и только после подтверждения банка открыть QR-сценарий.

## Новая лестница SPIDER
L0 — BASE KNOWN: известны клиент, ККМ, терминал и юридическое лицо.
L1 — MERCHANT/BANK MAP: для каждого клиента известен банк/QR-status/следующий шаг.
L2 — EXISTING BANK LINK: существующий merchant QR одного банка привязывается без повторного onboarding, если банк это поддерживает.
L3 — STATIC QR: доступен статический QR с доказуемой принадлежностью merchant.
L4 — DYNAMIC QR: сумма/операция создают уникальный payment attempt.
L5 — PAYMENT CONFIRMATION: только подтвержденный банк/платежный контур переводит payment в PAID.
L6 — FISCAL LINK: payment связан с чеком/продажей ККМ.
L7 — BANK CHOICE: клиент/точка выбирает один из уже подключенных банков.
L8 — REMOTE ONBOARDING: неподключенный клиент проходит максимально удаленное подключение по поддерживаемому банком KYC flow.
L9 — OPERATOR CONTROL: оператор видит merchant-bank-terminal-payment и все ошибки/retry.
L10 — SHIFT RECONCILIATION: закрытие смены сверяет ККМ, QR payments и расхождения.
L11 — MULTI-BANK CANONICAL: банки подключаются через единый Telemedia contract/adapters.
L12 — FLEET ROLLOUT: canary -> партия -> парк, evidence/rollback/metrics.

## Первая управляемость
Первый вопрос песочницы:
не «можем ли показать QR?», а
**для скольких клиентов из базы мы уже сегодня можем включить QR без повторной регистрации?**

## L1 главный артефакт
MERCHANT BANK MATRIX:
- client_id
- ИП/ИНН
- kkm_id
- terminal_id
- bank_candidates[]
- existing_account_known
- existing_qr_known
- merchant_id
- verification_source
- qr_status
- next_action
- blocker
- owner
- evidence

## L1 сегменты
GREEN — можно связать существующий банковский merchant profile.
YELLOW — банк/счет предполагается, требуется подтверждение.
BLUE — банковского подключения нет, нужен onboarding.
RED — юридическое/техническое несоответствие или неизвестные данные.

## ONE PERFECT EXISTING-CLIENT PATH
ККМ знает ИП/ИНН -> определяется/подтверждается существующий банк -> подтверждается merchant profile -> QR становится доступен на терминале -> дальнейшие payment/fiscal уровни идут отдельно.

## ONE PERFECT NEW-CLIENT PATH
ККМ знает ИП/ИНН -> подходящего merchant profile нет -> банк выбирается -> remote onboarding/KYC -> банк подтверждает merchant -> QR становится доступен.

## SPIDER rule
Каждый уровень = уникальная capability + 3–4 mandatory tests + anti-SALYM + evidence.
«Почти Lx» = L(x-1).

## Legal/contract gate
Не считать доказанными до получения источников:
- право Telemedia автоматически определять банковские счета клиента;
- доступность bank API по ИНН;
- возможность remote merchant onboarding;
- способы biometric/eKYC конкретного банка;
- договорные права использования merchant QR;
- точная схема оператора взаимодействия/ELQR;
- конкретное постановление/решение по замене ККМ в данном парке.

## Breadcrumb
BC-TMQR-004 | G0 CLARIFIED | центр задачи перенесен с hardware/QR-display на merchant-bank activation
state: changed
evidence: owner intent/read-back
resume: построить L1 MERCHANT/BANK MAP и доказать 4 сегмента на реальной выборке клиентов
prevention: не заставлять существующего банковского клиента проходить onboarding повторно без необходимости
