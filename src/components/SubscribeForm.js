'use client';
import { useState } from 'react';

export function SubscribeForm({ variant = 'article' }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === 'loading') return;
    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Try again.');
        return;
      }
      setStatus('success');
      setMessage(data.message || "You're subscribed. I'll let you know when the next post is up.");
      setEmail('');
    } catch {
      setStatus('error');
      setMessage('Network error — please try again.');
    }
  }

  // Variant styles
  const isFooter = variant === 'footer';
  const containerCls = isFooter
    ? 'flex flex-col items-center gap-3 max-w-md mx-auto'
    : 'my-12 not-prose font-mono';
  const headingCls = isFooter
    ? 'text-sm font-semibold text-black text-center'
    : 'text-lg font-semibold text-black mb-1';
  const helpCls = isFooter
    ? 'text-xs text-black/60 text-center'
    : 'text-sm text-black/70 mb-4';

  return (
    <div className={containerCls}>
      <div className={isFooter ? '' : ''}>
        <div className={headingCls}>
          {isFooter ? 'Subscribe' : 'Get new posts in your inbox'}
        </div>
        <div className={helpCls}>
          {isFooter
            ? 'One email when I publish. No spam.'
            : "I'll send you a short email when a new post is up. No spam, just the link."}
        </div>
      </div>

      {status === 'success' ? (
        <div
          className="text-sm px-4 py-3 rounded-md w-full text-center"
          style={{ background: '#d6cdb9', color: 'black' }}
        >
          {message}
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className={`flex ${isFooter ? 'flex-row' : 'flex-col sm:flex-row'} gap-2 w-full`}
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            disabled={status === 'loading'}
            className="flex-1 px-3 py-2 rounded-md text-sm font-mono outline-none"
            style={{
              background: 'white',
              color: 'black',
              border: '1px solid rgba(0,0,0,0.25)',
            }}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-4 py-2 rounded-md text-sm font-mono font-semibold transition cursor-pointer disabled:opacity-60 disabled:cursor-wait"
            style={{ background: 'black', color: 'white' }}
          >
            {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
          </button>
        </form>
      )}

      {status === 'error' && (
        <div className="text-xs text-red-700 mt-1 w-full">{message}</div>
      )}
    </div>
  );
}
