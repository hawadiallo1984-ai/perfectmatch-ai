'use client';

import { useEffect, useState } from 'react';
import { OFFERS, OFFERS_ORDER, OfferId } from '@/lib/offers';

interface Teaser {
  score: number;
  caption: string;
  explanation: string;
  attachment_style: string;
  attachment_insight: string;
  main_bias: string;
  bias_insight: string;
}

export default function ApercuPage() {
  const [teaser, setTeaser] = useState<Teaser | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedOffer, setSelectedOffer] = useState<OfferId>('complete');
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    const answers = sessionStorage.getItem('pm_answers');
    if (!answers) { setLoading(false); return; }

    fetch('/api/generate-teaser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers: JSON.parse(answers) }),
    })
      .then((r) => r.json())
      .then((data) => { setTeaser(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handlePayment = async () => {
    setPaying(true);
    const answers = JSON.parse(sessionStorage.getItem('pm_answers') || '{}');
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ offerId: selectedOffer, answers }),
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    else setPaying(false);
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 20, position: 'relative', zIndex: 2 }}>
        <div style={{ fontFamily: 'Fraunces, serif', fontSize: 28, fontStyle: 'italic', color: 'var(--gold-soft)' }}>Analyse en cours…</div>
        <div style={{ opacity: 0.6, fontSize: 14 }}>127 dimensions psychologiques, culturelles et astrales</div>
      </div>
    );
  }

  if (!teaser) {
    return (
      <div style={{ minHeight: '100vh', padding: 60, position: 'relative', zIndex: 2 }}>
        <p>Aucune réponse trouvée. <a href="/questionnaire" style={{ color: 'var(--gold-soft)' }}>Commence le questionnaire →</a></p>
      </div>
    );
  }

  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 40px 120px', position: 'relative', zIndex: 2 }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 70 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 18px', border: '1px solid var(--line-strong)', borderRadius: 100, fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 32 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)' }} />
          Analyse terminée
        </div>
        <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(36px, 5vw, 62px)', fontWeight: 300, letterSpacing: '-0.025em', lineHeight: 1.05, marginBottom: 20 }}>
          Voici ton <em style={{ fontStyle: 'italic', color: 'var(--gold-soft)' }}>aperçu</em>.
        </h1>
      </div>

      {/* Score */}
      <div style={{ textAlign: 'center', padding: '60px 40px', border: '1px solid var(--line-strong)', marginBottom: 50, background: 'linear-gradient(180deg, rgba(201,162,75,0.06) 0%, rgba(28,24,51,0.6) 100%)' }}>
        <div style={{ fontSize: 12, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 24 }}>Ton score de clarté relationnelle</div>
        <div style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(100px, 18vw, 180px)', fontWeight: 300, lineHeight: 0.9, letterSpacing: '-0.04em' }}>
          {teaser.score}
        </div>
        <div style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontSize: 22, color: 'var(--gold-soft)', marginBottom: 20 }}>
          « {teaser.caption} »
        </div>
        <p style={{ opacity: 0.7, maxWidth: 500, margin: '0 auto', fontWeight: 300 }}>{teaser.explanation}</p>
      </div>

      {/* 2 insights */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 28, marginBottom: 50 }}>
        <div style={{ padding: '36px 32px', border: '1px solid var(--line)', background: 'rgba(28,24,51,0.4)' }}>
          <div style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontSize: 13, color: 'var(--gold)', marginBottom: 14 }}>✦ style d'attachement</div>
          <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: 24, fontWeight: 400, marginBottom: 16 }}>{teaser.attachment_style}</h3>
          <p style={{ opacity: 0.7, fontSize: 14.5, lineHeight: 1.65, fontWeight: 300 }}>{teaser.attachment_insight}</p>
        </div>
        <div style={{ padding: '36px 32px', border: '1px solid var(--line)', background: 'rgba(28,24,51,0.4)' }}>
          <div style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontSize: 13, color: 'var(--gold)', marginBottom: 14 }}>✦ biais principal détecté</div>
          <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: 24, fontWeight: 400, marginBottom: 16 }}>{teaser.main_bias}</h3>
          <p style={{ opacity: 0.7, fontSize: 14.5, lineHeight: 1.65, fontWeight: 300 }}>{teaser.bias_insight}</p>
        </div>
      </div>

      {/* Paywall */}
      <div style={{ padding: 60, border: '1px solid var(--line-strong)', background: 'radial-gradient(ellipse at top, rgba(201,162,75,0.15), transparent 60%), rgba(28,24,51,0.9)' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 12, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20 }}>Choisis ton rapport</div>
          <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 44, fontWeight: 300, marginBottom: 18, letterSpacing: '-0.025em' }}>
            Débloque <em style={{ fontStyle: 'italic', color: 'var(--gold-soft)' }}>ton analyse</em> complète.
          </h2>
          <p style={{ opacity: 0.7, maxWidth: 560, margin: '0 auto', fontWeight: 300 }}>Paiement unique. Aucun abonnement. Rapport PDF livré immédiatement.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 40 }}>
          {OFFERS_ORDER.map((id) => {
            const offer = OFFERS[id];
            const selected = selectedOffer === id;
            return (
              <div key={id} onClick={() => setSelectedOffer(id)} style={{
                padding: 24, border: `1px solid ${selected ? 'var(--gold)' : 'var(--line)'}`,
                background: selected ? 'linear-gradient(180deg, rgba(201,162,75,0.12), rgba(11,10,20,0.5))' : 'rgba(11,10,20,0.5)',
                cursor: 'pointer', position: 'relative',
              }}>
                {offer.badge && (
                  <div style={{ position: 'absolute', top: -10, left: 20, background: 'var(--gold)', color: 'var(--ink)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 100, fontWeight: 600 }}>
                    Recommandé
                  </div>
                )}
                <div style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontSize: 12, color: 'var(--gold)', marginBottom: 6 }}>{offer.category}</div>
                <div style={{ fontFamily: 'Fraunces, serif', fontSize: 22, marginBottom: 14 }}>{offer.name} <em style={{ color: 'var(--gold-soft)' }}>{offer.nameEmphasis}</em></div>
                <div style={{ fontFamily: 'Fraunces, serif', fontSize: 38, fontWeight: 300, letterSpacing: '-0.02em' }}>{offer.price}€</div>
                <div style={{ fontSize: 12, opacity: 0.55, textTransform: 'uppercase', letterSpacing: '0.05em' }}>· {offer.unit}</div>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: 'center' }}>
          <button onClick={handlePayment} disabled={paying} style={{
            padding: '20px 48px', background: 'linear-gradient(135deg, var(--gold), var(--gold-soft))',
            color: 'var(--ink)', border: 'none', borderRadius: 100, fontSize: 14,
            letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600, cursor: 'pointer',
            minWidth: 340, boxShadow: '0 14px 50px rgba(201,162,75,0.3)',
          }}>
            {paying ? 'Redirection…' : `Débloquer mon rapport · ${OFFERS[selectedOffer].price}€`}
          </button>
          <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap', fontSize: 11, opacity: 0.55, letterSpacing: '0.05em' }}>
            <span>🔒 Paiement Stripe sécurisé</span>
            <span>✦ Rapport livré en 30s</span>
            <span>✦ RGPD compliant</span>
          </div>
        </div>
      </div>
    </main>
  );
}
