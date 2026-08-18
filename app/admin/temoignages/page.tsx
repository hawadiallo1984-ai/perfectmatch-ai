'use client';

import { useState, useCallback } from 'react';

type Testimonial = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  lang: string;
  created_at: string;
};

function Stars({ rating }: { rating: number }) {
  return (
    <span style={{ color: '#C9A24B', fontSize: 16 }}>
      {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
    </span>
  );
}

export default function AdminTemoignagesPage() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState('');
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionMsg, setActionMsg] = useState('');

  const fetchPending = useCallback(async (secret: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/testimonials', {
        headers: { 'x-admin-secret': secret },
      });
      if (res.status === 401) {
        setAuthError('Mot de passe incorrect.');
        setAuthed(false);
        return;
      }
      const data = await res.json();
      setItems(data.testimonials ?? []);
      setAuthed(true);
    } catch {
      setAuthError('Erreur réseau.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    fetchPending(password);
  };

  const handleAction = async (id: string, action: 'approve' | 'reject') => {
    setActionMsg('');
    const res = await fetch('/api/admin/testimonials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-secret': password,
      },
      body: JSON.stringify({ id, action }),
    });
    if (res.ok) {
      setItems((prev) => prev.filter((t) => t.id !== id));
      setActionMsg(action === 'approve' ? 'Avis approuvé ✓' : 'Avis refusé ✓');
      setTimeout(() => setActionMsg(''), 3000);
    } else {
      setActionMsg('Erreur lors de l\'action.');
    }
  };

  if (!authed) {
    return (
      <main style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0B0A14',
        color: '#F5EFE3',
        fontFamily: 'Georgia, serif',
      }}>
        <form onSubmit={handleLogin} style={{
          background: '#1C1833',
          padding: '48px 40px',
          borderRadius: 12,
          width: '100%',
          maxWidth: 380,
          textAlign: 'center',
        }}>
          <p style={{ fontSize: 12, letterSpacing: '0.2em', color: '#C9A24B', marginBottom: 24 }}>✦ EvaTalk — Admin</p>
          <h1 style={{ fontSize: 22, fontWeight: 400, marginBottom: 32 }}>Modération des avis</h1>
          <input
            type="password"
            placeholder="Mot de passe admin"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: 8,
              border: '1px solid rgba(201,162,75,0.3)',
              background: '#0B0A14',
              color: '#F5EFE3',
              fontSize: 15,
              marginBottom: 16,
              boxSizing: 'border-box',
            }}
          />
          {authError && <p style={{ color: '#D99B9B', fontSize: 13, marginBottom: 12 }}>{authError}</p>}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '13px',
              background: 'linear-gradient(135deg, #C9A24B, #E8C77A)',
              color: '#0B0A14',
              borderRadius: 100,
              fontWeight: 700,
              fontSize: 14,
              border: 'none',
              cursor: loading ? 'wait' : 'pointer',
              letterSpacing: '0.05em',
            }}
          >
            {loading ? 'Connexion…' : 'Accéder →'}
          </button>
        </form>
      </main>
    );
  }

  return (
    <main style={{
      minHeight: '100vh',
      background: '#0B0A14',
      color: '#F5EFE3',
      fontFamily: 'Georgia, serif',
      padding: '48px 24px',
    }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <p style={{ fontSize: 12, letterSpacing: '0.2em', color: '#C9A24B', marginBottom: 16 }}>✦ EvaTalk — Admin</p>
        <h1 style={{ fontSize: 28, fontWeight: 400, marginBottom: 8 }}>Avis en attente</h1>
        <p style={{ opacity: 0.5, fontSize: 14, marginBottom: 40 }}>
          {items.length === 0 ? 'Aucun avis en attente.' : `${items.length} avis à modérer`}
        </p>

        {actionMsg && (
          <div style={{
            background: '#1C1833',
            border: '1px solid rgba(201,162,75,0.3)',
            borderRadius: 8,
            padding: '12px 20px',
            marginBottom: 24,
            color: '#C9A24B',
            fontSize: 14,
          }}>
            {actionMsg}
          </div>
        )}

        {items.map((t) => (
          <div key={t.id} style={{
            background: '#1C1833',
            border: '1px solid rgba(201,162,75,0.12)',
            borderRadius: 12,
            padding: '28px 32px',
            marginBottom: 20,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
              <div>
                <span style={{ fontWeight: 600, fontSize: 16 }}>{t.name}</span>
                <span style={{ opacity: 0.4, fontSize: 12, marginLeft: 12 }}>{t.lang.toUpperCase()}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Stars rating={t.rating} />
                <span style={{ opacity: 0.4, fontSize: 12 }}>
                  {new Date(t.created_at).toLocaleDateString('fr-FR')}
                </span>
              </div>
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.7, opacity: 0.85, marginBottom: 24, fontStyle: 'italic' }}>
              &ldquo;{t.comment}&rdquo;
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={() => handleAction(t.id, 'approve')}
                style={{
                  padding: '10px 24px',
                  background: 'linear-gradient(135deg, #C9A24B, #E8C77A)',
                  color: '#0B0A14',
                  borderRadius: 100,
                  fontWeight: 700,
                  fontSize: 13,
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Approuver ✓
              </button>
              <button
                onClick={() => handleAction(t.id, 'reject')}
                style={{
                  padding: '10px 24px',
                  background: 'transparent',
                  color: '#D99B9B',
                  borderRadius: 100,
                  fontWeight: 500,
                  fontSize: 13,
                  border: '1px solid rgba(217,155,155,0.4)',
                  cursor: 'pointer',
                }}
              >
                Refuser
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
