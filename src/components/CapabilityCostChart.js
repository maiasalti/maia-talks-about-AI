"use client";

import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Legend,
} from "recharts";

/*
  VISUAL 2 — "Capability vs Cost" frontier comparison
  ------------------------------------------------------------------
  X = cost per 1M OUTPUT tokens (USD, log scale)
  Y = capability = Artificial Analysis Intelligence Index, v4.1
  Story: DeepSeek sits on the cost-efficient frontier (cheap for its
  capability); top Western models lead on absolute capability at much
  higher cost. "DeepSeek redrew the cost-for-capability frontier and
  that line held" — NOT "DeepSeek beat everyone" or vice versa.

  ==================================================================
  DATA PROVENANCE — researched 2026-06-16. Every number with source.
  Benchmark = Artificial Analysis Intelligence Index (composite,
  independently measured — NOT vendor self-reported). Chosen because it
  was the one benchmark cleanly available for every current model and
  still spreads models out near the saturated frontier.

  *** CRITICAL CAVEAT (verify before publishing) ***
  Artificial Analysis RE-BASED the Index over time. The PLOT_SET below is
  all on the CURRENT v4.1 axis (9 harder evals) from the live model pages.
  DeepSeek R1's launch score (60) is on a RETIRED 7-eval index and is NOT
  comparable — it is plotted separately as a flagged "ghost" point for
  historical context only. Do not read R1's y against the v4.1 points.
  Older launch-day press scores (GPT-5.5 ~60, V4 ~52, Qwen ~46) were on
  earlier index versions and are 5-11 pts higher — do NOT mix them in.

  PLOT_SET (all AA Index v4.1, live pages, directly comparable):
    GPT-5.5 (xhigh)        out $30.00  idx 55  price: openai.com/api/pricing  score: artificialanalysis.ai/models/gpt-5-5            SOLID
    GPT-5.4 (xhigh)        out $15.00  idx 51  price: openai.com/api/pricing  score: artificialanalysis.ai/models/gpt-5-4            SOLID
    Claude Opus 4.8        out $25.00  idx 56  price: platform.claude.com/docs/en/about-claude/pricing  score: artificialanalysis.ai/models/claude-opus-4-8   SOLID
    Claude Sonnet 4.6      out $15.00  idx 47  price: platform.claude.com/docs/en/about-claude/pricing  score: artificialanalysis.ai/models/claude-sonnet-4-6-adaptive  SOLID (Adaptive/Max-effort; non-reasoning page shows 36)
    Gemini 3.1 Pro Preview out $12.00  idx 46  price: ai.google.dev/gemini-api/docs/pricing (<=200K ctx; $18 above)  score: artificialanalysis.ai/models/gemini-3-1-pro-preview  SOLID
    Gemini 3.5 Flash       out  $9.00  idx 50  price: ai.google.dev/gemini-api/docs/pricing  score: artificialanalysis.ai/models/gemini-3-5-flash   SOLID
    DeepSeek V4 Pro        out  $0.87  idx 44  price: api-docs.deepseek.com/quick_start/pricing  score: artificialanalysis.ai/models/deepseek-v4-pro    price SOLID / score CONTESTED (44 current vs 52 at launch)
    DeepSeek V3.2          out  $1.60  idx 25  price+score: artificialanalysis.ai/models/deepseek-v3-2   CONTESTED (25 is AA "estimated"; being deprecated mid-2026)
    Qwen3.6-27B (open)     out  $3.60  idx 37  price+score: artificialanalysis.ai/models/qwen3-6-27b     CONTESTED (37 current vs 46 at launch)

  GHOST / FOOTNOTE POINT (different index version — flagged, not comparable):
    DeepSeek R1 (2025 launch) out $2.19  idx 60 on the RETIRED 7-eval index
      price+score: artificialanalysis.ai/articles/deepseek-r1-update   SOLID for its era, NOT comparable to v4.1.

  DROPPED (couldn't source cleanly on the v4.1 axis this session — do not guess):
    GPT-5.5 Pro, Gemini 3.5 Pro (not GA mid-June, no official pricing),
    GPT-5.2 (retired), GPT-5.5 Instant (consumer, no clean API/index pair),
    Claude Fable 5 / Mythos 5 (gated, no independent AA score).
  ==================================================================
*/

