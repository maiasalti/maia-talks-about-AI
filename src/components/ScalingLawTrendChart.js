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
  VISUAL 1a — "The Scaling Law" (trend only, NO DeepSeek)
  ------------------------------------------------------------------
  This is a duplicate of ScalingLawChart with the DeepSeek points,
  labels, callout, and the Pass@1 caption removed. It shows just the
  historical compute -> capability frontier, so it can be shown FIRST
  to set up the scaling law before ScalingLawChart reveals DeepSeek
  as the off-trend outlier.

  X = training compute (FLOP, log scale)   Y = capability (MMLU, 5-shot)

  DATA PROVENANCE — Compute (FLOP) figures are ESTIMATES from Epoch AI's
  "Notable AI Models" database (https://epoch.ai/data/ai-models), mirrored on
  Our World in Data. Epoch flags undisclosed-model compute as accurate only to
  ~a factor of 5. MMLU is 5-shot from each model's primary paper.

  TREND MODELS (5-shot MMLU on the y-axis):
    GPT-3         compute 3.14e23  MMLU 43.9  | FLOP: Epoch/OWID. MMLU: arxiv.org/abs/2005.14165 (2020). SOLID
    Llama 2 70B   compute 8.1e23   MMLU 68.9  | FLOP: Epoch/OWID. MMLU: arxiv.org/abs/2307.09288 (2023). SOLID
    PaLM 540B     compute 2.5e24   MMLU 69.3  | FLOP: Epoch/OWID. MMLU: arxiv.org/abs/2204.02311 (2022). SOLID (use base 69.3, NOT Flan-PaLM 75.2)
    PaLM 2        compute 7.3e24   MMLU 78.3  | FLOP: Epoch est (CONTESTED, undisclosed). MMLU: arxiv.org/abs/2305.10403 (2023)
    Llama 3 70B   compute 7.9e24   MMLU 79.5  | FLOP: Epoch/OWID. MMLU: ai.meta.com/blog/meta-llama-3 (2024). SOLID
    GPT-4         compute 2.1e25   MMLU 86.4  | FLOP: Epoch est (CONTESTED, undisclosed +/-5x). MMLU: arxiv.org/abs/2303.08774 (2023)
    Llama 3.1 405B compute 3.8e25  MMLU 85.4  | FLOP: Epoch/Meta-disclosed. MMLU: github.com/meta-llama (5-shot base). SOLID
    Gemini 1.0 Ultra compute 5.0e25 MMLU 83.7 | FLOP: Epoch est (CONTESTED, undisclosed). MMLU: arxiv.org/abs/2312.11805 (use 5-shot 83.7, NOT CoT@32 90.0)

  DeepSeek V3 / R1 are intentionally OMITTED here — they live in ScalingLawChart.
  CAVEAT: MMLU shot-settings are not perfectly uniform across these points; see
  research-notes.md.
*/

const COLOR_TREND = "#4A90E2";
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
    // pick the hovered data point, skipping the unnamed trend-line endpoints
    const entry = payload.find((e) => e.payload && e.payload.name);
    if (!entry) return null;
    const p = entry.payload;
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
  "Llama 2 70B": { dx: -11, dy: 4, anchor: "end" }, // left of dot — clears PaLM 540B's point/label
  "PaLM 540B": { dx: 11, dy: 4, anchor: "start" },
  "PaLM 2": { dx: -10, dy: 15, anchor: "end" }, // drop below-left, away from Llama 3 70B
  "Llama 3 70B": { dx: 10, dy: -8, anchor: "start" }, // lift above-right
  "GPT-4": { dx: 11, dy: 4, anchor: "start" },
  "Llama 3.1 405B": { dx: 10, dy: -8, anchor: "start" }, // lift above-right
  "Gemini 1.0 Ultra": { dx: 10, dy: 15, anchor: "start" }, // drop below-right
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

export const ScalingLawTrendChart = () => {
  return (
    <div style={{ background: "#1a1a1a", padding: "30px", borderRadius: "12px", margin: "30px 0", boxShadow: "0 4px 6px rgba(0,0,0,0.3)" }}>
      <h3 style={{ color: "white", textAlign: "center", marginTop: 0, marginBottom: "6px", fontSize: "20px" }}>
        {/* TODO: headline placeholder — you may rename in the MDX caption instead */}
        The Scaling Law: More Compute, More Capability
      </h3>
      <div style={{ color: "#f0f0f0", textAlign: "center", marginTop: 0, marginBottom: "20px", fontSize: "13px" }}>
        Training compute (log scale) vs. capability (MMLU). The line is the historical frontier.
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
            label={{ value: "Capability (MMLU %)", angle: -90, position: "insideLeft", fill: "#999", style: { textAnchor: "middle" } }}
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
        </ScatterChart>
      </ResponsiveContainer>

      <div style={{ textAlign: "center", color: "#f0f0f0", marginTop: "16px", marginBottom: 0, fontSize: 13 }}>
        {/* TODO: caption — sources & the shot-setting caveat live in research-notes.md */}
        Compute figures are Epoch AI estimates; MMLU shot-settings vary by model (see notes).
      </div>
    </div>
  );
};

export default ScalingLawTrendChart;
