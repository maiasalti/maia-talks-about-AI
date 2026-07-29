# Attention Is Still All You Need — research notes

Topic: Moonshot AI's Kimi K3 (released July 16–17, 2026), the Muon optimizer, and what both mean for
US export controls, frontier-model competition, and commoditization of LLMs. Article is framed around
an emergency episode of *Moonshots with Peter Diamandis* (Ep. 272, recorded July 19, 2026) reacting to
K3's release.

## Moonshots podcast Ep. 272 (the article's anchor)

- Recorded July 19, 2026, an "emergency episode" triggered by K3's release the prior day.
- Full panel: Peter Diamandis (host), Salim Ismail, Dave Blundin, Emad Mostaque, Alexander Wissner-Gross.
- Framed as an "AI Sputnik moment" — shift from a US duopoly to a global free-for-all.
- Alexander Wissner-Gross ("Alex"): architecture is "no magic" — still fundamentally a transformer,
  well-understood MoE routing + linearized attention. Said "attention is still all you need" (title
  source). Asked: "What are the American frontier labs spending their money on? If you can just use a
  transformer to get this close, it's already on the cost frontier."
- Dave Blundin: "Frontier intelligence is now a totally perishable asset. The shelf life is weeks now
  for anybody that gets to the very edge." Also: "We're expecting 100 to 10,000x within three years on
  just the raw compute through quantization and new compute methods. That's multiplicative with
  algorithmic improvements. Realistically, a million X."
- Emad Mostaque: predicts Fable-5-level capability on a normal MacBook within 18 months; cost of
  intelligence to drop ~100x by end of 2027 due to quantization-native chipsets.
- Alex Wissner-Gross also writes a Substack, "The Innermost Loop."

## Kimi K3 facts

- Released July 16–17, 2026 by Moonshot AI (China). Open weights promised for release ~July 27, 2026.
- 2.8 trillion total parameters, MoE. 1M-token context window. Native vision.
- Architecture: Kimi Delta Attention (KDA) — linear recurrence for most of the sequence, with sparse
  full-attention "delta" passes inserted at intervals. Up to 6.3x faster decoding at 1M-token context.
  Also uses "Attention Residuals" (AttnRes) — selective retrieval across depth instead of uniform
  accumulation.
- Stable LatentMoE: 16 of 896 experts activated per token + shared experts that run for every token.
  First Moonshot flagship trained without needing MuonClip stability patch at this scale.
- ~2.5x scaling-efficiency improvement over K2.
- Benchmarks: Artificial Analysis private eval Elo 1547, behind only Claude Fable 5. Beats Claude Opus
  4.8 and GPT-5.5 (high) on most tasks. Beats Fable 5 on Frontend Code Arena specifically. Trails Fable 5
  and GPT-5.6 Sol overall. Uses more tokens than Western models on simple tasks (efficiency tradeoff).
- Pricing: $3/M input, $15/M output tokens (with caching discounts) — most expensive Chinese-lab model
  to date, but still far cheaper than Fable 5 (~$50/M output). Up from K2.6's $0.95/$4.
- Compute: earlier K2 models confirmed trained on Nvidia H800 (China-compliant, reduced-interconnect
  version of H100, restricted export since late 2023). K3's own benchmark docs reference H200s and "a
  GPGPU from an alternative vendor" (widely read as Huawei Ascend) without specifying deployment split.
- Moonshot president Yutong Zhang (Davos 2026): "We knew we didn't have the luxury to simply scale up
  compute… That forced us to focus on fundamental research and efficiency."
- Bank of America note: pre-training scaling + architectural innovation "can still deliver step-change
  gains for flagship Chinese models" under compute constraints.
- Market reaction described as a second "DeepSeek shock" / "AI Sputnik moment" (Fortune, BigGo).

## Muon optimizer facts

- Muon = MomentUm Orthogonalized by Newton-Schulz. Developed by Keller Jordan.
- Applies only to 2D hidden-layer weight matrices; embeddings/output layers still use AdamW.
- Step 1: SGD-momentum (EMA of gradients, optional Nesterov) — same as standard momentum.
- Step 2: orthogonalize the momentum matrix — replace it with the nearest orthogonal matrix (UV^T from
  SVD M = UΣV^T), which sets every singular value to 1 while preserving direction. This equalizes the
  influence of all directions in the update instead of letting a few dominant gradient directions run
  away with it (momentum updates are naturally close to low-rank/ill-conditioned).
- Full SVD is too slow to run every step, so Muon approximates orthogonalization via Newton-Schulz
  iteration: X_{k+1} = aX_k + b(X_k X_k^T)X_k + c(X_k X_k^T)^2 X_k, ~5 iterations, tuned coefficients
  a≈3.4445, b≈-4.7750, c≈2.0315. This is a quintic polynomial applied to singular values that converges
  them toward 1. Pure matmuls → runs efficiently on tensor cores, no eigendecomposition needed.
- Reported ~35% training speedup vs well-tuned AdamW on NanoGPT-scale benchmarks, ~0.5–0.7% FLOP
  overhead. Theoretical connection to Shampoo's preconditioner (structure-aware 2nd-order-ish method)
  without the accumulation/inversion cost.
