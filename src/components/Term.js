'use client';
import { useId, useState } from 'react';

// Inline glossary term: dotted underline, short explanation on hover, focus or tap.
// Usage in MDX: <Term tip="Short explanation.">virtual machine</Term>
// Styles live in globals.css (.term, .term-tip).
export function Term({ tip, children }) {
  const [open, setOpen] = useState(false);
  const tipId = useId();
  return (
    <span
      className="term"
      tabIndex={0}
      aria-describedby={tipId}
      // A tap also fires mouseenter, so toggling here would close it again.
      // Tapping elsewhere blurs the term and closes it.
      onClick={() => setOpen(true)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}
      <span id={tipId} role="tooltip" className={open ? 'term-tip term-tip-open' : 'term-tip'}>
        {tip}
      </span>
    </span>
  );
}
