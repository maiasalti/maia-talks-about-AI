# Research Notes — The Idiot Index of Tokens

**Facts and sources only. No narrative.** Maia writes the article prose (Claude drafts a
full first pass per this session's agreed workflow, Maia edits/rewrites).
Researched 2026-07-07 via parallel web research of primary sources (official pricing
pages + Wayback Machine snapshots wherever a live page no longer shows historical
prices). Every number carries a confidence flag: **SOLID** (primary doc / official
page, or multiple independent primary sources agree) · **CONTESTED** (analyst
estimate, secondary source, or inferred) · **UNVERIFIED** (rumor / leak / no
corroboration found).

> **Framing note:** Musk's Idiot Index = price paid for a finished part ÷ cost of its
> raw materials. The AI analogue we're using: **price per token charged by an API ÷
> estimated marginal compute cost to generate that token** (GPU-time + electricity,
> NOT training/R&D cost — the "raw material," not the "R&D that built the factory").
> This denominator is the single most uncertain number in the whole piece — see
> Section B. Treat the resulting ratios as order-of-magnitude, not precise, and say so
> in the piece.

---

## A. Musk's "Idiot Index" — origin & definition

- **Definition (verbatim, SOLID):** *"the ratio of finished-product cost to raw
  materials—the idiot index—is high, you're an idiot."* — Walter Isaacson, *Elon
  Musk* (2023), consistently and identically reproduced across many independent
  secondary sources quoting the same passage.
  Sources: https://x.com/josephcwells/status/1745803569540813056 ·
  https://grahammann.net/book-notes/elon-musk-walter-isaacson ·
  https://substack.exponentialindustry.com/p/ratio-of-finished-cost-to-material-cost-musk

- **NOT from Tim Urban / Wait But Why (SOLID negative finding).** Directly fetched
  both WBW SpaceX pieces ("The Cook and the Chef," "How (and Why) SpaceX Will
  Colonize Mars") — neither contains "idiot index." The coinage traces to Isaacson's
  2023 biography.
  Sources: https://waitbutwhy.com/2015/11/the-cook-and-the-chef-musks-secret-sauce.html ·
  https://waitbutwhy.com/2015/08/how-and-why-spacex-will-colonize-mars.html/3

- **Origin story (SOLID, corroborated across two independent 2015/2023 sources):**
  After a 2001–02 trip to Russia (to buy ICBMs for a Mars mission — the trip failed),
  Musk calculated that a rocket's raw materials (aluminum, titanium, copper, carbon
  fiber) were only **~2% of the finished rocket's price** — this first-principles
  calculation is what led him to found SpaceX and build in-house rather than buy.
  Source: https://waitbutwhy.com/2015/08/how-and-why-spacex-will-colonize-mars.html/3

- **Concrete example — Raptor engine "half nozzle jacket" (CONTESTED — could not
  verify against the book text directly, only against multiple independent secondary
  summaries that agree on the specifics):** SpaceX analyst Lucas Hughes quoted Musk a
  price of ~$13,000 for a part; Musk: *"It's just steel. It's about two hundred
  bucks."* (~65:1 ratio). Musk reportedly told his team: *"If you ever come into a
  meeting and do not know what are the idiot parts, then your resignation will be
  accepted immediately."* Stated goal: cut Raptor engine cost from $2M to $200K in 12
  months.
  Sources: https://www.cfosecrets.io/p/elon-musk-tesla-cfo ·
  https://manassaloi.com/booksummaries/2023/10/12/musk-isaacson.html ·
  https://www.webpronews.com/elon-musk-unveils-spacexs-idiot-index-for-mars-mission/

- **Other in-house-part examples (CONTESTED, same limitation as above):** a valve
  quoted externally at $250,000, built in-house for a fraction of the price; an
  actuator quoted at $120,000, built by an engineer for $5,000 ("no more complex than
  a garage door opener"); a NASA-style latch at $1,500 replaced with a $30
  bathroom-stall-hardware equivalent.
  Source: https://grahammann.net/book-notes/elon-musk-walter-isaacson

- **No verified numeric threshold rule exists (UNVERIFIED / likely doesn't exist).**
  The "10x = build it yourself" framing that circulates online is an illustrative
  device used by summarizers of the book, not a direct Musk quote with a stated
  cutoff. Don't attribute a hard number to Musk himself.

- **Beyond SpaceX (CONTESTED):** Tesla's gigacasting (replacing ~400 stamped/welded
  parts with one die-cast underbody piece) is framed in secondary Isaacson summaries
  as idiot-index-driven. No sourced, specific idiot-index example found for Boring
  Company or xAI — only generic unsupported claims.
  Source: https://substack.exponentialindustry.com/p/ratio-of-finished-cost-to-material-cost-musk

---

## B. LLM inference marginal cost — the denominator (hardest, most important section)

**No source publishes a single, transparent, non-paywalled bottom-up $/token figure
for a named current frontier model.** Treat every number below as one component of an
estimate, not a finished answer. State the methodology explicitly in the piece.

### Core formula (SOLID, consistent across NVIDIA/SemiAnalysis/academic sources)
`$/M tokens = [GPU $/hr ÷ utilization] ÷ (tokens/sec/GPU × 3600) × 1,000,000`

Most rigorous public first-principles version: Epoch AI (Ege Erdil), open-sourced,
handles MoE, prefill vs. decode, defines a critical/optimal batch size beyond which
larger batches stop reducing cost/token. https://arxiv.org/html/2506.04645v1 (Jun 2025)

### The single largest lever: utilization / batching (SOLID)
- Inference **decode-phase** MFU (model FLOP utilization) can be as low as **~1% at
  batch size 1** (severely memory-bandwidth-bound) vs. ~50% for training/prefill —
  batch-1 vs. batch-256 can differ **~100x** in cost/M-tokens on identical H100
  hardware. Source: Sardana et al., "Beyond Chinchilla-Optimal,"
  https://arxiv.org/abs/2401.00448 (2024)
- A 2026 arXiv paper on concurrency-aware pricing found Mixtral 8x7B on H100 costs
  **$15.25/M output tokens at 1 req/sec (idle)** vs. **$0.31/M at saturation
  (100+ rps)** — a **17.5–36.3x** spread from load alone.
  Source: https://arxiv.org/html/2606.11690 (Jun 2026)
- **Any idiot-index number needs an explicit utilization assumption stated, or it's
  not comparable across eras/models.**

### GPU-hour cost components (SOLID, itemized academic model)
"Beyond Benchmarks" (arXiv:2510.26136, 2025) A800-80GB worked example: depreciation
$0.64/hr + power $0.08/hr + maintenance $0.06/hr ≈ **$0.79/hr total** (range
$0.51–$0.99/hr). PUE assumption 1.3–1.5 (best-in-class hyperscale ~1.1–1.2; global
average ~1.5–1.6). US electricity baseline ~$0.07–0.14/kWh depending on region/source.

### GPU depreciation — the second-largest swing factor (CONTESTED, live industry
debate)
Hyperscalers use ~5–6yr depreciation (accounting standard); skeptics (Michael Burry
and others) argue true economic life is 2–3yr given NVIDIA's annual cadence — this
alone can swing the cost denominator **~2x**. Amazon cut 6→5yr (Jan 2025, took a
$700M hit); Meta extended 4.0→5.5yr the same quarter (booked a $2.9B expense
reduction) — i.e., the two largest hyperscalers moved in opposite directions on the
same input. Source: https://www.cnbc.com/2025/11/14/ai-gpu-depreciation-coreweave-nvidia-michael-burry.html (Nov 2025)

### Dated cost-per-token anchor points (use these as the "raw material cost" line)
| Era | Estimate | Basis | Confidence |
|---|---|---|---|
| GPT-3 on V100, 2020 | ~$0.82/M tokens (vs. $80/M launch price → ~55–60x ratio) | single blogger Fermi estimate | UNVERIFIED |
| GPT-3.5/GPT-4 on 128×A100, Jul 2023 | **~$4.90/M tokens** | SemiAnalysis — the most independently corroborated compute-cost figure in the whole research set; H100 roughly halves it (~$2.45/M) | **SOLID** — good default anchor if the piece needs one clean number for the "GPT-4 era" |
| GPT-OSS-120B on H100, 2025 | ~$0.09–0.26/M (load-dependent) | NVIDIA/SemiAnalysis InferenceX benchmark | SOLID (vendor-adjacent) |
| GPT-OSS-120B on B200, 2025 | ~$0.02–0.04/M (~4.5x cheaper than H100) | same | SOLID (vendor-adjacent) |
| DeepSeek R1 on GB200 NVL72, 2025-2026 | $0.08–$2.11/M depending on throughput/latency target | SemiAnalysis InferenceX | SOLID |
| DeepSeek R1, NVIDIA's own H200 worked example | $4.20/M (H200) vs. $0.12/M (GB300 NVL72, ~35x cheaper) | NVIDIA blog, Apr 2026 — vendor-interested, cross-check against InferenceX (lower) | SOLID (vendor) |
| DeepSeek's own disclosed inference economics | H800 @ $2/GPU-hr → $87,072/day cost vs. $562,027/day theoretical revenue at list price → **~6.45x "cost-profit ratio,"** explicitly labeled theoretical by DeepSeek itself | DeepSeek disclosure, Feb–Mar 2025 | SOLID (disclosure) / the 545% headline number itself is explicitly caveated as unverifiable by named analysts (Neil Shah/Counterpoint, Hyoun Park/Amalgam) |

### Published margin/ratio commentary (two live, disagreeing camps — present as a real
dispute, not settled fact)

