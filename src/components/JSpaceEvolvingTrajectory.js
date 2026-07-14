'use client';
import { useEffect, useMemo, useRef, useState } from 'react';

const PURPLE = '#534AB7';
const PURPLE_BG = '#EEEDFE';
const PURPLE_BORDER = '#7F77DD';
const ORANGE = '#D85A30';
const ORANGE_TEXT = '#993C1D';
const BORDER = 'rgba(0,0,0,0.15)';
const TEXT_SECONDARY = 'rgba(0,0,0,0.6)';
const TEXT_MUTED = 'rgba(0,0,0,0.45)';
const SURFACE = '#f5f0e3';

const X0 = 70, X1 = 520, Y0 = 340, Y1 = 60;
const NL = 12;
const lx = (i) => X0 + (i / NL) * (X1 - X0);
const ly = (v) => Y0 + v * (Y1 - Y0);

const PATH = Array.from({ length: NL + 1 }, (_, i) => {
  const t = i / NL;
  const v = 0.14 + 0.4 * t + 0.26 * Math.sin(t * 4.1 + 0.7) + 0.09 * Math.sin(t * 8.4);
  return Math.max(0.05, Math.min(0.95, v));
});

function regime(L) {
  if (L <= 3) return 'sensory';
  if (L >= 11) return 'motor';
  return 'workspace';
}

const READOUTS = {
  1: [['7', '·'], ['+', '·'], ['4', '·']],
  2: [['+', '·'], ['calc', '·'], ['number', '·']],
  3: [['sum', '·'], ['add', '·'], ['math', '·']],
  4: [['21', '→ step 1'], ['add', '·'], ['twenty', '·']],
  5: [['21', '→ step 1'], ['sum', '·'], ['42', '(forming)']],
  6: [['21', '→ step 1'], ['42', '→ step 2'], ['times', '·']],
  7: [['42', '→ step 2'], ['21', '·'], ['double', '·']],
  8: [['42', '→ step 2'], ['49', '(forming)'], ['plus', '·']],
  9: [['42', '→ step 2'], ['49', '→ step 3'], ['answer', '·']],
  10: [['49', '→ answer'], ['42', '·'], ['equals', '·']],
  11: [['49', '→ answer'], ['49', '·'], ['=', '·']],
  12: [['49', '→ output'], ['forty', '·'], ['nine', '·']],
};
const LAND_WORD = { 1: '7', 2: '+', 3: 'sum', 4: '21', 5: '21', 6: '42', 7: '42', 8: '49', 9: '49', 10: '49', 11: '49', 12: '49' };

function curvePath(points) {
  let d = `M ${lx(0)} ${ly(points[0])}`;
  for (let i = 1; i <= NL; i++) {
    const cx = (lx(i - 1) + lx(i)) / 2;
    d += ` C ${cx} ${ly(points[i - 1])}, ${cx} ${ly(points[i])}, ${lx(i)} ${ly(points[i])}`;
  }
  return d;
}

