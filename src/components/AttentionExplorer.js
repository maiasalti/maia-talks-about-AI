'use client';
import { useState, useEffect, useRef, useMemo } from 'react';

const ACCENT = '#b14a32';

const RAW_SCENARIOS = [
  {
    label: 'Pronoun reference',
    tokens: ['The', 'cat', 'sat', 'because', 'it', 'was', 'tired'],
    def: 4,
    m: [
      [0.40, 0.35, 0.10, 0.03, 0.05, 0.04, 0.03],
      [0.30, 0.20, 0.22, 0.05, 0.10, 0.05, 0.08],
      [0.10, 0.52, 0.10, 0.05, 0.08, 0.08, 0.07],
      [0.05, 0.10, 0.30, 0.10, 0.25, 0.10, 0.10],
      [0.04, 0.55, 0.14, 0.05, 0.06, 0.04, 0.12],
      [0.04, 0.08, 0.06, 0.06, 0.30, 0.10, 0.36],
      [0.03, 0.28, 0.06, 0.08, 0.38, 0.10, 0.07],
    ],
  },
  {
    label: 'Word meaning',
    tokens: ['I', 'deposited', 'money', 'at', 'the', 'bank'],
    def: 5,
    m: [
      [0.45, 0.30, 0.10, 0.05, 0.05, 0.05],
      [0.20, 0.15, 0.30, 0.05, 0.05, 0.25],
      [0.08, 0.32, 0.15, 0.05, 0.05, 0.35],
      [0.05, 0.10, 0.10, 0.15, 0.20, 0.40],
      [0.04, 0.06, 0.06, 0.10, 0.24, 0.50],
      [0.06, 0.34, 0.40, 0.05, 0.05, 0.10],
    ],
  },
];

const SCENARIOS = RAW_SCENARIOS.map((s) => ({
  ...s,
  m: s.m.map((r) => {
    const sum = r.reduce((a, b) => a + b, 0);
    return r.map((x) => x / sum);
  }),
}));

export function AttentionExplorer() {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [pinned, setPinned] = useState(SCENARIOS[0].def);
  const [active, setActive] = useState(SCENARIOS[0].def);

  const svgRef = useRef(null);
  const buttonsRef = useRef([]);

  const scenario = SCENARIOS[scenarioIdx];
  const row = scenario.m[active] || scenario.m[scenario.def];

  const [topIdx, topWeight] = useMemo(() => {
    let t = -1, best = -1;
    row.forEach((w, i) => {
      if (i !== active && w > best) { best = w; t = i; }
    });
    return [t, best];
  }, [row, active]);

  function drawArcs() {
    const svg = svgRef.current;
    if (!svg) return;
    const buttons = buttonsRef.current;
    const anchor = buttons[active];
    if (!anchor) return;

    const sr = svg.getBoundingClientRect();
    const pt = (el) => {
      const r = el.getBoundingClientRect();
      return { x: r.left + r.width / 2 - sr.left, y: r.top - sr.top };
    };

    const p0 = pt(anchor);
    const ordered = row
      .map((w, i) => ({ i, w }))
      .filter((o) => o.i !== active && o.w >= 0.03 && buttons[o.i])
      .sort((a, b) => a.w - b.w);

    const paths = ordered.map((o) => {
      const p1 = pt(buttons[o.i]);
      const dist = Math.abs(p1.x - p0.x);
      const peak = Math.max(8, p0.y - (24 + 0.16 * dist));
      const mid = (p0.x + p1.x) / 2;
      const sw = (1.5 + o.w * 9).toFixed(1);
      const op = (0.3 + o.w * 0.6).toFixed(2);
      return `<path d="M${p0.x.toFixed(1)} ${p0.y.toFixed(1)} Q${mid.toFixed(1)} ${peak.toFixed(1)} ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}" fill="none" stroke="${ACCENT}" stroke-width="${sw}" stroke-opacity="${op}" stroke-linecap="round"/>`;
    }).join('');

    svg.innerHTML = paths + `<circle cx="${p0.x.toFixed(1)}" cy="${p0.y.toFixed(1)}" r="3" fill="${ACCENT}"/>`;
  }

  useEffect(() => {
    drawArcs();
  });

  useEffect(() => {
    let timer;
    const handler = () => {
      clearTimeout(timer);
      timer = setTimeout(drawArcs, 120);
    };
    window.addEventListener('resize', handler);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handler);
    };
  });

  function changeScenario(i) {
    if (i === scenarioIdx) return;
    buttonsRef.current = [];
    const newDef = SCENARIOS[i].def;
    setScenarioIdx(i);
    setPinned(newDef);
    setActive(newDef);
  }

  return (
    <div className="my-8 not-prose font-mono text-black">
      <div className="flex gap-2 justify-center mb-6">
        {SCENARIOS.map((s, i) => (
          <button
            key={s.label}
            onClick={() => changeScenario(i)}
            className="text-sm px-3 py-1.5 rounded-md border transition cursor-pointer"
            style={{
              background: scenarioIdx === i ? ACCENT : 'transparent',
              color: scenarioIdx === i ? 'white' : 'rgba(0,0,0,0.7)',
              borderColor: scenarioIdx === i ? ACCENT : 'rgba(0,0,0,0.3)',
            }}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div className="relative">
        <svg
          ref={svgRef}
          className="absolute left-0 top-0 w-full h-full"
          style={{ pointerEvents: 'none', overflow: 'visible' }}
          aria-hidden="true"
        />
        <div style={{ height: 112 }} />
        <div
          onMouseLeave={() => setActive(pinned)}
          className="flex flex-wrap gap-2.5 justify-center items-start"
        >
          {scenario.tokens.map((t, i) => {
            const w = row[i];
            const isActive = i === active;
            const bgOpacity = isActive ? 0 : w;
            const strong = !isActive && w >= 0.2;
            return (
              <div key={`${scenarioIdx}-${i}`} className="flex flex-col items-center gap-0.5">
                <button
                  ref={(el) => { buttonsRef.current[i] = el; }}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => { setPinned(i); setActive(i); }}
                  className="text-base px-3 py-2 rounded-md cursor-pointer transition"
                  style={{
                    background: isActive ? 'transparent' : `rgba(177, 74, 50, ${bgOpacity})`,
                    color: isActive ? ACCENT : 'black',
                    border: isActive
                      ? `2px solid ${ACCENT}`
                      : strong
                      ? `1px solid ${ACCENT}`
                      : '1px solid rgba(0,0,0,0.25)',
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  {t}
                </button>
                <span className="text-xs h-3.5" style={{ color: 'rgba(0,0,0,0.5)' }}>
                  {isActive ? '' : `${Math.round(w * 100)}%`}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="text-center mt-6 text-sm" style={{ color: 'rgba(0,0,0,0.8)', minHeight: '1.5rem' }}>
        {topIdx !== -1 && (
          <>
            &ldquo;<span className="font-semibold">{scenario.tokens[active]}</span>&rdquo; is mostly drawing on &ldquo;<span className="font-semibold">{scenario.tokens[topIdx]}</span>&rdquo; ({Math.round(topWeight * 100)}%).
          </>
        )}
      </div>
      <div className="text-center mt-2 text-xs" style={{ color: 'rgba(0,0,0,0.5)' }}>
        thicker line = stronger attention &middot; tap a word to change the focus
      </div>
    </div>
  );
}
