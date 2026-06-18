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
} from "recharts";

/*
  VISUAL 3 — "Capability vs Cost" frontier comparison
  ------------------------------------------------------------------
  X = cost per 1M OUTPUT tokens (USD, log scale)
  Y = GPQA Diamond (%) — a hard graduate-level science benchmark.
  Story: DeepSeek's cheap line climbed (R1 → V3.2 → V4 Pro) up toward the
  2026 frontier while staying far to the left (cheap). Western frontier
  leads on absolute capability at much higher cost.

  ==================================================================
  DATA PROVENANCE — researched 2026-06-18. Every number with source.
  Benchmark = GPQA Diamond. Prefer Artificial Analysis's STANDARDIZED eval
  (one harness across all models) so points are comparable. Where a value
  comes from a vendor card/paper or a single aggregator, it's flagged.

  *** R1 IS NOW COMPARABLE ***
  Artificial Analysis re-ran the original DeepSeek R1 in their standardized
  harness at ~71% GPQA Diamond — same pipeline as the 2026 models — and R1's
  own launch report (71.5%, CoT pass@1) agrees. So R1 is plotted as a normal
  point, not a flagged ghost.

  *** CAVEATS (verify before publishing) ***
  - GPQA Diamond is fairly SATURATED at the 2026 frontier (90–94% bunched).
    R1 (71), V3.2 (82), Qwen (88) give the vertical range.
  - Claude Sonnet 4.6 is OMITTED — no clean, consistent-setting GPQA found.
  - DeepSeek V3.2 output price corrected to ~$0.42 (was $1.60; DeepSeek runs
    promo windows — re-check the official page).
  - These are mid-2026 numbers past the assistant's training cutoff.

  POINTS:
    GPT-5.5         out $30.00  GPQA 93.5  SOLID (AA std, xhigh)   price: openai.com/api/pricing  gpqa: artificialanalysis.ai/evaluations/gpqa-diamond
    GPT-5.4         out $15.00  GPQA 92.0  SOLID (AA std, xhigh)   same sources
    Claude Opus 4.8 out $25.00  GPQA 93.6  SOLID (AA std, max)     price: platform.claude.com/docs/en/about-claude/pricing  gpqa: artificialanalysis.ai/articles/claude-opus-4-8-analysis-and-benchmarks
    Gemini 3.1 Pro  out $12.00  GPQA 94.1  SOLID (AA std, Preview) price: ai.google.dev/gemini-api/docs/pricing  gpqa: artificialanalysis.ai/evaluations/gpqa-diamond
    Gemini 3.5 Flash out $9.00  GPQA 92.7  CONTESTED (single aggregator source — BenchLM)  price: ai.google.dev/gemini-api/docs/pricing
    DeepSeek V4 Pro out $0.87   GPQA 90.1  SOLID (vendor result reproduced by NIST CAISI)  price: api-docs.deepseek.com/quick_start/pricing  gpqa: nist.gov/.../caisi-evaluation-deepseek-v4-pro
    Qwen3.6-27B     out $3.60   GPQA 87.8  CONTESTED (aggregator, reasoning; setting not AA-confirmed)  price+score: llm-stats.com/models/qwen3.6-27b
    DeepSeek V3.2   out $0.42   GPQA 82.4  CONTESTED (self-reported, reasoning mode)  arxiv.org/html/2512.02556 ; price: openrouter.ai/deepseek/deepseek-v3.2
    DeepSeek R1     out $2.19   GPQA 71.5  SOLID-ish (self-reported ≈ AA's ~71% re-run)  arxiv.org/abs/2501.12948 ; price: api-docs.deepseek.com/quick_start/pricing
    [OMITTED] Claude Sonnet 4.6 ($15) — no clean comparable GPQA number.
  ==================================================================
*/

const COLOR_WESTERN = "#4A90E2";   // US frontier labs
const COLOR_DEEPSEEK = "#f97316";  // DeepSeek
const COLOR_OPEN = "#10b981";      // open-weight competitor

const WESTERN = [
  { name: "GPT-5.5", date: "2026-04", cost: 30.0, gpqa: 93.5 },
  { name: "GPT-5.4", date: "2026-03", cost: 15.0, gpqa: 92.0 },
  { name: "Claude Opus 4.8", date: "2026-05", cost: 25.0, gpqa: 93.6 },
  { name: "Gemini 3.1 Pro", date: "2026-02", cost: 12.0, gpqa: 94.1 },
  { name: "Gemini 3.5 Flash", date: "2026-05", cost: 9.0, gpqa: 92.7 },
];

const DEEPSEEK = [
  { name: "DeepSeek V4 Pro", date: "2026-04", cost: 0.87, gpqa: 90.1 },
  { name: "DeepSeek V3.2", date: "2025-12", cost: 0.42, gpqa: 82.4 },
  { name: "DeepSeek R1", date: "2025-01", cost: 2.19, gpqa: 71.5 },
];

const OPEN = [{ name: "Qwen3.6-27B", date: "2026-04", cost: 3.6, gpqa: 87.8 }];

// One merged series so the tooltip always reads the hovered point.
const DATA = [
  ...WESTERN.map((d) => ({ ...d, group: "western", color: COLOR_WESTERN, shape: "circle" })),
  ...DEEPSEEK.map((d) => ({ ...d, group: "deepseek", color: COLOR_DEEPSEEK, shape: "diamond" })),
  ...OPEN.map((d) => ({ ...d, group: "open", color: COLOR_OPEN, shape: "triangle" })),
];

