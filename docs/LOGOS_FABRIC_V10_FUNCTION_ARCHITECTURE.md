# LOGOS·FABRIC v10

## Универсальная фабрика бизнес-ботов, событий и подключаемых функций

Статус: **approved architecture**  
Дата фиксации: **2026-08-05**  
Первый эталонный продукт: **CALL-001**  
Класс воздействия: **C3**  
Текущая доказательность: **E2**  
Целевая доказательность перед промышленным запуском: **E4**

---

## 1. Каноническое решение

LOGOS·FABRIC не является интеграцией телефонии с Bitrix.

LOGOS·FABRIC — независимая интеллектуальная событийная платформа, в которой Bitrix, Jira, 1С, Telegram, Umnico, email, календарь и любые будущие системы подключаются как заменяемые функции-исполнители.

Каноническая формула:

```text
Достоверное событие
→ Понимание смысла
→ Проверка полномочий
→ План функций
→ Независимое исполнение
→ Доказанный результат
→ Измерение эффекта
```

Главный принцип:

> Bitrix, Jira и 1С не управляют фабрикой. Фабрика управляет функциями, а внешние системы выступают подключаемыми исполнителями.

---

## 2. Определение бота

Бот — не отдельная программа, не Telegram-аккаунт и не жёсткая интеграция.

Бот — версионированная конфигурация:

```text
Бот =
источники событий
+ правила
+ знания
+ AI-профиль
+ функции
+ политики
+ права
+ каналы
+ доказательства
+ показатели результата
```

Один бот может:

- получать события из нескольких источников;
- выполнять несколько функций;
- отправлять результат в несколько систем;
- работать в нескольких каналах;
- использовать разные профили анализа;
- подключать и отключать внешние системы без изменения ядра;
- выполнять действия параллельно;
- продолжать работу при недоступности отдельного исполнителя.

---

## 3. Правильное место телефонии

IP-АТС является источником истины по звонку.

Она должна предоставлять:

- уникальный идентификатор звонка;
- направление;
- номера сторон;
- внутренний номер;
- сотрудника;
- время начала;
- время ответа;
- время завершения;
- длительность;
- итоговый статус;
- запись разговора или ссылку на неё.

Телефония не должна зависеть от Bitrix, Jira, 1С, Telegram или GPT.

Недоступность внешней системы не должна останавливать звонки и не должна приводить к потере события.

---

## 4. Каноническая архитектура

```text
ИСТОЧНИКИ СОБЫТИЙ
SIP / IP-АТС / Telegram / Email / Web / Bitrix / Jira / 1С
                     │
                     ▼
              EVENT GATEWAY
                     │
                     ▼
                 CALL HUB
         события, состояния, записи
                     │
                     ▼
             SEMANTIC CORE
      смысл, контекст, расшифровка, AI
                     │
                     ▼
             DECISION ENGINE
     правила, политики, разрешения, риски
                     │
                     ▼
              ACTION PLANNER
      план независимых и параллельных действий
                     │
                     ▼
              FUNCTION BUS
                     │
       ┌─────────────┼─────────────┐
       ▼             ▼             ▼
 Bitrix Adapter  Jira Adapter   1С Adapter
       │             │             │
       └─────────────┼─────────────┘
                     ▼
              EVIDENCE LEDGER
      доказательства, статусы, ошибки, аудит
                     │
                     ▼
                  IMPACT
        фактический эффект и улучшения
```

---

## 5. Архитектурные контуры

### 5.1. GATEKEEPER

Определяет пользователя, организацию, роль, устройство, канал и допустимый контекст действия.

### 5.2. TENANT

Изолированный контур бизнеса со своими:

- пользователями;
- подключениями;
- ботами;
- политиками;
- данными;
- лимитами;
- журналами;
- стоимостью;
- ответственными.

### 5.3. EVENT GATEWAY

Преобразует внешние события в единый `CanonicalEvent`.

### 5.4. CALL HUB

Отвечает за жизненный цикл звонка, CallID, состояния, записи и восстановление обработки.

### 5.5. SEMANTIC CORE