export function JSpaceEvolvingTrajectory() {
  const [layer, setLayer] = useState(1);
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!playing) {
      clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setLayer((v) => (v >= NL ? 1 : v + 1));
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [playing]);

  const predEnd = useMemo(() => {
    const slope = PATH[layer] - PATH[layer - 1];
    return Math.max(0.02, Math.min(0.98, PATH[layer] + slope * (NL - layer)));
  }, [layer]);

  const trueY = ly(PATH[NL]);
  const estY = ly(predEnd);
  const estAbove = estY < trueY;
  const rows = READOUTS[layer];

  const wsX0 = lx(3.5), wsX1 = lx(10.5);

  return (
    <div className="my-8 not-prose font-mono text-black">
      <div className="text-sm mb-4" style={{ color: TEXT_SECONDARY }}>
        prompt: calc: ( 4 + 17 ) * 2 + 7 =
      </div>

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
          onChange={(e) => { setPlaying(false); setLayer(parseInt(e.target.value, 10)); }}
          className="flex-1 min-w-[180px]"
          style={{ accentColor: ORANGE }}
        />
        <span className="text-sm font-medium min-w-[96px]">{layer} ({regime(layer)})</span>
      </div>

      <svg width="100%" viewBox="0 0 680 400" role="img" aria-label="Activation trajectory with evolving J-lens readouts">
        <rect x={wsX0} y={Y1} width={wsX1 - wsX0} height={Y0 - Y1} fill={PURPLE_BG} opacity={0.5} rx={6} />
        <text x={(wsX0 + wsX1) / 2} y={Y1 + 14} textAnchor="middle" fontSize={11} fill="#3C3489">workspace layers</text>

        {Array.from({ length: NL + 1 }, (_, i) => (
          <g key={i}>
            <line x1={lx(i)} y1={Y0} x2={lx(i)} y2={Y1} stroke={BORDER} strokeWidth={0.5} strokeDasharray="2 4" />
            {i % 2 === 0 && <text x={lx(i)} y={Y0 + 20} textAnchor="middle" fontSize={11} fill={TEXT_SECONDARY}>{i}</text>}
          </g>
        ))}
        <text x={(X0 + X1) / 2} y={Y0 + 40} textAnchor="middle" fontSize={12} fill={TEXT_SECONDARY}>layer</text>

        <path d={curvePath(PATH)} fill="none" stroke={PURPLE} strokeWidth={2.5} strokeLinecap="round" />

        <line x1={lx(layer)} y1={ly(PATH[layer])} x2={lx(NL)} y2={ly(predEnd)} stroke={ORANGE} strokeWidth={2} strokeDasharray="7 5" strokeLinecap="round" />
        <circle cx={lx(layer)} cy={ly(PATH[layer])} r={6} fill={ORANGE} stroke="#ede4d0" strokeWidth={1.5} />
        <text x={lx(layer)} y={ly(PATH[layer]) - 13} textAnchor="middle" fontSize={12} fontWeight={600} fill={ORANGE_TEXT}>J_{layer}</text>

        <circle cx={lx(NL)} cy={ly(PATH[NL])} r={6} fill={PURPLE} />
        <circle cx={lx(NL)} cy={ly(predEnd)} r={5} fill="none" stroke={ORANGE} strokeWidth={2} />
        <text x={lx(NL) + 12} y={estAbove ? trueY + 5 : trueY - 10} fontSize={12} fontWeight={600} fill="#3C3489">True output → 49</text>
        <text x={lx(NL) + 12} y={estAbove ? estY - 10 : estY + 16} fontSize={12} fontWeight={600} fill={ORANGE_TEXT}>Estimate → {LAND_WORD[layer]}</text>
      </svg>

      <div className="mt-2">
        <div className="text-xs mb-1.5" style={{ color: TEXT_SECONDARY }}>
          top J-lens tokens at layer {layer} (from J_{layer})
        </div>
        <div className="flex gap-2 flex-wrap">
          {rows.map((r, i) => {
            const isNum = /^\d+$/.test(r[0]);
            const strong = isNum && (r[1].includes('step') || r[1].includes('answer') || r[1].includes('output'));
            return (
              <div
                key={i}
                className="flex items-center gap-2 rounded-lg px-3 py-1.5"
                style={{
                  background: strong ? PURPLE_BG : SURFACE,
                  border: `0.5px solid ${strong ? PURPLE_BORDER : BORDER}`,
                }}
              >
                <span className="text-xs" style={{ color: TEXT_MUTED }}>#{i + 1}</span>
                <span className="text-base font-medium" style={{ color: strong ? '#3C3489' : 'black' }}>{r[0]}</span>
                <span className="text-xs" style={{ color: TEXT_SECONDARY }}>{r[1]}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={() => setPlaying((p) => !p)}
          className="px-3 py-1.5 text-sm rounded-md border transition-colors cursor-pointer"
          style={{ borderColor: 'rgba(0,0,0,0.3)', background: 'transparent' }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#d6cdb9')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          {playing ? '⏸ Pause' : '▶ Play'}
        </button>
      </div>
    </div>
  );
}
