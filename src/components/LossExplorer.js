'use client';
// Interactive least-squares demo for the Training / gradient-descent section.
// Drag the sliders to tilt and shift the line; the loss (mean squared error)
// updates live. Toggle "squared errors" to see the loss as literal squares.

import { useState, useMemo } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Customized,
  usePlotArea,
} from "recharts";

// Cream-theme colors to match the rest of the article
const C = {
  point: "#1f1d1a",
  line: "#1d4ed8",
  error: "#dc2626",
  grid: "rgba(0,0,0,0.12)",
  axis: "rgba(0,0,0,0.55)",
};

const DATA = [
  { x: 1, y: 2.9 },
  { x: 2, y: 3.4 },
  { x: 3, y: 5.2 },
  { x: 4, y: 5.0 },
  { x: 5, y: 7.3 },
  { x: 6, y: 7.1 },
  { x: 7, y: 9.4 },
  { x: 8, y: 9.0 },
  { x: 9, y: 11.2 },
];

const X_MAX = 10;
const Y_MAX = 13;

function mse(m, b) {
  const sum = DATA.reduce((acc, p) => {
    const e = p.y - (m * p.x + b);
    return acc + e * e;
  }, 0);
  return sum / DATA.length;
}

export default function LossExplorer() {
  const [m, setM] = useState(0.3);
  const [b, setB] = useState(4.5);
  const [showSquares, setShowSquares] = useState(false);

  const { mStar, bStar, bestLoss } = useMemo(() => {
    const n = DATA.length;
    const xb = DATA.reduce((a, p) => a + p.x, 0) / n;
    const yb = DATA.reduce((a, p) => a + p.y, 0) / n;
    let sxx = 0;
    let sxy = 0;
    DATA.forEach((p) => {
      sxx += (p.x - xb) ** 2;
      sxy += (p.x - xb) * (p.y - yb);
    });
    const ms = sxy / sxx;
    const bs = yb - ms * xb;
    return { mStar: ms, bStar: bs, bestLoss: mse(ms, bs) };
  }, []);

  const loss = mse(m, b);
  const ratio = loss / bestLoss;
  const atBest = ratio < 1.05;

  let status;
  if (atBest) status = "That's about as good as a straight line gets here.";
  else if (ratio < 1.6) status = "Close — keep nudging the sliders to shrink the errors.";
  else if (ratio < 3.5) status = "Getting there, but the line still misses a lot of points.";
  else status = "The line is far from the points — the loss is high.";

  const PlotLayer = () => {
    const plotArea = usePlotArea();
    if (!plotArea) return null;
    const { x: px0, y: py0, width: pw, height: ph } = plotArea;
    const xs = (x) => px0 + (x / X_MAX) * pw;
    const ys = (y) => py0 + ph - (y / Y_MAX) * ph;
    const clipX = px0;
    const clipW = pw;
    const clipY = py0;
    const clipH = ph;

    return (
      <g>
        <defs>
          <clipPath id="loss-plot-clip">
            <rect x={clipX} y={clipY} width={clipW} height={clipH} />
          </clipPath>
        </defs>
        <g clipPath="url(#loss-plot-clip)">
          {showSquares &&
            DATA.map((p, i) => {
              const px = xs(p.x);
              const pyPt = ys(p.y);
              const pyLn = ys(m * p.x + b);
              const side = Math.abs(pyPt - pyLn);
              return (
                <rect
                  key={`sq-${i}`}
                  x={px}
                  y={Math.min(pyPt, pyLn)}
                  width={side}
                  height={side}
                  fill={C.error}
                  fillOpacity={0.15}
                  stroke={C.error}
                  strokeOpacity={0.4}
                  strokeWidth={0.5}
                />
              );
            })}
          {DATA.map((p, i) => {
            const px = xs(p.x);
            const pyPt = ys(p.y);
            const pyLn = ys(m * p.x + b);
            return (
              <line
                key={`res-${i}`}
                x1={px}
                y1={pyPt}
                x2={px}
                y2={pyLn}
                stroke={C.error}
                strokeWidth={1.5}
                strokeDasharray="3 3"
              />
            );
          })}
          <line
            x1={xs(0)}
            y1={ys(b)}
            x2={xs(X_MAX)}
            y2={ys(m * X_MAX + b)}
            stroke={C.line}
            strokeWidth={2.5}
            strokeLinecap="round"
          />
        </g>
      </g>
    );
  };

  const snap = () => {
    setM(Math.round(mStar / 0.05) * 0.05);
    setB(Math.round(bStar / 0.1) * 0.1);
  };

  return (
    <div className="w-full my-8 not-prose font-mono text-black">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-sm w-20" style={{ color: "rgba(0,0,0,0.65)" }}>slope</span>
        <input
          type="range"
          min={-0.5}
          max={2.5}
          step={0.05}
          value={m}
          onChange={(e) => setM(parseFloat(e.target.value))}
          className="flex-1"
          style={{ accentColor: C.line }}
        />
        <span className="text-sm font-medium w-12 text-right tabular-nums">{m.toFixed(2)}</span>
      </div>

      <div className="flex items-center gap-3 mb-5">
        <span className="text-sm w-20" style={{ color: "rgba(0,0,0,0.65)" }}>intercept</span>
        <input
          type="range"
          min={0}
          max={6}
          step={0.1}
          value={b}
          onChange={(e) => setB(parseFloat(e.target.value))}
          className="flex-1"
          style={{ accentColor: C.line }}
        />
        <span className="text-sm font-medium w-12 text-right tabular-nums">{b.toFixed(1)}</span>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-5">
        <button
          onClick={snap}
          className="px-3 py-1.5 text-sm rounded-md border transition-colors cursor-pointer"
          style={{ borderColor: "rgba(0,0,0,0.3)", background: "transparent" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#d6cdb9")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          Snap to best fit
        </button>
        <label className="flex items-center gap-2 text-sm cursor-pointer select-none" style={{ color: "rgba(0,0,0,0.7)" }}>
          <input
            type="checkbox"
            checked={showSquares}
            onChange={(e) => setShowSquares(e.target.checked)}
            style={{ accentColor: C.error }}
          />
          show squared errors
        </label>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-2">
        <div className="rounded-lg p-4" style={{ background: "#d6cdb9" }}>
          <div className="text-xs mb-1" style={{ color: "rgba(0,0,0,0.6)" }}>loss (mean squared error)</div>
          <div
            className="text-2xl font-medium tabular-nums"
            style={{ color: atBest ? "#15803d" : "#1f1d1a" }}
          >
            {loss.toFixed(2)}
          </div>
        </div>
        <div className="rounded-lg p-4" style={{ background: "#d6cdb9" }}>
          <div className="text-xs mb-1" style={{ color: "rgba(0,0,0,0.6)" }}>best achievable loss</div>
          <div className="text-2xl font-medium tabular-nums" style={{ color: "rgba(0,0,0,0.6)" }}>{bestLoss.toFixed(2)}</div>
        </div>
      </div>

      <div className="text-sm mb-4" style={{ color: "rgba(0,0,0,0.7)", minHeight: 20 }}>
        {status}
      </div>

      <div className="w-full" style={{ height: 340 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 12, right: 16, bottom: 8, left: 0 }}>
            <CartesianGrid stroke={C.grid} />
            <XAxis
              type="number"
              dataKey="x"
              domain={[0, X_MAX]}
              ticks={[0, 2, 4, 6, 8, 10]}
              tick={{ fontSize: 11, fill: C.axis }}
              stroke={C.grid}
              tickLine={false}
            />
            <YAxis
              type="number"
              dataKey="y"
              domain={[0, Y_MAX]}
              ticks={[0, 4, 8, 12]}
              tick={{ fontSize: 11, fill: C.axis }}
              stroke={C.grid}
              tickLine={false}
              width={36}
            />
            <Customized component={PlotLayer} />
            <Scatter data={DATA} fill={C.point} isAnimationActive={false} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
