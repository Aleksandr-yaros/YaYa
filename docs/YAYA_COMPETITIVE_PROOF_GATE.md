# YAYA — Competitive Proof Gate

Статус: **mandatory / public-safe**  
Дата: **2026-08-28**  
Владелец: Александр / Ярос

## Назначение

Перед GO для любой новой функции YAYA, связанной с QR, оплатой, банками, rewards, loyalty, продавцами, партнёрами, дистрибуцией или запуском, обязательно проверить решение по доказанным рыночным принципам.

YAYA определяется как **роутер следующей покупки**, а не как новый обязательный платёжный рельс.

## Конкурентная ДНК

- **Upside** → incremental profit, merchant-funded performance, измерение следующего визита.
- **Fetch** → verified purchase поверх привычных способов оплаты.
- **PAYBACK** → cross-merchant earn/burn и плотная coalition network.
- **Ibotta** → rewards infrastructure и third-party distribution.
- **Cardlytics** → bank-embedded offers и риск partner concentration.
- **ShopBack** → merchant-funded acquisition / performance.
- **Kaspi** → простота UX, но не эталон нейтральной payment architecture.
- **Plenti** → антипример: слабая cross-use, неясная ценность и асимметрия partner economics.

## Семь обязательных gate

1. **Payment-neutrality** — ценность YAYA не должна требовать нового обязательного QR/wallet/payment rail.
2. **Incrementality** — reward должен менять поведение, а не субсидировать неизбежную покупку.
3. **Cross-merchant symmetry** — должен быть понятен funding earn, burn и распределение экономической выгоды.
4. **Merchant ROI** — продавец должен видеть дополнительную маржу/частоту и хотеть повторно финансировать кампанию.
5. **Distribution wedge** — использовать YaKassa, Telemedia, банки и партнёрские поверхности как каналы распространения.
6. **Density-first** — сначала плотная вертикаль/география и частые сценарии, потом широкая сеть.
7. **Surface independence** — YAYA должна уметь стать API/engine внутри чужих приложений, а не зависеть только от собственного app.

## Красные запреты

По умолчанию PIVOT/KILL без отдельного доказательства:

- новый обязательный YAYA QR вместо существующего банковского/ELQR;
- денежный YAYA wallet или обещание «1 ЯЯ = 1 сом» без отдельной юридической проверки;
- обязательная установка приложения до первой пользы;
- одинаковый cashback всем;
- много банков до proof-of-value;
- зависимость от одного банка/якорного партнёра;
- случайная широкая сеть вместо плотного кластера;
- отсутствие holdout/control и incrementality measurement;
- постоянное субсидирование rewards самой YAYA;
- KPI «количество выданных ЯЯ» без repeat, burn и incremental margin.

## Главная метрика

**Incremental Contribution Profit**.

Вспомогательные:
- repeat uplift;
- cross-merchant redemption;
- merchant re-fund;
- reward claim/use;
- offer density/quality.

## Архитектурная формула

`VERIFIED PURCHASE → YAYA ID/CLAIM → ELIGIBILITY → OFFER/REWARD → NEXT PURCHASE → VERIFIED RECEIPT → INCREMENTALITY → MERCHANT ROI`

YAYA не дублирует payment/fiscal rail там, где YaKassa, Telemedia или банк уже дают надёжный verified event.

## Управленческий gate 0–2

Оценивать: payment-neutrality, incrementality, merchant ROI, cross-merchant symmetry, density, distribution, offer supply, partner concentration.

- **GO:** 13–16 и нет нуля в Payment-neutrality / Incrementality / Merchant ROI.
- **PIVOT:** 9–12 или любой критический ноль.
- **KILL / STOP SCALE:** ≤8 или отрицательная incremental margin.

Это внутренний gate YAYA, а не отраслевой стандарт.

## Обязательный выход Мудреца

Для стратегических решений показывать четыре формы:
1. визуальную карту потока;
2. сравнительную таблицу аналогов;
3. красно-зелёное дерево GO/PIVOT/KILL;
4. исполнимый чек-лист следующих действий и метрик.
