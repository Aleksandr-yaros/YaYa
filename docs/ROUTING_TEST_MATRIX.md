# ЯЯ · Routing Test Matrix

Версия: **1.0.0**
Статус: **approved**
Дата: **2026-08-08**

Каждое изменение маршрутизации должно проходить эти проверки.

| # | Команда | Ожидаемый проект | Ожидаемый маршрут | Результат |
|---|---|---|---|---|
| 1 | `А запомни правило архитектуры` | ЯЯ Реестр | `Aleksandr-yaros/YaYa` | PASS если public-safe |
| 2 | `А запиши договор` | Договоры Ярос | `Aleksandr-yaros/dogovory` | PASS только private |
| 3 | `А запиши скан договора` | Договоры Ярос | `dogovory` legal/scans | PASS только private |
| 4 | `А запиши черновой промпт бота` | Фабрика ботов · черновик | `Aleksandr-yaros/logos-pandre` | PASS |
| 5 | `А выпусти утверждённый промпт` | Фабрика ботов · чистовик | `Aleksandr-yaros/logos-fabric` | PASS после проверки и Commit Boundary |
| 6 | `А запиши КП YaKassa` | YaKassa·WORKSPACE | `Aleksandr-yaros/YaKassa-Workspace` | PASS |
| 7 | `А запиши клиентский скрин CallCenter` | CallCenter | public repo | BLOCK если материал чувствительный |
| 8 | `А запиши возврат платежа` | ЯЯ Оплата | `Aleksandr-yaros/YaYa-Pay` | BLOCKED_BY_REPOSITORY пока repo отсутствует |
| 9 | `А запиши это в Pesochnica` | Pesochnica | explicit-only | PASS только при явном указании пользователя |
| 10 | `А запиши это` без проекта | контекстный проект | CURRENT_PROJECT / ключевые слова | PASS если однозначно |
| 11 | `А запомни это там` после `А покажи YaKassa` | YaKassa·WORKSPACE | YaKassa repo | PASS |
| 12 | `А запомни это там` без CURRENT_PROJECT | неизвестно | нет записи | ASK максимум один вопрос |
| 13 | `А запиши документ` в контексте Фабрики | Фабрика ботов | pandre/fabric по стадии | PASS; слово документ не означает договор |
| 14 | `А запиши фото терминала YaKassa` | YaKassa·WORKSPACE | `assets/images/source/` | PASS |
| 15 | `А запиши рисунок архитектуры Фабрики` | Фабрика ботов | `assets/images/diagrams/` | PASS |
| 16 | `А запиши секретный ключ` | любой | Git | BLOCK; не сохранять секреты |
| 17 | `А запиши это в Dogovora` для договора | Договоры Ярос | public Dogovora | CONFLICT; предложить private `dogovory` |
| 18 | `А достань последнее фото` после проекта CallCenter | CallCenter | текущий проект | PASS |

## Критерий готовности

Изменение маршрутизатора считается принятым, если:

- все PASS-сценарии проходят ожидаемый маршрут;
- BLOCK-сценарии действительно блокируются;
- quarantine не используется автоматически;
- `там/туда` разрешаются только через `CURRENT_PROJECT`;
- запись подтверждается реальным commit SHA.
