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
  VISUAL — "The Raw Material Itself" ($/GPU-hour rental price over time)
  ------------------------------------------------------------------
  X = time (decimal year)   Y = $/GPU-hour, linear scale.
  A cleaner, apples-to-apples proxy for "cost of compute over time" than a
  naive $/million-tokens-by-era comparison would be: $/token depends heavily
  on MODEL SIZE (GPT-4 on A100 in 2023 vs. GPT-3 on V100 in 2020 isn't a
  clean hardware-only comparison), whereas raw GPU rental price is a
  hardware-only number, independent of any specific model.

  ==================================================================
  DATA PROVENANCE — researched 2026-07-07/08. Points and dates are
  intentionally sparse/approximate (source material gives eras, not exact
  months) — this is a rough sketch, not a precise index. All figures SOLID
  (named source, direct quote) unless noted.

    A100-80GB           2023 (unspecified month)  t=2023.25  $1.50/hr
      Source: Lambda Cloud pricing, as cited in Sardana et al.,
      "Beyond Chinchilla-Optimal" (arXiv:2401.00448, 2024)

    H100 (efficient)    2023-12                   t=2023.92  $2.00/hr
      Source: SemiAnalysis, direct quote: "even the most favorable GPU
      cloud deals are around $2/hour" (newsletter.semianalysis.com/p/
      gpu-cloud-economics-explained-the, Dec 2023). Same piece notes a
      well-financed operator's all-in cost as low as $1.525/hr, and "some
      buyers pay more than $3/hour" -- $2/hr used here as the representative
      "typical deal" figure, not the floor or ceiling.

    H100 (scarcity peak) 2024-mid (approximate)    t=2024.5   $9.00/hr
      Source: intuitionlabs.ai/articles/h100-rental-prices-cloud-comparison
      (2026), retrospectively citing a ~$8-10/hr 2024 peak; midpoint used.
      CONTESTED -- single retrospective source, exact date not pinned down.

    H100 (now)          2026-mid (approximate)     t=2026.5   $3.00/hr
      Source: same intuitionlabs.ai piece, "typical market cluster pricing
      $2.85-$3.50/hr after a 64-75% decline from 2024 peaks" -- midpoint
      used. Range spans $1.49/hr (Hyperbolic) to $6.98/hr (Azure).

  CAVEAT: this tracks the cost of RENTING the hardware, not $/token compute
  cost directly -- newer GPUs are also faster (more tokens/sec), so a full
  $/token curve would fall faster than this chart alone implies. This chart
  answers a narrower, cleaner question: did the raw material itself (GPU
  access) get monotonically cheaper? No.
  ==================================================================
*/

const COLOR = "#a78bfa";

const DATA = [
  { name: "A100-80GB", date: "2023", t: 2023.25, price: 1.5 },
  { name: "H100 (efficient deal)", date: "2023-12", t: 2023.92, price: 2.0 },
  { name: "H100 (scarcity peak)", date: "2024-mid", t: 2024.5, price: 9.0 },
  { name: "H100 (typical, now)", date: "2026-mid", t: 2026.5, price: 3.0 },
];

const X_MIN = 2022.8;
const X_MAX = 2026.8;
const Y_MIN = 0;
const Y_MAX = 10;

const fmtYear = (v) => Math.round(v).toString();
const fmtPrice = (v) => `$${v.toFixed(2)}`;

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const p = payload[0].payload;
    return (
      <div style={{ background: "rgba(26,26,26,0.98)", padding: "12px", border: `2px solid ${COLOR}`, borderRadius: "8px" }}>
        <div style={{ margin: 0, fontWeight: "bold", color: "#ffffff" }}>{p.name}</div>
        <div style={{ margin: "4px 0", color: "#f0f0f0" }}>{p.date}</div>
        <div style={{ margin: "4px 0", color: "#f0f0f0" }}>{fmtPrice(p.price)} / GPU-hour</div>
      </div>
    );
  }
  return null;
};

export const GpuRentalCostChart = () => {
  return (
    <div style={{ background: "#1a1a1a", padding: "30px", borderRadius: "12px", margin: "30px 0", boxShadow: "0 4px 6px rgba(0,0,0,0.3)" }}>
      <h3 style={{ color: "white", textAlign: "center", marginTop: 0, marginBottom: "6px", fontSize: "20px" }}>
        The Raw Material Itself
      </h3>
      <div style={{ color: "#f0f0f0", textAlign: "center", marginTop: 0, marginBottom: "16px", fontSize: "13px" }}>
        $/GPU-hour rental price, A100 → H100. Researched 2026-07-08.
      </div>

      <ResponsiveContainer width="100%" height={360}>
        <ScatterChart margin={{ top: 10, right: 30, bottom: 30, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis
            type="number"
            dataKey="t"
            domain={[X_MIN, X_MAX]}
            ticks={[2023, 2024, 2025, 2026]}
            tickFormatter={fmtYear}
            stroke="#999"
            tick={{ fontSize: 12, fill: "#999" }}
            label={{ value: "Year", position: "insideBottom", offset: -18, fill: "#999" }}
          />
          <YAxis
            type="number"
            dataKey="price"
            domain={[Y_MIN, Y_MAX]}
            ticks={[0, 2, 4, 6, 8, 10]}
            tickFormatter={fmtPrice}
            stroke="#999"
            tick={{ fontSize: 12, fill: "#999" }}
            label={{ value: "$/GPU-hour", angle: -90, position: "insideLeft", fill: "#999", style: { textAnchor: "middle" } }}
          />
          <ZAxis range={[90, 90]} />
          <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: "3 3" }} />

          <Scatter data={DATA} fill={COLOR} line={{ stroke: COLOR, strokeWidth: 2 }} isAnimationActive={false} />
        </ScatterChart>
      </ResponsiveContainer>

      <div style={{ textAlign: "center", color: "#f0f0f0", marginTop: "16px", marginBottom: 0, fontSize: 13 }}>
        A proxy for hardware access cost, not a full $/token curve: newer GPUs are also faster, so per-token cost falls faster than this line alone shows.
      </div>
    </div>
  );
};

export default GpuRentalCostChart;
