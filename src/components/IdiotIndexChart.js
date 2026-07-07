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
  X = model (categorical)   Y = Idiot Index = price ÷ a single shared
  reference compute cost, linear scale, with a red dashed reference line at
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

  Shared reference compute cost = geometric mean of the plausible 2025-26
  compute-cost band established in the article's earlier section ($0.02 to
  $4.20 / 1M output tokens; see research notes Section B) = sqrt(0.02*4.2)
  ~= $0.29 / 1M output tokens. This is ONE reasonable anchor, not the only
  one -- picking either end of the band instead shifts every bar by roughly
  the same multiple. The relative ORDERING across models is much less
  sensitive to this choice than the absolute bar heights are. DeepSeek's own
  2025 disclosure implies a real-world ratio of ~6.45x for their own infra
  (see research notes), noticeably higher than the ~3x this shared anchor
  produces for them -- stated explicitly in the article prose as a
  cross-check, not smoothed over.
  ==================================================================
*/

const COLOR_OPENAI = "#10a37f";
const COLOR_ANTHROPIC = "#cc785c";
const COLOR_GOOGLE = "#4285F4";
const COLOR_DEEPSEEK = "#f97316";
const COLOR_THRESHOLD = "#ef4444";

// Exported so IdiotIndexTable can render the exact same numbers — single
// source of truth, table and chart can never drift apart.
export const REFERENCE_COST = Math.sqrt(0.02 * 4.2); // ~$0.29 / 1M output tokens

const RAW = [
  { name: "GPT-5.5", company: "OpenAI", price: 30.0, color: COLOR_OPENAI },
  { name: "Opus 4.8", company: "Anthropic", price: 25.0, color: COLOR_ANTHROPIC },
  { name: "Fable 5", company: "Anthropic", price: 50.0, color: COLOR_ANTHROPIC },
  { name: "Gemini 3.1 Pro", company: "Google", price: 12.0, color: COLOR_GOOGLE },
  { name: "V4 Pro", company: "DeepSeek", price: 0.87, color: COLOR_DEEPSEEK },
];

export const DATA = RAW.map((d) => ({ ...d, indexValue: d.price / REFERENCE_COST }));

const LEGEND = [
  { label: "OpenAI", color: COLOR_OPENAI },
  { label: "Anthropic", color: COLOR_ANTHROPIC },
  { label: "Google", color: COLOR_GOOGLE },
  { label: "DeepSeek", color: COLOR_DEEPSEEK },
];

export const fmtIndex = (v) => `${v >= 10 ? Math.round(v) : v.toFixed(1)}x`;

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const p = payload[0].payload;
    return (
      <div style={{ background: "rgba(26,26,26,0.98)", padding: "12px", border: `2px solid ${p.color}`, borderRadius: "8px" }}>
        <div style={{ margin: 0, fontWeight: "bold", color: "#ffffff" }}>{p.company} {p.name}</div>
        <div style={{ margin: "4px 0", color: "#f0f0f0" }}>${p.price.toFixed(2)} / 1M output tokens</div>
        <div style={{ margin: "4px 0", color: "#f0f0f0" }}>Idiot Index: {fmtIndex(p.indexValue)}</div>
      </div>
    );
  }
  return null;
};

const TopLabel = ({ x, y, width, value }) => (
  <text x={x + width / 2} y={y - 8} fill="#d4d4d4" fontSize={12} textAnchor="middle">
    {fmtIndex(value)}
  </text>
);

export const IdiotIndexChart = () => {
  return (
    <div style={{ background: "#1a1a1a", padding: "30px", borderRadius: "12px", margin: "30px 0", boxShadow: "0 4px 6px rgba(0,0,0,0.3)" }}>
      <h3 style={{ color: "white", textAlign: "center", marginTop: 0, marginBottom: "6px", fontSize: "20px" }}>
        The Idiot Index, Today
      </h3>
      <div style={{ color: "#f0f0f0", textAlign: "center", marginTop: 0, marginBottom: "16px", fontSize: "13px" }}>
        Current flagship price ÷ a shared reference compute cost (~$0.29/1M tokens). Researched 2026-07-07.
      </div>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", gap: "20px", marginBottom: "16px", fontSize: 12 }}>
        {LEGEND.map((s) => (
          <span key={s.label} style={{ display: "inline-flex", alignItems: "center", gap: 6, color: s.color, whiteSpace: "nowrap" }}>
            <span style={{ width: 11, height: 11, borderRadius: "50%", background: s.color, display: "inline-block" }} />
            {s.label}
          </span>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={DATA} margin={{ top: 30, right: 30, bottom: 10, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
          <XAxis dataKey="name" stroke="#999" tick={{ fontSize: 12, fill: "#ccc" }} />
          <YAxis
            stroke="#999"
            tick={{ fontSize: 12, fill: "#999" }}
            tickFormatter={fmtIndex}
            label={{ value: "Idiot Index (price ÷ reference compute cost)", angle: -90, position: "insideLeft", fill: "#999", style: { textAnchor: "middle" } }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.05)" }} />

          <ReferenceLine
            y={10}
            stroke={COLOR_THRESHOLD}
            strokeDasharray="6 4"
            strokeWidth={2}
            label={{ value: "illustrative 10x threshold", position: "insideTopRight", fill: COLOR_THRESHOLD, fontSize: 12 }}
          />

          <Bar dataKey="indexValue" isAnimationActive={false}>
            {DATA.map((d) => (
              <Cell key={d.name} fill={d.color} />
            ))}
            <LabelList dataKey="indexValue" content={<TopLabel />} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div style={{ textAlign: "center", color: "#f0f0f0", marginTop: "16px", marginBottom: 0, fontSize: 13 }}>
        The reference cost is one defensible anchor, not an audited figure — see /research-notes for the full derivation and how much the bar heights (though not the ordering) would shift under a different assumption. DeepSeek&apos;s own disclosed figures put its real ratio closer to ~6x, still the lowest of the five.
      </div>
    </div>
  );
};

export default IdiotIndexChart;
