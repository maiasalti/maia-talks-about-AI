# Research Notes — DeepSeek & the Scaling Law

**Facts and sources only. No narrative.** Maia writes 100% of the article prose.
Researched 2026-06-16 via web search of primary sources. Every number carries a
confidence flag: **SOLID** (primary doc or multiple reputable sources) ·
**CONTESTED** (sources disagree or it's an estimate) · **SELF-REPORTED** (DeepSeek's
own claim, not independently verified).

> The single most important framing note: **the three DeepSeek "cost figures" are NOT
> competing measurements of the same thing.** They measure different scopes. The
> apparent controversy is largely apples-to-oranges — the piece is stronger if it says so.

---

## FACT BANK

### A. The NVIDIA / market crash (Jan 27 2025)
- **~$589B** — NVIDIA single-day market-cap loss, Mon Jan 27 2025 (stock −~17%); largest one-day loss for any company in US history (prior record ~$279B, NVIDIA, Sept 2024). **SOLID.** Note: some outlets (Reuters/Business Standard) say **$593B** — a close/rounding difference, not a real dispute. Pick one, footnote the other.
  - Bloomberg: https://www.bloomberg.com/news/articles/2025-01-27/asml-sinks-as-china-ai-startup-triggers-panic-in-tech-stocks
  - CNBC: https://www.cnbc.com/2025/01/27/nvidia-sheds-almost-600-billion-in-market-cap-biggest-drop-ever.html
  - Business Standard (Reuters, $593B): https://www.business-standard.com/markets/news/deepseek-sparks-ai-stock-selloff-nvidia-loses-record-593-bn-in-mcap-125012800095_1.html
- **~$1T** — broad AI/tech market wipeout that day (Nasdaq 100 + Europe Stoxx 600 tech). **SOLID as an approximation**, but it's a round figure across two indices, not an audited single total — treat as order-of-magnitude.
  - Bloomberg: https://www.bloomberg.com/news/articles/2025-01-27/nasdaq-futures-slump-as-china-s-deepseek-sparks-us-tech-concern
  - Fortune: https://fortune.com/2025/01/27/deepseek-buzz-puts-tech-stocks-on-track-for-1-trillion-wipeout

### B. The three competing cost figures (what each ACTUALLY includes)
- **~$294,000** — Nature paper figure. Covers **ONLY the reinforcement-learning post-training stage** that turned the existing V3 base into R1 (GRPO RL: 512 H800s ~198h + ~80h, + ~5k GPU-hrs for SFT data). **Explicitly excludes the base-model (V3) cost.** Headlines calling it "R1's total cost" conflated post-training with pre-training. **SOLID for what it is; CONTESTED as a "total cost" claim.**
  - Nature: https://www.nature.com/articles/s41586-025-09422-z (Sept 17 2025; open-access mirror: https://pmc.ncbi.nlm.nih.gov/articles/PMC12443585/)
  - The Register (breakdown): https://www.theregister.com/2025/09/19/deepseek_cost_train/