- At large scale, Muon's more aggressive updates can cause exploding attention logits and training
  divergence. Moonshot's fix: QK-Clip — rescale query/key projection weights whenever attention logits
  cross a threshold. Muon + QK-Clip = MuonClip. Enabled Kimi K2 to train on 15.5T tokens with (per
  Moonshot) zero training crashes. K2: 1T total params / 32B activated MoE.

## "Open Weights and American AI Leadership" letter (July 24, 2026)

- Open letter hosted by NVIDIA: https://images.nvidia.com/pdf/Open-Weights-and-American-AI-Leadership.pdf
- Promoted by Jensen Huang in his first ever post on X (July 24, 2026, 9:18 PM). Screenshot of
  that post is used in the article: /public/images/attention-is-still-all-you-need/jensen-huang-open-weights-letter.png
- Core argument: downloadable model weights are strategic infrastructure for US AI leadership. Asks
  policymakers to expand compute access for startups/researchers, fund shared training assets, and avoid
  premature restrictions on open models. Explicitly frames it as "the world needs both frontier closed
  models and frontier open models."
- Four points as summarized in the article: (1) access — any org can use AI without paying to train a
  frontier model; (2) competition — widens the field of who can build and optimize, analogous to the
  1980s open-source software movement; (3) safety — everyone can test for vulnerabilities; (4) reduces
  the risk of concentrated AI power.
- 25 signatories at launch. Full list, read off the signature block in the letter PDF as shown in
  Huang's post: American Innovators Network, Andreessen Horowitz, Arcee AI, Arena, Black Forest Labs,
  Box, CrowdStrike, Dell Technologies, Emergence Capital, Hugging Face, IBM, The Linux Foundation,
  Mariana Minerals, Meta, Microsoft, Mistral, Mozilla, NVIDIA, Palantir, Perplexity, Reflection,
  Replit, ServiceNow, Telnyx, Y Combinator. OpenAI, Anthropic, Google, and xAI are all absent from that
  list — the absence drove most of the coverage.
- Huang's post: https://x.com/JensenHuang/status/2080643682408321103 (9:18 PM, July 24, 2026; 63.8M
  views, 171K likes as of July 29). Post text: "For my first post, I'm sharing a letter @NVIDIA signed
  on why open models matter. … The world needs both frontier closed models and frontier open models."
- Within ~a day the list doubled to 50 signatories; OpenAI and Google joined. Amazon and Anthropic did not.
- Context: Washington was weighing restrictions on Chinese open-weight AI models at the time.

## Sources

- https://www.youtube.com/watch?v=hPb3SESIjdU (Moonshots Ep. 272, emergency episode)
- https://theinnermostloop.substack.com/ (Alexander Wissner-Gross's Substack)
- https://images.nvidia.com/pdf/Open-Weights-and-American-AI-Leadership.pdf
- https://www.tomshardware.com/tech-industry/artificial-intelligence/nvidia-and-24-other-companies-sign-open-weights-letter-as-washington-weighs-chinese-ai-model-ban
- https://www.forbes.com/sites/sandycarter/2026/07/25/huangs-open-weights-letter-doubled-to-50-without-amazon-and-anthropic/
- https://thenextweb.com/news/open-weights-american-ai-leadership-letter-huang-nvidia-openai-absent
- https://finance.biggo.com/podcast/4947767cedfe7274 (Ep. 272 summary/quotes)
- https://www.cnbc.com/2026/07/17/moonshot-ai-kimi-k3-model-openai-anthropic-china.html
- https://www.marktechpost.com/2026/07/16/moonshot-ai-releases-kimi-k3-a-2-8-trillion-parameter-open-moe-model-with-kimi-delta-attention-and-1m-context/
- https://www.bloomberg.com/news/articles/2026-07-17/china-s-powerful-new-moonshot-ai-model-closes-gap-with-us-rivals
- https://simonwillison.net/2026/Jul/16/kimi-k3/
- https://www.tomshardware.com/tech-industry/artificial-intelligence/moonshot-releases-2-8-trillion-parameter-kimi-k3
- https://www.scmp.com/tech/tech-trends/article/3332364/chinas-moonshot-claims-build-models-fewer-high-end-ai-chips-us-rivals-use
- https://fortune.com/2026/07/17/china-moonshot-kimi-k3-markets-china-ai/
- https://www.forbes.com/sites/tylerroush/2026/07/17/chinese-ai-startup-moonshot-unveils-kimi-k3-model-will-it-challenge-openai-and-anthropic/
- https://decrypt.co/373716/china-kimi-k3-largest-open-source-ai-model-ever-beats-claude-fable-gpt-5-6-sol
- https://finance.biggo.com/podcast/4947767cedfe7274
- https://kellerjordan.github.io/posts/muon/
- https://medium.com/@ranjanunicode22/muonclip-the-optimizer-that-made-trillion-parameter-kimi-k2-possible-47a2e6458462
- https://medium.com/@gauritr01/the-truth-about-kimi-k2-pretraining-muon-optimizer-moe-unpacked-43554527d94a
- https://github.com/MoonshotAI/Kimi-K2
- https://huggingface.co/moonshotai/Kimi-K2-Instruct
