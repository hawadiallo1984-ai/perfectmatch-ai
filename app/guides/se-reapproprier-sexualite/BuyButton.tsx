'use client';

import { useState } from 'react';

export default function BuyButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/checkout-guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guideId: 'se-reapproprier-sexualite' }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError('Une erreur est survenue — réessaie dans un instant.');
        setLoading(false);
      }
    } catch {
      setError('Une erreur est survenue — réessaie dans un instant.');
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <button
        onClick={handleClick}
        disabled={loading}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          padding: '16px 40px',
          background: loading
            ? 'rgba(201,162,75,0.5)'
            : 'linear-gradient(135deg, var(--gold), var(--gold-soft))',
          color: 'var(--ink)',
          borderRadius: 100,
          fontSize: 14,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          fontWeight: 700,
          border: 'none',
          cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'all 0.25s',
        }}
      >
        {loading ? 'Redirection…' : 'Acheter le guide — 9,99 €'}
      </button>
      {error && (
        <p style={{ fontSize: 13, color: 'var(--danger)', margin: 0 }}>{error}</p>
      )}
    </div>
  );
}
