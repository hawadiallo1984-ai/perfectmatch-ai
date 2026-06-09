'use client';
import { useState } from 'react';

export default function BundleBuyButton({ bundleId, label }: { bundleId: string; label: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/checkout-guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bundleId }),
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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: 8 }}>
      <button
        onClick={handleClick}
        disabled={loading}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          padding: '14px 28px',
          background: loading
            ? 'rgba(201,162,75,0.5)'
            : 'linear-gradient(135deg, var(--gold), var(--gold-soft))',
          color: 'var(--ink)',
          borderRadius: 100,
          fontSize: 13,
          letterSpacing: '0.1em',
          textTransform: 'uppercase' as const,
          fontWeight: 700,
          border: 'none',
          cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'all 0.25s',
        }}
      >
        {loading ? 'Redirection…' : label}
      </button>
      {error && (
        <p style={{ fontSize: 12, color: '#e05', margin: 0, textAlign: 'center' }}>{error}</p>
      )}
    </div>
  );
}
