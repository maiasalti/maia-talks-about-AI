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
  VISUAL 1 — "The Broken Scaling Law"
  ------------------------------------------------------------------
  X = training compute (FLOP, log scale)   Y = capability (MMLU, 5-shot)
  The historical frontier follows a compute -> capability trend line.
  DeepSeek V3 / R1 are plotted as outliers: comparable-or-better
  capability at ~10x LESS training compute. The off-trend dots are the
  whole thesis.

  DATA PROVENANCE — every number below, with source + date + confidence.
  Compute (FLOP) figures are ESTIMATES from Epoch AI's "Notable AI Models"
  database (https://epoch.ai/data/ai-models), mirrored on Our World in Data
  (https://ourworldindata.org/grapher/exponential-growth-of-computation-in-the-training-of-notable-ai-systems).
  Epoch flags undisclosed-model compute as accurate only to ~a factor of 5.
  MMLU is 5-shot from each model's primary paper UNLESS noted otherwise.

  TREND MODELS (5-shot MMLU on the y-axis):
    GPT-3         compute 3.14e23  MMLU 43.9  | FLOP: Epoch/OWID. MMLU: arxiv.org/abs/2005.14165 (2020). SOLID
    Llama 2 70B   compute 8.1e23   MMLU 68.9  | FLOP: Epoch/OWID. MMLU: arxiv.org/abs/2307.09288 (2023). SOLID
    PaLM 540B     compute 2.5e24   MMLU 69.3  | FLOP: Epoch/OWID. MMLU: arxiv.org/abs/2204.02311 (2022). SOLID (use base 69.3, NOT Flan-PaLM 75.2)
    PaLM 2        compute 7.3e24   MMLU 78.3  | FLOP: Epoch est (CONTESTED, undisclosed). MMLU: arxiv.org/abs/2305.10403 (2023)
    Llama 3 70B   compute 7.9e24   MMLU 79.5  | FLOP: Epoch/OWID. MMLU: ai.meta.com/blog/meta-llama-3 (2024). SOLID
    GPT-4         compute 2.1e25   MMLU 86.4  | FLOP: Epoch est (CONTESTED, undisclosed +/-5x). MMLU: arxiv.org/abs/2303.08774 (2023)
    Llama 3.1 405B compute 3.8e25  MMLU 85.4  | FLOP: Epoch/Meta-disclosed. MMLU: github.com/meta-llama (5-shot base). SOLID
    Gemini 1.0 Ultra compute 5.0e25 MMLU 83.7 | FLOP: Epoch est (CONTESTED, undisclosed). MMLU: arxiv.org/abs/2312.11805 (use 5-shot 83.7, NOT CoT@32 90.0)

  OUTLIERS (the thesis):
    DeepSeek V3   compute ~3.0e24  MMLU 88.5  | FLOP: Epoch derivation epoch.ai/gradient-updates/what-went-into-training-deepseek-r1
                                                + arxiv.org/abs/2412.19437 (2.788M H800 GPU-hrs). MMLU 88.5 EM 5-shot chat. SOLID
    DeepSeek R1   compute ~3.5e24  MMLU 90.8  | FLOP: Epoch (V3 base ~3e24 + RL ~6e23, RL CONTESTED +/-2x).
                                                MMLU: arxiv.org/abs/2501.12948 Table 4 — NOTE: Pass@1, NOT 5-shot. CONTESTED methodology.

  OMITTED (no honest x-axis point available — Anthropic/OpenAI never disclosed compute):
    GPT-2 (no MMLU — predates benchmark), GPT-3.5 (no distinct Epoch FLOP),
    Claude 3 Opus & Claude 3.5 Sonnet (no public compute estimate exists).

  CAVEAT FOR THE FOOTNOTE: MMLU shot-settings are NOT uniform across points.
  DeepSeek R1 (Pass@1) and a few others differ — see research-notes.md. The
  outlier story lives almost entirely on the X-AXIS (compute), since MMLU is
  near saturation (~89-90%) at the top.
*/

const COLOR_TREND = "#4A90E2";
const COLOR_DEEPSEEK = "#f97316";
const COLOR_TRENDLINE = "#9ca3af";

// --- Trend (frontier) models: compute in FLOP, mmlu 5-shot ---
const TREND = [
  { name: "GPT-3", compute: 3.14e23, mmlu: 43.9 },
  { name: "Llama 2 70B", compute: 8.1e23, mmlu: 68.9 },
  { name: "PaLM 540B", compute: 2.5e24, mmlu: 69.3 },
  { name: "PaLM 2", compute: 7.3e24, mmlu: 78.3 },
  { name: "Llama 3 70B", compute: 7.9e24, mmlu: 79.5 },
  { name: "GPT-4", compute: 2.1e25, mmlu: 86.4 },
  { name: "Llama 3.1 405B", compute: 3.8e25, mmlu: 85.4 },
  { name: "Gemini 1.0 Ultra", compute: 5.0e25, mmlu: 83.7 },
];

// --- The outliers ---
const DEEPSEEK = [
  { name: "DeepSeek V3", compute: 3.0e24, mmlu: 88.5 },
  { name: "DeepSeek R1", compute: 3.5e24, mmlu: 90.8 },
];

// Log-linear least-squares fit through the trend points: mmlu = a + b*log10(compute)
function fitTrendLine(points) {
  const xs = points.map((p) => Math.log10(p.compute));
  const ys = points.map((p) => p.mmlu);
  const n = xs.length;
  const mx = xs.reduce((s, v) => s + v, 0) / n;
  const my = ys.reduce((s, v) => s + v, 0) / n;
  let num = 0;
  let den = 0;
  for (let i = 0; i < n; i++) {
    num += (xs[i] - mx) * (ys[i] - my);
    den += (xs[i] - mx) ** 2;
  }
  const b = num / den;
  const a = my - b * mx;
  return { a, b };
}

const X_MIN = 1e23;
const X_MAX = 1e26;
const { a: FIT_A, b: FIT_B } = fitTrendLine(TREND);
const TRENDLINE = [
  { compute: X_MIN, mmlu: FIT_A + FIT_B * Math.log10(X_MIN) },
  { compute: X_MAX, mmlu: FIT_A + FIT_B * Math.log10(X_MAX) },
];

const fmtFlop = (v) => {
  const exp = Math.round(Math.log10(v));
  return `10^${exp}`;
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const p = payload[0].payload;
    if (!p.name) return null; // skip the trend-line endpoints
    return (
      <div style={{ background: "rgba(26,26,26,0.98)", padding: "12px", border: "2px solid #4A90E2", borderRadius: "8px" }}>
        {/* div, not p — the page's .prose styles force p/strong/em to black !important */}
        <div style={{ margin: 0, fontWeight: "bold", color: "#ffffff" }}>{p.name}</div>
        <div style={{ margin: "4px 0", color: "#f0f0f0" }}>Compute: ~{p.compute.toExponential(1)} FLOP</div>
        <div style={{ margin: "4px 0", color: "#f0f0f0" }}>MMLU: {p.mmlu}%</div>
      </div>
    );
  }
  return null;
};

// Per-point label placement {dx, dy, anchor} to avoid overlaps between
// neighbouring points. Tuned by hand for this fixed dataset.
const TREND_LABEL_POS = {
  "GPT-3": { dx: 11, dy: 4, anchor: "start" },
  "Llama 2 70B": { dx: 11, dy: 4, anchor: "start" },
  "PaLM 540B": { dx: 11, dy: 4, anchor: "start" },
  "PaLM 2": { dx: -10, dy: 15, anchor: "end" }, // drop below-left, away from Llama 3 70B
  "Llama 3 70B": { dx: 10, dy: -8, anchor: "start" }, // lift above-right
  "GPT-4": { dx: 11, dy: 4, anchor: "start" },
  "Llama 3.1 405B": { dx: 10, dy: -8, anchor: "start" }, // lift above-right
  "Gemini 1.0 Ultra": { dx: 10, dy: 15, anchor: "start" }, // drop below-right
};

const DEEPSEEK_LABEL_POS = {
  "DeepSeek V3": { dx: -12, dy: 16, anchor: "end" }, // below-left
  "DeepSeek R1": { dx: 12, dy: -8, anchor: "start" }, // above-right
};

// Label that renders beside each trend point (placement-aware)
const TrendLabel = ({ x, y, value }) => {
  const p = TREND_LABEL_POS[value] || { dx: 11, dy: 4, anchor: "start" };
  return (
    <text x={x + p.dx} y={y + p.dy} fill="#d4d4d4" fontSize={11} textAnchor={p.anchor}>
      {value}
    </text>
  );
};

// Bold orange label anchored to each DeepSeek point (placement-aware)
const DeepSeekLabel = ({ x, y, value }) => {
  const p = DEEPSEEK_LABEL_POS[value] || { dx: 12, dy: -8, anchor: "start" };
  return (
    <text x={x + p.dx} y={y + p.dy} fill={COLOR_DEEPSEEK} fontSize={12} fontWeight="bold" textAnchor={p.anchor}>
      {value}
    </text>
  );
};

export const ScalingLawChart = () => {
  return (
    <div style={{ background: "#1a1a1a", padding: "30px", borderRadius: "12px", margin: "30px 0", boxShadow: "0 4px 6px rgba(0,0,0,0.3)", position: "relative" }}>
      <h3 style={{ color: "white", textAlign: "center", marginTop: 0, marginBottom: "6px", fontSize: "20px" }}>
        {/* TODO: headline placeholder — you may rename in the MDX caption instead */}
        The Scaling Law, and the Dot That Broke It
      </h3>
      <div style={{ color: "#f0f0f0", textAlign: "center", marginTop: 0, marginBottom: "20px", fontSize: "13px" }}>
        Training compute (log scale) vs. capability (MMLU). The line is the historical frontier.
      </div>

      {/* Callout box pointing at the outlier — solid fill so gridlines
          don't bleed through, parked in the empty upper-left region */}
      <div
        style={{
          position: "absolute",
          left: "13%",
          top: "20%",
          maxWidth: 185,
          background: "#241405",
          border: `1px solid ${COLOR_DEEPSEEK}`,
          borderLeft: `4px solid ${COLOR_DEEPSEEK}`,
          borderRadius: 8,
          padding: "10px 12px",
          fontSize: 12.5,
          color: "#ffe2cc",
          lineHeight: 1.4,
          pointerEvents: "none",
          boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
          zIndex: 2,
        }}
      >
        {/* TODO: tune this callout copy when you write the piece */}
        DeepSeek sits here — frontier-level capability at <span style={{ color: COLOR_DEEPSEEK, fontWeight: 700 }}>~10× less compute</span>.
      </div>

      <ResponsiveContainer width="100%" height={440}>
        <ScatterChart margin={{ top: 24, right: 120, bottom: 30, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis
            type="number"
            dataKey="compute"
            scale="log"
            domain={[X_MIN, X_MAX]}
            ticks={[1e23, 1e24, 1e25, 1e26]}
            tickFormatter={fmtFlop}
            stroke="#999"
            tick={{ fontSize: 12, fill: "#999" }}
            label={{ value: "Training compute (FLOP, log scale)", position: "insideBottom", offset: -18, fill: "#999" }}
          />
          <YAxis
            type="number"
            dataKey="mmlu"
            domain={[40, 95]}
            ticks={[40, 50, 60, 70, 80, 90]}
            stroke="#999"
            tick={{ fontSize: 12, fill: "#999" }}
            label={{ value: "Capability (MMLU %)", angle: -90, position: "insideLeft", fill: "#999" }}
          />
          <ZAxis range={[120, 120]} />
          <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: "3 3" }} />

          {/* Historical trend line (fitted) */}
          <Scatter
            data={TRENDLINE}
            line={{ stroke: COLOR_TRENDLINE, strokeWidth: 2, strokeDasharray: "6 6" }}
            shape={() => null}
            legendType="none"
            isAnimationActive={false}
          />

          {/* Frontier models */}
          <Scatter name="Frontier models" data={TREND} fill={COLOR_TREND} isAnimationActive={false}>
            <LabelList dataKey="name" content={<TrendLabel />} />
          </Scatter>

          {/* The outliers */}
          <Scatter name="DeepSeek (outlier)" data={DEEPSEEK} fill={COLOR_DEEPSEEK} shape="diamond" isAnimationActive={false}>
            <LabelList dataKey="name" content={<DeepSeekLabel />} />
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>

      <div style={{ textAlign: "center", color: "#f0f0f0", marginTop: "16px", marginBottom: 0, fontSize: 13 }}>
        {/* TODO: caption — sources & the shot-setting caveat live in research-notes.md */}
        Compute figures are Epoch AI estimates; MMLU shot-settings vary by model (see notes). DeepSeek R1&apos;s MMLU is Pass@1, not 5-shot.
      </div>
    </div>
  );
};

export default ScalingLawChart;