const COLOR_WESTERN = "#4A90E2";   // US frontier labs
const COLOR_DEEPSEEK = "#f97316";  // DeepSeek
const COLOR_OPEN = "#10b981";      // open-weight competitor
const COLOR_GHOST = "#f9a86e";     // R1 launch (flagged, not comparable)

const WESTERN = [
  { name: "GPT-5.5", date: "2026-04", cost: 30.0, idx: 55 },
  { name: "GPT-5.4", date: "2026-03", cost: 15.0, idx: 51 },
  { name: "Claude Opus 4.8", date: "2026-05", cost: 25.0, idx: 56 },
  { name: "Claude Sonnet 4.6", date: "2026-02", cost: 15.0, idx: 47 },
  { name: "Gemini 3.1 Pro", date: "2026-02", cost: 12.0, idx: 46 },
  { name: "Gemini 3.5 Flash", date: "2026-05", cost: 9.0, idx: 50 },
];

const DEEPSEEK = [
  { name: "DeepSeek V4 Pro", date: "2026-04", cost: 0.87, idx: 44 },
  { name: "DeepSeek V3.2", date: "2025-12", cost: 1.6, idx: 25 },
];

const OPEN = [{ name: "Qwen3.6-27B", date: "2026-04", cost: 3.6, idx: 37 }];

// Not on the v4.1 axis — plotted separately, clearly flagged.
const GHOST = [{ name: "DeepSeek R1", date: "2025 launch", cost: 2.19, idx: 60 }];

// Per-point label placement {dx, dy, anchor} — hand-tuned to stop the
// right-side cluster (GPT-5.x, Claude, Gemini) from overlapping.
const LABEL_POS = {
  "DeepSeek V4 Pro": { dx: 11, dy: 4, anchor: "start" },
  "DeepSeek V3.2": { dx: 11, dy: 4, anchor: "start" },
  "Qwen3.6-27B": { dx: 11, dy: 4, anchor: "start" },
  "DeepSeek R1": { dx: 13, dy: 4, anchor: "start" },
  "Gemini 3.5 Flash": { dx: -12, dy: -9, anchor: "end" }, // up-left, away from GPT-5.4
  "GPT-5.4": { dx: 11, dy: -9, anchor: "start" }, // up-right
  "Gemini 3.1 Pro": { dx: -12, dy: 6, anchor: "end" }, // left, away from Sonnet
  "Claude Sonnet 4.6": { dx: 11, dy: 9, anchor: "start" }, // down-right
  "Claude Opus 4.8": { dx: -12, dy: -9, anchor: "end" }, // up-left, away from GPT-5.5
  "GPT-5.5": { dx: 12, dy: 11, anchor: "start" }, // down-right
};

const X_MIN = 0.5;
const X_MAX = 45;

const fmtCost = (v) => `$${v}`;

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const p = payload[0].payload;
    return (
      <div style={{ background: "rgba(26,26,26,0.98)", padding: "12px", border: "2px solid #4A90E2", borderRadius: "8px" }}>
        {/* div, not p — the page's .prose styles force p/strong/em to black !important */}
        <div style={{ margin: 0, fontWeight: "bold", color: "#ffffff" }}>{p.name}</div>
        <div style={{ margin: "4px 0", color: "#f0f0f0" }}>{p.date}</div>
        <div style={{ margin: "4px 0", color: "#f0f0f0" }}>Cost: ${p.cost.toFixed(2)} / 1M output tokens</div>
        <div style={{ margin: "4px 0", color: "#f0f0f0" }}>AA Index: {p.idx}{p.name.includes("R1") ? " (older index — not comparable)" : ""}</div>
      </div>
    );
  }
  return null;
};

