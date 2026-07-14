'use client';
import { useEffect, useMemo, useRef, useState } from 'react';

const PANEL = '#DAC98C';
const PANEL_HOVER = '#C8B266';
const NODE_FILL = '#CBC7A0';
const NODE_HOVER = '#B7B074';
const NODE_STROKE = '#8C8659';
const EDGE_ACTIVE = '#6E6838';
const EDGE = '#B4AE83';
const INK = '#2A2A24';
const INK_SOFT = '#57543F';
const BG = '#EAE7DE';
const NEXTBOX = '#DAC98C';

const INPUT_COL = [105, 143, 181, 240, 278, 316, 375, 413, 451, 510, 548, 586].map((y) => [288, y]);
const COL_A = [235, 285, 335, 385, 435].map((y) => [470, y]);
const COL_B = [235, 285, 335, 385, 435].map((y) => [650, y]);
const OUT_COL = [205, 252, 299, 346, 393, 440, 487].map((y) => [830, y]);

const TOKENS = [
  { x: 95, y: 112, label: 'What' },
  { x: 95, y: 248, label: 'do' },
  { x: 95, y: 384, label: 'you' },
  { x: 95, y: 516, label: 'think' },
];

const OUTPUTS = [
  { y: 205, word: 'about', prob: '0.30' },
  { y: 252, word: 'would', prob: '0.20' },
  { y: 299, word: 'of', prob: '0.10' },
  { y: 346, word: 'is', prob: '0.10' },
  { y: 393, word: 'when', prob: '0.10' },
  { y: 440, word: 'makes', prob: '0.05' },
  { y: 487, word: 'we', prob: '0.05' },
];

const INFO = {
  tokens: {
    title: 'Input tokens',
    body: [
      "The prompt is split into tokens, roughly words or word-pieces. Here “What do you think” is the running text, and the model's whole job is to predict what comes next.",
    ],
  },
  embed: {
    title: 'Embedding',
    body: [
      'Each token becomes a vector of numbers capturing its meaning (with a positional signal so word order matters). These vectors are what actually flow into the network.',
    ],
  },
  layers: {
    title: 'The hidden layers',
    body: [
      'Think of a factory line: each layer is a floor that reads the incoming hidden vector h_l, adds a little more understanding, and passes it on. Real models stack dozens of these.',
      "A vector on a middle floor is written in that floor's own secret dialect, full of information, but not yet in a form the output can read.",
    ],
  },
  output: {
    title: 'Scores → probabilities',
    body: [
      "The final vector is compared against a fixed dictionary (W_U) with one “detector direction” per word, giving a raw score, a logit, for each.",
      "Softmax then squashes those scores into probabilities that add up to 1. Here “about” leads at 0.30.",
    ],
  },
  next: {
    title: 'The next token',
    body: [
      "Whichever word has the highest probability is (usually) the one the model says next. It's appended to the prompt, and the whole network runs again for the word after that.",
    ],
  },
};

function Edges({ a, b }) {
  const lines = useMemo(() => {
    const out = [];
    a.forEach(([x1, y1]) => {
      b.forEach(([x2, y2]) => {
        out.push([x1 + 11, y1, x2 - 11, y2]);
      });
    });
    return out;
  }, [a, b]);
  return (
    <g>
      {lines.map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={EDGE} strokeWidth={0.7} opacity={0.5} />
      ))}
    </g>
  );
}

function Region({ regionKey, active, activeKey, onEnter, onMove, onLeave, onClick, children }) {
  const isActive = activeKey === regionKey;
  return (
    <g
      onMouseEnter={() => onEnter(regionKey)}
      onMouseMove={(e) => onMove(regionKey, e)}
      onMouseLeave={() => onLeave(regionKey)}
      onClick={(e) => onClick(regionKey, e)}
      style={{ cursor: 'pointer' }}
      data-active={isActive}
    >
      {children(isActive)}
    </g>
  );
}

