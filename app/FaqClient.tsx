'use client';

import { useEffect, useState } from 'react';
import SiteNav from '@/components/SiteNav';
import styles from '@/app/page.module.css';

const BENEFITS = [
  {
    label: "Tu comprends d'où ça vient",
    desc: "les racines de tes blocages (regard psychodynamique).",
  },
  {
    label: "Tu transformes tes pensées",
    desc: "tu repères et désamorces ce qui te limite (regard TCC).",
  },
  {
    label: "Tu te reconnectes à ta valeur",
    desc: "avec douceur, sans te juger (regard humaniste).",
  },
  {
    label: "Tu changes tes dynamiques",
    desc: "relations, environnement, limites (regard systémique).",
  },
];

type FaqItem = { q: string; a: string; resources?: string };

const FAQ: FaqItem[] = [
  {
    q: "Comment utiliser un guide ?",
    a: "Chaque guide explore ton thème à travers 4 approches de la psychologie. Lis un « regard » à la fois, fais les exercices, remplis le cahier, et suis le plan sur 4 semaines à ton rythme.",
  },
  {
    q: "Ai-je besoin de connaissances en psychologie ?",
    a: "Non. Tout est expliqué simplement, pas à pas.",
  },
  {
    q: "Les guides remplacent-ils une thérapie ?",
    a: "Non. Ce sont des outils de coaching et de psychoéducation en auto-aide ; ils ne remplacent ni une thérapie ni un suivi médical. En cas de détresse, ne reste pas seul·e :",
    resources: "Suisse — La Main Tendue : 143 · France — 3114 (gratuit, 24h/24) · Belgique — Centre de Prévention du Suicide : 0800 32 123 (gratuit, 24h/24)",
  },
  {
    q: "Quel format, et comment je le reçois ?",
    a: "Un PDF d'environ 11 pages, à lire et à remplir (cahier intégré). Téléchargement immédiat après l'achat + un email avec le lien.",
  },
  {
    q: "Puis-je l'imprimer ?",
    a: "Oui, conçu pour être imprimé ou rempli à l'écran.",
  },
  {
    q: "Combien de temps pour le faire ?",
    a: "À ton rythme. Un plan sur 4 semaines est proposé, et tu peux y revenir autant que tu veux.",
  },
  {
    q: "Puis-je prendre plusieurs guides ?",
    a: "Oui, chacun se concentre sur un thème ; tu composes selon tes besoins.",
  },
  {
    q: "Comment aller plus loin ?",
    a: "Pour un accompagnement sur-mesure, EvaTalk propose du coaching individuel — voir le bloc ci-dessous.",
  },
];

