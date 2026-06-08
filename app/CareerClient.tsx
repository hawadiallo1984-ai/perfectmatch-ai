'use client';

import { useEffect } from 'react';
import SiteNav from '@/components/SiteNav';
import styles from '@/app/page.module.css';

const GUIDES = [
  {
    id: 'confidence-at-work',
    title: 'Confidence at Work',
    emphasis: '4 approaches',
    desc: 'Dare to take your place, transform doubt, become visible.',
    href: '/guides/confidence-at-work',
  },
  {
    id: 'being-the-only-one-at-work',
    title: 'Being the Only One at Work',
    emphasis: '4 approaches',
    desc: 'Lighten the load, protect yourself, find support.',
    href: '/guides/being-the-only-one-at-work',
  },
  {
    id: 'being-an-ally-at-work',
    title: 'Being an Ally at Work',
    emphasis: '4 approaches',
    desc: 'From intention to action: becoming a useful ally.',
    href: '/guides/being-an-ally-at-work',
  },
  {
    id: 'negotiating-your-salary',
    title: 'Negotiating Your Salary',
    emphasis: '4 approaches',
    desc: 'Ask for what you\'re worth, without trembling.',
    href: '/guides/negotiating-your-salary',
  },
  {
    id: 'preventing-burnout',
    title: 'Preventing & Recovering from Burnout',
    emphasis: '4 approaches',
    desc: 'Recognize the signals, understand, and recover — supported.',
    href: '/guides/preventing-burnout',
  },
  {
    id: 'code-switching',
    title: 'Code-Switching',
    emphasis: '4 approaches',
    desc: 'The hidden cost of adapting all the time — and how to reclaim choice.',
    href: '/guides/code-switching',
  },
  {
    id: 'managing-an-inclusive-team',
    title: 'Managing an Inclusive Team',
    emphasis: '4 approaches',
    desc: 'Build a team where everyone gives their best.',
    href: '/guides/managing-an-inclusive-team',
  },
  {
    id: 'acing-your-job-interview',
    title: 'Acing Your Job Interview',
    emphasis: '4 approaches',
    desc: 'Turn the nerves into an asset, prepare solid answers.',
    href: '/guides/acing-your-job-interview',
  },
  {
    id: 'leaving-a-toxic-job',
    title: 'Leaving a Toxic Job',
    emphasis: '4 approaches',
    desc: 'Leave without guilt or rushing.',
    href: '/guides/leaving-a-toxic-job',
  },
  {
    id: 'misogynoir-at-work',
    title: 'Misogynoir at Work',
    emphasis: '4 approaches',
    desc: 'Protect your self-esteem and respond strategically.',
    href: '/guides/misogynoir-at-work',
  },
  {
    id: 'hiring-without-bias',
    title: 'Hiring Without Bias',
    emphasis: '4 approaches',
    desc: 'Spot your automatic reactions and build a fair process.',
    href: '/guides/hiring-without-bias',
  },
];

export default function CareerClient() {
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

      {/* Header */}
      <section className={styles.section} style={{ textAlign: 'center', paddingBottom: 0 }}>
        <div className={styles.offersHeader}>
          <div className={styles.sectionLabel} style={{ justifyContent: 'center' }}>
            Career &amp; professional world
          </div>
          <h1 className={`${styles.sectionTitle} reveal`} style={{ textAlign: 'center', margin: '0 auto 28px' }}>
            Take your place at work, <em>without losing yourself</em>
          </h1>
          <p className={`${styles.sectionLead} reveal`} style={{ textAlign: 'center', margin: '0 auto 16px', maxWidth: 580 }}>
            The professional world activates imposter wounds, legitimacy struggles, and invisible loads.
            These guides give you CBT tools to assert yourself, protect yourself, and act — at your own pace.
          </p>
        </div>
      </section>

      {/* Guide cards */}
      <section className={`${styles.section} ${styles.offersSection}`}>
        <div
          className={styles.offersGrid}
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}
        >
          {GUIDES.map((guide) => (
            <div key={guide.id} className={`${styles.offer} reveal`}>
              <div className={styles.offerCategory}>PDF Guide · €19</div>
              <h3 className={styles.offerName}>
                {guide.title}{' '}<em>{guide.emphasis}</em>
              </h3>
              <p className={styles.offerDesc}>{guide.desc}</p>
              <div style={{ marginTop: 'auto' }}>
                <a
                  href={guide.href}
                  className={styles.offerCta}
                  style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}
                >
                  Discover this guide →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Framing note */}
      <section style={{ maxWidth: 640, margin: '0 auto', padding: '0 24px clamp(40px, 8vw, 80px)' }}>
        <div style={{
          padding: '28px 32px',
          border: '1px solid rgba(142,122,181,0.3)',
          background: 'rgba(142,122,181,0.06)',
          textAlign: 'center',
        }}>
          <p style={{
            fontFamily: 'Fraunces, serif', fontStyle: 'italic',
            fontSize: 15, color: 'var(--violet-soft)', lineHeight: 1.7, margin: 0,
          }}>
            These guides are psychoeducation and professional coaching tools.
            They are not a substitute for HR, legal, or therapeutic support.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.logo} style={{ justifyContent: 'center', marginBottom: 8 }}>
          <span className={styles.logoMark}></span>
          PerfectMatch
        </div>
        <p className={styles.footerByline}>by EvaTalk</p>
        <p className={styles.copyright}>�� 2026 PerfectMatch · by <strong>EvaTalk</strong></p>
      </footer>

    </div>
  );
}
