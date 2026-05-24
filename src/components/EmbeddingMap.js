'use client';
import { useState, useMemo } from 'react';

const RED = '#c0392b';
const TEXT = '#b3331f';
const AXIS = '#1a1a1a';
const STATUS = '#9a3424';

const CX = 340, CY = 245, SX = 270, SY = 205;

const WORDS_RAW = [
  { w: 'king',     x:  0.72, y:  0.78, perm: true, ldy: -26 },
  { w: 'queen',    x:  0.80, y:  0.60, perm: true },
  { w: 'royal',    x:  0.56, y:  0.66 },
  { w: 'prince',   x:  0.62, y:  0.90 },
  { w: 'princess', x:  0.86, y:  0.50 },
  { w: 'crown',    x:  0.90, y:  0.76 },
  { w: 'apple',    x: -0.42, y:  0.20 },
  { w: 'banana',   x: -0.36, y: -0.10 },
  { w: 'orange',   x: -0.58, y:  0.12 },
  { w: 'grape',    x: -0.50, y: -0.16 },
  { w: 'mango',    x: -0.46, y:  0.32 },
  { w: 'cherry',   x: -0.64, y: -0.28 },
  { w: 'dog',      x:  0.44, y: -0.52 },
  { w: 'cat',      x:  0.54, y: -0.44 },
  { w: 'lion',     x:  0.68, y: -0.62 },
  { w: 'tiger',    x:  0.60, y: -0.74 },
  { w: 'puppy',    x:  0.36, y: -0.40 },
  { w: 'happy',    x: -0.48, y: -0.54 },
  { w: 'sad',      x: -0.42, y: -0.74 },
  { w: 'joy',      x: -0.62, y: -0.48 },
  { w: 'angry',    x: -0.32, y: -0.80 },
];

const WORDS = WORDS_RAW.map((d) => ({
  ...d,
  cx: CX + d.x * SX,
  cy: CY - d.y * SY,
}));

WORDS.forEach((d) => {
  const others = WORDS
    .filter((o) => o !== d)
    .map((o) => {
      const dx = d.x - o.x, dy = d.y - o.y;
      return { o, dist: Math.sqrt(dx * dx + dy * dy) };
    })
    .sort((a, b) => a.dist - b.dist);
  d.near = others.slice(0, 3).map((e) => e.o);
});

export function EmbeddingMap() {
  const [hovered, setHovered] = useState(null);
  const [pinned, setPinned] = useState(null);

  const focusedKey = hovered ?? pinned;
  const focused = useMemo(
    () => (focusedKey ? WORDS.find((d) => d.w === focusedKey) : null),
    [focusedKey]
  );

  const keep = useMemo(() => {
    if (!focused) return null;
    const set = { [focused.w]: true };
    focused.near.forEach((n) => { set[n.w] = true; });
    return set;
  }, [focused]);

  return (
    <div
      className="my-8 not-prose font-mono"
      style={{
        background: '#f1e7d0',
        borderRadius: 14,
        padding: '18px 18px 14px',
        maxWidth: 680,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
      onMouseLeave={() => setHovered(null)}
    >
      <svg viewBox="0 0 680 500" width="100%" style={{ display: 'block' }} aria-hidden="true">
        {focused && focused.near.map((n) => (
          <line
            key={`ln-${n.w}`}
            x1={focused.cx}
            y1={focused.cy}
            x2={n.cx}
            y2={n.cy}
            stroke={RED}
            strokeWidth="1.6"
            strokeDasharray="4 4"
            opacity="0.55"
          />
        ))}
        {WORDS.map((d) => {
          const isFocus = focused && d.w === focused.w;
          const isNeighbor = keep && keep[d.w] && !isFocus;
          const dimmed = keep && !keep[d.w];
          const r = isFocus ? 11 : isNeighbor ? 9 : 8;
          const groupOpacity = dimmed ? 0.18 : 1;
          const labelOpacity = keep
            ? (keep[d.w] ? 1 : (d.perm ? 0.85 : 0))
            : (d.perm ? 1 : 0);
          const labelRight = d.x >= 0;
          const lx = labelRight ? d.cx + 15 : d.cx - 15;
          const ly = d.cy + 6 + (d.ldy || 0);
          return (
            <g
              key={d.w}
              style={{ cursor: 'pointer', opacity: groupOpacity, transition: 'opacity 0.18s' }}
              onMouseEnter={() => setHovered(d.w)}
              onClick={() => setPinned(pinned === d.w ? null : d.w)}
            >
              <circle
                cx={d.cx}
                cy={d.cy}
                r={r}
                fill={RED}
                style={{ transition: 'r 0.15s' }}
              />
              <text
                x={lx}
                y={ly}
                fill={TEXT}
                fontSize="21"
                textAnchor={labelRight ? 'start' : 'end'}
                style={{ transition: 'opacity 0.15s', opacity: labelOpacity }}
              >
                {d.w}
              </text>
            </g>
          );
        })}
        <line x1="340" y1="20" x2="340" y2="470" stroke={AXIS} strokeWidth="2.5" shapeRendering="crispEdges" />
        <line x1="40" y1="245" x2="640" y2="245" stroke={AXIS} strokeWidth="2.5" shapeRendering="crispEdges" />
      </svg>
      <div
        style={{
          fontSize: 13,
          color: STATUS,
          minHeight: 20,
          padding: '4px 2px 0',
          letterSpacing: '0.2px',
        }}
      >
        {focused
          ? `${focused.w}  →  near: ${focused.near.map((n) => n.w).join('  ·  ')}`
          : 'Hover a word to see its closest neighbors · click one to pin'}
      </div>
    </div>
  );
}