// Per-point label placement {dx, dy, anchor} — hand-tuned to reduce overlap.
const LABEL_POS = {
  "DeepSeek V3.2": { dx: 11, dy: 4, anchor: "start" },
  "DeepSeek V4 Pro": { dx: 11, dy: 4, anchor: "start" },
  "DeepSeek R1": { dx: 11, dy: 4, anchor: "start" },
  "Qwen3.6-27B": { dx: 11, dy: 4, anchor: "start" }, // beside-right
  "Gemini 3.5 Flash": { dx: -11, dy: -4, anchor: "end" }, // left
  "Gemini 3.1 Pro": { dx: -6, dy: -12, anchor: "end" }, // up-left (highest point)
  "GPT-5.4": { dx: 0, dy: 17, anchor: "middle" }, // below
  "Claude Opus 4.8": { dx: 0, dy: -12, anchor: "middle" }, // above
  "GPT-5.5": { dx: 12, dy: 13, anchor: "start" }, // down-right
};

const X_MIN = 0.3;
const X_MAX = 42;

const fmtCost = (v) => `$${v}`;

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const entry = payload.find((e) => e.payload && e.payload.name);
    if (!entry) return null;
    const p = entry.payload;
    return (
      <div style={{ background: "rgba(26,26,26,0.98)", padding: "12px", border: `2px solid ${p.color || "#4A90E2"}`, borderRadius: "8px" }}>
        {/* div, not p — the page's .prose styles force p/strong/em to black !important */}
        <div style={{ margin: 0, fontWeight: "bold", color: "#ffffff" }}>{p.name}</div>
        <div style={{ margin: "4px 0", color: "#f0f0f0" }}>{p.date}</div>
        <div style={{ margin: "4px 0", color: "#f0f0f0" }}>Cost: ${p.cost.toFixed(2)} / 1M output tokens</div>
        <div style={{ margin: "4px 0", color: "#f0f0f0" }}>GPQA Diamond: {p.gpqa}%</div>
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

// Per-point marker: circle (US labs), diamond (DeepSeek), triangle (Qwen).
const PointShape = ({ cx, cy, payload }) => {
  if (cx == null || cy == null || !payload) return null;
  const c = payload.color;
  if (payload.shape === "diamond") {
    const r = 7;
    const d = `M ${cx} ${cy - r} L ${cx + r - 1} ${cy} L ${cx} ${cy + r} L ${cx - r + 1} ${cy} Z`;
    return <path d={d} fill={c} />;
  }
  if (payload.shape === "triangle") {
    const r = 7;
    const d = `M ${cx} ${cy - r} L ${cx + r} ${cy + r - 1} L ${cx - r} ${cy + r - 1} Z`;
    return <path d={d} fill={c} />;
  }
  return <circle cx={cx} cy={cy} r={6} fill={c} />;
};

export const CapabilityCostChart = () => {
  return (
    <div style={{ background: "#1a1a1a", padding: "30px", borderRadius: "12px", margin: "30px 0", boxShadow: "0 4px 6px rgba(0,0,0,0.3)" }}>
      <h3 style={{ color: "white", textAlign: "center", marginTop: 0, marginBottom: "6px", fontSize: "20px" }}>
        {/* TODO: headline placeholder */}
        Capability vs. Cost: Where the Frontier Sits
      </h3>
      <div style={{ color: "#f0f0f0", textAlign: "center", marginTop: 0, marginBottom: "16px", fontSize: "13px" }}>
        Output-token price (log scale) vs. GPQA Diamond. Researched 2026-06-18.
      </div>

      {/* Custom single-row legend */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", gap: "20px", marginBottom: "16px", fontSize: 12 }}>
        {[
          { label: "DeepSeek", color: COLOR_DEEPSEEK },
          { label: "Open-weight (Qwen)", color: COLOR_OPEN },
          { label: "US frontier labs", color: COLOR_WESTERN },
        ].map((item) => (
          <span key={item.label} style={{ display: "inline-flex", alignItems: "center", gap: 6, color: item.color, whiteSpace: "nowrap" }}>
            <span style={{ width: 11, height: 11, borderRadius: "50%", background: item.color, display: "inline-block" }} />
            {item.label}
          </span>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={460}>
        <ScatterChart margin={{ top: 10, right: 150, bottom: 30, left: 10 }}>
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
            dataKey="gpqa"
            domain={[68, 98]}
            ticks={[70, 80, 90]}
            stroke="#999"
            tick={{ fontSize: 12, fill: "#999" }}
            label={{ value: "GPQA Diamond (%)", angle: -90, position: "insideLeft", fill: "#999", style: { textAnchor: "middle" } }}
          />
          <ZAxis range={[120, 120]} />
          <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: "3 3" }} />

          {/* Single merged series — colors/shapes come from each datum */}
          <Scatter data={DATA} shape={<PointShape />} isAnimationActive={false}>
            <LabelList dataKey="name" content={(props) => <PointLabel {...props} data={DATA} />} />
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>

      <div style={{ textAlign: "center", color: "#f0f0f0", marginTop: "16px", marginBottom: 0, fontSize: 13 }}>
        {/* TODO: caption. See /research-notes for per-number sources & flags. */}
        GPQA Diamond, mostly Artificial Analysis–standardized. R1 is its 2025 launch score (≈ AA re-run). Some DeepSeek/Qwen/Flash scores are single-source; Claude Sonnet 4.6 omitted (no clean number).
      </div>
    </div>
  );
};

export default CapabilityCostChart;