**Camp A — ratio compressing toward 1 (price catching down to cost):**
- a16z "LLMflation": iso-quality price fell **~10x/year** (2021–2024); Epoch AI: iso-
  performance price fell median **50x/year**, accelerating to ~200x/year post-Jan
  2024. Epoch explicitly tested whether this was margin-cutting and found **no clear
  evidence of margin compression** — i.e., most of the drop is real cost decline, not
  lower markups. Sources: https://a16z.com/llmflation-llm-inference-cost/ (Nov 2024) ·
  https://epoch.ai/data-insights/llm-inference-price-trends (Mar 2025)
- Important counter-detail from the same a16z piece: OpenAI's o1 (2024) cost the
  **same $60/M output tokens as GPT-3 did at its Nov 2021 price** — frontier-tier
  pricing hasn't compressed even as commodity-tier pricing collapsed.

**Camp B — ratio expanding at the provider-P&L level (frontier labs gaining pricing
power, not losing it):**
- SemiAnalysis: Anthropic's **inference-specific gross margin** rose from ~38% (2025)
  to "mid-60s%, at least 72%" (mid-2026), driven substantially by AWS Trainium's
  ~35–40% cost advantage per FLOP vs. Azure H100.
  Source: https://newsletter.semianalysis.com/p/anthropic-growth-and-bedrock-mix (May 2026)
