'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * MVP du questionnaire.
 * Étends ce tableau QUESTIONS avec tes 127 dimensions.
 * Structure : { id, category, label, helper, type, options? }
 */

const QUESTIONS = [
  { id: 'name', category: 'Identité', label: "Comment t'appelles-tu ?", type: 'text', placeholder: 'Yasmine' },
  { id: 'birth_date', category: 'Identité', label: 'Date de naissance', type: 'text', placeholder: '14 novembre 1994' },
  { id: 'birth_city', category: 'Identité', label: 'Ville de naissance', type: 'text', placeholder: 'Casablanca' },
  { id: 'orientation', category: 'Identité', label: 'Qui cherches-tu à aimer ?', type: 'radio',
    options: ['Un homme', 'Une femme', 'Ouvert·e aux deux', 'Préfère ne pas préciser']
  },
  { id: 'attachment_trigger', category: 'Attachement', label: "Quand quelqu'un t'ignore, tu ressens quoi ?", type: 'scale', min: 1, max: 7 },
  { id: 'past_wound', category: 'Intime', label: "Quelle blessure amoureuse te marque le plus ?", type: 'textarea', optional: true },
  // Ajoute tes autres questions ici
];

export default function QuestionnairePage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (id: string, value: any) => setAnswers({ ...answers, [id]: value });

  const handleSubmit = async () => {
    setSubmitting(true);
    sessionStorage.setItem('pm_answers', JSON.stringify(answers));
    router.push('/apercu');
  };

  return (
    <main style={{ maxWidth: 820, margin: '0 auto', padding: '100px 24px 80px', position: 'relative', zIndex: 2 }}>
      <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: 48, fontWeight: 300, letterSpacing: '-0.02em', marginBottom: 12 }}>
        Commence ton <em style={{ color: 'var(--gold-soft)' }}>exploration</em>.
      </h1>
      <p style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', opacity: 0.65, marginBottom: 60 }}>
        Quelques questions. Réponds honnêtement. La précision du rapport dépend de toi.
      </p>

      {QUESTIONS.map((q, i) => (
        <div key={q.id} style={{ marginBottom: 60, paddingBottom: 40, borderBottom: '1px solid var(--line)' }}>
          <div style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 14 }}>
            {i + 1}. {q.category}
          </div>
          <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: 28, fontWeight: 400, marginBottom: 20, lineHeight: 1.2 }}>
            {q.label}
          </h3>

          {q.type === 'text' && (
            <input
              type="text"
              placeholder={q.placeholder}
              onChange={(e) => handleChange(q.id, e.target.value)}
              style={{
                width: '100%', padding: '18px 0', fontFamily: 'Fraunces, serif', fontSize: 22,
                background: 'transparent', border: 'none', borderBottom: '1px solid var(--line-strong)',
                color: 'var(--cream)', outline: 'none'
              }}
            />
          )}

          {q.type === 'textarea' && (
            <textarea
              placeholder="Prends ton temps…"
              onChange={(e) => handleChange(q.id, e.target.value)}
              style={{
                width: '100%', minHeight: 140, padding: 20, fontFamily: 'Fraunces, serif', fontSize: 16,
                fontStyle: 'italic', background: 'rgba(28,24,51,0.3)', border: '1px solid var(--line)',
                color: 'var(--cream)', outline: 'none', resize: 'vertical', lineHeight: 1.6,
              }}
            />
          )}

          {q.type === 'radio' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {q.options!.map((opt) => (
                <label key={opt} style={{
                  padding: '18px 22px', border: `1px solid ${answers[q.id] === opt ? 'var(--gold)' : 'var(--line)'}`,
                  background: answers[q.id] === opt ? 'rgba(201,162,75,0.1)' : 'rgba(28,24,51,0.3)',
                  cursor: 'pointer', fontFamily: 'Fraunces, serif', fontSize: 18,
                }}>
                  <input type="radio" name={q.id} value={opt} onChange={() => handleChange(q.id, opt)} style={{ marginRight: 14 }} />
                  {opt}
                </label>
              ))}
            </div>
          )}

          {q.type === 'scale' && (
            <div style={{ display: 'flex', gap: 10, justifyContent: 'space-between', padding: '20px 0' }}>
              {Array.from({ length: q.max! }, (_, i) => i + 1).map((n) => (
                <button key={n} onClick={() => handleChange(q.id, n)}
                  style={{
                    width: 40, height: 40, borderRadius: '50%',
                    border: `1px solid ${answers[q.id] === n ? 'var(--gold)' : 'var(--line-strong)'}`,
                    background: answers[q.id] === n ? 'var(--gold)' : 'transparent',
                    color: answers[q.id] === n ? 'var(--ink)' : 'var(--cream)',
                    cursor: 'pointer', fontFamily: 'Fraunces, serif', fontStyle: 'italic',
                  }}>{n}</button>
              ))}
            </div>
          )}
        </div>
      ))}

      <button onClick={handleSubmit} disabled={submitting}
        style={{
          padding: '18px 40px', background: 'linear-gradient(135deg, var(--gold), var(--gold-soft))',
          color: 'var(--ink)', border: 'none', borderRadius: 100, fontSize: 14,
          letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, cursor: 'pointer',
        }}>
        {submitting ? 'Envoi en cours…' : 'Voir mon aperçu →'}
      </button>
    </main>
  );
}
