"use client";

import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  LabelList,
} from "recharts";

/*
  VISUAL 2 — "The Idiot Index, Today" (current flagship price / compute cost)
  ------------------------------------------------------------------
  X = model (categorical)   Y = Idiot Index, LOG scale (the two bounds span
  ~0.2x to ~2,500x, far too wide for a linear axis to show both usefully).
  Two bars per model instead of one: a lighter bar for the LOWER bound of
  the idiot index (computed against the HIGHEST plausible compute cost,
  $4.20/M -- the most charitable-to-providers assumption) and a solid bar
  for the UPPER bound (computed against the LOWEST plausible compute cost,
  $0.02/M -- the least charitable assumption). Red dashed reference line at
  10x (the illustrative "build it yourself" cutoff some online summaries of
  Isaacson's book attribute to Musk -- UNVERIFIED as an actual quote, see
  research notes Section A, presented here as illustrative only).

  ==================================================================
  DATA PROVENANCE — researched 2026-07-07. /research-notes/idiot-index-of-tokens.md

  Flagship prices (current, SOLID, live pricing pages):
    OpenAI GPT-5.5                  $30.00
    Anthropic Claude Opus 4.8       $25.00
    Anthropic Claude Fable 5        $50.00  (current overall flagship)
    Google Gemini 3.1 Pro Preview   $12.00  (<=200K tier)
    DeepSeek V4 Pro                 $0.87   (post permanent-discount price)

  Compute-cost band = $0.02-$4.20 / 1M output tokens (2025-26 H100-GB300
  hardware range, load/utilization-dependent; see research notes Section B).
  Rather than collapse this to one anchor (as an earlier draft did with the
  geometric mean), each model's idiot index is computed at BOTH ends:
    lowerBound = price / COST_HIGH  (charitable: cost assumed at its highest)
    upperBound = price / COST_LOW   (uncharitable: cost assumed at its lowest)
  Neither bound is "more correct" -- the honest number for any model sits
  somewhere in between. DeepSeek's own 2025 disclosure implies a real-world
  ratio of ~6.45x for their own infra (see research notes), which lands
  comfortably INSIDE this component's computed [0.2x, 44x] range for them --
  stated explicitly in the article prose as a cross-check.
  ==================================================================
*/

const COLOR_OPENAI = "#10a37f";
const COLOR_ANTHROPIC = "#cc785c";
const COLOR_GOOGLE = "#4285F4";
const COLOR_DEEPSEEK = "#f97316";
const COLOR_THRESHOLD = "#ef4444";

// Exported so IdiotIndexTable can render the exact same numbers — single
// source of truth, table and chart can never drift apart.
export const COST_LOW = 0.02; // $/1M output tokens — least charitable (cheapest) assumption
export const COST_HIGH = 4.2; // $/1M output tokens — most charitable (priciest) assumption

const RAW = [
  { name: "GPT-5.5", company: "OpenAI", price: 30.0, color: COLOR_OPENAI },
  { name: "Opus 4.8", company: "Anthropic", price: 25.0, color: COLOR_ANTHROPIC },
  { name: "Fable 5", company: "Anthropic", price: 50.0, color: COLOR_ANTHROPIC },
  { name: "Gemini 3.1 Pro", company: "Google", price: 12.0, color: COLOR_GOOGLE },
  { name: "V4 Pro", company: "DeepSeek", price: 0.87, color: COLOR_DEEPSEEK },
];

export const DATA = RAW.map((d) => ({
  ...d,
  lowerBound: d.price / COST_HIGH,
  upperBound: d.price / COST_LOW,
}));

const LEGEND = [
  { label: "OpenAI", color: COLOR_OPENAI },
  { label: "Anthropic", color: COLOR_ANTHROPIC },
  { label: "Google", color: COLOR_GOOGLE },
  { label: "DeepSeek", color: COLOR_DEEPSEEK },
];

export const fmtIndex = (v) => {
  if (v >= 1000) return `${Math.round(v).toLocaleString()}x`;
  if (v >= 10) return `${Math.round(v)}x`;
  return `${v.toFixed(1)}x`;
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const p = payload[0].payload;
    return (
      <div style={{ background: "rgba(26,26,26,0.98)", padding: "12px", border: `2px solid ${p.color}`, borderRadius: "8px" }}>
        <div style={{ margin: 0, fontWeight: "bold", color: "#ffffff" }}>{p.company} {p.name}</div>
        <div style={{ margin: "4px 0", color: "#f0f0f0" }}>${p.price.toFixed(2)} / 1M output tokens</div>
        <div style={{ margin: "4px 0", color: "#f0f0f0" }}>Lower bound (cost ${COST_HIGH.toFixed(2)}): {fmtIndex(p.lowerBound)}</div>
        <div style={{ margin: "4px 0", color: "#f0f0f0" }}>Upper bound (cost ${COST_LOW.toFixed(2)}): {fmtIndex(p.upperBound)}</div>
      </div>
    );
  }
  return null;
};

