# LEVEL GATES — SPIDER

Каждый уровень описывается одинаковым контрактом.

## Паспорт Lx
- **Name**
- **New capability**
- **Difference from L(x-1)**
- **Still NOT allowed from L(x+1)**
- **Owner action**
- **Operator action**
- **Programmer artifact**
- **Visible proof**
- **3–4 mandatory missions**
- **1–2 anti-SALYM missions**
- **Evidence Pack**
- **Acceptance Owner**
- **Status:** LOCKED / TESTING / PASSED / REJECTED

## Правило перехода
L(x-1) -> Lx только если:
1. все mandatory missions = PASS;
2. critical anti-SALYM = 0;
3. evidence существует и читается независимо;
4. tester повторил проверку без помощи разработчика;
5. Acceptance Owner подтвердил read-back.

## Никаких процентов готовности
Запрещённые статусы:
- почти готово;
- 90% L5;
- осталось мелочь;
- визуально уже L5.

Допустимые:
- **L4 PASSED**
- **L5 TESTING**
- **L5 PASSED**

Если хотя бы один обязательный L5-тест FAIL -> текущий достигнутый уровень остаётся L4.

## Мини-миссии
Каждая миссия должна быть выполнима тестировщиком как сценарий:
GIVEN -> ACTION -> EXPECTED -> EVIDENCE -> PASS/FAIL.

## Anti-SALYM
Тестировщик обязан попробовать:
- получить результат более высокого уровня обходным путём;
- вызвать конфликт/старое событие/дубликат;
- отключить зависимость;
- проверить ложноположительный «зелёный» статус.

Цель anti-SALYM: доказать, что система **не притворяется более зрелой, чем она есть**.

## Visual Ladder
Для каждого Lx хранить:
- screenshot-Lx-1.png
- screenshot-Lx.png
- diff-Lx-vs-Lx-1.png

Визуальное доказательство не заменяет поведенческие тесты.
