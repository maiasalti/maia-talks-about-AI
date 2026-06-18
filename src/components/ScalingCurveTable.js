"use client";

import React from "react";

/*
  Conceptual illustration for "The Scaling Law" section — NOT real data.
  Equal jumps in compute (each ~10x) keep raising capability, but by less
  each time: the bars always grow, just never linearly (diminishing returns,
  and a soft ceiling). Rendered as a component because inline <table> styles
  get stripped when MDX treats raw HTML as a block.
*/

const ROWS = [
  { compute: "10×", w: 30 },
  { compute: "100×", w: 55 },
  { compute: "1,000×", w: 73 },
  { compute: "10,000×", w: 84 },
];

const BAR_COLOR = "#4A90E2";

const headStyle = {
  fontWeight: 700,
  fontSize: "0.78rem",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  color: "rgba(0,0,0,0.55)",
  paddingBottom: 4,
  borderBottom: "1px solid rgba(0,0,0,0.25)",
};

export const ScalingCurveTable = () => {
  return (
    <div style={{ maxWidth: 460, margin: "1.75rem auto", color: "#000" }}>
      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", columnGap: 20, rowGap: 12, alignItems: "center" }}>
        <div style={headStyle}>Compute</div>
        <div style={headStyle}>Capability</div>
        {ROWS.map((r) => (
          <React.Fragment key={r.compute}>
            <div style={{ fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap", fontSize: "0.95rem" }}>{r.compute}</div>
            <div style={{ background: "rgba(0,0,0,0.07)", borderRadius: 5, height: 18, width: "100%" }}>
              <div style={{ width: `${r.w}%`, height: "100%", background: BAR_COLOR, borderRadius: 5 }} />
            </div>
          </React.Fragment>
        ))}
      </div>
      <div style={{ fontStyle: "italic", fontSize: "0.9rem", textAlign: "center", color: "rgba(0,0,0,0.65)", marginTop: "1rem" }}>
        Each equal jump in compute keeps raising capability a little less than the last.
      </div>
    </div>
  );
};

export default ScalingCurveTable;
