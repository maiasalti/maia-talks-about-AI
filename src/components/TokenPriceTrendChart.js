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
} from "recharts";

/*
  VISUAL 1 — "The Idiot Index Zigzag" (flagship-tier output price over time)
  ------------------------------------------------------------------
  X = time (decimal year)   Y = $/1M output tokens, log scale.
  One line per company, tracking whichever tier was that company's most
  expensive currently-offered model at each price-change date (i.e. the
  "flagship" line, not the cheap/small-model line). The point is that this
  line does NOT fall monotonically — every company's frontier tier has
  jumped back UP at least once when a new premium model launched, even as
  their commodity-tier models got radically cheaper over the same period.

  ==================================================================
  DATA PROVENANCE — researched 2026-07-07. All figures + confidence flags
  live in /research-notes/idiot-index-of-tokens.md, Sections C-F.
  "t" = decimal year (month-midpoint approximation), used only for x-axis
  spacing — not a precise date.

  OpenAI (flagship $/1M output, SOLID unless noted):
    Davinci GA         2021-11  t=2021.83  $60.00
    Davinci price cut  2022-09  t=2022.67  $20.00
    GPT-4 (8K)         2023-03  t=2023.17  $60.00
    GPT-4 Turbo        2023-11  t=2023.83  $30.00
    GPT-4o (launch)    2024-05  t=2024.33  $15.00
    GPT-4o (price cut) 2024-08  t=2024.58  $10.00
    o1-preview         2024-09  t=2024.67  $60.00  <- reasoning tier resets premium
    GPT-5              2025-08  t=2025.58  $10.00
    GPT-5.2            2025-12  t=2025.92  $14.00
    GPT-5.4            2026-03  t=2026.17  $15.00
    GPT-5.5            2026-04  t=2026.33  $30.00  <- current

  Anthropic (flagship $/1M output, SOLID):
    Claude 1           2023-03  t=2023.17  $32.68
    Claude 2.1 (cut)   2023-11  t=2023.83  $24.00
    Claude 3 Opus      2024-03  t=2024.17  $75.00  <- Opus tier resets premium
    Claude Opus 4.5    2025-11  t=2025.83  $25.00  <- -67% cut, biggest in dataset
    Claude Fable 5     2026-06  t=2026.42  $50.00  <- current, new flagship brand

  Google (flagship $/1M output, SOLID; 1.0 Pro's original per-CHARACTER
  launch price is omitted here for unit consistency — see research notes):
    Gemini 1.0 Pro (token billing)  2024-04  t=2024.33  $1.50
    Gemini 1.5 Pro (GA)             2024-05  t=2024.42  $10.50
    Gemini 1.5 Pro (price cut)      2024-10  t=2024.83  $5.00
    Gemini 2.5 Pro (preview)        2025-04  t=2025.33  $10.00
    Gemini 3 Pro Preview            2025-11  t=2025.92  $12.00  <- current tier price

  DeepSeek (flagship/reasoning-capable tier $/1M output; CONTESTED $ figures
  flagged individually in research notes, dates SOLID):
    DeepSeek-V2         2024-05  t=2024.33  $0.28
    DeepSeek-R1         2025-01  t=2025.08  $2.19   <- reasoning tier resets premium
    DeepSeek-V3.2-Exp   2025-09  t=2025.75  $0.42
    DeepSeek-V4 Pro (launch)     2026-04  t=2026.33  $3.48  <- new flagship spike
    DeepSeek-V4 Pro (permanent discount) 2026-05  t=2026.42  $0.87  <- current
  ==================================================================
*/

const COLOR_OPENAI = "#10a37f";
const COLOR_ANTHROPIC = "#cc785c";
const COLOR_GOOGLE = "#4285F4";
const COLOR_DEEPSEEK = "#f97316";