// Model name + date label beside each point (placement-aware)
const PointLabel = ({ x, y, value, index, data }) => {
  const d = data && data[index];
  const p = LABEL_POS[value] || { dx: 11, dy: 4, anchor: "start" };
  return (
    <text x={x + p.dx} y={y + p.dy} fill="#d4d4d4" fontSize={11} textAnchor={p.anchor}>
      {value}
      {d ? ` (${d.date})` : ""}
    </text>
  );
};

export const CapabilityCostChart = () => {
  return (
    <div style={{ background: "#1a1a1a", padding: "30px", borderRadius: "12px", margin: "30px 0", boxShadow: "0 4px 6px rgba(0,0,0,0.3)" }}>
      <h3 style={{ color: "white", textAlign: "center", marginTop: 0, marginBottom: "6px", fontSize: "20px" }}>
        {/* TODO: headline placeholder */}
        Capability vs. Cost: Where the Frontier Sits
      </h3>
      <div style={{ color: "#f0f0f0", textAlign: "center", marginTop: 0, marginBottom: "20px", fontSize: "13px" }}>
        Output-token price (log scale) vs. Artificial Analysis Intelligence Index (v4.1). Researched 2026-06-16.
      </div>

      <ResponsiveContainer width="100%" height={460}>
        <ScatterChart margin={{ top: 10, right: 155, bottom: 30, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis
            type="number"
            dataKey="cost"
            scale="log"
            domain={[X_MIN, X_MAX]}
            ticks={[0.5, 1, 2, 5, 10, 20, 40]}
            tickFormatter={fmtCost}
            stroke="#999"
            tick={{ fontSize: 12, fill: "#999" }}
            label={{ value: "Cost per 1M output tokens (USD, log scale)", position: "insideBottom", offset: -18, fill: "#999" }}
          />
          <YAxis
            type="number"
            dataKey="idx"
            domain={[20, 65]}
            ticks={[20, 30, 40, 50, 60]}
            stroke="#999"
            tick={{ fontSize: 12, fill: "#999" }}
            label={{ value: "AA Intelligence Index (v4.1)", angle: -90, position: "insideLeft", fill: "#999" }}
          />
          <ZAxis range={[120, 120]} />
          <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: "3 3" }} />
          {/* legend at the TOP so it never collides with the x-axis title */}
          <Legend verticalAlign="top" align="center" wrapperStyle={{ fontSize: 12, color: "#ccc", paddingBottom: 14 }} />

          <Scatter name="US frontier labs" data={WESTERN} fill={COLOR_WESTERN} isAnimationActive={false}>
            <LabelList dataKey="name" content={(props) => <PointLabel {...props} data={WESTERN} />} />
          </Scatter>

          <Scatter name="DeepSeek" data={DEEPSEEK} fill={COLOR_DEEPSEEK} shape="diamond" isAnimationActive={false}>
            <LabelList dataKey="name" content={(props) => <PointLabel {...props} data={DEEPSEEK} />} />
          </Scatter>

          <Scatter name="Open-weight (Qwen)" data={OPEN} fill={COLOR_OPEN} shape="triangle" isAnimationActive={false}>
            <LabelList dataKey="name" content={(props) => <PointLabel {...props} data={OPEN} />} />
          </Scatter>

          {/* R1 launch — DIFFERENT index version, flagged */}
          <Scatter name="R1 launch (older index — not comparable)" data={GHOST} fill="transparent" stroke={COLOR_GHOST} strokeWidth={2} shape="diamond" isAnimationActive={false}>
            <LabelList dataKey="name" content={(props) => <PointLabel {...props} data={GHOST} />} />
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>

      <div style={{ textAlign: "center", color: "#f0f0f0", marginTop: "16px", marginBottom: 0, fontSize: 13 }}>
        {/* TODO: caption. KEY HONESTY NOTE — see research-notes.md verify-list. */}
        All scores are third-party (Artificial Analysis), not self-reported. The hollow R1 point uses a retired index version and is not directly comparable to the 2026 points.
      </div>
    </div>
  );
};

export default CapabilityCostChart;
