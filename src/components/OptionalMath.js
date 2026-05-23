'use client';
import { useState } from 'react';

export function OptionalMath({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="my-8 border border-black rounded-lg overflow-hidden not-prose">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-3 px-5 py-3 bg-black hover:bg-gray-900 transition text-left text-white"
      >
        <span className="font-mono text-sm uppercase tracking-wider">
          Optional math
        </span>
        <span className="text-white/60 text-xs font-mono">
          {open ? '▼ Hide' : '▶ Show'}
        </span>
      </button>
      {open && (
        <div className="px-5 py-4 bg-black prose prose-invert max-w-none text-white border-t border-white/10">
          {children}
        </div>
      )}
    </div>
  );
}
