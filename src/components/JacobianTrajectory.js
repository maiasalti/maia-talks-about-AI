'use client';
import { useMemo, useState } from 'react';

const PURPLE = '#534AB7';
const PURPLE_BG = '#EEEDFE';
const ORANGE = '#D85A30';
const ORANGE_TEXT = '#993C1D';
const BORDER = 'rgba(0,0,0,0.15)';
const TEXT_SECONDARY = 'rgba(0,0,0,0.6)';

const X0 = 70, X1 = 560, Y0 = 360, Y1 = 60;
const NL = 10;
const lx = (i) => X0 + (i / NL) * (X1 - X0);
const ly = (v) => Y0 + v * (Y1 - Y0);

const PATH = Array.from({ length: NL + 1 }, (_, i) => {
  const t = i / NL;
  const v = 0.12 + 0.42 * t + 0.3 * Math.sin(t * 4.3 + 0.6) + 0.1 * Math.sin(t * 9.1);
  return Math.max(0.05, Math.min(0.95, v));
});

const TRUE_WORD = 'Italy';
const NEAR_WORDS = { 1: 'the', 2: 'a place', 3: 'country', 4: 'Rome', 5: 'Europe', 6: 'Italian', 7: 'Italy-ish', 8: 'Italy', 9: 'Italy', 10: 'Italy' };

function curvePath(points) {
  let d = `M ${lx(0)} ${ly(points[0])}`;
  for (let i = 1; i <= NL; i++) {
    const cx = (lx(i - 1) + lx(i)) / 2;
    d += ` C ${cx} ${ly(points[i - 1])}, ${cx} ${ly(points[i])}, ${lx(i)} ${ly(points[i])}`;
  }
  return d;
}

export function JacobianTrajectory() {
  const [layer, setLayer] = useState(4);

  const { predEnd, gapPct } = useMemo(() => {
    const slope = PATH[layer] - PATH[layer - 1];
    const pe = Math.max(0.02, Math.min(0.98, PATH[layer] + slope * (NL - layer)));
    return { predEnd: pe, gapPct: Math.round(Math.abs(pe - PATH[NL]) * 100) };
  }, [layer]);

  const trueY = ly(PATH[NL]);
  const estY = ly(predEnd);
  const estAbove = estY < trueY;

  return (
    <div className="my-8 not-prose font-mono text-black">
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <label className="text-sm whitespace-nowrap" style={{ color: TEXT_SECONDARY }}>
          Apply Jacobian at layer
        </label>
        <input
          type="range"
          min={1}
          max={NL}
          step={1}
          value={layer}
          onChange={(e) => setLayer(parseInt(e.target.value, 10))}
          className="flex-1 min-w-[180px]"
          style={{ accentColor: ORANGE }}
        />
        <span className="text-sm font-medium min-w-[28px]">{layer}</span>
      </div>

      <svg width="100%" viewBox="0 0 820 420" role="img" aria-label="Activation trajectory and Jacobian linear approximation">
        {Array.from({ length: NL + 1 }, (_, i) => (
          <g key={i}>
            <line x1={lx(i)} y1={Y0} x2={lx(i)} y2={Y1} stroke={BORDER} strokeWidth={0.5} strokeDasharray="2 4" />
            <text x={lx(i)} y={Y0 + 20} textAnchor="middle" fontSize={11} fill={TEXT_SECONDARY}>{i}</text>
          </g>
        ))}
        <text x={(X0 + X1) / 2} y={Y0 + 42} textAnchor="middle" fontSize={12} fill={TEXT_SECONDARY}>layer</text>
        <text x={24} y={(Y0 + Y1) / 2} textAnchor="middle" fontSize={12} fill={TEXT_SECONDARY} transform={`rotate(-90 24 ${(Y0 + Y1) / 2})`}>
          activation position (2D collapse)
        </text>

        <path d={curvePath(PATH)} fill="none" stroke={PURPLE} strokeWidth={2.5} strokeLinecap="round" />

        <line x1={lx(layer)} y1={ly(PATH[layer])} x2={lx(NL)} y2={ly(predEnd)} stroke={ORANGE} strokeWidth={2} strokeDasharray="7 5" strokeLinecap="round" />
        <circle cx={lx(layer)} cy={ly(PATH[layer])} r={6} fill={ORANGE} stroke="#ede4d0" strokeWidth={1.5} />
        <text x={lx(layer)} y={ly(PATH[layer]) - 14} textAnchor="middle" fontSize={12} fontWeight={600} fill={ORANGE_TEXT}>apply J</text>

        <circle cx={lx(NL)} cy={trueY} r={6} fill={PURPLE} />
        <circle cx={lx(NL)} cy={estY} r={5} fill="none" stroke={ORANGE} strokeWidth={2} />
        <text x={lx(NL) + 12} y={estAbove ? trueY + 5 : trueY - 10} fontSize={12} fontWeight={600} fill="#3C3489">
          True output → {TRUE_WORD}
        </text>
        <text x={lx(NL) + 12} y={estAbove ? estY - 10 : estY + 16} fontSize={12} fontWeight={600} fill={ORANGE_TEXT}>
          Estimate → {NEAR_WORDS[layer]}
        </text>
      </svg>

      <div className="flex gap-2.5 flex-wrap mt-4">
        <span className="text-sm px-3 py-1.5 rounded-md" style={{ color: '#3C3489', background: PURPLE_BG }}>
          <span className="inline-block w-2.5 h-2.5 rounded-full mr-1.5 align-middle" style={{ background: PURPLE }} />
          true nonlinear path
        </span>
        <span className="text-sm px-3 py-1.5 rounded-md" style={{ color: ORANGE_TEXT, background: '#FAECE7' }}>
          <span className="inline-block w-3.5 border-t-2 border-dashed mr-1.5 align-middle" style={{ borderColor: ORANGE }} />
          linear estimate from layer {layer}
        </span>
        <span className="text-sm" style={{ color: TEXT_SECONDARY }}>landing gap ≈ {gapPct}%</span>
      </div>
    </div>
  );
}
