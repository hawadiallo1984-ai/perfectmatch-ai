'use client';

export const dynamic = 'force-dynamic';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

// ============================================================
// Helper : interprete le markdown simple de Claude
// **gras** -> <strong>, *italique* -> <em>
// ============================================================

function renderMarkdown(text: string): React.ReactNode {
  if (!text) return null;
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // Cherche **gras** d'abord
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    const italicMatch = remaining.match(/\*(.+?)\*/);

    let firstMatch: { match: RegExpMatchArray; type: 'bold' | 'italic' } | null = null;

    if (boldMatch && italicMatch) {
      firstMatch = (boldMatch.index! < italicMatch.index!)
        ? { match: boldMatch, type: 'bold' }
        : { match: italicMatch, type: 'italic' };
    } else if (boldMatch) {
      firstMatch = { match: boldMatch, type: 'bold' };
    } else if (italicMatch) {
      firstMatch = { match: italicMatch, type: 'italic' };
    }

    if (!firstMatch) {
      parts.push(<span key={key++}>{remaining}</span>);
      break;
    }

    const before = remaining.slice(0, firstMatch.match.index!);
    if (before) parts.push(<span key={key++}>{before}</span>);

    if (firstMatch.type === 'bold') {
      parts.push(<strong key={key++} style={{ color: 'var(--gold-soft)', fontWeight: 500 }}>{firstMatch.match[1]}</strong>);
    } else {
      parts.push(<em key={key++} style={{ color: 'var(--gold-soft)' }}>{firstMatch.match[1]}</em>);
    }

    remaining = remaining.slice(firstMatch.match.index! + firstMatch.match[0].length);
  }

  return parts;
}