const OPENAI = [
  { name: "Davinci (GA)", date: "2021-11", t: 2021.83, price: 60.0 },
  { name: "Davinci (price cut)", date: "2022-09", t: 2022.67, price: 20.0 },
  { name: "GPT-4", date: "2023-03", t: 2023.17, price: 60.0 },
  { name: "GPT-4 Turbo", date: "2023-11", t: 2023.83, price: 30.0 },
  { name: "GPT-4o", date: "2024-05", t: 2024.33, price: 15.0 },
  { name: "GPT-4o (price cut)", date: "2024-08", t: 2024.58, price: 10.0 },
  { name: "o1-preview", date: "2024-09", t: 2024.67, price: 60.0 },
  { name: "GPT-5", date: "2025-08", t: 2025.58, price: 10.0 },
  { name: "GPT-5.2", date: "2025-12", t: 2025.92, price: 14.0 },
  { name: "GPT-5.4", date: "2026-03", t: 2026.17, price: 15.0 },
  { name: "GPT-5.5", date: "2026-04", t: 2026.33, price: 30.0 },
];

const ANTHROPIC = [
  { name: "Claude 1", date: "2023-03", t: 2023.17, price: 32.68 },
  { name: "Claude 2.1 (cut)", date: "2023-11", t: 2023.83, price: 24.0 },
  { name: "Claude 3 Opus", date: "2024-03", t: 2024.17, price: 75.0 },
  { name: "Claude Opus 4.5 (-67%)", date: "2025-11", t: 2025.83, price: 25.0 },
  { name: "Claude Fable 5", date: "2026-06", t: 2026.42, price: 50.0 },
];

const GOOGLE = [
  { name: "Gemini 1.0 Pro (token billing)", date: "2024-04", t: 2024.33, price: 1.5 },
  { name: "Gemini 1.5 Pro", date: "2024-05", t: 2024.42, price: 10.5 },
  { name: "Gemini 1.5 Pro (price cut)", date: "2024-10", t: 2024.83, price: 5.0 },
  { name: "Gemini 2.5 Pro", date: "2025-04", t: 2025.33, price: 10.0 },
  { name: "Gemini 3 Pro Preview", date: "2025-11", t: 2025.92, price: 12.0 },
];

const DEEPSEEK = [
  { name: "DeepSeek-V2", date: "2024-05", t: 2024.33, price: 0.28 },
  { name: "DeepSeek-R1", date: "2025-01", t: 2025.08, price: 2.19 },
  { name: "DeepSeek-V3.2-Exp", date: "2025-09", t: 2025.75, price: 0.42 },
  { name: "DeepSeek-V4 Pro (launch)", date: "2026-04", t: 2026.33, price: 3.48 },
  { name: "DeepSeek-V4 Pro (discount)", date: "2026-05", t: 2026.42, price: 0.87 },
];

const SERIES = [
  { key: "openai", label: "OpenAI", color: COLOR_OPENAI, data: OPENAI },
  { key: "anthropic", label: "Anthropic", color: COLOR_ANTHROPIC, data: ANTHROPIC },
  { key: "google", label: "Google", color: COLOR_GOOGLE, data: GOOGLE },
  { key: "deepseek", label: "DeepSeek", color: COLOR_DEEPSEEK, data: DEEPSEEK },
];

// Recharts' Tooltip on a multi-Scatter chart returns the nearest point from
// EVERY series at once, not just the one under the cursor — so a single
// merged, named, colored series drives the dots + tooltip (same fix as
// CapabilityCostChart), while each company's connecting LINE is drawn from a
// separate, nameless (non-tooltip-eligible) Scatter underneath it.
const LINES = SERIES.map((s) => ({
  ...s,
  lineData: s.data.map((d) => ({ t: d.t, price: d.price })),
}));
const MERGED_POINTS = SERIES.flatMap((s) => s.data.map((d) => ({ ...d, color: s.color })));

const X_MIN = 2021.5;
const X_MAX = 2026.6;
const Y_MIN = 0.2;
const Y_MAX = 100;

