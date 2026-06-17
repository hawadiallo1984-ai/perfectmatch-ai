'use client';

import { useEffect } from 'react';
import { INTL_GUIDES } from '@/lib/guidesIntl';
import { NEW_GUIDES } from '@/lib/newGuides';
import { PRO_GUIDES } from '@/lib/proGuides';
import { PRO_GUIDES_2 } from '@/lib/proGuides2';
import { PRO_GUIDES_3 } from '@/lib/proGuides3';
import { PRO_GUIDES_4 } from '@/lib/proGuides4';
import { PRO_GUIDES_5 } from '@/lib/proGuides5';
import { PRO_GUIDES_6 } from '@/lib/proGuides6';
import { PRO_GUIDES_7 } from '@/lib/proGuides7';
import { PRO_GUIDES_8 } from '@/lib/proGuides8';
import { PRO_GUIDES_9 } from '@/lib/proGuides9';
import { PRO_GUIDES_10 } from '@/lib/proGuides10';
import { PRO_GUIDES_11 } from '@/lib/proGuides11';
import { PRO_GUIDES_12 } from '@/lib/proGuides12';
import { PRO_GUIDES_13 } from '@/lib/proGuides13';
import { PRO_GUIDES_14 } from '@/lib/proGuides14';
import { PRO_GUIDES_15 } from '@/lib/proGuides15';
import { PRO_GUIDES_16 } from '@/lib/proGuides16';
import { PRO_GUIDES_17 } from '@/lib/proGuides17';
import { PRO_GUIDES_22 } from '@/lib/proGuides22';
import { PRO_GUIDES_23 } from '@/lib/proGuides23';
import { BUNDLES } from '@/lib/bundles';
import BundleBuyButton from '@/components/BundleBuyButton';
import Testimonials from '@/components/Testimonials';
import SiteNav from '@/components/SiteNav';
import styles from '@/app/page.module.css';

const EN_CONFLICT_IDS = new Set(['black-tax', 'misogynoir']);
const EN_EXTRA = [
  { id: 'misogynoir-en', title: 'Misogynoir', blurb: 'Free yourself from the tropes, reclaim your full humanity.', theme: 'Identity & Resilience' },
  { id: 'black-tax-en', title: 'Black Tax', blurb: 'Supporting your people without losing yourself.', theme: 'Money' },
];
const EN_THEME_ORDER = ['Wellbeing', 'Wellbeing & Self', 'Relationships', 'Love & Relationships', 'Identity & Resilience', 'Sexuality', 'Money', 'Career', 'Intimacy & Sexuality', 'Deconstruction & Allyship'];

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
    ...PRO_GUIDES_6.filter((g) => g.lang === 'en' && g.theme === theme),
    ...PRO_GUIDES_7.filter((g) => g.lang === 'en' && g.theme === theme),
    ...PRO_GUIDES_8.filter((g) => g.lang === 'en' && g.theme === theme),
    ...PRO_GUIDES_9.filter((g) => g.lang === 'en' && g.theme === theme),
    ...PRO_GUIDES_10.filter((g) => g.lang === 'en' && g.theme === theme),
    ...PRO_GUIDES_11.filter((g) => g.lang === 'en' && g.theme === theme),
    ...PRO_GUIDES_12.filter((g) => g.lang === 'en' && g.theme === theme),
    ...PRO_GUIDES_13.filter((g) => g.lang === 'en' && g.theme === theme),
    ...PRO_GUIDES_14.filter((g) => g.lang === 'en' && g.theme === theme),
    ...PRO_GUIDES_15.filter((g) => g.lang === 'en' && g.theme === theme),
    ...PRO_GUIDES_16.filter((g) => g.lang === 'en' && g.theme === theme),
    ...PRO_GUIDES_17.filter((g) => g.lang === 'en' && g.theme === theme),
    ...PRO_GUIDES_22.filter((g) => g.lang === 'en' && g.theme === theme),
    ...PRO_GUIDES_23.filter((g) => g.lang === 'en' && g.theme === theme),
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

      {/* Packs EN */}
      <section className={styles.section} style={{ paddingTop: 0 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <div style={{
            fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase',
            color: 'var(--gold)', opacity: 0.8, marginBottom: 8,
          }}>
            Bundles
          </div>
          <h2
            className={styles.sectionTitle}
            style={{ fontSize: 'clamp(18px, 3vw, 24px)', marginBottom: 12, letterSpacing: '0.02em' }}
          >
            Our packs
          </h2>
          <p style={{ fontSize: 14, opacity: 0.55, marginBottom: 40, lineHeight: 1.6 }}>
            4 thematic guides at a reduced price — €49 instead of €76.
          </p>
          <div
            className={styles.offersGrid}
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}
          >
            {BUNDLES.filter((b) => b.lang === 'en').map((bundle) => (
              <div key={bundle.id} className={styles.offer}>
                <div style={{ display: 'inline-block', background: 'rgba(201,162,75,0.12)', border: '1px solid rgba(201,162,75,0.35)', color: '#B8923D', fontSize: '.67rem', fontWeight: 700, letterSpacing: '.09em', padding: '3px 8px', borderRadius: 3, marginBottom: 8 }}>
                  15% off · BIENVENUE15
                </div>
                <div className={styles.offerCategory}>Bundle · 4 guides</div>
                <h3 className={styles.offerName}>{bundle.title}</h3>
                <p className={styles.offerDesc}>{bundle.blurb}</p>
                <div style={{ marginTop: 'auto' }}>
                  <div style={{ marginBottom: 12, textAlign: 'center' }}>
                    <span style={{ fontSize: 13, opacity: 0.4, textDecoration: 'line-through', marginRight: 8 }}>
                      €{bundle.compareAtCents / 100}
                    </span>
                    <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--gold)' }}>
                      €{bundle.priceCents / 100}
                    </span>
                  </div>
                  <BundleBuyButton bundleId={bundle.id} label={`Get the pack — €${bundle.priceCents / 100}`} />
                </div>
              </div>
            ))}
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

      <Testimonials lang="en" />

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