// ============================================================

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
    return (
      <main style={{ padding: 60, position: 'relative', zIndex: 2, maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: 32, marginBottom: 20 }}>Une erreur est survenue</h1>
        <p style={{ opacity: 0.7, marginBottom: 30 }}>{error}</p>
        <a href="/" style={{ color: 'var(--gold-soft)', textDecoration: 'underline' }}>Retour a l&apos;accueil</a>
      </main>
    );
  }

  if (!report) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16, position: 'relative', zIndex: 2 }}>
        <div style={{ fontFamily: 'Fraunces, serif', fontSize: 32, fontStyle: 'italic', color: 'var(--gold-soft)' }}>
          Generation de ton rapport...
        </div>
        <div style={{ opacity: 0.6, fontSize: 14 }}>~30 secondes · 127 dimensions analysees</div>
      </main>
    );
  }

  // Calcule le pourcentage du score pour le cercle
  const scorePct = report.score || 0;
  const circumference = 2 * Math.PI * 100; // r=100
  const dashOffset = circumference - (circumference * scorePct) / 100;

  return (
    <main style={{ position: 'relative', zIndex: 2, maxWidth: 1100, margin: '0 auto', padding: '60px 24px 140px' }}>

      {/* HEADER */}
      <header style={{ textAlign: 'center', paddingBottom: 60, borderBottom: '1px solid var(--line)', marginBottom: 80 }}>
        <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 28, opacity: 0.8 }}>
          ✦ Rapport PerfectMatch · {report.date || new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
        </div>
        <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(40px, 6vw, 78px)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 20 }}>
          {report.name || 'Toi'},<br />
          ton <em style={{ fontStyle: 'italic', color: 'var(--gold-soft)' }}>cartographie</em> intime.
        </h1>
      </header>

      {/* SCORE GLOBAL */}
      <Section index="i." label="Ton score de clarte">
        <div style={{
          padding: '60px 40px', border: '1px solid var(--line-strong)',
          background: 'linear-gradient(180deg, rgba(201,162,75,0.06), rgba(28,24,51,0.6))',
          display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 50, alignItems: 'center',
        }}>
          {/* Cercle SVG */}
          <div style={{ position: 'relative', width: 200, height: 200, margin: '0 auto' }}>
            <svg viewBox="0 0 220 220" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
              <defs>
                <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#C9A24B" />
                  <stop offset="100%" stopColor="#E8C77A" />
                </linearGradient>
              </defs>
              <circle cx="110" cy="110" r="100" fill="none" stroke="rgba(201,162,75,0.22)" strokeWidth="2" />
              <circle cx="110" cy="110" r="100" fill="none" stroke="url(#goldGrad)" strokeWidth="3" strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.16, 1, 0.3, 1)' }}
              />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontFamily: 'Fraunces, serif', fontSize: 76, fontWeight: 300, lineHeight: 1, letterSpacing: '-0.04em' }}>
                {report.score}
              </div>
              <div style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontSize: 12, color: 'var(--gold)', marginTop: 4, letterSpacing: '0.08em' }}>
                sur 100
              </div>
            </div>
          </div>

          {/* Texte */}
          <div>
            <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: 28, fontWeight: 400, letterSpacing: '-0.015em', marginBottom: 16, lineHeight: 1.2 }}>
              {renderMarkdown(`« ${report.score_caption || 'Une lecture singuliere'} »`)}
            </h3>
            <p style={{ opacity: 0.85, lineHeight: 1.7, fontWeight: 300, fontSize: 15 }}>
              {renderMarkdown(report.score_explanation || '')}
            </p>
          </div>
        </div>
      </Section>

      {/* BIG FIVE */}
      {report.big_five && (
        <Section index="ii." label="Big Five · Personnalite">
          <SectionTitle>
            Tes <em>cinq dimensions</em> fondamentales.
          </SectionTitle>
          <SectionLead>
            Le modele OCEAN est le referentiel de personnalite le plus valide par la recherche.
          </SectionLead>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {Object.entries(report.big_five).map(([key, val]: [string, any]) => (
              <BigFiveCard key={key} name={key} score={val.score} description={val.description} />
            ))}
          </div>
        </Section>
      )}

      {/* ATTACHEMENT */}
      {report.attachment && (
        <Section index="iii." label="Style d'attachement">
          <div style={{
            padding: 56, border: '1px solid var(--line-strong)',
            background: 'linear-gradient(135deg, rgba(142,122,181,0.08), rgba(28,24,51,0.6))',
          }}>
            <div style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', color: 'var(--gold)', marginBottom: 12, fontSize: 14 }}>
              ✦ Ton style principal
            </div>
            <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 400, lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: 24 }}>
              {renderMarkdown(report.attachment.style)}
            </h3>
            <p style={{ fontSize: 16, opacity: 0.85, lineHeight: 1.75, fontWeight: 300, marginBottom: 32 }}>
              {renderMarkdown(report.attachment.description)}
            </p>

            {(report.attachment.trigger || report.attachment.need || report.attachment.trap) && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, paddingTop: 28, borderTop: '1px solid var(--line)' }}>
                {report.attachment.trigger && (
                  <Trait label="Ton declencheur #1" value={report.attachment.trigger} />
                )}
                {report.attachment.need && (
                  <Trait label="Ton besoin fondamental" value={report.attachment.need} />
                )}
                {report.attachment.trap && (
                  <Trait label="Ton piege classique" value={report.attachment.trap} />
                )}
              </div>
            )}
          </div>
        </Section>
      )}

      {/* PARTENAIRE IDEAL */}
      {report.ideal_partner && (
        <Section index="iv." label="Ton partenaire ideal">
          <SectionTitle>
            Pas un <em>type</em>. Un <em>fonctionnement</em>.
          </SectionTitle>
          <div style={{ padding: 48, border: '1px solid var(--line)', background: 'rgba(28,24,51,0.4)' }}>
            {report.ideal_partner.quote && (
              <p style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontSize: 22, lineHeight: 1.5, fontWeight: 300, marginBottom: 32 }}>
                « {renderMarkdown(report.ideal_partner.quote)} »
              </p>
            )}
            {report.ideal_partner.criteria && Array.isArray(report.ideal_partner.criteria) && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px 32px', paddingTop: 28, borderTop: '1px solid var(--line)' }}>
                {report.ideal_partner.criteria.map((c: string, i: number) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '6px 0' }}>
                    <span style={{ color: 'var(--gold)', flexShrink: 0 }}>✦</span>
                    <span style={{ fontSize: 15, opacity: 0.85, lineHeight: 1.5, fontWeight: 300 }}>
                      {renderMarkdown(c)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Section>
      )}

      {/* BIAIS */}
      {report.biases && Array.isArray(report.biases) && report.biases.length > 0 && (
        <Section index="v." label={`Biais detectes · ${report.biases.length}`}>
          <SectionTitle>
            Les <em>angles morts</em> de ton choix.
          </SectionTitle>
          <SectionLead>Les nommer, c&apos;est deja commencer a les desamorcer.</SectionLead>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {report.biases.map((bias: any, i: number) => (
              <BiasCard key={i} bias={bias} />
            ))}
          </div>
        </Section>
      )}

      {/* ASTROLOGIE */}
      {report.astro && (
        <Section index="vi." label="Analyse astrologique">
          <div style={{
            padding: 48, border: '1px solid var(--line-strong)',
            background: 'radial-gradient(ellipse at top right, rgba(142,122,181,0.15), transparent 60%), rgba(28,24,51,0.7)',
          }}>
            {report.astro.signs && Array.isArray(report.astro.signs) && (
              <div style={{ display: 'flex', gap: 32, marginBottom: 32, flexWrap: 'wrap' }}>
                {report.astro.signs.map((s: any, i: number) => (
                  <div key={i} style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'Fraunces, serif', fontSize: 44, color: 'var(--gold-soft)', lineHeight: 1, marginBottom: 8 }}>
                      {s.symbol}
                    </div>
                    <div style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6 }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: 28, fontWeight: 400, marginBottom: 20, lineHeight: 1.2 }}>
              {renderMarkdown(report.astro.title || '')}
            </h3>
            <p style={{ fontSize: 15, opacity: 0.85, lineHeight: 1.75, fontWeight: 300, marginBottom: 24 }}>
              {renderMarkdown(report.astro.description || '')}
            </p>
            <p style={{ fontSize: 12, opacity: 0.5, fontStyle: 'italic', paddingTop: 20, borderTop: '1px solid var(--line)', lineHeight: 1.6 }}>
              ✦ Note epistemologique — L&apos;astrologie est utilisee comme outil symbolique d&apos;introspection, pas comme oracle predictif.
            </p>
          </div>
        </Section>
      )}

      {/* PLAN 90 JOURS */}
      {report.plan_90j && (
        <Section index="vii." label="Ton plan 90 jours">
          <SectionTitle>
            Un chemin, <em>trois temps</em>.
          </SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            {[report.plan_90j.phase1, report.plan_90j.phase2, report.plan_90j.phase3].filter(Boolean).map((phase: any, i: number) => (
              <PhaseCard key={i} phase={phase} />
            ))}
          </div>
        </Section>
      )}

      {/* CLINIQUE (offre 99 EUR seulement) */}
      {report.clinical_assessment && (
        <Section index="viii." label="Evaluation clinique">
          <SectionTitle>
            Une lecture <em>structurelle</em> approfondie.
          </SectionTitle>
          <SectionLead>
            Cette grille n&apos;est pas un diagnostic. C&apos;est une cartographie d&apos;observation, inspiree des outils cliniques contemporains.
          </SectionLead>
          <div style={{ padding: 36, border: '1px solid var(--line-strong)', background: 'rgba(28,24,51,0.5)' }}>
            {report.clinical_assessment.triade_noire && (
              <div style={{ marginBottom: 28 }}>
                <h4 style={{ fontFamily: 'Fraunces, serif', fontSize: 20, marginBottom: 12 }}>Triade noire</h4>
                <p style={{ opacity: 0.8, fontSize: 14, lineHeight: 1.6 }}>
                  {renderMarkdown(report.clinical_assessment.triade_noire.reading || '')}
                </p>
              </div>
            )}
            {report.clinical_assessment.signals && Array.isArray(report.clinical_assessment.signals) && (
              <div>
                <h4 style={{ fontFamily: 'Fraunces, serif', fontSize: 20, marginBottom: 12 }}>Signaux a surveiller chez un partenaire</h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {report.clinical_assessment.signals.map((sig: string, i: number) => (
                    <li key={i} style={{ display: 'flex', gap: 12, padding: '8px 0', fontSize: 14, opacity: 0.85 }}>
                      <span style={{ color: 'var(--gold)' }}>→</span>
                      <span>{renderMarkdown(sig)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Section>
      )}

      {/* MESSAGE FINAL */}
      {report.final_message && (
        <Section index="✦" label="Message final" noRule>
          <div style={{
            padding: 'clamp(40px, 8vw, 80px) clamp(24px, 5vw, 60px)',
            border: '1px solid var(--line-strong)', textAlign: 'center',
            background: 'radial-gradient(ellipse at center, rgba(201,162,75,0.08), transparent 70%), rgba(28,24,51,0.8)',
          }}>
            <div style={{ fontFamily: 'Fraunces, serif', fontSize: 28, color: 'var(--gold)', marginBottom: 28, letterSpacing: '0.3em' }}>
              ✦ · ✦ · ✦
            </div>
            <p style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontSize: 'clamp(18px, 2.5vw, 24px)', lineHeight: 1.6, fontWeight: 300, maxWidth: 820, margin: '0 auto' }}>
              {renderMarkdown(report.final_message)}
            </p>
          </div>
        </Section>
      )}

      {/* LUNA CTA */}
      <div style={{ marginTop: 80, padding: 'clamp(36px, 6vw, 56px)', border: '1px dashed var(--line-strong)', textAlign: 'center', background: 'rgba(142,122,181,0.04)' }}>
        <div style={{ fontSize: 36, marginBottom: 18 }}>🌙</div>
        <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 400, marginBottom: 14, letterSpacing: '-0.02em' }}>
          Une question sur ton <em style={{ fontStyle: 'italic', color: 'var(--gold-soft)' }}>rapport</em> ?
        </h3>
        <p style={{ opacity: 0.7, maxWidth: 520, margin: '0 auto 28px', fontWeight: 300, lineHeight: 1.65 }}>
          Luna, ton IA relationnelle, connait tous tes resultats. Pose-lui n&apos;importe quelle question.
        </p>
        <a href="/luna" style={{
          display: 'inline-block', padding: '15px 36px',
          background: 'linear-gradient(135deg, var(--violet), var(--violet-soft))',
          color: 'var(--ink)', borderRadius: 100, fontSize: 13,
          letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600,
          textDecoration: 'none',
          transition: 'all 0.3s',
        }}>Parler a Luna →</a>
      </div>

    </main>
  );
}