const fmtYear = (v) => Math.round(v).toString();
const fmtPrice = (v) => (v >= 1 ? `$${v}` : `$${v.toFixed(2)}`);

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const entry = payload.find((e) => e.payload && e.payload.name);
    if (!entry) return null;
    const p = entry.payload;
    return (
      <div style={{ background: "rgba(26,26,26,0.98)", padding: "12px", border: `2px solid ${p.color || "#4A90E2"}`, borderRadius: "8px" }}>
        <div style={{ margin: 0, fontWeight: "bold", color: "#ffffff" }}>{p.name}</div>
        <div style={{ margin: "4px 0", color: "#f0f0f0" }}>{p.date}</div>
        <div style={{ margin: "4px 0", color: "#f0f0f0" }}>{fmtPrice(p.price)} / 1M output tokens</div>
      </div>
    );
  }
  return null;
};

const PointShape = ({ cx, cy, payload }) => {
  if (cx == null || cy == null || !payload) return null;
  return <circle cx={cx} cy={cy} r={5.5} fill={payload.color} stroke="#1a1a1a" strokeWidth={1} />;
};

export const TokenPriceTrendChart = () => {
  return (
    <div style={{ background: "#1a1a1a", padding: "30px", borderRadius: "12px", margin: "30px 0", boxShadow: "0 4px 6px rgba(0,0,0,0.3)" }}>
      <h3 style={{ color: "white", textAlign: "center", marginTop: 0, marginBottom: "6px", fontSize: "20px" }}>
        Flagship-Tier Token Price Over Time
      </h3>
      <div style={{ color: "#f0f0f0", textAlign: "center", marginTop: 0, marginBottom: "16px", fontSize: "13px" }}>
        Each company&apos;s most expensive currently-offered model, $/1M output tokens (log scale). Researched 2026-07-07.
      </div>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", gap: "20px", marginBottom: "16px", fontSize: 12 }}>
        {SERIES.map((s) => (
          <span key={s.key} style={{ display: "inline-flex", alignItems: "center", gap: 6, color: s.color, whiteSpace: "nowrap" }}>
            <span style={{ width: 11, height: 11, borderRadius: "50%", background: s.color, display: "inline-block" }} />
            {s.label}
          </span>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={440}>
        <ScatterChart margin={{ top: 10, right: 30, bottom: 30, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis
            type="number"
            dataKey="t"
            domain={[X_MIN, X_MAX]}
            ticks={[2022, 2023, 2024, 2025, 2026]}
            tickFormatter={fmtYear}
            stroke="#999"
            tick={{ fontSize: 12, fill: "#999" }}
            label={{ value: "Year", position: "insideBottom", offset: -18, fill: "#999" }}
          />
          <YAxis
            type="number"
            dataKey="price"
            scale="log"
            domain={[Y_MIN, Y_MAX]}
            ticks={[0.25, 1, 5, 20, 80]}
            tickFormatter={fmtPrice}
            stroke="#999"
            tick={{ fontSize: 12, fill: "#999" }}
            label={{ value: "$/1M output tokens (log scale)", angle: -90, position: "insideLeft", fill: "#999", style: { textAnchor: "middle" } }}
          />
          <ZAxis range={[70, 70]} />
          <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: "3 3" }} />

          {/* Connecting lines only — nameless data, so Tooltip's payload.name
              filter above skips these and only ever resolves to the merged
              dot series below, i.e. whichever point is actually hovered. */}
          {LINES.map((s) => (
            <Scatter
              key={s.key}
              data={s.lineData}
              line={{ stroke: s.color, strokeWidth: 2 }}
              shape={() => null}
              legendType="none"
              isAnimationActive={false}
            />
          ))}

          {/* Single merged series drives the dots + tooltip. */}
          <Scatter data={MERGED_POINTS} shape={<PointShape />} isAnimationActive={false} />
        </ScatterChart>
      </ResponsiveContainer>

      <div style={{ textAlign: "center", color: "#f0f0f0", marginTop: "16px", marginBottom: 0, fontSize: 13 }}>
        Every zigzag up is a new premium tier launching (reasoning models, new flagship brands) resetting the frontier price higher, even as older tiers kept getting cheaper alongside it. Every price point is sourced from official pricing pages; see Sources below.
      </div>
    </div>
  );
};

export default TokenPriceTrendChart;
