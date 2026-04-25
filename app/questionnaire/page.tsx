'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getQuestionnaireForOffer, getEstimatedTime, Question } from '@/lib/questions';

export default function QuestionnairePage() {
  const router = useRouter();
  const [offerId, setOfferId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem('pm_offer');
    setOfferId(stored);
  }, []);

  const questions = useMemo(() => getQuestionnaireForOffer(offerId), [offerId]);
  const estimatedTime = useMemo(() => getEstimatedTime(offerId), [offerId]);

  const offerName = offerId === 'complete' ? 'Psycho Complete'
                  : offerId === 'couple' ? 'Couple'
                  : 'Celibataire';

  const handleChange = (id: string, value: any) =>
    setAnswers((prev) => ({ ...prev, [id]: value }));

  const handleMultiToggle = (id: string, value: string) => {
    setAnswers((prev) => {
      const current = (prev[id] as string[]) || [];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [id]: next };
    });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    sessionStorage.setItem('pm_answers', JSON.stringify(answers));
    sessionStorage.setItem('pm_offer', offerId || 'celibataire');
    router.push('/apercu');
  };

  // Compteur de questions repondues pour la barre de progression
  const requiredQuestions = questions.filter((q) => !q.optional);
  const answeredRequired = requiredQuestions.filter((q) => {
    const v = answers[q.id];
    return v !== undefined && v !== '' && (Array.isArray(v) ? v.length > 0 : true);
  }).length;
  const progressPct = requiredQuestions.length > 0
    ? Math.round((answeredRequired / requiredQuestions.length) * 100)
    : 0;

  const canSubmit = answeredRequired === requiredQuestions.length;

  return (
    <main style={{ position: 'relative', zIndex: 2, minHeight: '100vh' }}>

      {/* Header sticky avec progression */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 50,
        padding: '20px 40px',
        background: 'rgba(11,10,20,0.85)', backdropFilter: 'blur(14px)',
        borderBottom: '1px solid var(--line)',
      }}>
        <div style={{ maxWidth: 820, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 14, fontStyle: 'italic' }}>
            Parcours <strong style={{ color: 'var(--gold-soft)', fontStyle: 'normal' }}>{offerName}</strong>
          </div>
          <div style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.7 }}>
            {estimatedTime} · {answeredRequired}/{requiredQuestions.length}
          </div>
        </div>
        <div style={{ maxWidth: 820, margin: '0 auto', height: 3, background: 'var(--line)', borderRadius: 100, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${progressPct}%`, background: 'linear-gradient(90deg, var(--gold), var(--gold-soft))', transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }} />
        </div>
      </div>

      <div style={{ maxWidth: 820, margin: '0 auto', padding: '60px 24px 80px' }}>

        <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 300, letterSpacing: '-0.02em', marginBottom: 12, lineHeight: 1.1 }}>
          Commence ton <em style={{ fontStyle: 'italic', color: 'var(--gold-soft)' }}>exploration</em>.
        </h1>
        <p style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', opacity: 0.65, marginBottom: 60, fontSize: 17 }}>
          {offerId === 'complete'
            ? "Cette anamnese est plus profonde. Prends ton temps. La precision du rapport depend de toi."
            : offerId === 'couple'
            ? "Ton/ta partenaire fera son propre questionnaire de son cote. On fusionnera apres."
            : "Reponds honnetement, sans filtre. Plus tu vois clair, plus le rapport voit clair."}
        </p>

        {questions.map((q, i) => (
          <QuestionBlock
            key={q.id}
            question={q}
            index={i + 1}
            answer={answers[q.id]}
            onChange={(v) => handleChange(q.id, v)}
            onMultiToggle={(v) => handleMultiToggle(q.id, v)}
          />
        ))}

        <div style={{ marginTop: 60, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <button
            onClick={handleSubmit}
            disabled={submitting || !canSubmit}
            style={{
              padding: '18px 48px',
              background: canSubmit
                ? 'linear-gradient(135deg, var(--gold), var(--gold-soft))'
                : 'rgba(245, 239, 227, 0.08)',
              color: canSubmit ? 'var(--ink)' : 'rgba(245, 239, 227, 0.4)',
              border: 'none', borderRadius: 100,
              fontSize: 14, letterSpacing: '0.12em', textTransform: 'uppercase',
              fontWeight: 600,
              cursor: canSubmit ? 'pointer' : 'not-allowed',
              transition: 'all 0.4s',
              minWidth: 280,
            }}
          >
            {submitting ? 'Analyse en cours...' : canSubmit ? 'Voir mon apercu →' : `Reponds aux ${requiredQuestions.length - answeredRequired} questions restantes`}
          </button>
          <p style={{ fontSize: 12, opacity: 0.5, fontFamily: 'Fraunces, serif', fontStyle: 'italic', textAlign: 'center', maxWidth: 480 }}>
            Tes reponses sont chiffrees et effacees apres generation du rapport. Aucune n&apos;est partagee ni revendue.
          </p>
        </div>
      </div>
    </main>
  );
}

// --- Composant QuestionBlock ---

interface QuestionBlockProps {
  question: Question;
  index: number;
  answer: any;
  onChange: (value: any) => void;
  onMultiToggle: (value: string) => void;
}

function QuestionBlock({ question: q, index, answer, onChange, onMultiToggle }: QuestionBlockProps) {
  return (
    <div style={{ marginBottom: 50, paddingBottom: 40, borderBottom: '1px solid var(--line)' }}>
      <div style={{
        fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase',
        color: 'var(--gold)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 14,
      }}>
        <span style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontSize: 14, opacity: 0.8 }}>
          {String(index).padStart(2, '0')}.
        </span>
        <span>{q.category}</span>
        {q.optional && (
          <span style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', opacity: 0.5, textTransform: 'none', letterSpacing: 0, fontSize: 12 }}>
            optionnel
          </span>
        )}
      </div>

      <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: 24, fontWeight: 400, marginBottom: q.helper ? 8 : 24, lineHeight: 1.3, letterSpacing: '-0.015em' }}
          dangerouslySetInnerHTML={{ __html: q.label }} />

      {q.helper && (
        <p style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontSize: 14, opacity: 0.6, marginBottom: 24, lineHeight: 1.5 }}>
          {q.helper}
        </p>
      )}

      {/* TEXT */}
      {q.type === 'text' && (
        <input
          type="text"
          value={answer || ''}
          placeholder={q.placeholder}
          onChange={(e) => onChange(e.target.value)}
          style={{
            width: '100%', padding: '16px 0', fontFamily: 'Fraunces, serif', fontSize: 20,
            background: 'transparent', border: 'none', borderBottom: '1px solid var(--line-strong)',
            color: 'var(--cream)', outline: 'none',
          }}
        />
      )}

      {/* TEXTAREA */}
      {q.type === 'textarea' && (
        <textarea
          value={answer || ''}
          placeholder="Prends ton temps..."
          onChange={(e) => onChange(e.target.value)}
          style={{
            width: '100%', minHeight: 120, padding: 18, fontFamily: 'Fraunces, serif', fontSize: 16,
            fontStyle: 'italic', background: 'rgba(28,24,51,0.3)', border: '1px solid var(--line)',
            color: 'var(--cream)', outline: 'none', resize: 'vertical', lineHeight: 1.6,
          }}
        />
      )}

      {/* RADIO */}
      {q.type === 'radio' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {q.options!.map((opt) => {
            const selected = answer === opt;
            return (
              <label key={opt} style={{
                padding: '16px 20px',
                border: `1px solid ${selected ? 'var(--gold)' : 'var(--line)'}`,
                background: selected ? 'rgba(201,162,75,0.1)' : 'rgba(28,24,51,0.3)',
                cursor: 'pointer', fontFamily: 'Fraunces, serif', fontSize: 16,
                color: selected ? 'var(--gold-soft)' : 'var(--cream)',
                display: 'flex', alignItems: 'center', gap: 14,
                transition: 'all 0.2s',
              }}>
                <input
                  type="radio"
                  name={q.id}
                  value={opt}
                  checked={selected}
                  onChange={() => onChange(opt)}
                  style={{ width: 16, height: 16 }}
                />
                <span dangerouslySetInnerHTML={{ __html: opt }} />
              </label>
            );
          })}
        </div>
      )}

      {/* MULTI-SELECT */}
      {q.type === 'multi' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {q.options!.map((opt) => {
            const selected = Array.isArray(answer) && answer.includes(opt);
            return (
              <label key={opt} style={{
                padding: '14px 20px',
                border: `1px solid ${selected ? 'var(--gold)' : 'var(--line)'}`,
                background: selected ? 'rgba(201,162,75,0.1)' : 'rgba(28,24,51,0.3)',
                cursor: 'pointer', fontFamily: 'Fraunces, serif', fontSize: 15,
                color: selected ? 'var(--gold-soft)' : 'var(--cream)',
                display: 'flex', alignItems: 'center', gap: 14,
              }}>
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={() => onMultiToggle(opt)}
                  style={{ width: 16, height: 16 }}
                />
                <span dangerouslySetInnerHTML={{ __html: opt }} />
              </label>
            );
          })}
        </div>
      )}

      {/* SCALE 1-7 */}
      {q.type === 'scale' && (
        <div>
          {q.scaleLabels && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontSize: 13, opacity: 0.7 }}>
              <span>{q.scaleLabels.min}</span>
              <span>{q.scaleLabels.max}</span>
            </div>
          )}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'space-between' }}>
            {[1, 2, 3, 4, 5, 6, 7].map((n) => {
              const selected = answer === n;
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => onChange(n)}
                  style={{
                    flex: 1, height: 44, borderRadius: 4,
                    border: `1px solid ${selected ? 'var(--gold)' : 'var(--line-strong)'}`,
                    background: selected ? 'var(--gold)' : 'transparent',
                    color: selected ? 'var(--ink)' : 'var(--cream)',
                    cursor: 'pointer', fontFamily: 'Fraunces, serif', fontSize: 16, fontWeight: 500,
                    transition: 'all 0.2s',
                  }}
                >
                  {n}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
