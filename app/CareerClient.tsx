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
  {
    id: 'handling-conflict-at-work',
    title: 'Handling Conflict at Work',
    emphasis: '4 approaches',
    desc: 'Defuse without fleeing or exploding.',
    href: '/guides/handling-conflict-at-work',
  },
  {
    id: 'public-speaking-at-work',
    title: 'Public Speaking at Work',
    emphasis: '4 approaches',
    desc: 'Speak up or present without panicking.',
    href: '/guides/public-speaking-at-work',
  },
  {
    id: 'finding-mentors-and-sponsors',
    title: 'Finding Mentors & Sponsors',
    emphasis: '4 approaches',
    desc: 'Build support to move forward when you start out isolated.',
    href: '/guides/finding-mentors-and-sponsors',
  },
  {
    id: 'building-an-inclusive-culture',
    title: 'Building an Inclusive Culture',
    emphasis: '4 approaches',
    desc: 'Make inclusion real, not a slogan.',
    href: '/guides/building-an-inclusive-culture',
  },
  {
    id: 'psychological-harassment-at-work',
    title: 'Psychological Harassment at Work',
    emphasis: '4 approaches',
    desc: 'Recognize, document, protect yourself.',
    href: '/guides/psychological-harassment-at-work',
  },
  {
    id: 'succeeding-in-your-job-search',
    title: 'Succeeding in Your Job Search',
    emphasis: '4 approaches',
    desc: 'Run your search with method, confidence and network.',
    href: '/guides/succeeding-in-your-job-search',
  },
  {
    id: 'asking-for-a-promotion',
    title: 'Asking for a Promotion',
    emphasis: '4 approaches',
    desc: 'Dare to ask and make the case for your value.',
    href: '/guides/asking-for-a-promotion',
  },
  {
    id: 'dealing-with-a-difficult-manager',
    title: 'Dealing with a Difficult Manager',
    emphasis: '4 approaches',
    desc: 'Protect yourself and move forward without burning out.',
    href: '/guides/dealing-with-a-difficult-manager',
  },
  {
    id: 'leadership-as-a-black-woman',
    title: 'Leadership as a Black Woman',
    emphasis: '4 approaches',
    desc: 'Lead fully, in your own way.',
    href: '/guides/leadership-as-a-black-woman',
  },
  {
    id: 'succeeding-in-a-new-role',
    title: 'Succeeding in a New Role',
    emphasis: '4 approaches',
    desc: 'Start well, find your place, steer your 30/60/90 first days.',
    href: '/guides/succeeding-in-a-new-role',
  },
  {
    id: 'giving-and-receiving-feedback',
    title: 'Giving and Receiving Feedback',
    emphasis: '4 approaches',
    desc: 'Feedback that grows people, not wounds them.',
    href: '/guides/giving-and-receiving-feedback',
  },
  {
    id: 'work-life-balance-and-mental-load',
    title: 'Work-Life Balance & Mental Load',
    emphasis: '4 approaches',
    desc: 'Set limits and ease the mental load.',
    href: '/guides/work-life-balance-and-mental-load',
  },
  {
    id: 'responding-to-microaggressions-at-work',
    title: 'Responding to Microaggressions at Work',
    emphasis: '4 approaches',
    desc: 'React to wounding remarks in your own way.',
    href: '/guides/responding-to-microaggressions-at-work',
  },
  {
    id: 'supporting-a-struggling-team-member',
    title: 'Supporting a Struggling Team Member',
    emphasis: '4 approaches',
    desc: 'The right manager stance — listen, adjust, direct.',
    href: '/guides/supporting-a-struggling-team-member',
  },
  {
    id: 'fair-performance-reviews',
    title: 'Running Fair Performance Reviews',
    emphasis: '4 approaches',
    desc: 'Evaluate fairly, motivate, without bias.',
    href: '/guides/fair-performance-reviews',
  },
  {
    id: 'managing-a-return-to-work',
    title: 'Managing a Return to Work',
    emphasis: '4 approaches',
    desc: 'Welcome a return gently and prevent relapse.',
    href: '/guides/managing-a-return-to-work',
  },
  {
    id: 'preventing-psychosocial-risks',
    title: 'Preventing Psychosocial Risks in Your Team',
    emphasis: '4 approaches',
    desc: "Spot the signals and protect your team's health.",
    href: '/guides/preventing-psychosocial-risks',
  },
  {
    id: 'making-a-career-change',
    title: 'Making a Career Change',
    emphasis: '4 approaches',
    desc: 'Change paths with method and courage.',
    href: '/guides/making-a-career-change',
  },
  {
    id: 'bouncing-back-after-a-layoff',
    title: 'Bouncing Back After a Layoff',
    emphasis: '4 approaches',
    desc: 'Take the blow then get back up — calm and strategic.',
    href: '/guides/bouncing-back-after-a-layoff',
  },
  {
    id: 'building-your-personal-brand',
    title: 'Building Your Personal Brand',
    emphasis: '4 approaches',
    desc: 'Make your value visible without betraying yourself.',
    href: '/guides/building-your-personal-brand',
  },
  {
    id: 'building-your-network',
    title: 'Building Your Network',
    emphasis: '4 approaches',
    desc: 'Weave useful bonds without pretending.',
    href: '/guides/building-your-network',
  },
  {
    id: 'taming-performance-anxiety',
    title: 'Taming Performance Anxiety',
    emphasis: '4 approaches',
    desc: 'Give your best without fear paralyzing you.',
    href: '/guides/taming-performance-anxiety',
  },
  {
    id: 'managing-time-and-delegating',
    title: 'Managing Your Time & Delegating',
    emphasis: '4 approaches',
    desc: 'Do the essential without carrying it all.',
    href: '/guides/managing-time-and-delegating',
  },
  {
    id: 'hair-and-appearance-at-work',
    title: 'Hair & Appearance at Work',
    emphasis: '4 approaches',
    desc: 'Assert yourself as you are without smoothing yourself over.',
    href: '/guides/hair-and-appearance-at-work',
  },
  {
    id: 'entrepreneurship-as-a-black-woman',
    title: 'Entrepreneurship as a Black Woman',
    emphasis: '4 approaches',
    desc: 'Launch your project despite the extra obstacles.',
    href: '/guides/entrepreneurship-as-a-black-woman',
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