// ============================================================
// Sous-composants
// ============================================================

function Section({ children, index, label, noRule }: { children: React.ReactNode; index: string; label: string; noRule?: boolean }) {
  return (
    <section style={{ marginBottom: 100 }}>
      <div style={{
        display: 'flex', alignItems: 'baseline', gap: 20, marginBottom: 32,
        ...(noRule ? {} : { borderBottom: '1px solid var(--line)', paddingBottom: 16 }),
      }}>
        <span style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontSize: 18, color: 'var(--gold)' }}>{index}</span>
        <span style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', opacity: 0.85 }}>{label}</span>
      </div>
      {children}
    </section>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 300, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 20 }}>
      {children}
    </h2>
  );
}

function SectionLead({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 16, opacity: 0.75, fontWeight: 300, lineHeight: 1.7, marginBottom: 32, maxWidth: 700 }}>
      {children}
    </p>
  );
}

function Trait({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8, opacity: 0.85 }}>{label}</div>
      <div style={{ fontFamily: 'Fraunces, serif', fontSize: 18, fontWeight: 400, lineHeight: 1.3 }}>{renderMarkdown(value)}</div>
    </div>
  );
}

function BigFiveCard({ name, score, description }: { name: string; score: number; description: string }) {
  return (
    <div style={{ padding: 28, border: '1px solid var(--line)', background: 'rgba(28,24,51,0.4)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
        <div style={{ fontFamily: 'Fraunces, serif', fontSize: 20, textTransform: 'capitalize' }}>
          {name.replace(/_/g, ' ')}
        </div>
        <div style={{ fontFamily: 'Fraunces, serif', fontSize: 30, color: 'var(--gold-soft)', fontWeight: 300, letterSpacing: '-0.02em' }}>
          {score}<span style={{ fontSize: '0.5em', opacity: 0.6 }}>/100</span>
        </div>
      </div>
      <div style={{ height: 3, background: 'rgba(201,162,75,0.22)', borderRadius: 100, marginBottom: 16, overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: `${score}%`,
          background: 'linear-gradient(90deg, var(--gold), var(--gold-soft))',
          borderRadius: 100, transition: 'width 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }} />
      </div>
      <p style={{ fontSize: 14, opacity: 0.75, lineHeight: 1.65, fontWeight: 300 }}>
        {renderMarkdown(description)}
      </p>
    </div>
  );
}

function BiasCard({ bias }: { bias: any }) {
  const levelColors: Record<string, { color: string; border: string; bg: string }> = {
    danger: { color: '#E07A5F', border: '#E07A5F', bg: 'rgba(224,122,95,0.1)' },
    attention: { color: 'var(--gold-soft)', border: 'var(--gold)', bg: 'rgba(201,162,75,0.1)' },
    subtil: { color: 'var(--violet-soft)', border: 'var(--violet)', bg: 'rgba(142,122,181,0.1)' },
  };
  const colors = levelColors[bias.level] || levelColors.attention;
  const levelLabel = bias.level === 'danger' ? 'risque eleve' : bias.level === 'attention' ? 'vigilance' : 'subtil';

  return (
    <div style={{
      padding: '24px 28px', border: '1px solid var(--line)',
      borderLeft: `3px solid ${colors.border}`,
      background: 'rgba(28,24,51,0.4)',
      display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 24, alignItems: 'center',
    }}>
      <div style={{
        fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontSize: 12,
        padding: '4px 12px', borderRadius: 100, border: `1px solid ${colors.border}`,
        color: colors.color, background: colors.bg, whiteSpace: 'nowrap',
      }}>
        {levelLabel}
      </div>
      <div>
        <h4 style={{ fontFamily: 'Fraunces, serif', fontSize: 18, fontWeight: 400, marginBottom: 4 }}>
          {bias.name}
        </h4>
        <p style={{ fontSize: 14, opacity: 0.7, lineHeight: 1.55, fontWeight: 300 }}>
          {renderMarkdown(bias.description)}
        </p>
      </div>
      {bias.impact && (
        <div style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontSize: 12, color: 'var(--gold)', opacity: 0.8, whiteSpace: 'nowrap' }}>
          {bias.impact}
        </div>
      )}
    </div>
  );
}

function PhaseCard({ phase }: { phase: any }) {
  return (
    <div style={{ padding: 32, border: '1px solid var(--line)', background: 'rgba(28,24,51,0.4)' }}>
      <div style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontSize: 14, color: 'var(--gold)', marginBottom: 8 }}>
        {phase.days}
      </div>
      <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: 24, fontWeight: 400, marginBottom: 20, letterSpacing: '-0.015em' }}>
        {phase.name_start} <em style={{ fontStyle: 'italic', color: 'var(--gold-soft)' }}>{phase.name_end}</em>
      </h3>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {(phase.actions || []).map((action: string, i: number) => (
          <li key={i} style={{ fontSize: 14, padding: '10px 0', opacity: 0.85, borderBottom: '1px solid rgba(245,239,227,0.06)', display: 'flex', gap: 10, lineHeight: 1.5, fontWeight: 300 }}>
            <span style={{ color: 'var(--gold)', flexShrink: 0 }}>→</span>
            <span>{renderMarkdown(action)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ============================================================

export default function RapportPage() {
  return (
    <Suspense fallback={
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
        <div style={{ fontFamily: 'Fraunces, serif', fontSize: 32, fontStyle: 'italic', color: 'var(--gold-soft)' }}>Chargement...</div>
      </main>
    }>
      <RapportContent />
    </Suspense>
  );
}
