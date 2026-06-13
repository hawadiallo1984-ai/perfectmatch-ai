'use client';

import { useState } from 'react';
import { DESIR_QUESTIONS, DESIR_RESULTS, type DesirProfile } from '@/lib/desirTest';
import { BUNDLES } from '@/lib/bundles';
import { GUIDES } from '@/lib/guides';
import BundleBuyButton from '@/components/BundleBuyButton';
import SiteNav from '@/components/SiteNav';
import styles from '@/app/page.module.css';

const TIE_BREAK: DesirProfile[] = ['pudeur-blocage', 'sous-pression', 'quete-connexion', 'desir-en-veille'];

export default function DesirClient() {
  const [answers, setAnswers] = useState<Record<string, DesirProfile>>({});

  const select = (questionId: string, profile: DesirProfile) => {
    setAnswers(prev => ({ ...prev, [questionId]: profile }));
  };

  const scores: Record<DesirProfile, number> = {
    'desir-en-veille': 0,
    'sous-pression': 0,
    'pudeur-blocage': 0,
    'quete-connexion': 0,
  };
  for (const profile of Object.values(answers)) {
    scores[profile]++;
  }

  const answered = Object.keys(answers).length;
  let winner: DesirProfile | null = null;
  if (answered > 0) {
    const maxScore = Math.max(...Object.values(scores));
    winner = TIE_BREAK.find(p => scores[p] === maxScore) ?? null;
  }

  const result = winner ? DESIR_RESULTS[winner] : null;
  const recoPack = result ? (BUNDLES.find(b => b.id === result.packId) ?? null) : null;
  const recoGuides = result
    ? result.guideIds.map(id => GUIDES[id]).filter((g): g is NonNullable<typeof g> => g !== undefined)
    : [];

  return (
    <div style={{ position: 'relative', zIndex: 2, minHeight: '100vh' }}>
      <SiteNav />

      {/* Hero */}
      <section style={{ padding: '100px 24px 48px', textAlign: 'center' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(201,162,75,0.1)',
            border: '1px solid rgba(201,162,75,0.3)',
            color: '#C9A24B',
            fontSize: '.72rem',
            fontWeight: 700,
            letterSpacing: '.12em',
            textTransform: 'uppercase',
            padding: '5px 14px',
            borderRadius: '100px',
            marginBottom: '1.5rem',
          }}>
            Test gratuit · (18+) · PerfectMatch · EvaTalk
          </div>
          <h1 style={{
            fontFamily: 'Fraunces, serif',
            fontSize: 'clamp(2rem,5vw,3rem)',
            fontWeight: 400,
            lineHeight: 1.15,
            marginBottom: '1.25rem',
          }}>
            Ton rapport au<br /><em style={{ color: '#C9A24B' }}>désir et à l&apos;intimité</em>
          </h1>
          <p style={{ fontSize: '.95rem', color: '#A9A3B8', lineHeight: 1.7, maxWidth: 520, margin: '0 auto 1rem' }}>
            9 questions pour identifier ce qui freine ton intimité — et savoir par où commencer.
          </p>
          <p style={{ fontSize: '.75rem', color: '#A9A3B8', opacity: 0.5, margin: 0 }}>
            Contenu adulte (18+) · Psychoéducation, pas une thérapie.
          </p>
        </div>
      </section>

      {/* Questions */}
      <section className={styles.section} style={{ paddingTop: 0 }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{
            display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 28,
            borderBottom: '1px solid var(--line)', paddingBottom: 14,
          }}>
            <span style={{ fontSize: 11, letterSpacing: '.3em', textTransform: 'uppercase', color: '#C9A24B', opacity: .85 }}>
              Le test · 9 questions
            </span>
          </div>
          <p style={{ fontSize: '.9rem', color: '#A9A3B8', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            Pour chaque question, choisis la réponse qui te ressemble le plus en ce moment.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {DESIR_QUESTIONS.map((q, qi) => {
              const chosen = answers[q.id];
              return (
                <div key={q.id} style={{
                  padding: '24px',
                  border: `1px solid ${chosen ? 'rgba(201,162,75,0.35)' : 'var(--line)'}`,
                  background: chosen ? 'rgba(201,162,75,0.04)' : 'rgba(28,24,51,0.4)',
                }}>
                  <p style={{
                    fontSize: '.78rem', fontWeight: 700, letterSpacing: '.04em',
                    color: '#8E7AB5', marginBottom: '.75rem',
                  }}>
                    {qi + 1} / 9
                  </p>
                  <p style={{ fontSize: '.95rem', color: '#F5EFE3', lineHeight: 1.6, marginBottom: '1rem' }}>
                    {q.q}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {q.options.map(opt => {
                      const isSelected = chosen === opt.profile;
                      return (
                        <button
                          key={opt.profile}
                          onClick={() => select(q.id, opt.profile)}
                          style={{
                            textAlign: 'left',
                            padding: '10px 14px',
                            border: `1px solid ${isSelected ? 'rgba(201,162,75,0.6)' : 'rgba(142,122,181,0.25)'}`,
                            background: isSelected ? 'rgba(201,162,75,0.1)' : 'rgba(142,122,181,0.04)',
                            color: isSelected ? '#F5EFE3' : '#A9A3B8',
                            fontSize: '.88rem',
                            lineHeight: 1.5,
                            cursor: 'pointer',
                            borderRadius: '2px',
                            transition: 'all .15s',
                          }}
                        >
                          {isSelected ? '▶ ' : '○ '}{opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {answered > 0 && result && (
            <div style={{
              marginTop: 32,
              padding: '22px 24px',
              border: '1px solid rgba(201,162,75,0.3)',
              background: 'rgba(201,162,75,0.05)',
            }}>
              <p style={{ fontSize: '.75rem', letterSpacing: '.1em', textTransform: 'uppercase', color: '#C9A24B', marginBottom: '.5rem', fontWeight: 700 }}>
                Ton profil dominant ({answered}/9 réponses)
              </p>
              <p style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontSize: '1.15rem', color: '#F5EFE3', margin: 0 }}>
                {result.emoji} {result.title}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Résultat + Recommandé pour toi */}
      {result && (
        <section className={styles.section} style={{ paddingTop: 0 }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <div style={{
              display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 28,
              borderBottom: '1px solid var(--line)', paddingBottom: 14,
            }}>
              <span style={{ fontSize: 11, letterSpacing: '.3em', textTransform: 'uppercase', color: '#C9A24B', opacity: .85 }}>
                Recommandé pour toi
              </span>
            </div>
            <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 400, marginBottom: '.75rem', lineHeight: 1.2 }}>
              {result.emoji} {result.title}
            </h2>
            <p style={{ fontSize: '.93rem', color: '#A9A3B8', lineHeight: 1.75, marginBottom: '2rem' }}>
              {result.message}
            </p>

            {recoPack && (
              <div style={{ marginBottom: '1.75rem' }}>
                <p style={{ fontSize: '.75rem', letterSpacing: '.1em', textTransform: 'uppercase', color: '#C9A24B', marginBottom: '.75rem', fontWeight: 700 }}>
                  Pack recommandé
                </p>
                <div style={{ padding: '22px 24px', border: '1px solid rgba(201,162,75,0.3)', background: 'rgba(201,162,75,0.05)', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ fontSize: 10, letterSpacing: '.15em', textTransform: 'uppercase', color: '#C9A24B', opacity: 0.7 }}>Pack · 4 guides</div>
                  <h3 style={{ fontFamily: 'Fraunces, serif', fontWeight: 400, fontSize: 17, lineHeight: 1.25, margin: 0, color: '#F5EFE3' }}>{recoPack.title}</h3>
                  <p style={{ fontSize: '.85rem', opacity: 0.6, lineHeight: 1.6, margin: 0 }}>{recoPack.blurb}</p>
                  <div style={{ textAlign: 'center', margin: '4px 0' }}>
                    <span style={{ fontSize: 12, opacity: 0.4, textDecoration: 'line-through', marginRight: 8 }}>{recoPack.compareAtCents / 100} €</span>
                    <span style={{ fontSize: 17, fontWeight: 700, color: '#C9A24B' }}>{recoPack.priceCents / 100} €</span>
                  </div>
                  <BundleBuyButton bundleId={recoPack.id} label={`Acheter le pack — ${recoPack.priceCents / 100} €`} />
                </div>
              </div>
            )}

            {recoGuides.length > 0 && (
              <div>
                <p style={{ fontSize: '.75rem', letterSpacing: '.1em', textTransform: 'uppercase', color: '#C9A24B', marginBottom: '.75rem', fontWeight: 700 }}>
                  Guides pour aller plus loin
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {recoGuides.map((g) => (
                    <a
                      key={g.id}
                      href={`/guides/${g.id}`}
                      style={{
                        display: 'inline-flex', flexDirection: 'column', gap: 4,
                        padding: '12px 16px',
                        border: '1px solid rgba(201,162,75,0.3)',
                        background: 'rgba(201,162,75,0.05)',
                        color: '#F5EFE3',
                        textDecoration: 'none',
                        borderRadius: '2px',
                        fontSize: '.85rem',
                        lineHeight: 1.3,
                        flex: '1 1 180px',
                        minWidth: 180,
                      }}
                    >
                      <span style={{ fontWeight: 600 }}>{g.name}</span>
                      <span style={{ fontSize: '.78rem', color: '#C9A24B', opacity: 0.8 }}>19 € · Découvrir →</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* CTA final */}
      <section style={{ textAlign: 'center', padding: 'clamp(40px,8vw,72px) 24px' }}>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 12 }}>
          <a href="/bibliotheque" style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg,#C9A24B,#A87C2A)',
            color: '#0B0A14',
            fontWeight: 700,
            fontSize: '.9rem',
            padding: '14px 32px',
            borderRadius: '4px',
            textDecoration: 'none',
            letterSpacing: '.05em',
          }}>
            Voir tous les guides →
          </a>
          <a href="/sexualite" style={{
            display: 'inline-block',
            border: '1px solid rgba(201,162,75,0.5)',
            color: '#C9A24B',
            fontWeight: 600,
            fontSize: '.9rem',
            padding: '14px 32px',
            borderRadius: '4px',
            textDecoration: 'none',
            letterSpacing: '.05em',
          }}>
            Guides Intimité &amp; Sexualité
          </a>
        </div>
        <p style={{ fontSize: 11, opacity: .35, letterSpacing: '.04em', marginTop: 8 }}>
          Test de psychoéducation (18+) — pas un diagnostic médical ou psychologique.
        </p>
      </section>

      <footer className={styles.footer}>
        <div className={styles.logo} style={{ justifyContent: 'center', marginBottom: 8 }}>
          <span className={styles.logoMark}></span>
          PerfectMatch
        </div>
        <p className={styles.footerByline}>par EvaTalk</p>
        <p className={styles.copyright}>© 2026 PerfectMatch · une création <strong>EvaTalk</strong></p>
      </footer>
    </div>
  );
}
