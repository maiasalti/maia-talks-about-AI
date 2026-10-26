'use client';
import { useEffect, useState } from 'react';

// Collapsible section for post content. Same shell as OptionalMath, but light
// and with a custom title. Body text styles live in globals.css (.dropdown-body).
// Give it an id to link to it (#id); following that link opens it.
export function Dropdown({ id, title, children }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!id) return;
    const openIfTargeted = () => {
      if (window.location.hash === `#${id}`) setOpen(true);
    };
    openIfTargeted();
    window.addEventListener('hashchange', openIfTargeted);
    return () => window.removeEventListener('hashchange', openIfTargeted);
  }, [id]);

  return (
    <div id={id} className="my-8 border border-black rounded-lg overflow-hidden not-prose scroll-mt-8">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-3 px-5 py-3 bg-black hover:bg-gray-900 transition text-left text-white"
      >
        <span className="font-mono text-sm uppercase tracking-wider">
          {title}
        </span>
        <span className="text-white/60 text-xs font-mono">
          {open ? '▼ Hide' : '▶ Show'}
        </span>
      </button>
      {open && (
        <div className="dropdown-body px-5 py-4 bg-white text-black">
          {children}
        </div>
      )}
    </div>
  );
}
