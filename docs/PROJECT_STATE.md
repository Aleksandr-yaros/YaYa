# Текущее состояние проекта ЯЯ

Дата обновления: **2026-08-05**  
Компания: **«Ярос»**

## Главное обращение

- коротко: **`ЯЯ`**;
- полное имя: **`ЯЯ·ФАБРИКА`**;
- постоянный паспорт: `docs/YAYA_FACTORY_V10_4_PROJECT_MEMORY.md`.

## Текущая версия фабрики

### ЯЯ·ФАБРИКА v10.4

Статус: `ready-for-product-review / synthetic-only`  
Назначение: единая фабрика цифровых сотрудников с тремя визуальными режимами и общим HTML-входом.  
Паспорт: `docs/YAYA_FACTORY_V10_4_PROJECT_MEMORY.md`.

Реализовано в визуальном контуре:

- единый продуктовый бриз;
- 24 функциональных экрана;
- общий переключатель тем;
- 1С 8.3 Classic;
- ГАУХАР Light;
- Director Dark;
- Evolution 7×7;
- AI Usage & Billing;
- Evidence Ledger;
- Simulation Lab и Commit Boundary;
- IMPACT и SLM;
- synthetic-only demo boundary.

### LOGOS·FABRIC v10

Статус: `approved architecture`  
Назначение: событийное и функциональное ядро фабрики.  
Канонический файл: `docs/LOGOS_FABRIC_V10_FUNCTION_ARCHITECTURE.md`.

### LOGOS_ЦЕНТР · 1С 8.3

Статус: `target control center`  
Назначение: бизнес-объекты, документы, подтверждения, Evidence, IMPACT и закрытие биллинга.

### ЯЯ v2.1.0 Double Proof

Статус: `approved`  
Назначение: отдельная продуктовая линия платежей/ePOS.  
Она не используется как номер версии фабрики цифровых сотрудников.

## Единый дух

> **Ответственное усиление.** Каждое значимое действие цифрового сотрудника имеет владельца-человека, стоимость, Evidence и возможность rollback.

## Каноническая структура

```text
«Ярос»
→ ЯЯ·ФАБРИКА v10.4
→ Laravel Control Plane
→ LOGOS·FABRIC
→ LOGOS_ЦЕНТР · 1С 8.3
→ цифровые сотрудники
→ Evolution 7×7
→ Function Bus и адаптеры
→ Evidence Ledger
→ AI Usage & Billing
→ IMPACT / SLM
```

## Текущий эталон CALL-001

```text
реальный звонок
→ Laravel Event Gateway
→ LOGOS_ЦЕНТР · 1С 8.3
→ запись и хеш
→ STT / AI без права самовыполнения
→ Policy / RBAC / ABAC
→ ActionInstance
→ очередь и адаптеры
→ UsageEvent
→ Evidence Ledger
→ IMPACT
```

## Текущий уровень

- класс воздействия: `C3`;
- доказательность: `E2`;
- целевая доказательность: `E4`;
- ΔM до подтверждённого пилота: `1,0`.

## Граница реализации

Реализованный v10.4 — автономный HTML-прототип. Он не является промышленным Laravel-приложением или поставкой конфигурации 1С и не подключается к живым SIP, CRM, AI API или платежам.

## Незавершённые блоки

- выбор основного публичного визуального режима;
- публикация по постоянным URL;
- Laravel Control Plane;
- метаданные и управляемые формы 1С;
- промышленный Event Gateway;
- реальные адаптеры;
- security review и threat model;
- controlled pilot CALL-001;
- доказанный IMPACT, TCO и E4.

## Следующий лучший шаг

Провести продуктовый просмотр трёх HTML-версий, выбрать основную оболочку и начать controlled implementation маршрута CALL-001 на Laravel + 1С 8.3.
