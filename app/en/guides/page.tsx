'use client';

import { useEffect } from 'react';
import { INTL_GUIDES } from '@/lib/guidesIntl';
import { NEW_GUIDES } from '@/lib/newGuides';
import { PRO_GUIDES } from '@/lib/proGuides';
import { PRO_GUIDES_2 } from '@/lib/proGuides2';
import { PRO_GUIDES_3 } from '@/lib/proGuides3';
import { PRO_GUIDES_4 } from '@/lib/proGuides4';
import { PRO_GUIDES_5 } from '@/lib/proGuides5';
import SiteNav from '@/components/SiteNav';
import styles from '@/app/page.module.css';

const EN_CONFLICT_IDS = new Set(['black-tax', 'misogynoir']);
const EN_EXTRA = [
  { id: 'misogynoir-en', title: 'Misogynoir', blurb: 'Free yourself from the tropes, reclaim your full humanity.', theme: 'Identity & Resilience' },
  { id: 'black-tax-en', title: 'Black Tax', blurb: 'Supporting your people without losing yourself.', theme: 'Money' },
];
const EN_THEME_ORDER = ['Wellbeing', 'Relationships', 'Identity & Resilience', 'Sexuality', 'Money', 'Career'];

const EN_BY_THEME = EN_THEME_ORDER.map((theme) => ({
  theme,
  guides: [
    ...INTL_GUIDES.filter((g) => g.lang === 'en' && g.theme === theme && !EN_CONFLICT_IDS.has(g.id)),
    ...NEW_GUIDES.filter((g) => g.lang === 'en' && g.theme === theme),
    ...PRO_GUIDES.filter((g) => g.lang === 'en' && g.theme === theme),
    ...PRO_GUIDES_2.filter((g) => g.lang === 'en' && g.theme === theme),
    ...PRO_GUIDES_3.filter((g) => g.lang === 'en' && g.theme === theme),
    ...PRO_GUIDES_4.filter((g) => g.lang === 'en' && g.theme === theme),
    ...PRO_GUIDES_5.filter((g) => g.lang === 'en' && g.theme === theme),
    ...EN_EXTRA.filter((g) => g.theme === theme),
  ],
})).filter((t) => t.guides.length > 0);

export default function EnGuidesPage() {
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
    <div style={{ position: 'relative', zIndex: 2, minHeight: '100vh' }}>
      <SiteNav />

      <section className={styles.section} style={{ textAlign: 'center', paddingBottom: 0 }}>
        <div className={styles.offersHeader}>
          <div className={styles.sectionLabel} style={{ justifyContent: 'center' }}>All guides · In English</div>
          <h1 className={`${styles.sectionTitle} reveal`} style={{ textAlign: 'center', margin: '0 auto 28px' }}>
            Guides <em>in English</em>
          </h1>
          <p className={`${styles.sectionLead} reveal`} style={{ textAlign: 'center', margin: '0 auto 40px', maxWidth: 560 }}>
            All guides available in English — same CBT framework, same 11-page workbook format. Instant PDF, €19 each.
          </p>
          <div style={{ marginBottom: 16 }}>
            <a href="/inner-wounds" style={{
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
              Free starter guide: Your Inner Wounds →
            </a>
          </div>
        </div>
      </section>

      {EN_BY_THEME.map(({ theme, guides }) => (
        <section key={theme} className={styles.section} style={{ paddingTop: 0 }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
            <div style={{
              fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase',
              color: 'var(--gold)', opacity: 0.8, marginBottom: 20,
            }}>
              {theme}
            </div>
            <div
              className={styles.offersGrid}
              style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}
            >
              {guides.map((guide) => (
                <div key={guide.id} className={`${styles.offer} reveal`}>
                  <div className={styles.offerCategory}>PDF Guide · €19</div>
                  <h3 className={styles.offerName}>{guide.title}</h3>
                  <p className={styles.offerDesc}>{guide.blurb}</p>
                  <div style={{ marginTop: 'auto' }}>
                    <a
                      href={`/guides/${guide.id}`}
                      className={styles.offerCta}
                      style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}
                    >
                      Discover →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <footer className={styles.footer}>
        <div className={styles.logo} style={{ justifyContent: 'center', marginBottom: 8 }}>
          <span className={styles.logoMark}></span>
          PerfectMatch
        </div>
        <p className={styles.footerByline}>by EvaTalk</p>
        <p className={styles.copyright}>© 2026 PerfectMatch · by <strong>EvaTalk</strong></p>
      </footer>
    </div>
  );
}