- SemiAnalysis: OpenAI's "compute margin" (revenue net of server costs) reportedly
  rose from ~35% (Jan 2024) to ~70% (Oct 2025) even as list prices fell — frontier
  labs retain pricing power vs. open-weight competitors even after cutting list price
  (e.g. Claude Opus 4.5 cut 67%, $15/$75→$5/$25, while margin still rose per this
  claim). Source: https://newsletter.semianalysis.com/p/ai-value-capture-the-shift-to-model (2026)

**Reconciling point (both camps effectively agree on this — good synthesis line for
the piece):** falling list price for a *fixed model* doesn't imply a falling
price/cost *ratio* — hardware + algorithmic efficiency can cut the denominator faster
than the numerator falls (ratio widens, Camp B), while commodity-tier models
simultaneously get squeezed toward cost by open-weight competition (Camp A). Both
are true at once, for different tiers of model. Source (synthesis point directly
attributable): https://epoch.ai/gradient-updates/how-persistent-is-the-inference-cost-burden

### Real-world margin figures, for context/color (mixed confidence — cite basis every
time)
- OpenAI 2025 full year: $13.07B revenue vs. $34B total costs (fully loaded,
  R&D/stock-comp included — NOT inference-only), net loss $38.53B.
  Source (leaked docs, widely corroborated): https://www.wheresyoured.at/where-is-openais-money-going/ (Nov 2025)
- Sam Altman, on record: *"We're profitable on inference... If we didn't pay for
  training, we'd be a very profitable company."* (Aug 2025) — directionally disputed
  by full-accrual-accounting critics (Ed Zitron et al.).
  Source: https://www.axios.com/2025/08/15/sam-altman-gpt5-launch-chatgpt-future
- Anthropic 2025: inference costs ~$2.7B (up >3x YoY) vs. training ~$4.1B vs. revenue
  ~$4.5B (up ~12x from $381M in 2024); overall company gross margin ~–94% (2024) →
  ~40% (2025). Source (paywalled primary, widely cross-cited):
  https://www.theinformation.com/articles/anthropic-lowers-profit-margin-projection-revenue-skyrockets
- **Cautionary tale, worth citing as "how not to do this":** an independent blogger's
  "napkin math" claiming 80–95%+ API gross margins was challenged by an HN commenter
  who found the throughput assumptions ~7x off from real GPU capacity — a good
  illustration of how easy it is to badly misestimate this ratio without insider
  data. Source: https://martinalderson.com/posts/are-openai-and-anthropic-really-losing-money-on-inference/ (Aug 2025);
  critique: https://news.ycombinator.com/item?id=45050415

---

## C. Pricing history — OpenAI

