'use client';

export const dynamic = 'force-dynamic';

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

  if (error) {
    return <div style={{ padding: 60 }}>Erreur : {error}</div>;
  }

  if (!report) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontFamily: 'Fraunces, serif', fontSize: 32, fontStyle: 'italic', color: '#E8C77A' }}>
          Generation de ton rapport...
        </div>
      </div>
    );
  }

  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 40px 120px' }}>
      <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: 60, fontWeight: 300 }}>
        {report.name}
      </h1>
      <div style={{ fontFamily: 'Fraunces, serif', fontSize: 120 }}>
        {report.score}
      </div>
      <p>{report.final_message}</p>
      <a href="/luna">Parler a Luna</a>
    </main>
  );
}

export default function RapportPage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <RapportContent />
    </Suspense>
  );
}