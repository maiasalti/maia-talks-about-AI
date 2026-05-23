'use client';
import { useState } from 'react';

export function OptionalMath({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="my-8 border border-gray-600 rounded-lg overflow-hidden not-prose">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-3 px-5 py-3 bg-gray-800 hover:bg-gray-700 transition text-left text-white"
      >
        <span className="font-mono text-sm uppercase tracking-wider">
          Optional math
        </span>
        <span className="text-gray-400 text-xs font-mono">
          {open ? '▼ Hide' : '▶ Show'}
        </span>
      </button>
      {open && (
        <div className="px-5 py-4 bg-gray-900 prose prose-invert max-w-none">
          {children}
        </div>
      )}
    </div>
  );
}
