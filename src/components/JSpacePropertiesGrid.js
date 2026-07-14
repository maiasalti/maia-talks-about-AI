'use client';

const ORANGE = '#D85A30';
const ORANGE_TEXT = '#993C1D';
const BUBBLE_BG = '#FAECE7';
const BUBBLE_BORDER = '#D8A784';
const BOX_BG = '#f5f0e3';
const BORDER = 'rgba(0,0,0,0.15)';
const TEXT_SECONDARY = 'rgba(0,0,0,0.6)';
const GREEN = '#2f7a3d';
const RED = '#b3392c';

function Card({ title, children }) {
  return (
    <div className="rounded-lg p-4 flex flex-col gap-3" style={{ background: BOX_BG, border: `1px solid ${BORDER}` }}>
      <div className="font-bold text-sm">{title}</div>
      {children}
    </div>
  );
}

function PromptBox({ children }) {
  return (
    <div className="rounded px-3 py-2 text-sm" style={{ background: '#ede8d8', color: '#1f1d1a' }}>
      {children}
    </div>
  );
}

function Bubble({ label, from, to }) {
  return (
    <div className="flex flex-col items-center gap-1 py-2">
      <div className="text-xs font-bold tracking-wide" style={{ color: TEXT_SECONDARY }}>{label}</div>
      <div
        className="rounded-full px-5 py-2.5 text-center text-sm"
        style={{ background: BUBBLE_BG, border: `1.5px dashed ${BUBBLE_BORDER}` }}
      >
        <div style={{ color: TEXT_SECONDARY, textDecoration: 'line-through' }}>{from}</div>
        <div style={{ color: ORANGE_TEXT, fontWeight: 600 }}>{to}</div>
      </div>
    </div>
  );
}

function OutputBox({ children }) {
  return (
    <div className="rounded px-3 py-2 text-sm" style={{ background: '#ede8d8', color: '#1f1d1a' }}>
      {children}
    </div>
  );
}

export function JSpacePropertiesGrid() {
  return (
    <div className="my-8 not-prose font-mono text-black">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card title="Verbal report">
          <PromptBox>&ldquo;What are you thinking about?&rdquo;</PromptBox>
          <Bubble label="SWAP" from="banana" to="elephant" />
          <OutputBox>
            Assistant: <span style={{ textDecoration: 'line-through', color: TEXT_SECONDARY }}>…about a banana.</span>
            <br />
            Assistant: <span style={{ color: ORANGE_TEXT }}>…about an elephant.</span>
          </OutputBox>
        </Card>

        <Card title="Directed modulation">
          <PromptBox>Compute 3² − 2 while writing &ldquo;The old painting hung…&rdquo;</PromptBox>
          <div className="rounded-full px-4 py-3 text-xs text-center" style={{ background: BUBBLE_BG, border: `1.5px dashed ${BUBBLE_BORDER}`, color: ORANGE_TEXT }}>
            math → calc → nine → seven → equals
          </div>
          <OutputBox>Assistant: The old painting hung crookedly on the wall.</OutputBox>
        </Card>

        <Card title="Internal reasoning">
          <PromptBox>&ldquo;What color is the planet fourth from the sun?&rdquo;</PromptBox>
          <Bubble label="SWAP" from="Mars" to="Earth" />
          <OutputBox>
            Assistant: <span style={{ textDecoration: 'line-through', color: TEXT_SECONDARY }}>red</span>{' '}
            <span style={{ color: ORANGE_TEXT }}>blue</span>
          </OutputBox>
        </Card>

        <Card title="Flexible generalization">
          <PromptBox>&ldquo;What is the capital of France?&rdquo;</PromptBox>
          <Bubble label="SWAP" from="France" to="China" />
          <OutputBox>
            <div className="flex justify-between"><span style={{ color: TEXT_SECONDARY }}>capital</span><span><span style={{ textDecoration: 'line-through', color: TEXT_SECONDARY }}>Paris</span> <span style={{ color: ORANGE_TEXT }}>Beijing</span></span></div>
            <div className="flex justify-between"><span style={{ color: TEXT_SECONDARY }}>language</span><span><span style={{ textDecoration: 'line-through', color: TEXT_SECONDARY }}>French</span> <span style={{ color: ORANGE_TEXT }}>Chinese</span></span></div>
            <div className="flex justify-between"><span style={{ color: TEXT_SECONDARY }}>continent</span><span><span style={{ textDecoration: 'line-through', color: TEXT_SECONDARY }}>Europe</span> <span style={{ color: ORANGE_TEXT }}>Asia</span></span></div>
            <div className="flex justify-between"><span style={{ color: TEXT_SECONDARY }}>currency</span><span><span style={{ textDecoration: 'line-through', color: TEXT_SECONDARY }}>Euro</span> <span style={{ color: ORANGE_TEXT }}>Yuan</span></span></div>
          </OutputBox>
        </Card>

        <Card title="Selectivity">
          <PromptBox><span style={{ fontStyle: 'italic', color: TEXT_SECONDARY }}>(a battery of tasks)</span></PromptBox>
          <div className="flex flex-col items-center gap-1 py-2">
            <div className="text-xs font-bold tracking-wide" style={{ color: TEXT_SECONDARY }}>ABLATE</div>
            <div className="rounded-full px-5 py-2.5 text-center text-sm" style={{ background: BUBBLE_BG, border: `1.5px dashed ${BUBBLE_BORDER}`, textDecoration: 'line-through', color: TEXT_SECONDARY }}>
              task plan step<br />reason answer
            </div>
          </div>
          <OutputBox>
            <div className="text-xs font-bold mb-1" style={{ color: TEXT_SECONDARY }}>doable without workspace</div>
            <div style={{ color: GREEN }}>✓ parse inputs</div>
            <div style={{ color: GREEN }}>✓ recall facts</div>
            <div style={{ color: GREEN }}>✓ speak fluently</div>
            <div style={{ color: RED }}>✗ reason internally</div>
            <div style={{ color: RED }}>✗ make complex inferences</div>
          </OutputBox>
        </Card>
      </div>
      <div className="text-xs mt-3" style={{ color: TEXT_SECONDARY }}>
        illustrative, not real model output — swapping or ablating a concept inside the J-space, and watching what changes downstream.
      </div>
    </div>
  );
}
