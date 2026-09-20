# SIP AI OPERATOR — SPIDER LADDER

Это контрольная лестница текущей песочницы. Она не заменяет подробные уровни; она делает их проверяемыми.

| Level | Доказанная способность | Главное отличие |
|---|---|---|
| L1 | Звонок существует как продуктовый объект | не просто SIP/UI |
| L2 | Речь превращается в business intent | не просто transcript |
| L3 | Есть память и Order State | понимает ссылки/коррекции |
| L4 | LIVE + FINAL разделены, Controller защищает state | поздний FINAL не ломает новое |
| L5 | Речь резолвится в реальный каталог/ID | AI не выдумывает товар |
| L6 | Оператор работает заказом и исключениями | transcript вторичен |
| L7 | Dialog Manager предлагает следующий вопрос | AI ведёт незавершённость |
| L8 | Risk Engine ловит опасные ошибки | unsafe error контролируется |
| L9 | Director Pulse показывает потери/причины | не просто KPI-графики |
| L10 | Ошибки превращаются в Golden tests/learning loop | система учится доказуемо |
| L11 | Tenant + canonical model + adapters | второй ресторан без изменения AI Core |
| L12 | Tenant isolation + permissions + audit | доверие/доступ доказуемы |
| L13 | Unit economics измеряются | известна маржа/стоимость заказа |
| L14 | Pilot доказывает value Before/After | продаётся результат, не AI |
| L15 | 3-screen executable 1C 7.7 logic | звонок→история→итог |
| L16 | MVP scope frozen | ONE PERFECT CALL |
| L17 | build order доказуем по checkpoint | этап != слова |
| L18 | Order Controller = sole writer | APPLY/HOLD/REJECT + reason |
| L19 | Event Model стабилен | transcript != event != state |
| L20 | State Machine управляет переходами | status становится правилом |
| L21 | Completeness Engine даёт READY/NOT_READY | tenant rules, blockers |
| L22 | Next Best Question или SILENCE | второе внимание оператора |

## Пример: L3 -> L4
L4 PASSED только если:
1. LIVE и FINAL сохраняются отдельно.
2. Старый FINAL после новой клиентской коррекции не откатывает Order State.
3. Operator-confirmed значение нельзя тихо перезаписать.
4. В истории видны source/timestamp/decision/reason.

ANTI: искусственно задержать FINAL старой фразы. Если заказ откатился — L4 FAIL, команда остаётся L3.

## Пример: L4 -> L5
L5 PASSED только если:
1. фраза маппится на реальный product_id;
2. неизвестный вариант создаёт HOLD/clarification, а не выдумку;
3. unavailable товар не проходит как нормальная строка;
4. POS получает реальный catalog ID.

ANTI: сказать несуществующий товар. Если AI создал product_id/цену сам — L5 FAIL, команда остаётся L4.

## Пример: L7 -> L8
L8 PASSED только если:
1. confidence оценивается на уровне сущности;
2. error cost влияет на решение;
3. high-risk изменение может уйти в HOLD даже при высокой confidence;
4. unsafe error rate считается.

ANTI: подать high-confidence/high-risk конфликт. Если система молча применила — L8 FAIL.

## Пример: L8 -> L9
L9 PASSED только если:
1. директор за 30 секунд видит 3 главные потери;
2. оценка денег явно помечена как estimate;
3. из сигнала есть drill-down до конкретного звонка/evidence;
4. есть next action.

ANTI: скрыть первичное evidence. Если директор видит число без доказательства — L9 FAIL.

## Игровое правило
Тестировщик входит в «комнату Lx» без подсказок разработчика.
Он получает mission cards. Разработчик не объясняет, куда нажать.
Если тестировщик не может воспроизвести доказательство по инструкции — миссия FAIL.