// Small dark backing rect behind each label so the reference line (drawn on
// top of the bars) doesn't visibly slice through a bar's value text when a
// bar's height happens to sit close to the 10x line.
const TopLabel = ({ x, y, width, value }) => {
  const label = fmtIndex(value);
  const cx = x + width / 2;
  const cy = y - 8;
  const boxWidth = label.length * 7.5 + 6;
  return (
    <g>
      <rect x={cx - boxWidth / 2} y={cy - 12} width={boxWidth} height={16} fill="#1a1a1a" />
      <text x={cx} y={cy} fill="#d4d4d4" fontSize={11} textAnchor="middle">
        {label}
      </text>
    </g>
  );
};

const Y_MIN = 0.1;
const Y_MAX = 6000; // headroom above the tallest bar (Fable 5 upper bound, 2,500x) so its label doesn't clip against the plot ceiling

export const IdiotIndexChart = () => {
  return (
    <div style={{ background: "#1a1a1a", padding: "30px", borderRadius: "12px", margin: "30px 0", boxShadow: "0 4px 6px rgba(0,0,0,0.3)" }}>
      <h3 style={{ color: "white", textAlign: "center", marginTop: 0, marginBottom: "6px", fontSize: "20px" }}>
        The Idiot Index, Today
      </h3>
      <div style={{ color: "#f0f0f0", textAlign: "center", marginTop: 0, marginBottom: "16px", fontSize: "13px" }}>
        Current flagship price ÷ the plausible ${COST_LOW.toFixed(2)}–${COST_HIGH.toFixed(2)}/1M compute-cost range (log scale). Researched 2026-07-07.
      </div>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", gap: "20px", marginBottom: "6px", fontSize: 12 }}>
        {LEGEND.map((s) => (
          <span key={s.label} style={{ display: "inline-flex", alignItems: "center", gap: 6, color: s.color, whiteSpace: "nowrap" }}>
            <span style={{ width: 11, height: 11, borderRadius: "50%", background: s.color, display: "inline-block" }} />
            {s.label}
          </span>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", gap: "20px", marginBottom: "16px", fontSize: 12, color: "#aaa" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 11, height: 11, background: "#999", opacity: 0.5, display: "inline-block" }} />
          Lower bound (cost assumed high, ${COST_HIGH.toFixed(2)})
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 11, height: 11, background: "#999", display: "inline-block" }} />
          Upper bound (cost assumed low, ${COST_LOW.toFixed(2)})
        </span>
      </div>

      <ResponsiveContainer width="100%" height={420}>
        <BarChart data={DATA} margin={{ top: 30, right: 175, bottom: 10, left: 10 }} barGap={2}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
          <XAxis dataKey="name" stroke="#999" tick={{ fontSize: 12, fill: "#ccc" }} />
          <YAxis
            scale="log"
            domain={[Y_MIN, Y_MAX]}
            ticks={[0.1, 1, 10, 100, 1000]}
            allowDataOverflow
            stroke="#999"
            tick={{ fontSize: 12, fill: "#999" }}
            tickFormatter={fmtIndex}
            label={{ value: "Idiot Index (log scale)", angle: -90, position: "insideLeft", fill: "#999", style: { textAnchor: "middle" } }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.05)" }} />

          {/* Layering (JSX order = z-order, later = on top):
              1. Visible colored bars (both bounds), no labels — underneath.
              2. ReferenceLine — drawn over the bar fills, so the dashed line
                 reads clearly across every bar instead of hiding behind them.
              3. Invisible bars bound to the same two dataKeys, whose only job
                 is to carry the value labels — drawn last, so text always
                 sits on top of the line and never gets sliced by it. */}
          <Bar dataKey="lowerBound" isAnimationActive={false}>
            {DATA.map((d) => (
              <Cell key={`${d.name}-lo`} fill={d.color} fillOpacity={0.5} />
            ))}
          </Bar>
          <Bar dataKey="upperBound" isAnimationActive={false}>
            {DATA.map((d) => (
              <Cell key={`${d.name}-hi`} fill={d.color} />
            ))}
          </Bar>

          <ReferenceLine
            y={10}
            stroke={COLOR_THRESHOLD}
            strokeDasharray="6 4"
            strokeWidth={2}
            label={{ value: "illustrative 10x threshold", position: "right", fill: COLOR_THRESHOLD, fontSize: 12 }}
          />

          <Bar dataKey="lowerBound" shape={() => null} legendType="none" isAnimationActive={false}>
            <LabelList dataKey="lowerBound" content={<TopLabel />} />
          </Bar>
          <Bar dataKey="upperBound" shape={() => null} legendType="none" isAnimationActive={false}>
            <LabelList dataKey="upperBound" content={<TopLabel />} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div style={{ textAlign: "center", color: "#f0f0f0", marginTop: "16px", marginBottom: 0, fontSize: 13 }}>
        The ${COST_LOW.toFixed(2)}–${COST_HIGH.toFixed(2)} compute-cost range comes from NVIDIA/SemiAnalysis inference benchmarks (see Sources below). DeepSeek&apos;s own disclosed figure (~6x) falls inside its computed range here.
      </div>
    </div>
  );
};

export default IdiotIndexChart;
