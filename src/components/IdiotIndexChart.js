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
  ReferenceArea,
  ResponsiveContainer,
  LabelList,
} from "recharts";

/*
  VISUAL 2 — "The Idiot Index, Today" (current flagship price vs. plausible compute cost)
  ------------------------------------------------------------------
  X = $/1M output tokens (log scale)   Y = company (categorical, one flagship per company)
  Shaded band = plausible marginal compute cost for a frontier-scale model on
  2025-26 hardware (H100 through GB300, load/utilization-dependent) — the
  "raw materials" line, drawn as a BAND not a point because the true figure
  is genuinely uncertain by roughly two orders of magnitude depending on GPU
  depreciation and batching/utilization assumptions. See research notes
  Section B for the full derivation and every caveat.

  ==================================================================
  DATA PROVENANCE — researched 2026-07-07. /research-notes/idiot-index-of-tokens.md

  Flagship points (current standard-tier price, SOLID, live pricing pages):
    OpenAI GPT-5.5           $30.00   openai flagship as of 2026-07-07
    Anthropic Claude Opus 4.8 $25.00  anthropic top standard Opus tier
    Google Gemini 3.1 Pro Preview $12.00 (<=200K tier)
    DeepSeek V4 Pro           $0.87   post permanent-discount price (2026-05-23)

  Compute-cost band ($0.02-$4.20 / 1M output tokens): lower bound = NVIDIA/
  SemiAnalysis InferenceX benchmark, B200 at high concurrency, 2025-26
  (blogs.nvidia.com/blog/lowest-token-cost-ai-factories, Apr 2026). Upper
  bound = NVIDIA's own H200 worked example for a frontier reasoning model
  (same source). Both are CONTESTED / vendor-adjacent estimates -- treated
  here as an illustrative plausible range, not a precise figure.

  DeepSeek's own 2025 disclosure implies roughly a 6.45x list-price-to-cost
  ratio for its infra at the time (self-reported, explicitly caveated by
  DeepSeek as theoretical) -- i.e. even DeepSeek is not selling at cost, just
  much closer to it than the other three. State this in the caption/prose,
  not just the chart, since the chart alone could visually overstate how
  close to "zero markup" DeepSeek's point looks.
  ==================================================================
*/

const COLOR_OPENAI = "#10a37f";
const COLOR_ANTHROPIC = "#cc785c";
const COLOR_GOOGLE = "#4285F4";
const COLOR_DEEPSEEK = "#f97316";
const COLOR_BAND = "#4ade80";

const POINTS = [
  { name: "OpenAI GPT-5.5", y: 4, price: 30.0, color: COLOR_OPENAI },
  { name: "Anthropic Claude Opus 4.8", y: 3, price: 25.0, color: COLOR_ANTHROPIC },
  { name: "Google Gemini 3.1 Pro Preview", y: 2, price: 12.0, color: COLOR_GOOGLE },
  { name: "DeepSeek V4 Pro", y: 1, price: 0.87, color: COLOR_DEEPSEEK },
];

const Y_LABELS = { 4: "OpenAI", 3: "Anthropic", 2: "Google", 1: "DeepSeek" };

const X_MIN = 0.01;
const X_MAX = 100;
const BAND_LOW = 0.02;
const BAND_HIGH = 4.2;

const fmtPrice = (v) => (v >= 1 ? `$${v}` : `$${v.toFixed(2)}`);
const fmtYAxis = (v) => Y_LABELS[v] || "";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const entry = payload.find((e) => e.payload && e.payload.name);
    if (!entry) return null;
    const p = entry.payload;
    return (
      <div style={{ background: "rgba(26,26,26,0.98)", padding: "12px", border: `2px solid ${p.color}`, borderRadius: "8px" }}>
        <div style={{ margin: 0, fontWeight: "bold", color: "#ffffff" }}>{p.name}</div>
        <div style={{ margin: "4px 0", color: "#f0f0f0" }}>{fmtPrice(p.price)} / 1M output tokens</div>
      </div>
    );
  }
  return null;
};

const PointLabel = ({ x, y, index }) => {
  const p = POINTS[index];
  if (!p) return null;
  return (
    <text x={x} y={y - 14} fill="#d4d4d4" fontSize={12} textAnchor="middle">
      {p.name} ({fmtPrice(p.price)})
    </text>
  );
};

const PointShape = ({ cx, cy, payload }) => {
  if (cx == null || cy == null || !payload) return null;
  return <circle cx={cx} cy={cy} r={8} fill={payload.color} stroke="#1a1a1a" strokeWidth={1.5} />;
};

export const IdiotIndexChart = () => {
  return (
    <div style={{ background: "#1a1a1a", padding: "30px", borderRadius: "12px", margin: "30px 0", boxShadow: "0 4px 6px rgba(0,0,0,0.3)" }}>
      <h3 style={{ color: "white", textAlign: "center", marginTop: 0, marginBottom: "6px", fontSize: "20px" }}>
        The Idiot Index, Today
      </h3>
      <div style={{ color: "#f0f0f0", textAlign: "center", marginTop: 0, marginBottom: "16px", fontSize: "13px" }}>
        Current flagship price vs. a plausible compute-cost band (log scale). Researched 2026-07-07.
      </div>

      <ResponsiveContainer width="100%" height={360}>
        <ScatterChart margin={{ top: 30, right: 40, bottom: 30, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis
            type="number"
            dataKey="price"
            scale="log"
            domain={[X_MIN, X_MAX]}
            ticks={[0.01, 0.1, 1, 10, 100]}
            tickFormatter={fmtPrice}
            stroke="#999"
            tick={{ fontSize: 12, fill: "#999" }}
            label={{ value: "$/1M output tokens (log scale)", position: "insideBottom", offset: -18, fill: "#999" }}
          />
          <YAxis
            type="number"
            dataKey="y"
            domain={[0.3, 4.7]}
            ticks={[1, 2, 3, 4]}
            tickFormatter={fmtYAxis}
            stroke="#999"
            tick={{ fontSize: 13, fill: "#ccc" }}
          />
          <ZAxis range={[130, 130]} />
          <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: "3 3" }} />

          <ReferenceArea
            x1={BAND_LOW}
            x2={BAND_HIGH}
            fill={COLOR_BAND}
            fillOpacity={0.12}
            stroke={COLOR_BAND}
            strokeOpacity={0.4}
            strokeDasharray="4 4"
            label={{ value: "plausible compute cost", position: "insideTop", fill: COLOR_BAND, fontSize: 11 }}
          />

          <Scatter data={POINTS} shape={<PointShape />} isAnimationActive={false}>
            <LabelList dataKey="name" content={<PointLabel />} />
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>

      <div style={{ textAlign: "center", color: "#f0f0f0", marginTop: "16px", marginBottom: 0, fontSize: 13 }}>
        The green band is deliberately wide — the true marginal cost of a token is uncertain by roughly two orders of magnitude depending on GPU depreciation and utilization assumptions. Even DeepSeek&apos;s own disclosed figures put it at ~6x its cost, not at cost. See /research-notes for the full derivation.
      </div>
    </div>
  );
};

export default IdiotIndexChart;
