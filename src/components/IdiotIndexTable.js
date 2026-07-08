"use client";

import React from "react";
import { DATA, COST_LOW, COST_HIGH, fmtIndex } from "./IdiotIndexChart";

/*
  Table version of the same data driving IdiotIndexChart, placed directly
  before it in the MDX so a reader gets the raw numbers before the visual.
  Imports DATA/COST_LOW/COST_HIGH/fmtIndex from IdiotIndexChart.js rather
  than redefining them, so the table and the bar chart can never disagree.

  Rendered as a component (not a raw MDX markdown table) to match the dark
  card styling used by every other visual in this piece — see
  ScalingCurveTable.js for the precedent on why raw HTML tables aren't used
  directly in the .mdx source.
*/

const fmtPrice = (v) => `$${v.toFixed(2)}`;

const cellStyle = { padding: "10px 14px", textAlign: "right", fontVariantNumeric: "tabular-nums" };
const headStyle = {
  ...cellStyle,
  fontWeight: 700,
  fontSize: "0.78rem",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  color: "#999",
  borderBottom: "1px solid #333",
};

export const IdiotIndexTable = () => {
  return (
    <div style={{ background: "#1a1a1a", padding: "30px", borderRadius: "12px", margin: "30px 0", boxShadow: "0 4px 6px rgba(0,0,0,0.3)" }}>
      <h3 style={{ color: "white", textAlign: "center", marginTop: 0, marginBottom: "6px", fontSize: "20px" }}>
        The Idiot Index, Today
      </h3>
      <div style={{ color: "#f0f0f0", textAlign: "center", marginTop: 0, marginBottom: "20px", fontSize: "13px" }}>
        Same five models as the chart below. Compute cost is one shared plausible range (${COST_LOW.toFixed(2)}–${COST_HIGH.toFixed(2)}/1M), not per-model.
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", color: "#f0f0f0", fontSize: "0.95rem" }}>
          <thead>
            <tr>
              <th style={{ ...headStyle, textAlign: "left" }}>Company</th>
              <th style={{ ...headStyle, textAlign: "left" }}>Model</th>
              <th style={headStyle}>Token Price ($/1M out)</th>
              <th style={headStyle}>Compute Cost Range ($/1M out)</th>
              <th style={headStyle}>Idiot Index — Lower Bound</th>
              <th style={headStyle}>Idiot Index — Upper Bound</th>
            </tr>
          </thead>
          <tbody>
            {DATA.map((d) => (
              <tr key={d.name} style={{ borderBottom: "1px solid #2a2a2a" }}>
                <td style={{ padding: "10px 14px", color: d.color, fontWeight: 600 }}>{d.company}</td>
                <td style={{ padding: "10px 14px" }}>{d.name}</td>
                <td style={cellStyle}>{fmtPrice(d.price)}</td>
                <td style={cellStyle}>{fmtPrice(COST_LOW)} – {fmtPrice(COST_HIGH)}</td>
                <td style={{ ...cellStyle, fontWeight: 700, color: d.lowerBound >= 10 ? "#ef4444" : "#4ade80" }}>{fmtIndex(d.lowerBound)}</td>
                <td style={{ ...cellStyle, fontWeight: 700, color: d.upperBound >= 10 ? "#ef4444" : "#4ade80" }}>{fmtIndex(d.upperBound)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ textAlign: "center", color: "#f0f0f0", marginTop: "16px", marginBottom: 0, fontSize: 13 }}>
        Green = under the illustrative 10x threshold, red = over it. See Sources below for where that range comes from.
      </div>
    </div>
  );
};

export default IdiotIndexTable;
