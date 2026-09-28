# System One Models (Jev, Laya and the open clones) — research notes

Researched 2026-09-28. Every bullet names the page it came from. Tags:
- **[single-source]**: only one page I read says this.
- **[vendor claim]**: self-reported by the company or author who made the thing.
- **[CONFLICT]**: sources disagree. Both versions are given.
- **[my inference]**: my own reasoning, not stated by a source.

Pages I could NOT read (403 / paywall / mirror down), so nothing below comes from them:
towardsai "Introducing System One Models: Laya and Jev", the visrow Medium live-demo post, the
data-science-in-your-pocket Medium post, theneuron.ai. The bugtraqsolutions page only returned its
headline. For the visrow in-browser demo I used the same author's DEV.to post and GitHub READMEs instead.

---

## 1. What they are

### The name
- "System One" comes from Daniel Kahneman's *Thinking, Fast and Slow*: fast, intuitive System 1
  vs slow, deliberate System 2. TypeSafe also says "'System 1 thinking' has also implied error-prone"
  and that they think System One Models "can be made more reliable than its alternatives."
  (https://typesafe.ai/blog/introducing-system-one-models-and-jev; also https://docs.typesafe.ai/concepts/system-one.md)
- "Jev" is named after William Stanley Jevons (the Jevons paradox): "We expect machine intelligence to
  follow a similar path to coal… Every order of magnitude drop in the cost of intelligence unlocks
  orders of magnitude more use cases." (https://typesafe.ai/blog/introducing-system-one-models-and-jev)
- On the Latent Space podcast, Diogo Almeida pushes back on calling them "decision models": "System 1 is
  beyond that. That's all I can say." (https://www.latent.space/p/jev)

### Jev (TypeSafe AI) — closed, hosted
- **Company:** TypeSafe AI, a San Francisco lab. It came out of stealth with Jev as its first public model
  (https://flaviocopes.com/jev/). The team works in person five days a week near Embarcadero
  (https://typesafe.ai/team).
- **Founders** (https://typesafe.ai/team):
  - Diogo Almeida, CEO. The team page says he "co-invented RLHF and InstructGPT, the methods that lead to
    ChatGPT and GPT4" and that he previously worked at Google Brain.
  - Sasha Sheng, COO. Ex-research engineer at Meta/FAIR.
  - Erik Gafni, CTO. Repeat founder (Ravel), early employee at Invitae and Freenome.
  - In the launch post Almeida writes: "At OpenAI, I helped build the methods that made language models
    useful at following instructions… That work ended up as the research behind ChatGPT."
    (https://typesafe.ai/blog/introducing-system-one-models-and-jev)
  - **[CONFLICT, in wording only]** Secondary sources describe him as "co-creator of ChatGPT"
    (https://dev.to/jamilxt/jev-vs-laya-the-same-ai-idea-one-closed-and-one-open-3c6e), as "former Google
    Brain/OpenAI researcher" (https://wilsonwu.me/en/blog/2026/jev-vs-laya/) and as having "co-authored
    InstructGPT research" (https://www.gadgetpilipinas.net/2026/09/typesafe-jev-system-one-model-laya/).
    The safest wording is the company's own.
- **Launch date:** Sept 15, 2026. That is the date on the launch blog post, and the HN launch thread is
  dated 2026-09-15 (https://typesafe.ai/blog/introducing-system-one-models-and-jev;
  https://news.ycombinator.com/item?id=49717558). It launched in **early access** behind a waitlist.
  - **[CONFLICT]** modelfit.io gives the public launch as Sept 16, 2026
    (https://modelfit.io/blog/jev-system-one-open-source-prior-art/). Every other source says Sept 15.
- **Funding:** \$40M seed led by DCVC, after two years in stealth
  (https://www.gadgetpilipinas.net/2026/09/typesafe-jev-system-one-model-laya/;
  https://flaviocopes.com/jev/ says "\$40M in seed funding").
- **HN reception:** the launch post got 1,984 points and 520 comments
  (HN Algolia, https://hn.algolia.com/api/v1/search?query=System%20One%20model&tags=story). Latent Space
  AINews says it "topped Hacker News all day" (https://www.latent.space/p/ainews-jev-a-system-one-model-that).
  Almeida refers to a ~40M-view launch video (https://www.latent.space/p/jev) **[single-source]**.
- **License:** proprietary. No weights, no parameter count and no self-hosting option have been published
  (https://www.marktechpost.com/2026/09/19/typesafe-ai-releases-jev/). Architecture details are "close to the
  chest for now, but we have talked about writing a paper," according to the CEO's HN account
  (https://news.ycombinator.com/item?id=49717558).
- **Pricing:** \$0.042 per million input tokens ("\$42 per billion"). Output tokens are "FREE (too cheap to
  meter)." The launch post compares this with LLM input prices of "\$0.20 to \$10 / MTok"
  (https://typesafe.ai/blog/introducing-system-one-models-and-jev). The homepage says "238x lower input price
  than Claude Fable 5.1" (https://typesafe.ai).
  - The launch post itself says: "We can't prove it isn't subsidized; we'll need the long-term to prove
    the sustainability of our pricing (which we expect to go down, not up)."
  - Third-party reseller apimodels.app lists "\$0.05 per 1M input" (seen only in the search-result title,
    https://apimodels.app/docs/jev) **[single-source, not the official price]**.
- **Latency:** the official figure is 70–500 ms end to end, measured "from our laptops on the West Coast
  (this is where our service is currently based)." The comparison figure for frontier LLMs is "3 to 329
  seconds" (https://typesafe.ai/blog/introducing-system-one-models-and-jev).
  - **[CONFLICT on the typical number]** Sources give different typical figures:
    - "most around 100" ms (https://flaviocopes.com/jev/)
    - "around 150 milliseconds" (https://dev.to/jamilxt/jev-vs-laya-the-same-ai-idea-one-closed-and-one-open-3c6e)
    - 236–276 ms p50 (third-party figure quoted on the Laya model card, https://huggingface.co/convaiinnovations/laya)
    - ~247 ms (Nimble README, https://github.com/bespokelabsai/nimble)
    - ~302 ms per case (https://www.gadgetpilipinas.net/2026/09/typesafe-jev-system-one-model-laya/)
    - 0.32 s median on Norwegian documents (https://lindfors.no/blog/a-first-look-at-typesafes-jev/)
    - 378 ms p50 through OpenRouter on AG News (https://github.com/dhruvmehra/jevbench/blob/main/docs/results/2026-09-22-n500-summary.md)
    - MindStudio reports "Jev on routing task: 3ms" (https://www.mindstudio.ai/blog/jev-vs-classic-classifiers-benchmark).
      This is inconsistent with everything else and looks wrong. **Treat as unreliable.**
- **Rate limits:** "250,000 tokens per second and 1,200 requests per minute"
  (https://flaviocopes.com/jev/; https://heym.run/blog/system-one-models adds "adjusting dynamically").
- **Limits:**
  - Choice questions allow up to 255 options. Score questions take 2–10 levels (https://docs.typesafe.ai/api.md).
  - Input size **[CONFLICT]**: "state + longest question… about 32,000 tokens" (https://flaviocopes.com/jev/),
    but "64k tokens" / "~64k-token request limit" (https://wilsonwu.me/en/blog/2026/jev-vs-laya/;
    https://www.alphamatch.ai/blog/jev-vs-laya-system-one-2026). These may measure different things
    (per-question vs whole request) **[my inference]**.
  - Text only: no images, audio or video (https://docs.typesafe.ai/concepts/system-one.md).
- **Model name/version:** requests use `"model": "jev-latest"` and responses report `"jev-1.13.0"`
  (https://flaviocopes.com/jev/). OpenRouter slug: `typesafe/jev-1.13`, alias `~typesafe/jev-latest`
  (https://openrouter.ai/docs/guides/community/jev).
- **SDKs:** Python `pip install typesafe-sdk` and JS `@typesafe-ai/sdk`
  (https://www.marktechpost.com/2026/09/19/typesafe-ai-releases-jev/). Jev is also on OpenRouter through
  `POST /api/v1/systemone` and a Decisions API (https://openrouter.ai/docs/guides/community/jev).

### The wire format ("typed questions")
- Endpoint: `POST https://api.typesafe.ai/v1/systemone`, Bearer auth. The body has `model`, `state` and
  `questions` (https://docs.typesafe.ai/api.md).
  - `state` is "a plain string for text, or structured data (object/array)."
  - `questions` is "a map of typed Question objects. You choose each key; answers come back under the
    same keys."
- There are three primitives (https://docs.typesafe.ai/api.md):
  - **`noul`** (yes/no). Fields: `instructions` plus optional `criteria` describing `true`/`false`.
    Returns `noul`, a probability from 0 to 1. The name is short for "Noulli", "a continuous Bernoulli"
    (https://www.latent.space/p/jev).
    - HN commenters complained that the name is "user-hostile"; mijoharas only worked out the Bernoulli
      link by inference (https://news.ycombinator.com/item?id=49717558).
  - **`choice`**. `criteria` is "a map of option to rubric description; use null when an option needs no
    extra detail. Maximum 255 options." Returns `choice`, `probabilities` and `confidence`.
  - **`score`**. `criteria` is "an ordered array of level descriptions," 2–10 levels. Returns `score`,
    `legend`, `probabilities` and `confidence`. The score is probability-weighted, so it "can land
    *between* levels" (https://heym.run/blog/system-one-models).
- Almeida maps the primitives to programming constructs: choice → switch/enum, noul → if, score →
  sorting/thresholding (https://www.latent.space/p/jev).
- **Concrete raw HTTP example** (verbatim from https://flaviocopes.com/jev/):
  ```json
  // request
  {
    "model": "jev-latest",
    "state": { "description": "text here" },
    "questions": {
      "is_sponsor_inquiry": {
        "type": "noul",
        "instructions": "Does `description` ask to sponsor?"
      }
    }
  }
  // response
  {
    "answers": {
      "is_sponsor_inquiry": { "type": "noul", "noul": 0.99 }
    },
    "model": "jev-1.13.0",
    "usage": { "input_tokens": 210, "output_tokens": 31 }
  }
  ```
  - Note that this response reports `output_tokens: 31` even though output is free.
- **Choice example in the same wire format** (verbatim from the Laya README, which implements the same
  format in `laya-serve`, https://github.com/NandhaKishorM/laya):
  ```json
  {"state": {"body": "billed twice, refund please or we cancel"},
   "questions": {"dept": {"type": "choice", "instructions": "which team?",
                          "criteria": {"billing": "refunds", "tech": "bugs"}}}}
  →
  {"answers": {"dept": {"choice": "billing", "confidence": 0.94,
                        "probabilities": {"billing": 0.94, "tech": 0.06}}},
   "usage": {"input_tokens": 24, "output_tokens": 0}}
  ```
- **Python SDK example** covering all three types in one call (verbatim from
  https://www.marktechpost.com/2026/09/23/a-coding-guide-to-typesafe-ai-jev/):
  ```python
  response, ms = ask(TICKET, {
      "department": Choice(
          instructions="Which team should handle this ticket",
          criteria={"billing": "Payment, refund or subscription issues",
                    "technical": "Bugs, outages or integration problems",
                    "sales": "Pricing, plans or account upgrades"},
      ),
      "frustration": Score(
          instructions="How frustrated the customer appears",
          criteria=["Calm", "Frustrated but civil", "Very angry"],
      ),
      "refund_requested": Noul(instructions="Customer explicitly asking for refund"),
  })
  ```
- **What confidence means:** it is "a statistic computed from the probability distribution the answer
  already gives you." For 3 options it is `(3 × largest probability − 1) / 2`
  (https://docs.typesafe.ai/confidence.md). The general form is `(count × peak − 1)/(count − 1)`
  (https://www.marktechpost.com/2026/09/23/a-coding-guide-to-typesafe-ai-jev/). So it is normalised max
  probability: 0 means uniform and 1 means certain.
  - Laya instead uses "1 − normalized entropy" (https://github.com/NandhaKishorM/laya).
- Almeida says Jev aims for **robustness** (similar inputs → similar outputs) over determinism
  (https://www.latent.space/p/jev).
- He also says Jev deliberately has **no refusals** at the API layer: "if you ever want this in a dependency
  running in the background, what happens if that refuses? That is, like, straight-up insanity."
  (https://www.latent.space/p/jev)
- HTTP errors: 401, 422, 429 and 529 ("TypeSafe is temporarily overloaded") (https://docs.typesafe.ai/api.md).

### Laya (Convai Innovations) — open weights
- **Builder:** Convai Innovations, founded by Nandakishor Mukkunnoth (https://www.gadgetpilipinas.net/2026/09/typesafe-jev-system-one-model-laya/).
  WilsonWu calls him an "independent researcher Nandakishor M" (https://wilsonwu.me/en/blog/2026/jev-vs-laya/).
  GitHub: NandhaKishorM/laya.
- **Location:** Convai Innovations Private Limited is a Kerala Startup Mission recognised startup in Kasaragod, Kerala, India
  (https://startups.startupmission.in/startups/ZDwE8; https://www.crunchbase.com/person/nandakishor-m).
- **Release date:** the Hugging Face repo `convaiinnovations/laya` was created **2026-09-18** and last
  modified 2026-09-24 (HF API, https://huggingface.co/api/models/convaiinnovations/laya). That matches
  wilsonwu's "released September 18, 2026."
  - **[CONFLICT]** invidelabs says "circa September 22, 2026"
    (https://blog.invidelabs.com/system-one-models-jev-laya-open-alternatives/). The HF creation date
    supports Sept 18.
  - Gadgetpilipinas reports "six releases in one day following announcement" **[single-source]**.
- **License:** Apache 2.0 (HF card, GitHub).
- **Popularity:** the HF API shows 4,135 likes (https://huggingface.co/api/models/convaiinnovations/laya).
  The download count reads 0, which is probably a lag in the API **[my inference]**.
- **Checkpoints** (https://github.com/NandhaKishorM/laya; https://www.alphamatch.ai/blog/jev-vs-laya-system-one-2026):
  - `laya` (English): ModernBERT-large, ~421M params, 512-token context.
  - `laya-multilingual`: mmBERT-base, ~322M params, 1,024 tokens (can be extended to 8,192), "100+ languages."
  - `laya-typed-decisions`: ModernBERT-large, ~421M params, 1,024 tokens. This is fine-tuned on the
    typed-decisions workflows.
  - Download size of the English checkpoint: "808 MB" (https://blog.invidelabs.com/system-one-models-jev-laya-open-alternatives/).
- **Languages:** "100+ claimed, 45 of 51 tested" (https://heym.run/blog/system-one-models).
- **Install:** `pip install laya`. The `laya-serve` server exposes the **Jev-compatible** `POST /v1/systemone`
  (https://www.gadgetpilipinas.net/2026/09/typesafe-jev-system-one-model-laya/; https://github.com/NandhaKishorM/laya).
  Heym describes the two as "contractually interchangeable" (https://heym.run/blog/system-one-models).
- **Hardware:** CPU, CUDA and Apple Silicon (https://laya-ai.com/system-one-models; that site is an
  "Independent community resource. Not affiliated with ConvAI Innovations"). It runs on a free Colab T4
  (https://www.gadgetpilipinas.net/2026/09/typesafe-jev-system-one-model-laya/).
- **Latency** (HF card and GitHub, on a Tesla T4):
  - 39.5 ms per question on English and 32.8 ms on multilingual.
  - Batched at ten questions: 158.6 ms English and 72.3 ms multilingual. That works out to ~7.2 ms per
    question on multilingual (https://dev.to/vishalmysore/what-is-laya-laya-vs-jev-with-live-demo-4j6e).
  - Throughput: 103–332 questions/sec (https://github.com/NandhaKishorM/laya).
- **Other self-described open "System One" models** (details in section 5): OpenDecider, Kev, Von, Bespoke
  Nimble, AnyJev, OpenThai-SystemOne, CUA-S1, OpenDecision, Contrastive LM (CLM).

---

## 2. How they differ from LLMs

- **Sampling.** TypeSafe's comparison table says LLMs sample sequentially ("one token at a time, each
  conditioned on the last"), while Jev is "Parallel. Generates all outputs in a single query. Incredibly
  efficient and hardware-aware." The company describes it as "a new model architecture, parallel sampler…
  and training method" (https://typesafe.ai/blog/introducing-system-one-models-and-jev). The architecture
  is undisclosed.
  - MarkTechPost says only "transformer-based" (https://www.marktechpost.com/2026/09/19/typesafe-ai-releases-jev/).
  - An AINews commenter guessed it is "likely closer to a constrained or diffusion-like decision model"
    (https://www.latent.space/p/ainews-jev-a-system-one-model-that). This is speculation.
  - HN user bigglebear guessed ~1B params (https://news.ycombinator.com/item?id=49717558). Also speculation.
- **Laya is explicitly non-autoregressive and encoder-based.** It is a bidirectional ModernBERT encoder plus a
  decision head. It returns "typed answers with probabilities in a single forward pass" with "no text
  generation, so nothing to parse and nothing to hallucinate" (https://huggingface.co/convaiinnovations/laya).
- **Not every "System One" model is an encoder.** "Nimble, Kev, and OpenThai build on Qwen decoder models;
  Laya uses encoders" (https://blog.invidelabs.com/system-one-models-jev-laya-open-alternatives/). The decoder
  ones read logits for the candidate answer tokens instead of generating text (section 4).
- **Training objective: RLCD vs RLHF/RLVR.**
  - TypeSafe (https://typesafe.ai/blog/introducing-system-one-models-and-jev):
    - RLHF optimizes for "human preference."
    - RLVR optimizes for "outputs that can be programmatically verified."
    - RLCD optimizes for "calibrated decisions: answers with epistemically honest probabilities on System
      One tasks."
  - Almeida argues that RLHF causes mode collapse and that "calibration is, like, total poison into…
    the probability distributions of strings" (https://www.latent.space/p/jev).
- **Output is a computed distribution, not generated text.** "A confidence field inside generated JSON is
  generated text: a number the model *wrote*. A System One model returns the distribution it actually
  computed… a 0.9 an LLM writes is not the 0.9 Jev measures." (https://heym.run/blog/system-one-models)
- **"Can't hallucinate" / "zero type errors" is a structural claim, not a statement about accuracy.**
  - TypeSafe says "Our number is not empirical. Schema matching is guaranteed, thus we can confidently add
    0% into the plots" (https://typesafe.ai/blog/introducing-system-one-models-and-jev).
  - Heym: "The zero type-error rate is **structural rather than empirical**. It covers the shape of an
    answer, not whether the answer is correct." (https://heym.run/blog/system-one-models)
  - HN pushback: "Type safety is not factual correctness" (WhitneyLand); "if it puts a high confidence
    value on a wrong answer, that's still hallucinating" (8note). The CEO replied that "probabilistic
    models can be confidently wrong" (https://news.ycombinator.com/item?id=49717558).
- **Speed and cost multipliers** (all **[vendor claim]**):
  - "40x-200x faster" for System One-shaped queries.
  - Workflow evals: "193.6x faster, 444.6x cheaper." TypeSafe says "we expect that these are on the higher
    end of real world gains" (https://typesafe.ai/blog/introducing-system-one-models-and-jev; homepage
    confirmed "193.6x Faster, 444.6x Cheaper" in page source, https://typesafe.ai).
  - Worked example: Jev took 0.114 s and cost \$0.000081; GPT-5.6 Terra took 8.566 s and cost \$0.013880
    (https://typesafe.ai; https://www.marktechpost.com/2026/09/19/typesafe-ai-releases-jev/).
  - AINews and others round these to "20–200x faster, 40–400x cheaper"
    (https://www.latent.space/p/ainews-jev-a-system-one-model-that).
  - **Caveats TypeSafe states itself** (https://typesafe.ai/blog/introducing-system-one-models-and-jev):
    - The reference answers are "the average of GPT-6 Astra and Fable 5.1," not human labels. This "biases
      answers towards OpenAI and Anthropic's models."
    - The workflows were written by TypeSafe's own capability team, "so some bias could exist."
    - The LLM hallucination numbers come from OpenRouter.
- **Independent cost/latency data points:**
  - Emil Lindfors (Jev early access): "Jev read all 24 documents for half a cent." Median latency was 0.32 s,
    vs 2.7 s for DeepSeek without reasoning and 26 s with reasoning. Reasoning "bought two labels out of 24,
    for ten times the latency" (https://lindfors.no/blog/a-first-look-at-typesafes-jev/).
  - jevbench on SST-2: Jev reached 95.4% vs Claude Sonnet-5 at 95.6%, at \$0.0148 vs \$0.8035 per 1k calls
    (https://github.com/dhruvmehra/jevbench/blob/main/docs/results/2026-09-22-n500-summary.md).
  - Heym: roughly \$1.26 for 100,000 support tickets at ~300 tokens each (https://heym.run/blog/system-one-models).
  - Riley Brown's build: "500 emails for 3.5 cents" (https://madewithjev.com).
  - Doom demo: the engineer "was worried about making 10 queries a second (which ends up costing
    ~\$7/hour)" (https://typesafe.ai/blog/introducing-system-one-models-and-jev).
- **Batching several questions into one call** (speculative fan-out, per
  https://www.marktechpost.com/2026/09/23/a-coding-guide-to-typesafe-ai-jev/):
  - Ten questions in one call vs ten separate calls ran 5.3× faster and used 3.2× fewer input tokens.
  - "Questions never see each other," so answers are the same whether asked alone or together.
  - Docs: "each question is evaluated independently, so adding more questions does not create
    context-rot" (https://docs.typesafe.ai/).
- **Things an LLM does that these models can't** (Jev 1.13 known issues,
  https://docs.typesafe.ai/model-jaggedness/jev-1.13.md):
  - literal reading
  - math and counting
  - date comparison
  - multi-hop indirection
  - distraction by large irrelevant state
  - adversarial/prompt-injection content
  - contradictory criteria
  - no structural invariants: P(noul) is not guaranteed to equal 1 − P(not noul)
  - generation
  - Lindfors also found that verbose, careful instructions *hurt*, pushing probabilities toward 0.5, and
    that "short questions" worked better (https://lindfors.no/blog/a-first-look-at-typesafes-jev/).
- **Almeida's framing: optimise for "intelligence per dollar," not raw capability.** He says they do
  "absolutely disgusting things to be on the Pareto curve" (https://www.latent.space/p/jev). He is against
  public benchmarks: "it needs to be vibes and trust until you put it into a workflow and evaluate it for
  that workflow" (https://www.latent.space/p/jev).

---

## 3. What they unlock in applications

TypeSafe's own list (https://typesafe.ai/blog/introducing-system-one-models-and-jev):
- "AI-Powered Workflows / smart if-statements": "fuzzy decision rules: classify, route, score, extract, or
  branch where hand-written logic is too brittle."
- "Map-reducing over big data. Turn petabytes of data into features and insights."
- "Real-time applications. 100ms speeds means you can use AI in your applications where UX is critical."
- "Verify everything. Score, judge, verify, guardrail, and detect jailbreaks of LLM prompts, reasoning
  traces, and/or outputs."
- "Think of Jev as a frontier-intelligence function call: unstructured state in, typed probabilistic
  decisions out."

Almeida's list on Latent Space (https://www.latent.space/p/jev): computer use and games (Doom, driving),
coding agents and linting, voice + browser control, real-time NPC behaviour, and entity resolution in
"dark data." His argument is that speed and a fixed type remove the human-in-the-loop requirement.

Patterns and cookbooks from the official docs (https://docs.typesafe.ai/llms.txt):
- patterns: speculative fan-out, confidence-gated routing, composite scoring, intent routing
- cookbooks: re-ranking, line-by-line semantic find, function calling, citation checking, LLM guardrails,
  hierarchical classification, knowledge-graph entity alignment, classifying RAG passages, "SDE cascade"
- demos: a smart-home assistant

**Confidence-gated automation** (https://docs.typesafe.ai/confidence.md;
https://www.marktechpost.com/2026/09/23/a-coding-guide-to-typesafe-ai-jev/):
- High confidence → act automatically. Middle → confirm. Low → hand to a human or an LLM.
- "A confidence threshold is not one number." The coding guide's example thresholds are 0.50 for a balance
  check, 0.85 for a transfer and 0.90 for closing an account.
- AnyJev's benchmark measures this directly as "auto-decidable traffic at 5% error": 7.7% → 52.0% after
  calibration (https://www.marktechpost.com/2026/09/23/nokia-open-sources-anyjev-a-training-free-layer-that-turns-any-open-llm-into-a-calibrated-decision-model/).

**Per-event / high-volume "reflex" decisions.** Heym says these models fit reflex classification tasks
that happen millions of times: ticket routing, quality gates, retrieval scoring. They replace classification
that used to be hidden inside generated text (https://heym.run/blog/system-one-models). Heym's templates:
- support triage
- smart model router, which routes to the right LLM *before* expensive inference
- RAG reranker
- agent tool gate
- post-quality scoring

**Model routing / LLM cascade:** use the cheap decision model first and escalate only low-confidence cases
(https://heym.run/blog/system-one-models; Lindfors makes the same point, https://lindfors.no/blog/a-first-look-at-typesafes-jev/).

**Real-time control loops.** Sean Goedecke suggests "tiered goals": strategy every 10 s, tactics every 5 s,
targets every 1 s and inputs every 100 ms. He calls these models "a meaningful alternative to tool calls
for realtime scenarios." He also notes that standard LLMs can act as System One models through structured
output and prefilling (https://www.seangoedecke.com/two-techniques-for-working-with-system-one-models/).

**High-cardinality choice.** Wikiracing means choosing among "hundreds to thousands of links" per step.
Jev handles this with a "2 stage-system of scoring independently then making an explicit choice"
(https://typesafe.ai/blog/introducing-system-one-models-and-jev). Goedecke's "tournament choice sampling"
does the same thing by hand (https://www.seangoedecke.com/two-techniques-for-working-with-system-one-models/).

**In the browser / on device / offline (Laya only, because the weights are open):**
- In-tab via ONNX Runtime Web (https://github.com/vishalmysore/layaForWeb)
- CoreML on an M4 Mac (https://gist.github.com/fordnox/e592d0f68b543fd044be8e6d040863a0)
- Node via ONNX (https://huggingface.co/receptron/laya-onnx)
- An ASTGL author chose local Laya for "privacy and control," not accuracy (https://astgl.com/p/local-laya-vs-hosted-jev-typed-decisions)

**Semantic filtering inside a database.** A MySQL plugin "that filters rows by meaning" (https://github.com/maayanlevy/mysql-ailike, via HN Algolia).

**Big-data feature extraction.** Lindfors ran 11 questions × 24 Norwegian hearing documents for half a cent
(https://lindfors.no/blog/a-first-look-at-typesafes-jev/). One build is "3,282 posts, eight questions each"
(https://madewithjev.com). HN commenter vintermann suggested genealogy record matching (massive pairwise
scoring) (https://news.ycombinator.com/item?id=49717558).

---

## 4. ML engineering depth

### How is this different from a zero-shot classifier?
- **NLI zero-shot** (e.g. bart-large-mnli) "reframe[s] classification as an entailment problem, requiring
  separate forward passes per category, scaling costs linearly" (https://www.mindstudio.ai/blog/jev-vs-classic-classifiers-benchmark).
  - Laya instead puts all options into one input and scores each at its own `[MASK]` token in **one** pass
    (https://huggingface.co/convaiinnovations/laya).
  - Jev answers several independent questions per call (docs).
- **Embedding similarity** (e.g. bge-m3 cosine) is a baseline in zhuyansen's benchmark (below).
- **Fine-tuned BERT** needs labelled data and retraining whenever classes change. System One models take
  label *descriptions* and instructions at inference time (https://www.mindstudio.ai/blog/jev-vs-classic-classifiers-benchmark;
  https://github.com/dhruvmehra/jevbench).
- **HN skeptics say this is old tech repackaged:**
  - "Zero-shot classification via BART existed for years" (niutech).
  - Constrained generation already exists (bigglebear). He said an open recreation would take days and then
    reported doing it in ~2 hours.
  - BNF-constrained decoding has existed for years (soleveloper).
  - porridgeraisin: RLCD is a known technique, but TypeSafe made a "polished product that works… in wide
    variety of usecases."
  - The CEO clarified the training as "zero-shot" rather than "instruction-tuned."
  (all https://news.ycombinator.com/item?id=49717558)
- **Laya's own card says the Laya *base* is NOT a good zero-shot classifier.** Base checkpoints score
  0.362 (English) and 0.352 (multilingual) on typed-decisions, where random is 0.318: "Laya is a fast base to
  specialise, not a zero-shot decision engine" (https://github.com/NandhaKishorM/laya;
  https://huggingface.co/convaiinnovations/laya). The 0.766 headline number comes from the checkpoint
  fine-tuned on that benchmark's workflows (https://wilsonwu.me/en/blog/2026/jev-vs-laya/).
  - A comparison piece says "BART-MNLI provides a more stable and practically useful zero-shot baseline"
    than Laya base (search-result summary of https://www.besthub.dev/articles/open-source-decision-model-laya-vs-jev-speed-wins-zero-shot-fails-befced0a2228;
    I did not open that page) **[unverified]**.

### Jev vs BERT-family zero-shot, measured by a third party
Source: https://github.com/zhuyansen/jev-zeroshot-vs-bert, using Jev `jev-1.13-20260917` via OpenRouter.

| Task | bart-large-mnli | DeBERTa-v3-large-zeroshot-c | bge-m3 cosine | Jev |
|---|---|---|---|---|
| AG News | 0.677 | 0.763 | 0.777 | 0.865 |
| SST-2 | 0.914 | 0.913 | 0.864 | 0.960 |
| Banking77 | 0.428 | 0.579 | 0.722 | 0.712 |
| TweetEval-emotion | 0.749 | 0.760 | 0.650 | 0.827 |
| PAWS (AUC) | 0.730 | 0.908 | 0.665 | 0.936 |
| arXiv 2026-09 | 0.550 | 0.589 | 0.554 | 0.891 |

- "Jev zero-shot ≈ ~230 labels on AG News and Banking77, and > 2,048 labels on SST-2, TweetEval-emotion and
  PAWS." That is the number of labelled examples a supervised model would need to match Jev. Clean DeBERTa
  zero-shot is worth only "~26 labels" on AG News.
- Contamination control: on arXiv papers from after Jev's training, Jev loses only 0.035 vs 0.112 for
  DeBERTa. The author notes that the popular DeBERTa zeroshot-v2.0 was itself trained on AG News and Banking77.
- MindStudio, Banking77 (https://www.mindstudio.ai/blog/jev-vs-classic-classifiers-benchmark):
  - classic NLI zero-shot 48.8%
  - updated NLI 66.7%
  - Jev zero-shot 80.1%
  - trained 22M encoder + logistic regression 93.2%
  - Jev reported 88% average confidence against ~80% actual accuracy, so it was slightly overconfident there.
- **[CONFLICT]** Jev on Banking77:
  - 0.712 (zhuyansen)
  - 80.1% (MindStudio)
  - 76.4% (jevbench)
  - 0.870 on 72 labels (quoted on Laya's card)
  These use different samples and label sets.

### Laya architecture (the only System One model with full public details)
All from https://huggingface.co/convaiinnovations/laya and https://github.com/NandhaKishorM/laya.
- **Backbone:** ModernBERT-large, 395M params, 28 bidirectional layers, fully fine-tuned. Plus a decision
  head of ~25M params with 2 transformer layers, for ~421M total (https://wilsonwu.me/en/blog/2026/jev-vs-laya/).
  The multilingual model uses mmBERT-base (22 layers, 256k vocab).
- **Heads:** "2 transformer layers, an option-marker scorer, and an act/escalate head."
  - The model card says `action.act_probability` is unreliable (AUROC 0.30).
- **How options are encoded:** options and question are concatenated with the state text. "Every option is
  scored at its own `[MASK]` token, then softmaxed over that question's options."
  - Options and question share a `head_max_len` budget of 192 tokens (English) or 256 (multilingual). The
    rest of the context goes to the document.
  - This is why accuracy falls past ~20 options: Banking77 gets only "3-4 tokens per label," scoring 0.425
    vs Jev's 0.870 (https://github.com/NandhaKishorM/laya).
- **The three heads** (https://github.com/NandhaKishorM/laya):
  - `choice`: multi-class
  - `score`: ordinal regression over level descriptions, giving an expected value plus a distribution
  - `noul`: binary P(true)
- **Training objective:** RLCD.
  - The model "reports a distribution; exploration adds zero-mean Gaussian noise to the logits; the reward
    is a strictly proper scoring rule (log + spherical, plus ranked probability score for ordinal
    questions)." It uses "REINFORCE with a group-mean baseline (GRPO-style)" (https://huggingface.co/convaiinnovations/laya).
  - The author's post adds TD(λ) for multi-turn trajectories (https://dev.to/nandakishor_m_6cc0adfde9f/i-built-non-autoregressive-decision-models-a-year-ago-then-a-frontier-lab-called-it-a-18me).
  - **Note:** Laya reuses TypeSafe's acronym. The HF card expands it as "Reinforcement Learning for
    Calibrated Decisions." The GitHub README summary expands it as "Reinforcement Learning with Calibrated
    Distributions." **[minor CONFLICT]**
  - Why use RL with a proper scoring rule instead of cross-entropy? The README says it "incentiviz[es]
    well-calibrated probability estimates rather than overconfident predictions."
    - **[my inference]** Log loss is itself a proper scoring rule, so the practical difference is probably
      the spherical/RPS terms and the exploration scheme.
- **Training data:** public benchmarks (MASSIVE intent, XNLI, AG News, BoolQ, DAIR Emotion) plus 2,000 decisions
  across four typed-decisions workflows for the fine-tuned checkpoint (https://github.com/NandhaKishorM/laya).
- **Calibration:** the model "ships over-confident." Temperature is fitted per (question type, option count).
  - **[CONFLICT]** on the pre-fit English ECE: 0.466 → 0.081 (GitHub README; also
    https://dev.to/vishalmysore/what-is-laya-laya-vs-jev-with-live-demo-4j6e) vs 0.213 → 0.081 (HF card).
  - Multilingual goes from 0.314 → 0.106, and `laya-multilingual` ships uncalibrated.
- **Speed features:**
  - `predict_batch()` shares forward passes, giving 2.6× throughput on 20 tickets.
  - `predict_long()` uses sliding windows.
  - `predict_shortlist(k=20)` uses encoder embeddings to prune high-cardinality options.
  - A script Router (<0.5 ms) dispatches to the right checkpoint (https://github.com/NandhaKishorM/laya).
- **Known failure modes on the card** (https://github.com/NandhaKishorM/laya; https://huggingface.co/convaiinnovations/laya):
  - `noul` sometimes follows the `true:`/`false:` label text instead of the state
  - negation false positives
  - position bias (it rarely picks the first score level)
  - SST-5 ordinal accuracy of only 0.372
- **Script collapse:**
  - The English checkpoint scored Khmer at 0.000 accuracy with 95.2% confidence (HF card; invidelabs says
    "every answer wrong while reporting 0.952 confidence").
  - jamilxt reports Bengali at "0.080 accuracy… while reporting 0.945 confidence" (https://dev.to/jamilxt/jev-vs-laya-the-same-ai-idea-one-closed-and-one-open-3c6e).
  - The Router exists to avoid this.
  - This is a vivid example of calibration failing out of distribution **[my framing]**.

### Jev architecture (what is and isn't known)
- Undisclosed architecture, parameter count and training data. Stated: "new model architecture, parallel sampler,
  RLCD" (https://typesafe.ai/blog/introducing-system-one-models-and-jev).
- High-cardinality choice is two-stage: score each option independently, then make an explicit choice
  (same source).
- It is **not fully deterministic** (https://github.com/gazelle93/decision-models-under-pressure):
  - 4.3% of answers changed across repeats with a fixed option order.
  - 14.6% changed from reordering alone at 64 candidates.
  - This matches Almeida's "robustness over determinism" (https://www.latent.space/p/jev).
- Only one internal detail leaks through the docs: P(noul) is not guaranteed to equal 1 − P(not noul)
  (https://docs.typesafe.ai/model-jaggedness/jev-1.13.md). That suggests the probabilities are not
  produced by one shared softmax over a question and its negation **[my inference]**.

### How the open clones differ technically
- **Kev** (Jared Palmer):
  - A rank-16 LoRA adapter plus a small **pointer head** on a Qwen base. The head "scores options by
    comparing their hidden states against a decision token," followed by a softmax.
  - Questions are kept independent through attention masking or separate passes.
  - Training data: "10,000 examples from ten public datasets, 896 generated policy examples, and 1,680 examples
    from 60 generated rule structures"; "no Jev outputs were used for training."
  - Sizes 0.8B/4B/9B (Qwen3.5) and 27B (Qwen3.8). A Kev-4B run costs ~\$1 on an H100.
  - Apache-2.0 and API-compatible with Jev.
  (https://github.com/jaredpalmer/kev)
- **Bespoke Nimble** (Bespoke Labs):
  - A LoRA on Qwen3.5-9B. It reads "the scores for the tokens we care about" from the logits, with softmax
    and temperature.
  - It uses "contrastive data curation": paired examples that differ in one fact, so the model learns to
    find the deciding evidence.
  - 2,676 training examples across 10 domains. The trainer uses cross-entropy over the allowed candidate
    logits. It avoided distilling from Jev.
  - 8,192-token input and 1–255 options (https://github.com/bespokelabsai/nimble).
  - **[CONFLICT]** on the option limit: invidelabs says "at most 26 string choices for an enum field."
    This is possibly an older version (https://blog.invidelabs.com/system-one-models-jev-laya-open-alternatives/).
  - Built "in two days" (search summary of https://huggingnews.com/ai/update-bespoke-labs-builds-open-jev-rival-in-2-days-using-9b-model-cc9dd3f5) **[unverified, page not opened]**.
- **AnyJev** (Nokia Applied Research: Jiamu Zhang, Tianze Yang, Yucheng Shi, Liang Wu):
  - Training-free. It reads the next-token distribution of any causal LLM.
  - It fixes position bias with cyclic rotations: each option appears in every slot, costing ~K prefills.
  - It removes label priors ("batch calibration with prior correction").
  - Levels:
    - L0: no labels needed.
    - L1: temperature scaling, 100–500 labels.
    - L2: a closed-form linear head on hidden states, 100–300 labels.
  - Qwen3-8B on BANKING77:
    - order-flip rate 0.230 → 0.073
    - accuracy 0.747 → 0.803 (L0)
    - calibration error 0.240 → 0.095
  - Apache-2.0 on PyPI, with HF and vLLM backends.
  (https://github.com/nokia-applied-research/AnyJev; https://www.marktechpost.com/2026/09/23/nokia-open-sources-anyjev-a-training-free-layer-that-turns-any-open-llm-into-a-calibrated-decision-model/)
- **Von** (wfzyx):
  - ModernBERT-Large, 395M.
  - **Order-invariant by construction.** "Each option's tokens attend only to the premise and to themselves —
    never to another option." Rotary positions restart per option, so "permuting the options permutes the
    scores and changes nothing else — a guarantee, not a tendency." This fixed a 49.5% flip rate in v1.1.
  - Sub-18 ms on GPU. Trained on ~290k examples including ANLI/WANLI.
  - It claims 9.00 ViZDoom kills vs Jev's 5.62 **[vendor claim]**.
  (https://github.com/wfzyx/von)
- **OpenDecision** (Deepan Wadhwa):
  - Runs "a local natural language inference model," i.e. NLI-based. This is the closest to classic zero-shot.
  - Adds a fourth primitive, **Relation**.
  - Serves `POST /v1/systemone` and plays ViZDoom Deadly Corridor.
  (https://deepanwadhwa.github.io/OpenDecision/)
- **OpenDecider** (Manjunath Shiva): a 400M "nano" encoder model, Apache 2.0, that scores 0.796 on typed-decisions
  by the author's own measurement (https://laya-ai.com/system-one-models) **[single-source, self-reported]**.
- **OpenThai-SystemOne:** Qwen3.5-0.8B, Thai + English, Apache-2.0, v0.3, Sept 20, 2026
  (https://blog.invidelabs.com/system-one-models-jev-laya-open-alternatives/) **[single-source]**.

### Benchmarks and stress tests (Jev vs Laya)
- **Numbers from Laya's own card** (https://huggingface.co/convaiinnovations/laya; https://wilsonwu.me/en/blog/2026/jev-vs-laya/):

  | Benchmark | Laya | Jev |
  |---|---|---|
  | typed-decisions | 0.766 (fine-tuned) | 0.727 |
  | AG News | 0.950 | 0.910 |
  | Banking77 | 0.425 | 0.870 |
  | ECE after temperature fit | 0.081 | 0.246 |

  - The teacher ceiling on typed-decisions is 0.735.
  - The Jev figures are third-party and "were not measured side by side" (wilsonwu).
- **[CONFLICT] on Jev's typed-decisions score:** 0.727 on Laya's card vs 0.754 in OpenDecider's
  measurements (https://laya-ai.com/system-one-models).
- **[CONFLICT] on calibration error:** jamilxt reports Jev at 0.144 and Laya at 0.213, which *reverses* who
  is better calibrated compared with Laya's card (https://dev.to/jamilxt/jev-vs-laya-the-same-ai-idea-one-closed-and-one-open-3c6e).
  The likely explanation is that 0.213 is Laya *before* temperature fitting and 0.081 is after **[my inference]**.
- **"Decision models under pressure"** (https://github.com/gazelle93/decision-models-under-pressure):

  | Stress | Jev | Laya | Best other open model |
  |---|---|---|---|
  | Accuracy at 128 candidates | 60% | 39% | 41% |
  | Accuracy change per doubling of the list | −0.043 | −0.073 | — |
  | Drop with hard distractors | −10.5 pp | −35.1 pp | −25.6 pp |
  | Answers changed by reordering alone (64 candidates) | 14.6% | 49.4% | 0.0% for two models |

  - Laya is fully reproducible (deterministic) but very sensitive to option order.
- **Independent 78-case classifier test** (https://www.gadgetpilipinas.net/2026/09/typesafe-jev-system-one-model-laya/):
  - Jev: 0.974 accuracy at ~302 ms per case.
  - Laya: 0.590 at 30 ms per case.
- **Adversarial test:** Laya got "40.3% accuracy" on 100 adversarial scenarios, and "54% of answers with
  confidence at least 0.90 were wrong" (https://blog.invidelabs.com/system-one-models-jev-laya-open-alternatives/) **[single-source]**.
- **Anthus:** "saw Jev ahead after steering (roughly 87% vs 80%)" (https://www.alphamatch.ai/blog/jev-vs-laya-system-one-2026) **[single-source]**.
- **Nimble holdout of 324 examples:**
  - Nimble 292 (90.12%)
  - Jev 1.13.0 302 (93.21%)
  - untuned Qwen3.5-9B 215 (66.36%)
  - Nimble ~106 ms on an H100 vs Jev ~247 ms
  (https://github.com/bespokelabsai/nimble)
- **Kev on new unseen sources** (https://github.com/jaredpalmer/kev):
  - Kev-27B 0.848 vs Jev 0.857
  - Kev-9B 0.822
  - Kev-4B 0.817
  - On knowledge-heavy questions the gap is bigger: Kev-9B 0.74 vs Jev 0.90 on MMLU (search-result summary,
    not verified on the repo page) **[unverified]**.
- **Lindfors' Jev calibration table**, against Fable 5.1 labels (https://lindfors.no/blog/a-first-look-at-typesafes-jev/):

  | Confidence bucket | Agreement with reference |
  |---|---|
  | 0.9–1.0 | 98% |
  | 0.7–0.9 | 97% |
  | 0.3–0.7 | 34% |
  | 0.0–0.1 | 0% |

  - The author reads this as "a bit underconfident at both ends."
- **The "7.8× faster" claim:** it comes from Laya's model card. It compares Laya's 32.8 ms for a single
  question on a T4 with "TypeSafe Jev's 236–276 ms p50" (https://huggingface.co/convaiinnovations/laya;
  https://github.com/NandhaKishorM/laya).
  - **[CONFLICT]** Laya's author himself says "roughly 4x faster than Jev's published 150 ms latency"
    (https://dev.to/nandakishor_m_6cc0adfde9f/i-built-non-autoregressive-decision-models-a-year-ago-then-a-frontier-lab-called-it-a-18me).
    The Bugtraq headline rounds it to "8 times faster" (https://bugtraqsolutions.com/en/news/2026-09-21-laya-vs-jev-modelos-system-one).
  - **Caveat:** this compares a local GPU forward pass with a hosted API round trip over the network.
    AlphaMatch spells out the distinction: Jev is a "sub-second API path (network + service)" while Laya is a
    "local forward pass often tens of ms once loaded—on your hardware"
    (https://www.alphamatch.ai/blog/jev-vs-laya-system-one-2026). So it is not an apples-to-apples model
    speed comparison.
  - Local Laya is not always fast. ASTGL measured p95 at 143.5 ms, rising to 466.7 ms on a busy host
    (Mac Studio M3 Ultra) (https://astgl.com/p/local-laya-vs-hosted-jev-typed-decisions).
  - In-browser WASM: "about 2 to 5 seconds" for a three-question call on a 2-core machine (https://github.com/vishalmysore/layaForWeb).

---

## 5. What people have built

**TypeSafe's own demos** (https://typesafe.ai/blog/introducing-system-one-models-and-jev):
- **Doom:** plays from structured text state, not pixels. "A non-AI doom bot could play better, but we
  wanted a bot that was reactive to different representations of game state."
  - HN's bigglebear pointed out that structured state lets the bot "cheat" past obstructions (https://news.ycombinator.com/item?id=49717558).
- **Wikiracing:** high-cardinality link choice.
- **Side-by-side vs GPT-5.6 Terra:** the demo filling in fields in parallel.
- **Smart home:** the smart-home assistant demo is in the docs (https://docs.typesafe.ai/llms.txt).

**Jev builds** (showcase at https://madewithjev.com; I did not confirm whether that site is official):
- Justine Moore: natural-language Zillow search
- Gregor Zunic (Browser Use): flight search
- Marcel Pociot: an X post "firewall" extension
- Riley Brown: 500 emails for 3.5 cents
- Ronak Malde: beating the Ender Dragon in Minecraft
- Jerry Liu: DocJev, document classification and splitting
- Cline: jev-browser
- Sarah Drasner: a WebMCP side panel
- Tony Dinh: a YouTube sponsor skipper
- Faadil Shaik: Jev plays Super Mario Bros.
- Moritz Kremb: a sales copilot
- Abol: "\$10,000 in Jev's hands" trading
- Hassan (nutlope): 1kpapers
- Ian Nuttall: a reply-guy filter and "3,282 posts, eight questions each"

**From HN** (Algolia, https://hn.algolia.com/api/v1/search?query=Jev%20TypeSafe&tags=story):
- dabit3/jev-experiments: ~20 "latency-focused demos built by Devin," e.g. jev-shell-guard, commit-sentry,
  send-guard, jev-voice-turn, turbo-rerank, log-sentinel (https://github.com/dabit3/jev-experiments)
- maayanlevy/mysql-ailike: a MySQL plugin that filters rows by meaning
- "TypeSafe's Jev Can't See. I Made It Guess What I Drew Anyway" (mikulskibartosz.name)
- "Typesafe's Jev is the fish at the poker table" (backnotprop.com)
- Jev-CLI (joshLong145/jev-cli)
- Jevify, a skill that moves existing agents onto Jev (Kevin-Zhouu/jevify)
- "Jev, Fly Me to the Moon" (fly.rahmanyoonus.com)
- Jev-mice, a mouse colony sim (mice.jev.carsonsweet.com)
- semanticspace.dev, a 2D semantic space explorer
- Calibrating Jev as a code reviewer (Selmar/typesafe-jev-calibrate-for-code-review)
- Southbridge: Jev for entity resolution in high-throughput pipelines (southbridge.ai)
- mini-jev (r-ms/mini-jev): a Jev-style layer on a local LLM
- **CUA-S1** (trycua): "A System One Model for Computer Use." 95 points, the biggest community Show HN.
  It is a family of small models for form-filling decisions. The first model is CUA-S1-FORMS. Code is MIT
  and it is an "early, source-only research release" (https://github.com/trycua/cua).

**Laya builds:**
- **Vishal Mysore (visrow): Laya fully in a browser tab, no server, no API key.**
  - layaForWeb uses ONNX Runtime Web with WASM by default and experimental WebGPU (int4 only).
  - Quantized builds: q8e8 ~440 MB (default), q4e8 ~290 MB, qdq8 ~430 MB. The q8e8 build keeps the same top
    answer as PyTorch 97.9% of the time.
  - Demo: https://vishalmysore.github.io/layaForWeb/.
  - He also built layaMOE (a frozen 390 MB encoder shared by three 32 MB expert heads, ~490 MB total,
    67.3% vs 59.6% on 108 hand-labelled cases), layaAgent (a System 1/System 2 agent), layaAsRagJudge and
    layaForWorkflows.
  (https://github.com/vishalmysore/layaForWeb; https://dev.to/vishalmysore/what-is-laya-laya-vs-jev-with-live-demo-4j6e)
- archevel/laya: "Ask Laya typed questions in the browser (WebGPU, onnxruntime-web)." Also open-jev-laya, a
  multilingual Laya on Transformers.js (fp16 ONNX ~647 MB) with Gomoku, Big Two and a 3D maze. These come
  from a search summary; I did not open those repos **[unverified]**.
- fordnox: "Laya on Mac M4 CoreML Offline." 178 points on HN, the top Laya story. It runs a CoreML "snake"
  demo with a 560 MB footprint and 778 MB peak (https://gist.github.com/fordnox/e592d0f68b543fd044be8e6d040863a0).
  CoreML weights are at FluidInference/laya-coreml.
- receptron/laya-onnx: an ONNX export plus the `@receptron/laya` npm package for Node/TS, fp32, with max logit
  difference vs PyTorch ≈1e-5 (https://huggingface.co/receptron/laya-onnx).
- fr0stbit3/laya-gguf, a GGUF export. Seen only in HF search results **[unverified]**.
- "Laya, an open decision model that plays Tetris by itself" (brainfunctioncollapse.com/laya, via HN Algolia).
- An ASTGL author put Laya in as a gateway for their LLM router. Acceptable decisions went from 82.5% to
  92.5% (33/40 → 37/40) against a deterministic router, not against Jev (https://astgl.com/p/local-laya-vs-hosted-jev-typed-decisions).
- **Heym** (source-available, self-hosted workflow automation) added a "Decision" node that works with either
  Jev (hosted) or Laya (local ONNX Runtime) and ships five templates. The post is by Ceren Kaya Akgün,
  Sept 21, 2026. Heym notes that "Decision models are absent from the LLM pricing tables we sync," so
  cost tracking has a gap (https://heym.run/blog/system-one-models).
- Official: a Kaggle 2×T4 fine-tuning notebook and the `convaiinnovations/laya-demo` HF Space (https://github.com/NandhaKishorM/laya).

**Benchmarks people built:**
- jevbench (dhruvmehra)
- jev-zeroshot-vs-bert (zhuyansen)
- decision-models-under-pressure (gazelle93)
- Luni/laya-jev-benchmark dataset on HF (seen only in search results)

---

## Controversy, criticism, skepticism

- **Prior-art dispute:**
  - Nandakishor Mukkunnoth (Laya) says TypeSafe "proposed the exact same non-autoregressive decision concept as
    if it was a brand-new scientific breakthrough" (https://www.gadgetpilipinas.net/2026/09/typesafe-jev-system-one-model-laya/).
  - He cites his own papers: arXiv:2503.23303 (SalesRLAgent, Mar 30, 2025) and arXiv:2510.01237 (Sept 2025,
    "schema-based decisions via reinforcement learning").
  - He criticises Jev for launching "without technical papers, without open weights, and with zero open
    training datasets" (https://dev.to/nandakishor_m_6cc0adfde9f/i-built-non-autoregressive-decision-models-a-year-ago-then-a-frontier-lab-called-it-a-18me).
  - modelfit.io's timeline: the paper on Mar 30, 2025, weights on HF May 11, 2025 (MIT), dataset May 12, and
    PyPI May 24.
  - modelfit's counterpoints: "No evidence suggests TypeSafe AI copied the work; parallel invention is common
    in AI." Jev is horizontal while SalesRLAgent was a vertical sales tool. SalesRLAgent had 385 downloads over
    16 months, against "wall-to-wall coverage in 48 hours" for Jev (https://modelfit.io/blog/jev-system-one-open-source-prior-art/).
  - **Rebuttal:** John Curcio, "Laya's Prior Art Claim Is Absurd" (https://xtxinversexty.com/layas-prior-art-claim-is-absurd/):
    - SalesRLAgent's `train.py` "includes the eventual conversion `outcome` in every single observation," which
      is data leakage.
    - Its PPO "cannot be meaningfully described as RL," because the prediction doesn't affect the environment:
      "I can trivially wrap any scalar regression problem in an RL environment."
    - "Unless the author has nonpublic information about Jev's training and architecture, they have nothing
      uniquely in common."
  - As of modelfit's writing, TypeSafe had not responded publicly.
- **"Zero hallucinations" marketing** is the most common criticism on HN. Commenters also objected that the
  original HN title framed Jev as a cheaper "frontier model" when it gives up general generation (jacobgold,
  temporalparts: "A calculator is faster…") (https://news.ycombinator.com/item?id=49717558).
- **Vendor-run evals with LLM reference labels** (GPT-6 Astra + Fable 5.1 average). TypeSafe acknowledges this
  itself (https://typesafe.ai/blog/introducing-system-one-models-and-jev). Almeida openly opposes public
  benchmarks (https://www.latent.space/p/jev).
- **Possibly subsidized pricing:** TypeSafe admits it "can't prove it isn't subsidized"
  (https://typesafe.ai/blog/introducing-system-one-models-and-jev).
- **Laya's headline numbers depend on fine-tuning to the benchmark.** "Laya's high scores come from targeted
  fine-tuning"; base checkpoints are "close to random guessing" (https://wilsonwu.me/en/blog/2026/jev-vs-laya/).
  AlphaMatch: "direct comparisons often mix incompatible versions" (https://www.alphamatch.ai/blog/jev-vs-laya-system-one-2026).
- **Everything is young and self-reported.** "Benchmarks in this space are young and mostly self-reported, on
  different datasets" (https://laya-ai.com/system-one-models).
  - My own observation: the same metric (Jev on Banking77, Jev ECE, Laya ECE, Jev typed-decisions, Jev latency)
    has 2–4 different values across sources.
- **Lots of Jev-clone and alternatives SEO.** Many sites (madewithjev.com, jev101.org, jevaiguide.com,
  laya-ai.com) popped up within two weeks. laya-ai.com says it is unaffiliated. I have not verified who runs
  the others **[note for the post: treat those as low-trust]**.

---

## Sources

Primary / official
- https://typesafe.ai/blog/introducing-system-one-models-and-jev (TypeSafe launch post, Sept 15 2026)
- https://typesafe.ai (homepage; multipliers checked in page source)
- https://typesafe.ai/team
- https://docs.typesafe.ai/ , https://docs.typesafe.ai/llms.txt
- https://docs.typesafe.ai/api.md
- https://docs.typesafe.ai/confidence.md
- https://docs.typesafe.ai/concepts/system-one.md
- https://docs.typesafe.ai/model-jaggedness/jev-1.13.md
- https://openrouter.ai/docs/guides/community/jev
- https://www.latent.space/p/jev (Latent Space interview with Diogo Almeida)
- https://huggingface.co/convaiinnovations/laya (Laya model card)
- https://huggingface.co/api/models/convaiinnovations/laya (HF metadata: created 2026-09-18)
- https://github.com/NandhaKishorM/laya
- https://dev.to/nandakishor_m_6cc0adfde9f/i-built-non-autoregressive-decision-models-a-year-ago-then-a-frontier-lab-called-it-a-18me (Laya author)
- https://github.com/nokia-applied-research/AnyJev
- https://github.com/jaredpalmer/kev
- https://github.com/bespokelabsai/nimble
- https://github.com/wfzyx/von
- https://deepanwadhwa.github.io/OpenDecision/
- https://github.com/trycua/cua

Secondary / press / explainers
- https://heym.run/blog/system-one-models
- https://laya-ai.com/system-one-models (unaffiliated community site)
- https://dev.to/jamilxt/jev-vs-laya-the-same-ai-idea-one-closed-and-one-open-3c6e
- https://wilsonwu.me/en/blog/2026/jev-vs-laya/
- https://www.gadgetpilipinas.net/2026/09/typesafe-jev-system-one-model-laya/
- https://blog.invidelabs.com/system-one-models-jev-laya-open-alternatives/
- https://bugtraqsolutions.com/en/news/2026-09-21-laya-vs-jev-modelos-system-one (headline only)
- https://www.alphamatch.ai/blog/jev-vs-laya-system-one-2026
- https://flaviocopes.com/jev/
- https://www.marktechpost.com/2026/09/19/typesafe-ai-releases-jev/
- https://www.marktechpost.com/2026/09/23/a-coding-guide-to-typesafe-ai-jev/
- https://www.marktechpost.com/2026/09/23/nokia-open-sources-anyjev-a-training-free-layer-that-turns-any-open-llm-into-a-calibrated-decision-model/
- https://www.latent.space/p/ainews-jev-a-system-one-model-that
- https://modelfit.io/blog/jev-system-one-open-source-prior-art/
- https://xtxinversexty.com/layas-prior-art-claim-is-absurd/
- https://www.seangoedecke.com/two-techniques-for-working-with-system-one-models/
- https://www.mindstudio.ai/blog/jev-vs-classic-classifiers-benchmark

Independent tests / benchmarks
- https://lindfors.no/blog/a-first-look-at-typesafes-jev/
- https://github.com/zhuyansen/jev-zeroshot-vs-bert
- https://github.com/dhruvmehra/jevbench and https://github.com/dhruvmehra/jevbench/blob/main/docs/results/2026-09-22-n500-summary.md
- https://github.com/gazelle93/decision-models-under-pressure
- https://astgl.com/p/local-laya-vs-hosted-jev-typed-decisions

Community builds / discussion
- https://news.ycombinator.com/item?id=49717558 (HN launch thread, 1,984 pts / 520 comments)
- https://hn.algolia.com/api/v1/search?query=Jev%20TypeSafe&tags=story
- https://hn.algolia.com/api/v1/search?query=Laya&tags=story
- https://hn.algolia.com/api/v1/search?query=System%20One%20model&tags=story
- https://madewithjev.com
- https://github.com/dabit3/jev-experiments
- https://github.com/vishalmysore/layaForWeb
- https://dev.to/vishalmysore/what-is-laya-laya-vs-jev-with-live-demo-4j6e
- https://gist.github.com/fordnox/e592d0f68b543fd044be8e6d040863a0
- https://huggingface.co/receptron/laya-onnx

Could not read (blocked): towardsai "Introducing System One Models: Laya and Jev", medium.com/@visrow
live-demo post, medium data-science-in-your-pocket post, theneuron.ai explainer.