Определяет смысл события и речи.

GPT используется как:

- переводчик естественного языка;
- аналитик;
- классификатор;
- автор предложений;
- генератор проекта BotSpec.

GPT не является источником истины и не получает права самостоятельно изменять рабочие системы.

### 5.6. DECISION ENGINE

Определяет:

- разрешено ли действие;
- кто имеет право его запускать;
- требуется ли подтверждение;
- какие данные можно передать;
- какой класс риска имеет действие;
- нужен ли второй подтверждающий пользователь.

### 5.7. ACTION PLANNER

Преобразует выводы в план действий с зависимостями, параллельностью, политиками и приоритетами.

### 5.8. FUNCTION BUS

Получает универсальные функции, не привязанные к конкретной системе.

Примеры:

```text
Task.Create
Task.Update
CRM.AttachCommunication
CRM.UpdateClient
Message.Publish
Calendar.Schedule
Document.Create
File.Store
Approval.Request
Metric.Register
```

### 5.9. ADAPTER LAYER

Каждая внешняя система подключается отдельным адаптером:

```text
BitrixAdapter
JiraAdapter
OneCAdapter
TelegramAdapter
UmnicoAdapter
EmailAdapter
CalendarAdapter
StorageAdapter
OtherSystemAdapter
```

Адаптер переводит универсальную функцию во внутренний формат конкретной системы.

Бизнес-логика BotSpec не должна содержать прямых вызовов конкретного поставщика.

### 5.10. EVIDENCE LEDGER

Хранит доказательства входного события, решения, подтверждения, исполнения и результата.

### 5.11. IMPACT

Измеряет реальный эффект, а не количество сгенерированных текстов.

---

## 6. Каталог универсальных функций

### 6.1. CRM

```text
CRM.FindClient
CRM.CreateClient
CRM.UpdateClient
CRM.AttachCall
CRM.AttachRecording
CRM.AttachTranscription
CRM.AttachReport
CRM.ChangeDealStage
CRM.AddComment
```

### 6.2. Задачи

```text
Task.Create
Task.Assign
Task.Update
Task.AddComment
Task.SetDeadline
Task.Close
Task.Escalate
Task.RequestApproval
```

### 6.3. Сообщения

```text
Message.Publish
Message.SendDirect
Alert.Send
Report.Publish
File.Send
Approval.Request
```

### 6.4. 1С

```text
OneC.CreateTask
OneC.CreateDocument
OneC.RegisterEvent
OneC.UpdateCounterparty
OneC.CreateApproval
OneC.RegisterCommitDecision
OneC.ReceiveStatus
```

Финансовые, юридические и учётные документы требуют отдельной политики и Commit Boundary.

### 6.5. Файлы

```text
File.Store
File.GetSignedLink
File.Archive
File.DeleteByPolicy
File.AttachToEntity
```

### 6.6. Аналитика

```text
Analytics.RegisterMetric
Analytics.UpdateDashboard
Analytics.CompareProcesses
Analytics.DetectRisk
Analytics.MeasureImpact
```

---

## 7. Универсальный контракт функции

Каждая функция описывается объектом `FunctionDefinition`:

```text
functionId
functionType
name
description
inputSchema
outputSchema
riskClass
requiredPermissions
supportedAdapters
requiresConfirmation
supportsDryRun
supportsRollback
timeout
retryPolicy
dataPolicy
version
```

Каждый запуск создаёт `ActionInstance`:

```text
actionId
eventId
callId
botId
botSpecVersion
functionId
targetSystem
targetEntity
inputData
status
attempt
startedAt
finishedAt
result
error
evidenceId
approvedBy
```

Статусы:

```text
PLANNED
AWAITING_APPROVAL
APPROVED
QUEUED
RUNNING
SUCCEEDED
FAILED
RETRYING
PARTIALLY_SUCCEEDED
REJECTED
ROLLED_BACK
MANUAL_REVIEW
```

---

## 8. Параллельное выполнение

Один результат анализа может запускать несколько независимых действий:

