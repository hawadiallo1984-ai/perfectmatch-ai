'use client';

import { useState } from 'react';

export default function GuideBuyButton({ guideId, label }: { guideId: string; label?: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/checkout-guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guideId }),
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
        className="btn btn--primary"
      >
        {loading ? 'Redirection…' : (label ?? `Acheter le guide — 9,99 €`)}
      </button>
      {error && (
        <p style={{ fontSize: 13, color: 'var(--danger)', margin: 0 }}>{error}</p>
      )}
    </div>
  );
}