export function TransformerDiagram() {
  const [hoverKey, setHoverKey] = useState(null);
  const [activeKey, setActiveKey] = useState(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const tipRef = useRef(null);
  const [tipStyle, setTipStyle] = useState({ left: 0, top: 0, opacity: 0 });

  const displayKey = activeKey || hoverKey;

  useEffect(() => {
    if (!displayKey || !tipRef.current) {
      setTipStyle((s) => ({ ...s, opacity: 0 }));
      return;
    }
    const pad = 14;
    const w = tipRef.current.offsetWidth;
    const h = tipRef.current.offsetHeight;
    let left = pos.x + 18;
    let top = pos.y + 18;
    if (typeof window !== 'undefined') {
      if (left + w + pad > window.innerWidth) left = pos.x - w - 18;
      if (top + h + pad > window.innerHeight) top = window.innerHeight - h - pad;
    }
    if (left < pad) left = pad;
    if (top < pad) top = pad;
    setTipStyle({ left, top, opacity: 1 });
  }, [displayKey, pos]);

  const onEnter = (key) => setHoverKey(key);
  const onMove = (key, e) => {
    setHoverKey(key);
    setPos({ x: e.clientX, y: e.clientY });
  };
  const onLeave = (key) => {
    setHoverKey((current) => (activeKey === key ? current : null));
  };
  const onClick = (key, e) => {
    e.stopPropagation();
    setActiveKey(key);
    setPos({ x: e.clientX, y: e.clientY });
  };

  const info = displayKey ? INFO[displayKey] : null;

  return (
    <div
      className="my-8 not-prose font-mono text-black rounded-lg p-5"
      style={{ background: BG, border: `1px solid ${NODE_STROKE}` }}
      onClick={() => setActiveKey(null)}
    >
      <div className="text-sm mb-1" style={{ color: INK_SOFT, fontStyle: 'italic' }}>
        Tokens flow left to right through the network&rsquo;s layers, and come out the other side as a probability for each possible next word.
      </div>
      <div className="text-xs mb-3" style={{ color: INK_SOFT, fontStyle: 'italic' }}>
        Hover (or tap) any part of the network for a plain-language explanation.
      </div>

      <div className="relative overflow-x-auto">
        <svg viewBox="0 0 1220 640" role="img" aria-label="Transformer network diagram" style={{ display: 'block', width: '100%', minWidth: 720, height: 'auto' }}>
          <Edges a={INPUT_COL} b={COL_A} />
          <Edges a={COL_A} b={COL_B} />
          <Edges a={COL_B} b={OUT_COL} />

          <text x="120" y="70" fontWeight={700} fontSize={17} fill={INK}>Inputs</text>

          <Region regionKey="tokens" activeKey={displayKey} onEnter={onEnter} onMove={onMove} onLeave={onLeave} onClick={onClick}>
            {(isActive) => (
              <>
                {TOKENS.map((t, i) => (
                  <g key={i}>
                    <rect x={t.x} y={t.y} width={120} height={46} rx={4} fill={isActive ? PANEL_HOVER : PANEL} style={{ transition: 'fill .18s ease' }} />
                    <text x={t.x + 60} y={t.y + 31} textAnchor="middle" fontSize={20} fill={INK}>{t.label}</text>
                  </g>
                ))}
                <path d="M232,96 C244,96 244,131 254,135 C244,139 244,174 232,174" stroke={NODE_STROKE} strokeWidth={1.3} fill="none" />
                <path d="M232,232 C244,232 244,267 254,271 C244,275 244,310 232,310" stroke={NODE_STROKE} strokeWidth={1.3} fill="none" />
                <path d="M232,368 C244,368 244,403 254,407 C244,411 244,446 232,446" stroke={NODE_STROKE} strokeWidth={1.3} fill="none" />
                <path d="M232,500 C244,500 244,535 254,539 C244,543 244,578 232,578" stroke={NODE_STROKE} strokeWidth={1.3} fill="none" />
                <rect x={88} y={90} width={180} height={500} fill="transparent" />
              </>
            )}
          </Region>

          <Region regionKey="embed" activeKey={displayKey} onEnter={onEnter} onMove={onMove} onLeave={onLeave} onClick={onClick}>
            {(isActive) => (
              <>
                {INPUT_COL.map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r={11} fill={isActive ? NODE_HOVER : NODE_FILL} stroke={isActive ? EDGE_ACTIVE : NODE_STROKE} strokeWidth={1.3} style={{ transition: 'fill .18s ease, stroke .18s ease' }} />
                ))}
                <text x={288} y={620} textAnchor="middle" fontSize={12} fontStyle="italic" fill={INK_SOFT}>embedding</text>
                <rect x={266} y={90} width={44} height={512} fill="transparent" />
              </>
            )}
          </Region>

          <Region regionKey="layers" activeKey={displayKey} onEnter={onEnter} onMove={onMove} onLeave={onLeave} onClick={onClick}>
            {(isActive) => (
              <>
                {[...COL_A, ...COL_B].map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r={11} fill={isActive ? NODE_HOVER : NODE_FILL} stroke={isActive ? EDGE_ACTIVE : NODE_STROKE} strokeWidth={1.3} style={{ transition: 'fill .18s ease, stroke .18s ease' }} />
                ))}
                <text x={560} y={620} textAnchor="middle" fontSize={12} fontStyle="italic" fill={INK_SOFT}>hidden layers &middot; 1 … L</text>
                <rect x={448} y={215} width={224} height={240} fill="transparent" />
              </>
            )}
          </Region>

          <Region regionKey="output" activeKey={displayKey} onEnter={onEnter} onMove={onMove} onLeave={onLeave} onClick={onClick}>
            {(isActive) => (
              <>
                {OUTPUTS.map((o, i) => (
                  <g key={i}>
                    <circle cx={830} cy={o.y} r={11} fill={isActive ? NODE_HOVER : NODE_FILL} stroke={isActive ? EDGE_ACTIVE : NODE_STROKE} strokeWidth={1.3} style={{ transition: 'fill .18s ease, stroke .18s ease' }} />
                    <text x={850} y={o.y + 6} fontSize={15} fill={INK}>{o.word}</text>
                    <text x={945} y={o.y + 6} fontSize={15} fill={INK_SOFT}>{o.prob}</text>
                  </g>
                ))}
                <text x={960} y={150} textAnchor="middle" fontWeight={700} fontSize={17} fill={INK}>Selection</text>
                <text x={960} y={172} textAnchor="middle" fontWeight={700} fontSize={17} fill={INK}>probability</text>
                <path d="M960,178 L960,192" stroke={EDGE_ACTIVE} strokeWidth={1.4} />
                <path d="M956,186 L960,194 L964,186 Z" fill={EDGE_ACTIVE} />
                <rect x={808} y={140} width={180} height={368} fill="transparent" />
              </>
            )}
          </Region>

          <path d="M1010,200 C1024,200 1024,340 1036,346 C1024,352 1024,492 1010,492" stroke={NODE_STROKE} strokeWidth={1.3} fill="none" />

          <Region regionKey="next" activeKey={displayKey} onEnter={onEnter} onMove={onMove} onLeave={onLeave} onClick={onClick}>
            {(isActive) => (
              <>
                <text x={1120} y={308} textAnchor="middle" fontWeight={700} fontSize={17} fill={INK}>Next Token</text>
                <rect x={1058} y={326} width={124} height={52} rx={5} fill={isActive ? PANEL_HOVER : NEXTBOX} stroke={NODE_STROKE} strokeWidth={1.3} strokeDasharray="5 4" style={{ transition: 'fill .18s ease' }} />
                <rect x={1050} y={286} width={150} height={100} fill="transparent" />
              </>
            )}
          </Region>
        </svg>
      </div>

      {info && (
        <div
          ref={tipRef}
          className="fixed z-50 max-w-xs rounded-md px-4 py-3 text-sm"
          style={{
            left: tipStyle.left,
            top: tipStyle.top,
            opacity: tipStyle.opacity,
            background: '#FBF9F2',
            border: `1px solid ${NODE_STROKE}`,
            boxShadow: '0 10px 28px rgba(60,55,30,0.2)',
            pointerEvents: 'none',
            transition: 'opacity .15s ease',
          }}
        >
          <div className="font-bold mb-1.5" style={{ color: '#8C7A3A', fontSize: 15 }}>{info.title}</div>
          {info.body.map((p, i) => (
            <p key={i} className="mt-1.5 first:mt-0" style={{ color: INK, lineHeight: 1.5 }}>{p}</p>
          ))}
        </div>
      )}
    </div>
  );
}