```text
CALL_ANALYZED
→ Bitrix.AttachCall
→ Bitrix.CreateTask
→ Jira.CreateIssue
→ OneC.RegisterEvent
→ Telegram.PublishReport
→ Calendar.ScheduleReminder
```

Каждое действие имеет самостоятельный статус.

Ошибка одной функции не отменяет успешно выполненные независимые функции.

Принцип:

```text
Недоступность внешней системы
≠ потеря события
≠ остановка бота
≠ отмена остальных функций
```

---

## 9. CALL-001

CALL-001 — первый эталонный бот контроля и анализа входящих и исходящих звонков.

Состояния звонка:

```text
CALL_CREATED
→ RINGING
→ ANSWERED
→ FINISHED
→ RECORD_PENDING
→ RECORD_READY
→ TRANSCRIPTION_PENDING
→ TRANSCRIBED
→ ANALYSIS_PENDING
→ ANALYZED
→ ACTIONS_PLANNED
→ ACTIONS_EXECUTING
→ COMPLETED
```

Альтернативные состояния:

```text
MISSED
BUSY
FAILED
RECORD_UNAVAILABLE
TRANSCRIPTION_FAILED
ANALYSIS_FAILED
PARTIAL_ACTION_FAILURE
MANUAL_REVIEW
```

---

## 10. Анализ звонка

Система должна иметь возможность определить:

- участников;
- цель разговора;
- потребность клиента;
- вопросы;
- товары и услуги;
- цены;
- сроки;
- возражения;
- договорённости;
- обещания сторон;
- следующее действие;
- ответственного;
- срок исполнения;
- риски;
- нарушения утверждённого сценария;
- необходимость эскалации.

Каждый AI-вывод содержит:

```text
value
confidence
evidenceFragment
speaker
timecode
```

Если данных недостаточно, система фиксирует `Не установлено` и не придумывает ответ.

---

## 11. BotSpec

```text
botSpecId
botId
tenantId
name
purpose
owner
eventSources
eventFilters
analysisProfiles
rules
functions
functionTargets
parallelExecutionRules
approvalPolicies
dataPolicies
notificationChannels
roles
limits
modelProfile
promptVersion
deploymentStatus
rollbackVersion
createdBy
approvedBy
createdAt
activatedAt
```

Пример:

```yaml
when:
  event: CALL_ANALYZED

if:
  employeePromise.detected: true

then:
  - function: Task.Create
    targets: [Bitrix, Jira]
    mode: parallel

  - function: OneC.RegisterEvent
    condition:
      call.category: procurement
    approval: required

  - function: Telegram.PublishReport
    target: SalesManagementGroup
```

---

## 12. Голосовое создание и изменение

```text
Голос пользователя
→ Speech-to-Text
→ IntentGraph
→ проект BotSpec
→ проверка неоднозначностей
→ SPEC·GUARD
→ Policy Check
→ Dry-run
→ карточка изменений
→ подтверждение
→ Commit Boundary
→ Deployment
```

Непосредственное исполнение необработанной голосовой команды запрещено.

---

## 13. Commit Boundary

До Commit Boundary любые изменения считаются проектом.

Commit Boundary фиксирует:

- пользователя;
- организацию;
- роль;
- BotSpec;
- версию;
- функции;
- целевые системы;
- класс риска;
- результат dry-run;
- принятые риски;
- план отката;
- дату активации.

Молчаливые изменения запрещены.

---

## 14. Визуальные экраны

1. **Пульс** — звонки, события, ошибки, задержки и состояние подключений.
2. **Голосовой архитектор** — создание и изменение бота.
3. **Паспорт бота** — назначение, владелец, версия, права, функции и стоимость.
4. **Карта функций** — Событие → Анализ → Условие → Функция → Исполнитель → Результат.
5. **Каталог интеграций** — АТС, Bitrix, Jira, 1С, Telegram, Umnico, GPT и другие.
6. **Simulation Lab** — проверка на исторических и синтетических событиях.
7. **Evidence Ledger** — доказательная цепочка.
8. **IMPACT** — измерение фактического эффекта.

---

## 15. Безопасность

Обязательны:

