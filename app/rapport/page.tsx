'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

function RapportContent() {
  const params = useSearchParams();
  const sessionId = params.get('session_id');
  const [report, setReport] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) { setError('Session invalide'); return; }
    const answers = JSON.parse(sessionStorage.getItem('pm_answers') || '{}');

    fetch('/api/generate-report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, answers }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else {
          setReport(data.report);
          sessionStorage.setItem('pm_report', JSON.stringify(data.report));
        }
      })
      .catch((e) => setError(e.message));
  }, [sessionId]);

  if (error) return <div style={{ padding: 60 }}>Erreur : {error}</div>;
  if (!report) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 20, position: 'relative', zIndex: 2 }}>
      <div style={{ fontFamily: 'Fraunces, serif', fontSize: 32, fontStyle: 'italic', color: 'var(--gold-soft)' }}>Génération de ton rapport…</div>
      <div style={{ opacity: 0.6 }}>~20 secondes</div>
    </div>
  );

  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 40px 120px', position: 'relative', zIndex: 2 }}>
      <header style={{ textAlign: 'center', paddingBottom: 60, borderBottom: '1px solid var(--line)', marginBottom: 80 }}>
        <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 28 }}>
          ✦ Rapport · {report.date || 'Aujourd\'hui'} · 127 dimensions
        </div>
        <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(42px, 6vw, 78px)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 20 }}>
          {report.name},<br />ton <em style={{ fontStyle: 'italic', color: 'var(--gold-soft)' }}>cartographie</em> intime.
        </h1>
      </header>

      <section style={{ marginBottom: 100 }}>
        <div style={{ padding: 60, border: '1px solid var(--line-strong)', background: 'linear-gradient(180deg, rgba(201,162,75,0.06), rgba(28,24,51,0.8))', textAlign: 'center' }}>
          <div style={{ fontSize: 12, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 24 }}>Score de clarté</div>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 120, fontWeight: 300, lineHeight: 1, letterSpacing: '-0.04em' }}>{report.score}</div>
          <div style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontSize: 22, color: 'var(--gold-soft)', marginTop: 10 }}>« {report.score_caption} »</div>
          <p style={{ opacity: 0.8, maxWidth: 600, margin: '20px auto 0', fontWeight: 300 }}>{report.score_explanation}</p>
        </div>
      </section>

      {report.final_message && (
        <section style={{ padding: '80px 60px', border: '1px solid var(--line-strong)', textAlign: 'center', background: 'radial-gradient(ellipse at center, rgba(201,162,75,0.08), transparent 70%), rgba(28,24,51,0.8)' }}>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 32, color: 'var(--gold)', marginBottom: 28, letterSpacing: '0.3em' }}>✦ · ✦ · ✦</div>
          <p style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontSize: 24, lineHeight: 1.55, fontWeight: 300, maxWidth: 820, margin: '0 auto' }}>
            {report.final_message}
          </p>
        </section>
      )}

      <div style={{ marginTop: 60, padding: 48, border: '1px dashed var(--line-strong)', textAlign: 'center', background: 'rgba(142,122,181,0.04)' }}>
        <div style={{ fontSize: 36, marginBottom: 18 }}>🌙</div>
        <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: 28, fontWeight: 400, marginBottom: 12 }}>
          Une question sur ton <em style={{ fontStyle: 'italic', color: 'var(--gold-soft)' }}>rapport</em> ?
        </h3>
        <p style={{ opacity: 0.7, maxWidth: 500, margin: '0 auto 28px', fontWeight: 300 }}>
          Luna connaît tous tes résultats. Pose-lui n'importe quelle question.
        </p>
        <a href="/luna" style={{
          display: 'inline-block', padding: '14px 32px',
          background: 'linear-gradient(135deg, var(--violet), var(--violet-soft))',
          color: 'var(--ink)', borderRadius: 100, fontSize: 13,
          letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600,
        }}>Parler à Luna →</a>
      </div>
    </main>
  );
}

export default function RapportPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
        <div style={{ fontFamily: 'Fraunces, serif', fontSize: 32, fontStyle: 'italic', color: 'var(--gold-soft)' }}>Chargement…</div>
      </div>
    }>
      <RapportContent />
    </Suspense>
  );
}