- **~$5.6–5.9M** — V3 final pre-training run. **$5.576M** = 2.788M H800 GPU-hrs × **assumed $2/GPU-hr rental** (~$5.87M if you add R1's RL stage). **Explicitly EXCLUDES** "prior research and ablation experiments on architectures, algorithms, or data" — i.e. R&D, failed runs, data acquisition, and hardware capex. It's a rental-equivalent of one successful run, not money actually spent end-to-end. **SOLID on the number & its stated scope; the figure is SELF-REPORTED (DeepSeek's own report) and widely misused as "total cost."**
  - DeepSeek-V3 Technical Report: https://arxiv.org/abs/2412.19437 (Dec 27 2024)
- **~$1.6B** — SemiAnalysis full-fleet **CapEx** estimate (+ ~$944M OpEx), for a **~50,000 Hopper GPU** fleet (H800 + H100 + H20). This is total infrastructure buildout, **not any single training run.** **CONTESTED / independent estimate** (not disclosed by DeepSeek) — measures a *different thing* than the $5.6M, so they're not directly comparable rather than contradictory.
  - SemiAnalysis: https://newsletter.semianalysis.com/p/deepseek-debates
  - Tom's Hardware (secondary): https://www.tomshardware.com/tech-industry/artificial-intelligence/deepseek-might-not-be-as-disruptive-as-claimed-firm-reportedly-has-50-000-nvidia-gpus-and-spent-usd1-6-billion-on-buildouts

### C. Hardware constraint (V3)
- **H800 GPUs** — export-compliance variant of H100 (same compute, throttled NVLink/interconnect) for the China market under US export controls. **SOLID.**
- **~2,048 H800 GPUs**, trained **~2 months**, **~2.788M GPU-hours** (≈ 2.79M). Internally consistent: 2.788M ÷ 2,048 ≈ 1,362 h ≈ ~57 days. **SOLID** (all from the V3 technical report).
  - https://arxiv.org/abs/2412.19437 ; https://www.theregister.com/2025/09/19/deepseek_cost_train/

### D. Inference cost gap (R1 vs OpenAI o1, at launch)
- **~27× cheaper per token** (commonly framed "20–50×"; clean list-price ratio ≈ 27×).
  - DeepSeek R1: **$0.55 / 1M input**, **$2.19 / 1M output** (input ~$0.14 with cache hits).
  - OpenAI o1: **$15.00 / 1M input**, **$60.00 / 1M output** (launched Dec 17 2024).
  - $60 ÷ $2.19 ≈ 27.4× (output); $15 ÷ $0.55 ≈ 27.3× (input). **SOLID on prices.** "X-times cheaper" headline varies 20–50× depending on cache pricing — the defensible like-for-like ratio is ~27×.
  - OpenAI pricing: https://openai.com/api/pricing/ ; KNIME comparison: https://www.knime.com/blog/openai-o1-vs-deepseek-r1 ; VentureBeat: https://venturebeat.com/ai/open-source-revolution-how-deepseek-r1-challenges-openais-o1-with-superior-processing-cost-efficiency

### E. GPT-4 training cost (for contrast)
- No single canonical number — methodology-dependent: **~$40M** amortized hardware (Epoch AI), **~$78M** cloud-rental basis (Stanford AI Index), **">$100M"** (Altman, informal). **CONTESTED by methodology** (they measure different cost bases, not a factual dispute). Cite the figure WITH its basis.
  - Epoch AI: https://epoch.ai/blog/how-much-does-it-cost-to-train-frontier-ai-models
  - Stanford AI Index via Statista: https://www.statista.com/chart/33114/estimated-cost-of-training-selected-ai-models/
  - Altman ">$100M": https://news.ycombinator.com/item?id=35971551

### F. Efficiency mechanisms (the "how")
- DeepSeek-V3 uses **Multi-head Latent Attention (MLA)** + **DeepSeekMoE** (Mixture-of-Experts), an auxiliary-loss-free load-balancing strategy, and a multi-token-prediction objective. R1 is built on the V3 base. **SOLID** (verbatim from the technical report).
- **671B total parameters, 37B activated per token** — the MoE lever: only a subset of "experts" fire per token. **SOLID.**
  - https://arxiv.org/abs/2412.19437

### G. Inference-time / test-time scaling (the "scaling law moved, didn't break" point)
- R1's reasoning was **incentivized through reinforcement learning (GRPO)** with correctness rewards — **without human-labeled reasoning traces**. The model learned **long chain-of-thought ("thinking tokens")** and to **allocate more compute at inference time** for harder problems. This shifts effort from a fixed pre-training budget toward **variable test-time (inference-time) compute.** First open model to match OpenAI o1 this way. **SOLID** (peer-reviewed Nature paper).
  - Nature: https://www.nature.com/articles/s41586-025-09422-z ; R1 preprint: https://arxiv.org/abs/2501.12948

---

## CHART DATA (also commented inline in each component)

### Visual 1 — `ScalingLawChart.js` (training compute vs MMLU)
All compute = **Epoch AI estimates** (https://epoch.ai/data/ai-models, OWID mirror). MMLU 5-shot from primary papers unless noted.

| Model | Compute (FLOP) | MMLU | Flag | Notes |
|---|---|---|---|---|
| GPT-3 | 3.14e23 | 43.9 | SOLID | arxiv 2005.14165 |
| Llama 2 70B | 8.1e23 | 68.9 | SOLID | arxiv 2307.09288 |
| PaLM 540B | 2.5e24 | 69.3 | SOLID | base, NOT Flan-PaLM 75.2 |
| PaLM 2 | 7.3e24 | 78.3 | CONTESTED compute | Google undisclosed; Epoch est |
| Llama 3 70B | 7.9e24 | 79.5 | SOLID | meta-llama blog |
| GPT-4 | 2.1e25 | 86.4 | CONTESTED compute | undisclosed, Epoch ±5× |
| Llama 3.1 405B | 3.8e25 | 85.4 | SOLID | Meta-disclosed compute |
| Gemini 1.0 Ultra | 5.0e25 | 83.7 | CONTESTED compute | use 5-shot 83.7, NOT CoT@32 90.0 |
| **DeepSeek V3** | **~3.0e24** | **88.5** | SOLID (the outlier) | EM 5-shot chat |
| **DeepSeek R1** | **~3.5e24** | **90.8** | CONTESTED | MMLU is **Pass@1, not 5-shot**; RL-compute ±2× |

- **The punchline is on the X-axis:** DeepSeek sits ~10× left of Gemini Ultra / GPT-4 at equal-or-better MMLU. The Y-advantage is small because MMLU saturates ~89–90% at the top.
- **Omitted (no honest compute point):** GPT-2 (no MMLU), GPT-3.5 (no distinct Epoch FLOP), Claude 3 Opus & 3.5 Sonnet (Anthropic discloses no compute).

### Visual 2 — `CapabilityCostChart.js` (output cost vs AA Intelligence Index v4.1)
Benchmark = **Artificial Analysis Intelligence Index v4.1** (independent, NOT self-reported). All researched 2026-06-16.

| Model | Date | $/1M out | AA Index v4.1 | Flag |
|---|---|---|---|---|
| GPT-5.5 (xhigh) | 2026-04 | $30.00 | 55 | SOLID |
| GPT-5.4 (xhigh) | 2026-03 | $15.00 | 51 | SOLID |
| Claude Opus 4.8 | 2026-05 | $25.00 | 56 | SOLID |
| Claude Sonnet 4.6 | 2026-02 | $15.00 | 47 | SOLID (Adaptive/Max effort) |
| Gemini 3.1 Pro | 2026-02 | $12.00 | 46 | SOLID (≤200K ctx; $18 above) |
| Gemini 3.5 Flash | 2026-05 | $9.00 | 50 | SOLID |
| DeepSeek V4 Pro | 2026-04 | $0.87 | 44 | price SOLID / score CONTESTED |
| DeepSeek V3.2 | 2025-12 | $1.60 | 25 | CONTESTED (AA "estimated") |
| Qwen3.6-27B (open) | 2026-04 | $3.60 | 37 | CONTESTED |
| **DeepSeek R1 (launch)** | 2025-01 | $2.19 | 60 | **DIFFERENT INDEX — not comparable, plotted as flagged ghost point** |

- Sources (all live AA model pages + official pricing): openai.com/api/pricing · platform.claude.com/docs/en/about-claude/pricing · ai.google.dev/gemini-api/docs/pricing · api-docs.deepseek.com/quick_start/pricing · artificialanalysis.ai/models/{gpt-5-5, gpt-5-4, claude-opus-4-8, claude-sonnet-4-6-adaptive, gemini-3-1-pro-preview, gemini-3-5-flash, deepseek-v4-pro, deepseek-v3-2, qwen3-6-27b} · R1: artificialanalysis.ai/articles/deepseek-r1-update
- **Dropped (couldn't source cleanly on v4.1):** GPT-5.5 Pro, Gemini 3.5 Pro (not GA), GPT-5.2 (retired), GPT-5.5 Instant, Claude Fable 5 / Mythos 5 (gated).

---

## STORY BEATS (facts only — NO sentences; map to the 6 MDX sections)

**Beat 1 — Hook: the NVIDIA crash**
- ~$589B NVIDIA single-day loss (largest in US history) · ~$1T market-wide · trigger = DeepSeek R1 release (Jan 20 2025) hitting #1 on App Store · the market priced in "compute moat broken."

**Beat 2 — What a scaling law is**
- compute → capability empirical trend (Kaplan 2020, Chinchilla 2022) · Epoch AI documents it · → VISUAL 1 · capability proxy = MMLU.

**Beat 3 — The bet built on the law**
- US export controls premised on "compute = capability" (deny advanced GPUs → deny frontier AI) · capex supercycle / NVIDIA valuation · GPT-4 ~$40–100M+ to train.

**Beat 4 — Scarcity forcing efficiency**
- H800s (throttled, export-compliant) · ~2,048 GPUs ~2 months ~2.79M GPU-hrs · MoE 671B total / 37B active + MLA · the three cost figures ($294K / ~$5.6M / ~$1.6B) and what each includes.

**Beat 5 — "Broke the law" is the wrong lesson**
- R1 used RL-driven long chain-of-thought → test-time/inference-time scaling · the frontier MOVED axes (train-time → inference-time), didn't break · → VISUAL 2 · "redrew the cost-for-capability frontier and that line held."

**Beat 6 — The export-control irony**
- constraint as accelerant: restricting compute may have *spurred* the efficiency breakthroughs it meant to prevent · open weights propagated the methods globally.

---

## THINGS TO VERIFY BEFORE PUBLISHING
1. **$589B vs $593B** (Beat 1) — pick one, footnote the other (close/rounding difference).
2. **The three cost figures are different scopes, not contradictions** — make sure the prose frames them that way. Don't present $294K / $5.6M / $1.6B as rival "true costs."
3. **$5.6M is SELF-REPORTED** (DeepSeek's report) and excludes R&D/failed-runs/hardware capex — say so.
4. **Inference ratio** — use the underlying prices ($0.55/$2.19 vs $15/$60, ≈27×) as load-bearing; "20–50×" is a soft headline range.
5. **GPT-4 cost** — no canonical number; always cite the figure WITH its methodology basis.
6. **Visual 1 MMLU shot-settings are NOT uniform** — DeepSeek R1 is Pass@1, others 5-shot; the outlier claim must lean on the X-axis (compute), not the Y. Several compute figures (GPT-4, PaLM 2, Gemini Ultra) are CONTESTED Epoch estimates (±5×).
7. **Visual 2 index-version trap** — AA re-based the Index; the 2026 points are v4.1, but **R1's launch score (60) is on a retired 7-eval index and is NOT comparable.** It's plotted as a hollow/flagged point. Decide whether to keep it or drop it.
8. **Three CONTESTED v4.1 scores** (DeepSeek V4 Pro 44, V3.2 25, Qwen 37) — these are AA's *current* live-page values; AA's own older numbers were higher. Re-check the live pages near publish date — these move.
9. **All mid-2026 model versions/prices** (GPT-5.5, Opus 4.8, Gemini 3.x, DeepSeek V4) — verify against the official pricing pages on/near your publish date; pricing and versions shift fast.

---

## ALL SOURCE URLS (dedup)
- https://www.bloomberg.com/news/articles/2025-01-27/asml-sinks-as-china-ai-startup-triggers-panic-in-tech-stocks
- https://www.cnbc.com/2025/01/27/nvidia-sheds-almost-600-billion-in-market-cap-biggest-drop-ever.html
- https://www.business-standard.com/markets/news/deepseek-sparks-ai-stock-selloff-nvidia-loses-record-593-bn-in-mcap-125012800095_1.html
- https://www.bloomberg.com/news/articles/2025-01-27/nasdaq-futures-slump-as-china-s-deepseek-sparks-us-tech-concern
- https://fortune.com/2025/01/27/deepseek-buzz-puts-tech-stocks-on-track-for-1-trillion-wipeout
- https://www.nature.com/articles/s41586-025-09422-z
- https://pmc.ncbi.nlm.nih.gov/articles/PMC12443585/
- https://www.theregister.com/2025/09/19/deepseek_cost_train/
- https://arxiv.org/abs/2412.19437  (DeepSeek-V3 Technical Report)
- https://arxiv.org/abs/2501.12948  (DeepSeek-R1 paper)
- https://newsletter.semianalysis.com/p/deepseek-debates
- https://www.tomshardware.com/tech-industry/artificial-intelligence/deepseek-might-not-be-as-disruptive-as-claimed-firm-reportedly-has-50-000-nvidia-gpus-and-spent-usd1-6-billion-on-buildouts
- https://openai.com/api/pricing/
- https://www.knime.com/blog/openai-o1-vs-deepseek-r1
- https://venturebeat.com/ai/open-source-revolution-how-deepseek-r1-challenges-openais-o1-with-superior-processing-cost-efficiency
- https://epoch.ai/blog/how-much-does-it-cost-to-train-frontier-ai-models
- https://www.statista.com/chart/33114/estimated-cost-of-training-selected-ai-models/
- https://news.ycombinator.com/item?id=35971551
- https://epoch.ai/data/ai-models
- https://ourworldindata.org/grapher/exponential-growth-of-computation-in-the-training-of-notable-ai-systems
- https://arxiv.org/abs/2005.14165 (GPT-3) · https://arxiv.org/abs/2307.09288 (Llama 2) · https://arxiv.org/abs/2204.02311 (PaLM) · https://arxiv.org/abs/2305.10403 (PaLM 2) · https://arxiv.org/abs/2303.08774 (GPT-4) · https://arxiv.org/abs/2312.11805 (Gemini 1.0)
- https://ai.meta.com/blog/meta-llama-3/ · https://github.com/meta-llama/llama-models
- Artificial Analysis model pages: https://artificialanalysis.ai/models/ (gpt-5-5, gpt-5-4, claude-opus-4-8, claude-sonnet-4-6-adaptive, gemini-3-1-pro-preview, gemini-3-5-flash, deepseek-v4-pro, deepseek-v3-2, qwen3-6-27b) · R1: https://artificialanalysis.ai/articles/deepseek-r1-update
- Pricing pages: https://platform.claude.com/docs/en/about-claude/pricing · https://ai.google.dev/gemini-api/docs/pricing · https://api-docs.deepseek.com/quick_start/pricing
