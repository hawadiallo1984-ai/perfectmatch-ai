'use client';

import { useEffect } from 'react';
import { HOME_COPY, Lang } from '@/lib/homeCopy';
import { BUNDLES } from '@/lib/bundles';
import BundleBuyButton from '@/components/BundleBuyButton';
import SiteNav from '@/components/SiteNav';
import styles from './page.module.css';

const FEATURED_PACKS = ['pack-confiance-au-travail', 'pack-couple-lien', 'pack-se-reconstruire']
  .map(id => BUNDLES.find(b => b.id === id))
  .filter((b): b is NonNullable<typeof b> => b !== undefined);

type Props = { lang: Lang };

export default function HomeClient({ lang }: Props) {
  const copy = HOME_COPY[lang];
  const testHref = lang === 'fr' ? '/blessures-interieures' : '/inner-wounds';

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

  return (
    <>
      <SiteNav />

      {/* (a) Hero */}
      <section className={styles.hero}>
        <svg className={styles.zodiacRing} viewBox="0 0 900 900" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <path id="circle-path" d="M 450, 450 m -380, 0 a 380,380 0 1,1 760,0 a 380,380 0 1,1 -760,0" />
          </defs>
          <circle cx="450" cy="450" r="380" fill="none" stroke="#C9A24B" strokeWidth="0.5" opacity="0.6" />
          <circle cx="450" cy="450" r="340" fill="none" stroke="#C9A24B" strokeWidth="0.3" opacity="0.4" />
          <circle cx="450" cy="450" r="420" fill="none" stroke="#C9A24B" strokeWidth="0.3" opacity="0.4" strokeDasharray="3 8" />
          <text fontFamily="Fraunces, serif" fontSize="28" fill="#C9A24B" opacity="0.8" letterSpacing="8">
            <textPath href="#circle-path">Aries Taurus Gemini Cancer Leo Virgo Libra Scorpio Sagittarius Capricorn Aquarius Pisces</textPath>
          </text>
        </svg>

        <div className={styles.eyebrow}>{copy.hero.eyebrow}</div>
        <h1 className={styles.heroTitle}>{copy.hero.h1}</h1>
        <p className={styles.heroSub}>{copy.hero.sub}</p>

        <div className={styles.heroCtaGroup}>
          <a href={testHref} className={styles.btnPrimary}>{copy.hero.ctaPrimary}</a>
          <a href={copy.hero.ctaSecondaryHref} className={styles.btnGhost}>{copy.hero.ctaSecondary}</a>
        </div>

        <div className={styles.painBand}>
          <span className={styles.painLabel}>{copy.themesTitle}</span>
          <ul>
            {copy.hero.chips.map((chip) => (
              <li key={chip}>{chip}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Bandeau mini-guide (kept) */}
      <section style={{
        background: 'linear-gradient(135deg,rgba(201,162,75,0.08),rgba(142,122,181,0.06))',
        borderTop: '1px solid rgba(201,162,75,0.25)',
        borderBottom: '1px solid rgba(201,162,75,0.25)',
        padding: '2.5rem 1.5rem',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(201,162,75,0.12)',
            border: '1px solid rgba(201,162,75,0.35)',
            color: '#C9A24B',
            fontSize: '.7rem',
            fontWeight: 700,
            letterSpacing: '.12em',
            textTransform: 'uppercase',
            padding: '4px 12px',
            borderRadius: '100px',
            marginBottom: '1rem',
          }}>
            {copy.ebook.eyebrow}
          </div>
          <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(1.2rem,3vw,1.6rem)', fontWeight: 400, marginBottom: '.6rem' }}>
            {copy.ebook.title}
          </h2>
          <p style={{ color: '#A9A3B8', fontSize: '.88rem', lineHeight: 1.65, marginBottom: '1.5rem', maxWidth: 460, margin: '0 auto 1.5rem' }}>
            {copy.ebook.body}
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href={testHref} style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg,#C9A24B,#A87C2A)',
              color: '#0B0A14',
              fontWeight: 700,
              fontSize: '.87rem',
              padding: '12px 28px',
              borderRadius: '4px',
              textDecoration: 'none',
              letterSpacing: '.04em',
            }}>
              {copy.ebook.cta}
            </a>
          </div>
          <p style={{ marginTop: '.75rem', fontSize: 11, opacity: .45, letterSpacing: '.04em' }}>{copy.ebook.note}</p>
        </div>
      </section>

      {/* (b) Themes */}
      <section className={styles.section}>
        <div className={styles.offersHeader}>
          <div className={styles.sectionLabel}>{copy.themesEyebrow}</div>
          <h2 className={`${styles.sectionTitle} reveal`}>{copy.themesTitle}</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px,1fr))', gap: 16, maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>
          {copy.themes.map((t) => (
            <div key={t.title} className="reveal" style={{
              padding: '24px 24px 20px',
              border: '1px solid var(--line)',
              background: 'rgba(28,24,51,0.4)',
            }}>
              <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: 17, fontWeight: 400, marginBottom: 8, color: 'var(--cream)' }}>{t.title}</h3>
              <p style={{ fontSize: '.84rem', color: '#A9A3B8', lineHeight: 1.6 }}>{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* (c) Méthode */}
      <section className={styles.section}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 24px' }}>
          <div className={styles.offersHeader} style={{ marginBottom: 32 }}>
            <div className={styles.sectionLabel}>{copy.howEyebrow}</div>
            <h2 className={`${styles.sectionTitle} reveal`}>{copy.howTitle}</h2>
            <p className={`${styles.sectionLead} reveal`}>{copy.howIntro}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16, marginBottom: 32 }}>
            {copy.steps.map((s) => (
              <div key={s.n} className="reveal" style={{ padding: '20px 22px', border: '1px solid var(--line)', background: 'rgba(28,24,51,0.4)' }}>
                <div style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontSize: 28, color: '#C9A24B', opacity: .5, lineHeight: 1, marginBottom: 10 }}>{s.n}.</div>
                <strong style={{ display: 'block', fontSize: '.9rem', marginBottom: 6, color: 'var(--cream)' }}>{s.title}</strong>
                <span style={{ fontSize: '.84rem', color: '#A9A3B8' }}>{s.desc}</span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid var(--line)', paddingTop: 28 }}>
            <p style={{ fontSize: 11, letterSpacing: '.25em', textTransform: 'uppercase', color: '#C9A24B', opacity: .8, marginBottom: 20 }}>
              {copy.approachesTitle}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: 12 }}>
              {copy.approaches.map((a) => (
                <div key={a.title} className="reveal" style={{ padding: '16px 18px', border: '1px solid var(--line)', background: 'rgba(142,122,181,0.06)' }}>
                  <strong style={{ display: 'block', fontSize: '.88rem', color: 'var(--cream)', marginBottom: 4 }}>{a.title}</strong>
                  <span style={{ fontSize: '.82rem', color: '#A9A3B8' }}>— {a.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Et aussi : packs */}
      <section style={{
        padding: 'clamp(32px, 5vw, 56px) 24px',
        borderTop: '1px solid rgba(201,162,75,0.12)',
        borderBottom: '1px solid rgba(201,162,75,0.08)',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C9A24B', opacity: 0.7, marginBottom: 10 }}>
              Packs · Offres groupées
            </div>
            <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', fontWeight: 300, letterSpacing: '-0.01em', marginBottom: 8 }}>
              Et aussi : nos guides en packs
            </h2>
            <p style={{ fontSize: 13, opacity: 0.5, lineHeight: 1.6 }}>
              4 guides à 49 € au lieu de 76 €.
            </p>
          </div>
          <div
            className={styles.offersGrid}
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', marginBottom: 28 }}
          >
            {FEATURED_PACKS.map((bundle) => (
              <div key={bundle.id} className={styles.offer}>
                <div className={styles.offerCategory}>Pack · 4 guides</div>
                <h3 className={styles.offerName}>{bundle.title}</h3>
                <p className={styles.offerDesc}>{bundle.blurb}</p>
                <div style={{ marginTop: 'auto' }}>
                  <div style={{ marginBottom: 12, textAlign: 'center' }}>
                    <span style={{ fontSize: 13, opacity: 0.4, textDecoration: 'line-through', marginRight: 8 }}>
                      {bundle.compareAtCents / 100} €
                    </span>
                    <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--gold)' }}>
                      {bundle.priceCents / 100} €
                    </span>
                  </div>
                  <BundleBuyButton bundleId={bundle.id} label={`Acheter le pack — ${bundle.priceCents / 100} €`} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <a
              href="/bibliotheque"
              style={{
                display: 'inline-block',
                border: '1px solid rgba(201,162,75,0.35)',
                color: '#C9A24B',
                fontSize: 13,
                padding: '9px 22px',
                borderRadius: '4px',
                textDecoration: 'none',
                letterSpacing: '.04em',
              }}
            >
              Voir tous les packs →
            </a>
          </div>
        </div>
      </section>

      {/* (e) Profil relationnel */}
      <section style={{ background: 'rgba(142,122,181,0.06)', borderTop: '1px solid rgba(142,122,181,0.2)', borderBottom: '1px solid rgba(142,122,181,0.2)', padding: '4rem 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(201,162,75,0.1)',
            border: '1px solid rgba(201,162,75,0.3)',
            color: '#C9A24B',
            fontSize: '.7rem',
            fontWeight: 700,
            letterSpacing: '.12em',
            textTransform: 'uppercase',
            padding: '4px 12px',
            borderRadius: '100px',
            marginBottom: '1.25rem',
          }}>
            {copy.profile.eyebrow}
          </div>
          <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(1.3rem,3vw,1.7rem)', fontWeight: 400, marginBottom: '.75rem' }}>{copy.profile.title}</h2>
          <p style={{ color: '#A9A3B8', fontSize: '.9rem', lineHeight: 1.65, marginBottom: '1.75rem' }}>{copy.profile.body}</p>
          <a href="/questionnaire" style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg,#C9A24B,#A87C2A)',
            color: '#0B0A14',
            fontWeight: 700,
            fontSize: '.9rem',
            padding: '13px 30px',
            borderRadius: '4px',
            textDecoration: 'none',
            letterSpacing: '.04em',
          }}>
            {copy.profile.cta}
          </a>
        </div>
      </section>

      {/* (f) Crédibilité */}
      <section className={styles.section}>
        <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <div className={styles.sectionLabel} style={{ justifyContent: 'center', marginBottom: 20 }}>{copy.credibility.eyebrow}</div>
          <h2 className={`${styles.sectionTitle} reveal`} style={{ textAlign: 'center', margin: '0 auto 20px' }}>{copy.credibility.title}</h2>
          <p className="reveal" style={{ fontSize: '.93rem', color: '#A9A3B8', lineHeight: 1.75 }}>{copy.credibility.body}</p>
        </div>
      </section>

      {/* (g) Coaching */}
      <section style={{ background: 'rgba(142,122,181,0.04)', borderTop: '1px solid rgba(142,122,181,0.15)', borderBottom: '1px solid rgba(142,122,181,0.15)', padding: '4rem 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: 520, margin: '0 auto' }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(142,122,181,0.1)',
            border: '1px solid rgba(142,122,181,0.3)',
            color: '#8E7AB5',
            fontSize: '.7rem',
            fontWeight: 700,
            letterSpacing: '.12em',
            textTransform: 'uppercase',
            padding: '4px 12px',
            borderRadius: '100px',
            marginBottom: '1.25rem',
          }}>
            {copy.coaching.eyebrow}
          </div>
          <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(1.2rem,3vw,1.6rem)', fontWeight: 400, marginBottom: '.75rem' }}>{copy.coaching.title}</h2>
          <p style={{ color: '#A9A3B8', fontSize: '.9rem', lineHeight: 1.65, marginBottom: '1.75rem' }}>{copy.coaching.body}</p>
          <a href={copy.coaching.ctaHref} style={{
            display: 'inline-block',
            border: '1px solid rgba(142,122,181,0.6)',
            color: '#8E7AB5',
            fontWeight: 600,
            fontSize: '.88rem',
            padding: '12px 28px',
            borderRadius: '4px',
            textDecoration: 'none',
            letterSpacing: '.04em',
          }}>
            {copy.coaching.cta}
          </a>
        </div>
      </section>

      {/* (h) Closing */}
      <section style={{ textAlign: 'center', padding: 'clamp(48px,8vw,80px) 24px' }}>
        <h2 style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontSize: 'clamp(1.3rem,3vw,1.9rem)', fontWeight: 400, color: '#C9A24B', marginBottom: '.75rem' }}>
          {copy.closing.title}
        </h2>
        <p style={{ color: '#A9A3B8', fontSize: '.9rem', lineHeight: 1.65, marginBottom: '2rem', maxWidth: 440, margin: '0 auto 2rem' }}>
          {copy.closing.body}
        </p>
        <a href={testHref} style={{
          display: 'inline-block',
          background: 'linear-gradient(135deg,#C9A24B,#A87C2A)',
          color: '#0B0A14',
          fontWeight: 700,
          fontSize: '.9rem',
          padding: '14px 32px',
          borderRadius: '4px',
          textDecoration: 'none',
          letterSpacing: '.04em',
        }}>
          {copy.closing.cta}
        </a>
      </section>

      {/* (i) Note bienveillante */}
      <div style={{ textAlign: 'center', padding: '0 24px 48px', maxWidth: 640, margin: '0 auto' }}>
        <p style={{ fontSize: '.78rem', color: '#A9A3B8', opacity: .55, lineHeight: 1.65 }}>{copy.careNote}</p>
      </div>

      <footer className={styles.footer}>
        <div className={styles.logo} style={{ justifyContent: 'center', marginBottom: 8 }}>
          <span className={styles.logoMark}></span>
          PerfectMatch
        </div>
        <p className={styles.footerByline}>par EvaTalk</p>
        <p className={styles.footerTagline}>{copy.footer.tagline}</p>
        <p className={styles.copyright}>© 2026 PerfectMatch · une création <strong>EvaTalk</strong></p>
      </footer>
    </>
  );
}