All $/1M tokens (originally-per-1K prices ×1000 for consistency). openai.com's own
pricing/blog pages 403 automated fetches, so most points are sourced via Wayback
Machine snapshots of the live pricing page, cross-checked against announcement text
and developers.openai.com/api/docs (OpenAI's current docs host).

| Model | Release | Input $/1M | Output $/1M | Notes | Confidence |
|---|---|---|---|---|---|
| GPT-3 API (private beta) | 2020-06-11 | no public price | — | | SOLID (no price published) |
| Davinci (GA) | ~2021-11-18 | $60.00 | $60.00 (blended, single price) | Ada $0.80, Babbage $1.20, Curie $6.00 at same time | SOLID |
| Davinci (price cut) | 2022-09-01 | **$20.00** | $20.00 | −67%; Ada→$0.40, Babbage→$0.50, Curie→$2.00 | SOLID |
| GPT-3 Completions family | deprecated 2024-01-04 | last price $20.00 | — | | SOLID |
| gpt-3.5-turbo (launch) | 2023-03-01 | $2.00 (blended) | $2.00 (blended) | | SOLID |
| gpt-3.5-turbo-0613 | 2023-06-13 | $1.50 | $2.00 | | SOLID |
| gpt-3.5-turbo-1106 | 2023-11-06 | $1.00 | $2.00 | | SOLID |
| gpt-3.5-turbo-0125 | 2024-01-25 | $0.50 | $1.50 | last GPT-3.5-turbo price | SOLID |
| **gpt-4 / gpt-4-0314 (8K)** | 2023-03-14 | **$30.00** | **$60.00** | 32K tier: $60/$120 | SOLID |
| gpt-4-1106-preview (Turbo, 128K) | 2023-11-06 | $10.00 | $30.00 | −67% input / −50% output vs. base GPT-4 | SOLID |
| gpt-4-turbo (GA) | 2024-04-09 | $10.00 (unchanged) | $30.00 (unchanged) | deprecated 2026-10-23 → gpt-5.5 | SOLID |
| gpt-4o-2024-05-13 (launch) | 2024-05-13 | $5.00 | $15.00 | back-calculated from official Aug 2024 post's "50%/33% lower" framing | SOLID |
| **gpt-4o-2024-08-06 (price cut)** | 2024-08-06 | **$2.50** | **$10.00** | −50% input / −33% output; unchanged since (still current 2026-07-07) | SOLID |
| gpt-4o-mini | 2024-07-18 | $0.15 | $0.60 | unchanged since (still current 2026-07-07) | SOLID |
| gpt-4.1 / mini / nano | 2025-04-14 | $2.00 / $0.40 / $0.10 | $8.00 / $1.60 / $0.40 | | SOLID |
| **o1-preview** | 2024-09-12 | **$15.00** | **$60.00** | same $/M as GPT-3's Nov-2021 launch price, 3 years later | SOLID |
| o1-mini | 2024-09-12 | $3.00 | $12.00 | | SOLID |
| o1 (full) | 2024-12-17 | $15.00 (unchanged from preview) | $60.00 (unchanged) | cached input $7.50 (new) | SOLID |
| o3-mini | 2025-01-31 | $1.10 | $4.40 | cached $0.55 | SOLID |
| o3 (launch) | 2025-04-16 | $10.00 | $40.00 | cached $2.50 | SOLID |
| **o3 (80% price cut)** | 2025-06-10 | **$2.00** | **$8.00** | cached $0.50 — one of the single largest cut events in the whole dataset | SOLID |
| o4-mini | 2025-04-16 | $1.10 | $4.40 | cached $0.275 | SOLID |
| **gpt-5** | 2025-08-07 | **$1.25** | **$10.00** | cached $0.125; mini $0.25/$2.00; nano $0.05/$0.40 — priced low enough that TechCrunch/Simon Willison both framed it as a price-war move | SOLID |
| gpt-5.1 | 2025-11-12/13 | $1.25 (unchanged) | $10.00 (unchanged) | | SOLID |
| gpt-5.2 | 2025-12-11 | $1.75 | $14.00 | cached $0.175; some low-quality aggregators report half this ($0.875/$7.00) — re-verified directly against live OpenAI docs + llm-stats.com, both confirm $1.75/$14.00 | SOLID (re-verified) |
| gpt-5.3-codex | 2026-02-05 | $1.75 | $14.00 | | SOLID |
| gpt-5.4 | 2026-03-05 | $2.50 | $15.00 | mini $0.75/$4.50, nano $0.20/$1.25, pro $30/$180 | SOLID |
| **gpt-5.5** | 2026-04-23 | **$5.00** | **$30.00** | cached $0.50; pro tier $30/$180 — **current standard flagship as of 2026-07-07** | SOLID |
| gpt-5.6 Sol/Terra/Luna | announced 2026-06-26 | $5.00 / $2.50 / $1.00 | $30.00 / $15.00 / $6.00 | **preview-only, ~20 partner orgs, not GA, not on live pricing page** — announced/real but not yet a market price point | CONTESTED — treat as "announced," not a chartable current price |

**Current flagship snapshot (2026-07-07, live pricing page):** gpt-5.5 $5.00/$30.00 ·
gpt-5.5-pro $30.00/$180.00 · gpt-5.4 $2.50/$15.00.

**Notable pattern for the piece:** o1-preview (Sept 2024) launched at **exactly the
same $15/$60 per M as GPT-3's Nov 2021 price** — three years apart, frontier-tier
price held flat even as commodity-tier price (GPT-3.5-turbo, GPT-4o-mini) fell by
orders of magnitude in the same window. This is the OpenAI data point that most
directly mirrors a16z's cross-company "LLMflation" finding in Section B.

Sources (primary): developers.openai.com/api/docs/pricing · developers.openai.com/api/docs/models/* ·
developers.openai.com/api/docs/deprecations · openai.com/index/* announcement posts ·
Wayback Machine snapshots of openai.com/api/pricing and openai.com/pricing (2020–2025,
~20 dated snapshots).

**Gaps to flag in the post:** GPT-3 beta-era engine pricing (Oct 2020–Nov 2021) has no
recoverable primary source (page was JS-rendered, never archived with data). GPT-5 Pro
and GPT-5.2 Pro pricing rest on thin aggregator sourcing only.

---

## D. Pricing history — Anthropic (Claude)

All prices $/1M tokens, standard/first-party API, base tier (no cache/batch/fast-mode
modifiers unless noted).

| Model | Release | Input $/1M (launch) | Output $/1M (launch) | Notes | Confidence |
|---|---|---|---|---|---|
| Claude 1 / 1.0–1.3 | 2023-03-14 | $11.02 | $32.68 | retired 2024-11-06 | SOLID |
| Claude Instant 1.0 | 2023-03-14 | $1.63 | $5.51 | retired 2024-11-06 | SOLID |
| Claude Instant 1.1/1.2 | ~2023-05 / 2023-08-09 | $1.63 | $5.51 | cut to $0.80/$2.40 by Dec 2023 | SOLID |
| Claude 2.0 | 2023-07-11 | $11.02 | $32.68 | cut to $8.00/$24.00 by Nov 2023 | SOLID |
| Claude 2.1 | 2023-11-21 | $8.00 | $24.00 | retired 2025-07-21 | SOLID |
| Claude 3 Haiku | 2024-03-04/13 | $0.25 | $1.25 | unchanged for life; retired 2026-04-20 | SOLID |
| Claude 3 Sonnet | 2024-03-04 | $3.00 | $15.00 | unchanged; retired 2025-07-21 | SOLID |
| Claude 3 Opus | 2024-03-04 | $15.00 | $75.00 | unchanged; retired 2026-01-05 (kept alive via research carve-out) | SOLID |
| Claude 3.5 Sonnet (orig) | 2024-06-21 | $3.00 | $15.00 | retired 2025-10-28 | SOLID |
| Claude 3.5 Sonnet (v2) | 2024-10-22 | $3.00 | $15.00 | same price as predecessor per Anthropic | SOLID |
| Claude 3.5 Haiku | 2024-10-22 announce / 2024-11-04 GA | $1.00 | $5.00 | **cut ~20% to $0.80/$4.00 ~Dec 3–5, 2024** — current docs show only revised price | CONTESTED (launch price vs. current-docs price) |
| Claude 3.7 Sonnet | 2025-02-24 | $3.00 | $15.00 | unchanged | SOLID |
| Claude Opus 4 | 2025-05-22 | $15.00 | $75.00 | unchanged; retired 2026-06-15 | SOLID |
| Claude Sonnet 4 | 2025-05-22 | $3.00 (≤200K) | $15.00 (≤200K) | 1M-context tier added Aug 2025: $6/$22.50 for >200K portion | SOLID |
| Claude Opus 4.1 | 2025-08-05 | $15.00 | $75.00 | unchanged; deprecated 2026-06-05 | SOLID |
| Claude Sonnet 4.5 | 2025-09-29 | $3.00 | $15.00 | active | SOLID |
| Claude Haiku 4.5 | 2025-10-15 | $1.00 | $5.00 | active | SOLID |
| **Claude Opus 4.5** | 2025-11-24 | **$5.00** | **$25.00** | **−67% vs. Opus 4.1** ($15/$75→$5/$25) — biggest single price-cut event in the whole Anthropic history | SOLID |
| Claude Opus 4.6 | 2026-02-05 | $5.00 | $25.00 | unchanged | SOLID |
| Claude Sonnet 4.6 | 2026-02-17 | $3.00 | $15.00 | unchanged; still uses pre-inflation tokenizer | SOLID |
| Claude Opus 4.7 | 2026-04-16 | $5.00 (nominal) | $25.00 (nominal) | new tokenizer → ~30% more tokens for same text = effective cost increase despite flat nominal rate | SOLID |
| **Claude Opus 4.8** | 2026-05-28 | $5.00 | $25.00 | **current top standard Opus tier** | SOLID |
| **Claude Sonnet 5** | 2026-06-30 | $2.00 (intro, thru Aug 31 2026) | $10.00 (intro) | rises to $3/$15 on 2026-09-01 (scheduled) | SOLID |
| Claude Fable 5 | 2026-06-09 | $10.00 | $50.00 | **current overall flagship**; briefly suspended 2026-06-12–07-01 by US export-control order (unrelated to price), restored | SOLID |
| Claude Mythos 5 | 2026-06-09 | $10.00 | $50.00 | gated (vetted cyberdefense partners); same suspension/restoration | SOLID |

**Key inflection points for the chart:** Claude 1→2.1 (~$11→$8 in, ~$33→$24 out, late
2023); Claude Opus 4.1→4.5 (Nov 2025, $15/$75→$5/$25, **−67%**); Sonnet 4.6→Sonnet 5
(Jun 2026, $3/$15→$2/$10 introductory).

Sources (primary): https://platform.claude.com/docs/en/about-claude/pricing ·
https://www.anthropic.com/news/[claude-2, claude-3-family, claude-3-5-sonnet,
3-5-models-and-computer-use, claude-3-7-sonnet, claude-4, claude-opus-4-1,
claude-sonnet-4-5, claude-haiku-4-5, claude-opus-4-5, claude-opus-4-6,
claude-sonnet-4-6, claude-opus-4-7, claude-opus-4-8, claude-sonnet-5,
claude-fable-5-mythos-5] · Wayback snapshots of anthropic.com/pricing and
www-files.anthropic.com pricing PDFs (2023).

---

## E. Pricing history — Google Gemini

All $/1M tokens unless noted (Gemini 1.0 Pro launched on **per-1M-characters**
billing, not tokens — flag this explicitly, don't silently convert).

| Model | Release | Input $/1M (tier) | Output $/1M (tier) | Notes | Confidence |
|---|---|---|---|---|---|
| Gemini 1.0 Pro (launch) | 2023-12-13 | $0.125/1M chars | $0.375/1M chars | character-billed, not token-billed | SOLID (price) / CONTESTED (exact launch-day snapshot — iframe not archived) |
| Gemini 1.0 Pro (token billing) | by 2024-04-15 | $0.50 flat | $1.50 flat | unchanged through Jan 2025; retired ~2025-02-15 | SOLID |
| Gemini 1.0 Ultra | GA Feb 2024 | **no public per-token API price ever published** — only bundled in $19.99/mo consumer subscription | — | third-party aggregators quoting $0.50/$1.50 are likely erroneous (absent from two archived official Vertex snapshots) | CONTESTED — omit from chart or flag "no API price" |
| Gemini 1.5 Pro (GA) | 2024-05-30 | $3.50 (≤128K) / $7.00 (>128K) | $10.50 (≤128K) / $21.00 (>128K) | | SOLID |
| **Gemini 1.5 Pro (price cut)** | 2024-10-01 | **$1.25 (≤128K) / $2.50 (>128K)** | **$5.00 (≤128K) / $10.00 (>128K)** | **−64% input / −52% output** | SOLID |
| Gemini 1.5 Flash (GA) | 2024-05-30 | $0.35 (≤128K) / $0.70 (>128K) | $1.05 (≤128K) / $2.10 (>128K) | | SOLID |
| **Gemini 1.5 Flash (price cut)** | 2024-08-12 | **$0.075 (≤128K) / $0.15 (>128K)** | **$0.30 (≤128K) / $0.60 (>128K)** | **−78% input / −71% output** | SOLID |
| Gemini 1.5 Flash-8B | 2024-10-03 | $0.0375 (≤128K) / $0.075 (>128K) | $0.15 (≤128K) / $0.30 (>128K) | cheapest Google model ever at launch | SOLID |
| Gemini 2.0 Flash (GA) | ~2025-02-05 | $0.10 (flat, no context tier) | $0.40 (flat) | unchanged for entire lifespan; shut down 2026-06-01 | SOLID |
| Gemini 2.0 Flash-Lite (GA) | 2025-02-25 | $0.075 flat | $0.30 flat | unchanged for life; shut down 2026-06-01 | SOLID |
| Gemini 2.5 Pro (preview→GA, price never changed) | 2025-04-04 → GA 2025-06-17 | $1.25 (≤200K) / $2.50 (>200K) | $10.00 (≤200K) / $15.00 (>200K), incl. thinking | **one of the only Gemini prices that has never moved**, still current 2026-07-07 | SOLID |
| Gemini 2.5 Flash (GA) | 2025-06-17 | $0.30 (text) / $1.00 (audio) | $2.50 flat (incl. thinking) | net effect vs. preview: input price doubled, output simplified/cut | SOLID |
| Gemini 2.5 Flash-Lite (GA) | 2025-07-22 | $0.10 (text) / $0.30 (audio) | $0.40 | still current 2026-07-07 | SOLID |
| Gemini 3 Pro Preview | 2025-11-18/20 | $2.00 (≤200K) / $4.00 (>200K) | $12.00 (≤200K) / $18.00 (>200K) | shut down 2026-03-09, superseded by 3.1 Pro at same price | SOLID |
| Gemini 3 Flash Preview | ~2026-01-01 | $0.50 (text) / $1.00 (audio) | $3.00 | still current | SOLID |
| Gemini 3.1 Pro Preview | 2026-02-19 | $2.00 (≤200K) / $4.00 (>200K) | $12.00 (≤200K) / $18.00 (>200K) | identical price to 3 Pro Preview | SOLID |
| Gemini 3.1 Flash-Lite | preview 2026-03-03 → GA 2026-05-07 | $0.25 (text) / $0.50 (audio) | $1.50 | | SOLID |
| **Gemini 3.5 Flash (GA)** | 2026-05-19 | **$1.50 flat** | **$9.00 (incl. thinking)** | **current flagship-tier price as of 2026-07-07** | SOLID |
| Gemini 3.5 Pro | announced 2026-05-19 | **not yet GA / no published price as of 2026-07-07** | — | do not plot | SOLID (negative finding — not yet shipped) |

**Current snapshot (2026-07-07):** Gemini 3.5 Flash ($1.50/$9.00) and Gemini 3.1 Pro
Preview ($2–4/$12–18) are the current top tier (3.5 Pro not yet shipped).

Sources (primary): https://ai.google.dev/gemini-api/docs/pricing · official
developers.googleblog.com and blog.google announcement posts per model · Wayback
Machine snapshots of ai.google.dev/pricing and ai.google.dev/gemini-api/docs/pricing
(~25 dated snapshots, Dec 2023–Jul 2026) and cloud.google.com/vertex-ai pricing.

---

## F. Pricing history — DeepSeek

All $/1M tokens; DeepSeek is the only company here that publicly splits input pricing
into cache-hit vs. cache-miss.

| Model | Event / Date | Input (cache hit) | Input (cache miss) | Output | Notes | Confidence |
|---|---|---|---|---|---|---|
| DeepSeek-V2 | 2024-05-07 | — | $0.14 | $0.28 | ignited China's AI price war | CONTESTED — no archived official page recovered, but consistent across trackers |
| DeepSeek-V3 (launch) | 2024-12-26 | — | (same as V2, per official announcement) | (same as V2) | | SOLID |
| DeepSeek-V3 (step-up) | 2025-02-08 | $0.07 | $0.27 | $1.10 | | SOLID |
| DeepSeek-R1 (launch) | 2025-01-20 | $0.14 | $0.55 | $2.19 | first official cache-hit/miss split | SOLID |
| Off-peak discount scheme | announced 2025-02-26 | V3: 50% off; R1: 75% off, window 16:30–00:30 UTC daily | | | SOLID (official + Bloomberg corroboration) |
| Off-peak discount ends / unified pricing | 2025-09-05 | $0.07 | $0.56 | $1.68 | | date SOLID, $ figures CONTESTED (secondary) |
| **DeepSeek-V3.2-Exp** | 2025-09-29 | **$0.028** | $0.28 | $0.42 | official "prices drop 50%+" claim | date/claim SOLID, exact $ CONTESTED |
| DeepSeek-V3.2 (full release) | 2025-12-01 | same as V3.2-Exp | | | | CONTESTED (inferred, no restated figures found) |
| DeepSeek-V4 Preview (Flash) | 2026-04-24 | ~$0.028 | $0.14 | $0.28 | | date/model SOLID, cache-hit $ CONTESTED |
| DeepSeek-V4 Preview (Pro) | 2026-04-24 | ~$0.0145 | $1.74 | $3.48 | launch list price (before discount) | date/model SOLID, $ CONTESTED (secondary, widely corroborated) |
| V4-Pro 75% promo discount | shortly after launch, expiring 2026-05-31 | $0.003625 | $0.435 | $0.87 | | CONTESTED (secondary, widely corroborated) |
| **V4-Pro discount made permanent** | 2026-05-22/23 | $0.003625 | $0.435 | $0.87 | | CONTESTED (secondary) |
| **Current — DeepSeek-V4-Flash** | live 2026-07-07 | $0.0028 | $0.14 | $0.28 | fetched live today | SOLID |
| **Current — DeepSeek-V4-Pro** | live 2026-07-07 | $0.003625 | $0.435 | $0.87 | fetched live today | SOLID |
| Peak/off-peak surge pricing | confirmed 2026-06-29, effective "mid-July 2026" (not yet live as of 2026-07-07) | 2x standard rate, 09:00–12:00 & 14:00–18:00 Beijing time | | | first-ever time-of-day surge pricing on a frontier LLM API | existence SOLID, exact $ table CONTESTED |

Sources (primary): api-docs.deepseek.com/quick_start/pricing ·
api-docs.deepseek.com/news/[news1226, news250120, news250821, news250929, news251201,
news260424] · x.com/deepseek_ai official announcement tweets. Secondary corroboration:
Bloomberg, VentureBeat, TheNextWeb, SCMP, Engadget.

**Gap to flag in the post:** DeepSeek-V2's exact original price has no recoverable
official/archived primary source (only cross-tracker agreement).

---

## PROPOSED CHART DATA (draft — refine once OpenAI section is filled in)

### Chart 1 — Price-per-token evolution over time, one line per company
Log-scale Y axis ($/M output tokens), X axis = time (Dec 2023–Jul 2026, extend back to
2020 once OpenAI data lands). Plot the flagship/most-relevant tier per company at each
point; annotate the big cut events (Gemini 1.5 Pro/Flash Oct/Aug 2024, Claude Opus
4.1→4.5 Nov 2025 −67%, DeepSeek V3.2-Exp Sep 2025, DeepSeek V4-Pro permanent discount
May 2026).

### Chart 2 — Current top-tier Idiot Index comparison
Bar or scatter: current flagship price per company (Y, $/M output tokens, log) vs.
estimated marginal compute cost (X or ratio label) using the ~$4.90/M (2023 A100 GPT-4
era) → current H100/B200 range ($0.02–$4.20/M depending on utilization) as the
denominator band. **State the utilization/depreciation assumptions directly on the
chart** since the ratio swings ~2–100x on those two inputs alone — this chart cannot
honestly show a single precise number per model, only a plausible range.

Current flagship snapshot for Chart 2 (2026-07-07, $/1M output):
- OpenAI GPT-5.5: $30.00 · GPT-5.5-pro: $180.00 · GPT-5.4: $15.00
- Anthropic Claude Opus 4.8: $25.00 · Claude Fable 5: $50.00 · Claude Sonnet 5: $10.00 (intro)
- Google Gemini 3.5 Flash: $9.00 · Gemini 3.1 Pro Preview: $12–18
- DeepSeek V4-Pro: $0.87 · V4-Flash: $0.28

Rough current-flagship idiot index (list price ÷ ~$0.02–4.20/M plausible compute-cost
band, 2025-2026 hardware): OpenAI/Anthropic frontier tiers land in the high tens-to-
low-hundreds-x range at the low end of the cost band, DeepSeek's flagship lands close
to 1x-single-digit-x — i.e., DeepSeek is the one lab currently pricing close to its
own disclosed compute cost (see the 6.45x "cost-profit ratio" DeepSeek self-reported
in Section B), while the US labs' frontier tiers carry the highest idiot index by a
wide margin. State the band, not a single number, on the chart itself.

---

## THINGS TO VERIFY BEFORE PUBLISHING
1. The Musk "half nozzle jacket" anecdote and other in-house-part examples are
   CONTESTED (secondary-only) — either verify against a physical/ebook copy of
   Isaacson's book, or hedge the language ("as recounted in...") rather than stating
   as flat fact.
2. Do not state a numeric "idiot index threshold" as a direct Musk quote — it's
   UNVERIFIED as a quote (though the concept obviously implies "the higher the worse").
3. The compute-cost denominator is inherently uncertain (~2x swing on depreciation
   assumption alone, ~17–100x swing on utilization assumption) — the piece should be
   explicit that its "idiot index" numbers are order-of-magnitude estimates under
   stated assumptions, not precise figures. This is the single most important
   intellectual-honesty note for this piece.
4. Gemini 1.0 Ultra and Gemini 3.5 Pro have no public per-token price — omit from
   price charts or flag explicitly rather than estimating.
5. GPT-5.6 Sol/Terra/Luna are preview-only (~20 partner orgs) — don't plot as a
   current market price point.
6. Re-check all "current as of 2026-07-07" prices against live pricing pages near
   publish date — they move fast, confirmed by this research itself (DeepSeek changed
   pricing 6+ times in under 2 years; OpenAI shipped 6 GPT-5.x point releases in 11
   months).
7. The single cleanest storytelling anchor across all four companies: OpenAI's
   o1-preview (Sept 2024) launched at the exact same $15/$60 per M as GPT-3's Nov 2021
   price — frontier-tier price held flat for 3 years while commodity-tier price fell
   ~100x+ in the same window. Good candidate for the article's central "idiot index
   evolution" claim.