- TLS;
- шифрование записей;
- Vault для токенов и паролей;
- ротация ключей;
- раздельные сервисные учётные записи;
- RBAC/ABAC;
- журнал прослушиваний;
- журнал вызовов функций;
- политика хранения и удаления;
- резервное копирование;
- тест восстановления;
- защита от replay;
- подписанные краткоживущие ссылки;
- запрет секретов внутри BotSpec.

---

## 16. Надёжность

Система должна:

1. не терять события;
2. не создавать дубли;
3. продолжать обработку после восстановления;
4. выполнять функции независимо;
5. сохранять статус каждого действия;
6. иметь retry;
7. иметь Dead Letter Queue;
8. поддерживать ручной повтор;
9. поддерживать частичный успех;
10. не скрывать ошибки.

---

## 17. План реализации

### MVP-0. Инвентаризация

Определить фактические версии АТС, Bitrix, Jira, 1С, Umnico и GPT API.

### MVP-1. Независимый Call Hub

Регистрировать звонки без Bitrix, Jira, 1С и GPT.

### MVP-2. Запись и Telegram

Получать запись и публиковать карточку звонка.

### MVP-3. Расшифровка и анализ

Добавить speech-to-text и один фиксированный отчёт.

### MVP-4. Function Bus

Добавить универсальные функции и первый адаптер.

### MVP-5. BitrixAdapter

Подключить Bitrix как дополнительного исполнителя.

### MVP-6. JiraAdapter

Подключить Jira как дополнительного исполнителя задач.

### MVP-7. OneCAdapter

Подключить функции 1С с отдельными политиками подтверждения.

### MVP-8. Голосовой BotSpec

Добавить голосовое создание и изменение функций.

### MVP-9. Фабрика

Добавить tenants, каталог ботов, версии, canary, rollback, стоимость и IMPACT.

---

## 18. Критерии приёмки

1. Звонок регистрируется без участия Bitrix.
2. Каждый звонок получает уникальный CallID.
3. Один звонок запускает несколько функций.
4. Bitrix, Jira и 1С подключаются независимо.
5. Новый адаптер не требует изменения Call Core.
6. Ошибка Jira не блокирует Bitrix и Telegram.
7. Повторное событие не создаёт повторные задачи.
8. Статус каждого действия отображается отдельно.
9. Новая конфигурация проходит dry-run.
10. Опасные функции требуют подтверждения.
11. Существует полный Evidence Ledger.
12. Возможен rollback BotSpec.
13. Оригинальная запись неизменна.
14. AI-вывод связан с доказательными фрагментами.
15. GPT не выполняет функции вне политики.
16. Внешние системы отключаются без остановки ядра.
17. Система отображает частичный успех.
18. IMPACT измеряет фактический результат.

---

## 19. Salim/SLM

```text
SLM =
(B × C × E)
× V
× ΔM
× L
× R
× T
× A
```

- **B** — высокая бизнес-польза: одно событие превращается в согласованный набор действий.
- **C** — C3: звонки, персональные данные, CRM и внутренние процессы.
- **E** — E2 сейчас, E4 после пилота, нагрузочных тестов и проверки безопасности.
- **V** — ценность начинается с CALL-001 без строительства всей платформы.
- **ΔM** — до доказательства пилотом равно 1,0; затем определяется по фактической синергии.
- **L** — полный жизненный цикл: проектирование, dry-run, утверждение, эксплуатация и rollback.
- **R** — устойчивость через независимые очереди, адаптеры, retry и DLQ.
- **T** — стоимость владения снижается за счёт общего Function Bus.
- **A** — каждое действие имеет владельца, полномочие, доказательство и ответственного.

---

## 20. Итоговая формула

```text
LOGOS·FABRIC =
Достоверное событие
× Понимание смысла
× Разрешённое решение
× Подключаемая функция
× Независимое исполнение
× Доказанный результат
× Ответственность
```

Финальный принцип:

> Система не исполняет слова напрямую. Она понимает смысл, проверяет право, моделирует последствия, получает подтверждение, выполняет функции и доказывает результат.
