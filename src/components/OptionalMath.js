'use client';
import { useState } from 'react';

export function OptionalMath({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="my-8 border border-black/20 rounded-lg overflow-hidden not-prose">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-3 px-5 py-3 bg-[#d6cdb9] hover:bg-[#cabf9e] transition text-left text-black"
      >
        <span className="font-mono text-sm uppercase tracking-wider">
          Optional math
        </span>
        <span className="text-black/60 text-xs font-mono">
          {open ? '▼ Hide' : '▶ Show'}
        </span>
      </button>
      {open && (
        <div className="px-5 py-4 bg-[#d6cdb9] prose max-w-none text-black border-t border-black/10">
          {children}
        </div>
      )}
    </div>
  );
}