export default function FaqClient() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const toggle = (idx: number) => setOpenIdx((prev) => (prev === idx ? null : idx));

  return (
    <div style={{ position: 'relative', zIndex: 2, minHeight: '100vh' }}>

      <SiteNav />

      {/* A — En-tête */}
      <section className={styles.section} style={{ textAlign: 'center', paddingBottom: 0 }}>
        <div className={styles.offersHeader}>
          <div className={styles.sectionLabel} style={{ justifyContent: 'center' }}>
            Aide & réponses
          </div>
          <h1 className={`${styles.sectionTitle} reveal`} style={{ textAlign: 'center', margin: '0 auto 28px' }}>
            Questions <em>fréquentes</em>
          </h1>
          <p className={`${styles.sectionLead} reveal`} style={{ textAlign: 'center', margin: '0 auto 16px', maxWidth: 560 }}>
            Tout ce que tu dois savoir avant de commencer — comment utiliser les guides,
            ce qu'ils sont et ce qu'ils ne sont pas.
          </p>
        </div>
      </section>

      {/* B — Pourquoi ces guides transforment vraiment */}
      <section className={styles.section} style={{ paddingTop: 60, paddingBottom: 60 }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div
            className="reveal"
            style={{
              padding: '48px 40px',
              border: '1px solid rgba(201,162,75,0.35)',
              background: 'rgba(201,162,75,0.04)',
            }}
          >
            <div className={styles.sectionLabel} style={{ marginBottom: 20 }}>
              Méthode
            </div>
            <h2
              className={styles.sectionTitle}
              style={{ fontSize: 'clamp(26px, 4vw, 40px)', marginBottom: 20 }}
            >
              Pourquoi ces guides <em>transforment vraiment</em>
            </h2>
            <p style={{ fontSize: 15, color: 'var(--cream)', opacity: 0.8, lineHeight: 1.7, marginBottom: 32, fontWeight: 300 }}>
              La plupart des livres de développement personnel ne donnent qu&apos;un seul angle.
              Ici, chaque guide éclaire ton thème à travers <strong style={{ color: 'var(--gold-soft)', fontWeight: 500 }}>4 approches complémentaires</strong> de
              la psychologie — psychodynamique, TCC, humaniste et systémique. Une vision à 360°,
              comme si quatre spécialistes regardaient ta situation ensemble.
            </p>

            <p style={{ fontSize: 12, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20, opacity: 0.85 }}>
              Ce que ça change pour toi
            </p>
            <ul style={{ listStyle: 'none', margin: '0 0 32px', padding: 0 }}>
              {BENEFITS.map((b) => (
                <li
                  key={b.label}
                  style={{
                    display: 'flex',
                    gap: 14,
                    padding: '14px 0',
                    borderBottom: '1px solid rgba(245,239,227,0.07)',
                    fontSize: 15,
                    color: 'var(--cream)',
                    lineHeight: 1.55,
                    fontWeight: 300,
                  }}
                >
                  <span style={{ color: 'var(--gold)', fontSize: 13, marginTop: 2, flexShrink: 0 }}>✦</span>
                  <span>
                    <strong style={{ color: 'var(--gold-soft)', fontWeight: 500 }}>{b.label}</strong>
                    {' — '}{b.desc}
                  </span>
                </li>
              ))}
            </ul>

            <p style={{ fontSize: 14.5, color: 'var(--cream)', opacity: 0.75, lineHeight: 1.7, fontWeight: 300, fontStyle: 'italic', fontFamily: 'Fraunces, serif' }}>
              De la prise de conscience au changement durable : comprendre → exercices → cahier à remplir → plan sur 4 semaines.
              Tu repars avec des outils concrets — à imprimer ou remplir à l&apos;écran, à reprendre autant de fois que tu veux.
            </p>
          </div>
        </div>
      </section>

      {/* C — Accordéon FAQ */}
      <section className={styles.section} style={{ paddingTop: 0, paddingBottom: 80 }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div
            className="reveal"
            style={{
              display: 'flex', alignItems: 'baseline', gap: 20, marginBottom: 40,
              borderBottom: '1px solid var(--line)', paddingBottom: 16,
            }}
          >
            <span style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontSize: 18, color: 'var(--gold)' }}>✦</span>
            <span style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', opacity: 0.85 }}>
              Questions fréquentes
            </span>
          </div>

          <div>
            {FAQ.map((item, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className="reveal"
                  style={{ borderBottom: '1px solid var(--line)' }}
                >
                  <button
                    onClick={() => toggle(idx)}
                    aria-expanded={isOpen}
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 16,
                      padding: '22px 0',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      color: 'var(--cream)',
                    }}
                  >
                    <span style={{
                      fontFamily: 'Fraunces, serif',
                      fontSize: 'clamp(16px, 2.5vw, 20px)',
                      fontWeight: 400,
                      lineHeight: 1.25,
                      color: isOpen ? 'var(--gold-soft)' : 'var(--cream)',
                      transition: 'color 0.3s',
                    }}>
                      {item.q}
                    </span>
                    <span style={{
                      fontSize: 20,
                      color: 'var(--gold)',
                      flexShrink: 0,
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)',
                      display: 'inline-block',
                      lineHeight: 1,
                    }}>
                      +
                    </span>
                  </button>

                  <div
                    style={{
                      maxHeight: isOpen ? 400 : 0,
                      overflow: 'hidden',
                      transition: 'max-height 0.4s cubic-bezier(0.16,1,0.3,1)',
                    }}
                  >
                    <div style={{ paddingBottom: 24 }}>
                      <p style={{
                        fontSize: 15,
                        color: 'var(--cream)',
                        opacity: 0.8,
                        lineHeight: 1.7,
                        fontWeight: 300,
                        margin: 0,
                      }}>
                        {item.a}
                      </p>
                      {item.resources && (
                        <p style={{
                          marginTop: 14,
                          fontSize: 13.5,
                          color: 'var(--gold-soft)',
                          fontFamily: 'Fraunces, serif',
                          fontStyle: 'italic',
                          lineHeight: 1.6,
                          padding: '12px 16px',
                          border: '1px solid rgba(201,162,75,0.25)',
                          background: 'rgba(201,162,75,0.05)',
                        }}>
                          {item.resources}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* D — Aller plus loin avec EvaTalk */}
      <section style={{ maxWidth: 760, margin: '0 auto', padding: '0 24px clamp(60px, 10vw, 100px)' }}>
        <div
          className="reveal"
          style={{
            padding: '48px 40px',
            border: '1px solid rgba(142,122,181,0.35)',
            background: 'rgba(142,122,181,0.06)',
            textAlign: 'center',
          }}
        >
          <div style={{
            fontFamily: 'Fraunces, serif', fontStyle: 'italic',
            fontSize: 13, color: 'var(--gold)', letterSpacing: '0.12em',
            marginBottom: 20, opacity: 0.9,
          }}>
            ✦ EvaTalk
          </div>
          <h2 style={{
            fontFamily: 'Fraunces, serif',
            fontSize: 'clamp(24px, 3.5vw, 36px)',
            fontWeight: 300,
            color: 'var(--cream)',
            marginBottom: 20,
            lineHeight: 1.2,
          }}>
            Aller plus loin <em style={{ color: 'var(--gold-soft)' }}>avec EvaTalk</em>
          </h2>
          <p style={{
            fontSize: 15,
            color: 'var(--cream)',
            opacity: 0.8,
            lineHeight: 1.7,
            fontWeight: 300,
            maxWidth: 520,
            margin: '0 auto 36px',
          }}>
            Les guides t&apos;aident à avancer en autonomie. Pour un travail personnalisé, je propose
            un accompagnement individuel (coaching psycho-émotionnel, TCC, interculturel) —
            et je suis ouverte aux partenariats.
          </p>
          <a
            href="mailto:hawa.diallo1984@gmail.com?subject=Coaching%20avec%20EvaTalk"
            className={styles.offerCta}
            style={{
              display: 'inline-block',
              padding: '18px 40px',
              width: 'auto',
              textDecoration: 'none',
              fontSize: 13,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            Réserver un accompagnement
          </a>
        </div>
      </section>

      {/* Footer */}
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
