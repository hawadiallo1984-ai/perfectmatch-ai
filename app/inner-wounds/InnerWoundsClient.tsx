'use client';

import { useState } from 'react';
import { GUIDES, GuideId } from '@/lib/guides';
import { BUNDLES } from '@/lib/bundles';
import BundleBuyButton from '@/components/BundleBuyButton';
import GuideBuyButton from '@/components/GuideBuyButton';
import LeadMagnet from '@/components/LeadMagnet';
import SiteNav from '@/components/SiteNav';
import styles from '@/app/page.module.css';

const WOUND_TO_EN_GUIDE_ID: Record<string, string> = {
  A: 'healing-the-abandonment-wound',
  R: 'healing-the-rejection-wound',
  E: 'healing-the-humiliation-wound',
  T: 'healing-the-betrayal-wound',
  I: 'healing-the-injustice-wound',
};

const WOUND_TO_EN_TOME2_GUIDE_ID: Record<string, string> = {
  A: 'deepening-the-abandonment-wound',
  R: 'deepening-the-rejection-wound',
  E: 'deepening-the-humiliation-wound',
  T: 'deepening-the-betrayal-wound',
  I: 'deepening-the-injustice-wound',
};

const WOUND_TO_EN_COMPLETE_PACK_ID: Record<string, string> = {
  A: 'pack-abandonment-wound-complete',
  R: 'pack-rejection-wound-complete',
  E: 'pack-humiliation-wound-complete',
  T: 'pack-betrayal-wound-complete',
  I: 'pack-injustice-wound-complete',
};

const WOUND_TO_EN_INTRO: Record<string, string> = {
  A: "The fear of being left or left alone follows you.",
  R: "Deep down, you've often felt like you were 'too much'.",
  E: "You put others first, and you struggle to receive.",
  T: "You've learned to control everything so you're never betrayed again.",
  I: "You are demanding, perfectionist, hard on yourself.",
};

const WOUND_TO_EN_SIGNS: Record<string, readonly string[]> = {
  A: ["you cling or constantly seek reassurance", "being alone fills you with dread", "a silence makes you imagine the worst"],
  R: ["you pull back before someone can reject you", "you aim for perfection to earn your place", "you avoid true intimacy when it gets too real"],
  E: ["you sacrifice yourself and make yourself indispensable", "you feel ashamed of your needs", "saying no fills you with guilt"],
  T: ["you struggle to trust or delegate", "you need to be strong and right", "you stay on guard"],
  I: ["never 'good enough'", "you cut yourself off from your emotions", "you can't stand imperfection — yours or anyone else's"],
};

const WOUND_TO_EN_LABEL: Record<string, string> = {
  A: 'Abandonment',
  R: 'Rejection',
  E: 'Humiliation',
  T: 'Betrayal',
  I: 'Injustice',
};

const WOUNDS = [
  {
    key: 'A',
    label: 'Abandonment',
    color: '#8E7AB5',
    desc: 'The fear of being left or neglected. You cling, or you dread being alone enough to do anything to avoid it.',
    questions: [
      'I struggle to be alone.',
      'I fear people will eventually leave me.',
    ],
    guides: [
      { label: 'Attachment Styles', href: '/guides/styles-attachement' },
      { label: 'Healing from a Breakup', href: '/guides/guerir-rupture' },
      { label: 'Coping with Loneliness', href: '/guides/gestion-solitude' },
    ],
  },
  {
    key: 'R',
    label: 'Rejection',
    color: '#8E7AB5',
    desc: 'The sense of not having a place, of being "too much." You shrink, you fear judgment if you truly show yourself.',
    questions: [
      'I often feel "too much."',
      'I fear being judged if I show my real self.',
    ],
    guides: [
      { label: 'Confidence & Self-Esteem', href: '/guides/confiance-estime-de-soi' },
      { label: 'Mixed-Race Identity', href: '/guides/identite-metisse' },
      { label: 'Misogynoir', href: '/guides/misogynoir' },
    ],
  },
  {
    key: 'E',
    label: 'Low self-worth ("not enough")',
    color: '#8E7AB5',
    desc: 'The feeling of never measuring up, whatever you do. You self-criticize, you doubt your worth.',
    questions: [
      'It never feels like enough.',
      'I doubt my worth a lot.',
    ],
    guides: [
      { label: 'Confidence & Self-Esteem', href: '/guides/confiance-estime-de-soi' },
      { label: 'Imposter Syndrome', href: '/guides/syndrome-imposteur' },
      { label: 'Class Shame', href: '/guides/honte-de-classe' },
    ],
  },
  {
    key: 'T',
    label: 'Betrayal / trust',
    color: '#8E7AB5',
    desc: 'Hard to trust. You control, or you protect yourself by keeping your distance.',
    questions: [
      'I find it hard to trust.',
      'I protect myself by keeping my distance.',
    ],
    guides: [
      { label: 'Attachment Styles', href: '/guides/styles-attachement' },
      { label: 'Healing from a Breakup', href: '/guides/guerir-rupture' },
    ],
  },
  {
    key: 'I',
    label: 'Injustice / invisibility',
    color: '#8E7AB5',
    desc: 'The pain of not being seen, recognized, treated fairly. Anger, hypervigilance, exhaustion.',
    questions: [
      'It hurts not to be seen or recognized.',
      "I'm often on alert against unfairness.",
    ],
    guides: [
      { label: 'Misogynoir', href: '/guides/misogynoir' },
      { label: 'Everyday Racism', href: '/guides/racisme-au-quotidien' },
      { label: 'Racial Fatigue', href: '/guides/charge-raciale' },
    ],
  },
];

export default function InnerWoundsClient() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const scores = WOUNDS.map((w) => ({
    key: w.key,
    score: w.questions.filter((_, qi) => checked[`${w.key}-${qi}`]).length,
  }));

  const maxScore = Math.max(...scores.map((s) => s.score));
  const dominantKeys = maxScore > 0 ? scores.filter((s) => s.score === maxScore).map((s) => s.key) : [];

  const primaryGuideId = dominantKeys.length > 0 ? WOUND_TO_EN_GUIDE_ID[dominantKeys[0]] : null;
  const primaryGuide = primaryGuideId ? (GUIDES[primaryGuideId as GuideId] ?? null) : null;
  const tome2GuideId = dominantKeys.length > 0 ? WOUND_TO_EN_TOME2_GUIDE_ID[dominantKeys[0]] : null;
  const tome2Guide = tome2GuideId ? (GUIDES[tome2GuideId as GuideId] ?? null) : null;
  const woundCompletePackId = dominantKeys.length > 0 ? WOUND_TO_EN_COMPLETE_PACK_ID[dominantKeys[0]] : null;
  const woundCompletePack = woundCompletePackId ? (BUNDLES.find(b => b.id === woundCompletePackId) ?? null) : null;
  const innerWoundsPack = BUNDLES.find(b => b.id === 'pack-inner-wounds') ?? null;
  const dominantKey = dominantKeys.length > 0 ? dominantKeys[0] : null;
  const enIntro = dominantKey ? WOUND_TO_EN_INTRO[dominantKey] ?? null : null;
  const enSigns = dominantKey ? WOUND_TO_EN_SIGNS[dominantKey] ?? null : null;
  const enLabel = dominantKey ? WOUND_TO_EN_LABEL[dominantKey] ?? null : null;

  return (
    <div style={{ position: 'relative', zIndex: 2, minHeight: '100vh' }}>
      <SiteNav />

      {/* Hero */}
      <section style={{ paddingTop: 100, paddingBottom: 0, textAlign: 'center', padding: '100px 24px 48px' }}>
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
            Free Starter Guide · PerfectMatch · EvaTalk
          </div>
          <h1 style={{
            fontFamily: 'Fraunces, serif',
            fontSize: 'clamp(2rem,5vw,3rem)',
            fontWeight: 400,
            lineHeight: 1.15,
            marginBottom: '1.25rem',
          }}>
            Your Inner<br /><em style={{ color: '#C9A24B' }}>Wounds</em>
          </h1>
          <p style={{ fontSize: '.95rem', color: '#A9A3B8', lineHeight: 1.7, marginBottom: '2rem', maxWidth: 520, margin: '0 auto 2rem' }}>
            The free starter guide to spot your core wound — and take the first step.
          </p>
          <a
            href="/inner-wounds-starter-guide.pdf"
            download
            style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg,#C9A24B,#A87C2A)',
              color: '#0B0A14',
              fontWeight: 700,
              fontSize: '.9rem',
              padding: '14px 32px',
              borderRadius: '4px',
              textDecoration: 'none',
              letterSpacing: '.05em',
            }}
          >
            Download the free guide (PDF)
          </a>
          <p style={{ marginTop: 12, fontSize: 11, opacity: 0.4, letterSpacing: '.05em' }}>
            Free · 7 pages · by EvaTalk
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className={styles.section} style={{ paddingTop: 60 }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{
            display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 28,
            borderBottom: '1px solid var(--line)', paddingBottom: 14,
          }}>
            <span style={{ fontSize: 11, letterSpacing: '.3em', textTransform: 'uppercase', color: '#C9A24B', opacity: .85 }}>
              First things first
            </span>
          </div>
          <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(1.4rem,3vw,1.9rem)', fontWeight: 400, marginBottom: '1.25rem', lineHeight: 1.25 }}>
            What sets you off today often has an old root
          </h2>
          <p style={{ fontSize: '.93rem', color: '#A9A3B8', lineHeight: 1.75, marginBottom: '1rem' }}>
            Most of our painful reactions — the fear of being left, the feeling of never being good enough, the anger of not being seen — don&apos;t come from nowhere. They take root in <strong style={{ color: '#F5EFE3' }}>inner wounds</strong> formed early: abandonment, rejection, betrayal, injustice, low self-worth.
          </p>
          <p style={{ fontSize: '.93rem', color: '#A9A3B8', lineHeight: 1.75, marginBottom: '1.5rem' }}>
            The good news: a wound isn&apos;t a life sentence. Understood and worked through — with psychology — it can be <strong style={{ color: '#F5EFE3' }}>transformed</strong>. This starter guide helps you spot your core wound and know where to begin.
          </p>
          <div style={{
            padding: '18px 22px',
            borderLeft: '3px solid #C9A24B',
            background: 'rgba(201,162,75,0.06)',
            fontSize: '.87rem',
            color: '#C9A24B',
            lineHeight: 1.6,
          }}>
            <strong>How to use it</strong><br />
            <span style={{ color: '#A9A3B8' }}>Read the 5 wounds, take the mini-test below, then check your starting point. No judgment, at your own pace.</span>
          </div>
        </div>
      </section>

      {/* The 5 inner wounds */}
      <section className={styles.section} style={{ paddingTop: 0 }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{
            display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 28,
            borderBottom: '1px solid var(--line)', paddingBottom: 14,
          }}>
            <span style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontSize: 13, color: '#C9A24B' }}>Step 1</span>
            <span style={{ fontSize: 11, letterSpacing: '.3em', textTransform: 'uppercase', color: '#C9A24B', opacity: .85 }}>
              The 5 inner wounds
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: 16 }}>
            {WOUNDS.map((w) => (
              <div key={w.key} style={{
                padding: '24px 24px 20px',
                border: '1px solid var(--line)',
                background: 'rgba(28,24,51,0.4)',
              }}>
                <h3 style={{
                  fontFamily: 'Fraunces, serif',
                  fontSize: 18,
                  fontWeight: 400,
                  color: w.color,
                  marginBottom: 10,
                  lineHeight: 1.2,
                }}>
                  {w.label}
                </h3>
                <p style={{ fontSize: '.87rem', color: '#A9A3B8', lineHeight: 1.65, fontWeight: 300 }}>
                  {w.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mini-test */}
      <section className={styles.section} style={{ paddingTop: 0 }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{
            display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 28,
            borderBottom: '1px solid var(--line)', paddingBottom: 14,
          }}>
            <span style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontSize: 13, color: '#C9A24B' }}>Step 2</span>
            <span style={{ fontSize: 11, letterSpacing: '.3em', textTransform: 'uppercase', color: '#C9A24B', opacity: .85 }}>
              The mini-test
            </span>
          </div>
          <p style={{ fontSize: '.9rem', color: '#A9A3B8', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            Check the statements that resonate most. The group with the most checks = your core wound (most of us have one or two).
          </p>

          <div style={{
            padding: '28px',
            border: '1px solid rgba(201,162,75,0.3)',
            background: 'rgba(201,162,75,0.04)',
          }}>
            <p style={{ fontSize: '.75rem', letterSpacing: '.1em', textTransform: 'uppercase', color: '#C9A24B', marginBottom: '1.5rem', fontWeight: 700 }}>
              Check what speaks to you
            </p>
            {WOUNDS.map((w) => (
              <div key={w.key} style={{ marginBottom: '1.5rem' }}>
                <p style={{ fontSize: '.82rem', fontWeight: 700, letterSpacing: '.05em', marginBottom: '.6rem', color: '#8E7AB5' }}>
                  {w.key} · {w.label}
                </p>
                {w.questions.map((q, qi) => {
                  const id = `${w.key}-${qi}`;
                  return (
                    <label key={id} style={{
                      display: 'flex', alignItems: 'flex-start', gap: 10,
                      cursor: 'pointer', marginBottom: '.5rem',
                      fontSize: '.88rem', color: checked[id] ? '#F5EFE3' : '#A9A3B8',
                      lineHeight: 1.5,
                    }}>
                      <input
                        type="checkbox"
                        checked={!!checked[id]}
                        onChange={() => toggle(id)}
                        style={{
                          marginTop: 3,
                          accentColor: '#C9A24B',
                          width: 15,
                          height: 15,
                          flexShrink: 0,
                          cursor: 'pointer',
                        }}
                      />
                      {q}
                    </label>
                  );
                })}
              </div>
            ))}

            <div style={{
              marginTop: '1.5rem',
              paddingTop: '1.25rem',
              borderTop: '1px solid rgba(201,162,75,0.2)',
              fontSize: '.9rem',
              color: '#C9A24B',
              fontWeight: 700,
            }}>
              My core wound:{' '}
              {dominantKeys.length > 0 ? (
                <span style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontSize: '1.1rem' }}>
                  {dominantKeys.join(' & ')} — {WOUNDS.filter(w => dominantKeys.includes(w.key)).map(w => w.label.split(' ')[0]).join(' & ')}
                </span>
              ) : (
                <span style={{ opacity: .5, fontWeight: 400, fontSize: '.85rem' }}>(the letter you checked most)</span>
              )}
            </div>
          </div>
        </div>
      </section>

      {dominantKey && enIntro && enLabel && enSigns ? (
        <>
          {/* A — Result hero */}
          <section className={styles.section} style={{ paddingTop: 0 }}>
            <div style={{ maxWidth: 680, margin: '0 auto' }}>
              <div style={{ padding: '28px 32px', border: '1px solid rgba(201,162,75,0.4)', background: 'rgba(201,162,75,0.06)' }}>
                <div style={{ fontSize: 11, letterSpacing: '.25em', textTransform: 'uppercase', color: '#C9A24B', opacity: .8, marginBottom: 10 }}>
                  Your core wound
                </div>
                <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(1.5rem,3.5vw,2rem)', fontWeight: 400, lineHeight: 1.2, marginBottom: '.75rem', color: '#F5EFE3' }}>
                  {enLabel}
                </h2>
                <p style={{ fontSize: '.93rem', color: '#C5BFD4', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                  {enIntro}
                </p>
                <div style={{ borderTop: '1px solid rgba(201,162,75,0.2)', paddingTop: '1rem' }}>
                  <p style={{ fontSize: '.75rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: '#C9A24B', marginBottom: '.6rem' }}>
                    Does this sound like you?
                  </p>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {[...enSigns].map((sign, i) => (
                      <li key={i} style={{ fontSize: '.88rem', color: '#A9A3B8', lineHeight: 1.5, display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                        <span style={{ color: '#C9A24B', flexShrink: 0, marginTop: 2 }}>·</span>
                        {sign}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* B — Guide hero */}
          {primaryGuide && (
            <section className={styles.section} style={{ paddingTop: 0 }}>
              <div style={{ maxWidth: 680, margin: '0 auto' }}>
                <p style={{ fontSize: '.75rem', letterSpacing: '.12em', textTransform: 'uppercase', color: '#C9A24B', fontWeight: 700, marginBottom: '.75rem' }}>
                  The guide made for your wound
                </p>
                <div style={{ padding: '28px', border: '1px solid rgba(201,162,75,0.55)', background: 'rgba(201,162,75,0.08)', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ fontSize: 10, letterSpacing: '.15em', textTransform: 'uppercase', color: '#C9A24B', opacity: 0.7 }}>PDF Guide · €19</div>
                  <h3 style={{ fontFamily: 'Fraunces, serif', fontWeight: 400, fontSize: 'clamp(1.05rem,2.5vw,1.25rem)', lineHeight: 1.25, margin: 0, color: '#F5EFE3' }}>
                    {primaryGuide.name}
                  </h3>
                  <p style={{ fontSize: '.87rem', opacity: 0.65, lineHeight: 1.65, margin: 0 }}>{primaryGuide.blurb}</p>
                  <GuideBuyButton guideId={primaryGuide.id} label={`Start healing my ${enLabel} wound →`} />
                  <p style={{ fontSize: '.75rem', color: '#A9A3B8', textAlign: 'center', margin: 0 }}>
                    Instant download · 4-approach method · workbook format
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* C — Email net */}
          <LeadMagnet lang="en" />

          {/* D — Going deeper */}
          {(tome2Guide || woundCompletePack || innerWoundsPack) && (
            <section className={styles.section} style={{ paddingTop: 0 }}>
              <div style={{ maxWidth: 680, margin: '0 auto' }}>
                <p style={{ fontSize: '.75rem', letterSpacing: '.12em', textTransform: 'uppercase', color: '#8E7AB5', fontWeight: 700, marginBottom: '1.25rem', opacity: .8 }}>
                  Going deeper
                </p>
                {tome2Guide && (
                  <div style={{ marginBottom: '1.25rem' }}>
                    <p style={{ fontSize: '.73rem', letterSpacing: '.1em', textTransform: 'uppercase', color: '#8E7AB5', marginBottom: '.6rem', fontWeight: 700 }}>Volume 2</p>
                    <div style={{ padding: '20px 22px', border: '1px solid rgba(142,122,181,0.35)', background: 'rgba(142,122,181,0.05)', display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <div style={{ fontSize: 10, letterSpacing: '.15em', textTransform: 'uppercase', color: '#8E7AB5', opacity: 0.8 }}>PDF Guide · €19</div>
                      <h4 style={{ fontFamily: 'Fraunces, serif', fontWeight: 400, fontSize: '1rem', lineHeight: 1.25, margin: 0, color: '#F5EFE3' }}>{tome2Guide.name}</h4>
                      <p style={{ fontSize: '.83rem', opacity: 0.55, lineHeight: 1.6, margin: 0 }}>{tome2Guide.blurb}</p>
                      <GuideBuyButton guideId={tome2Guide.id} />
                    </div>
                  </div>
                )}
                {woundCompletePack && (
                  <div style={{ marginBottom: '1.25rem' }}>
                    <p style={{ fontSize: '.73rem', letterSpacing: '.1em', textTransform: 'uppercase', color: '#8E7AB5', marginBottom: '.6rem', fontWeight: 700 }}>Both volumes together</p>
                    <div style={{ padding: '20px 22px', border: '1px solid rgba(201,162,75,0.35)', background: 'rgba(201,162,75,0.06)', display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <div style={{ fontSize: 10, letterSpacing: '.15em', textTransform: 'uppercase', color: '#C9A24B', opacity: 0.7 }}>Pack · 2 guides</div>
                      <h4 style={{ fontFamily: 'Fraunces, serif', fontWeight: 400, fontSize: '1rem', lineHeight: 1.25, margin: 0, color: '#F5EFE3' }}>{woundCompletePack.title}</h4>
                      <div>
                        <span style={{ fontSize: 12, opacity: 0.4, textDecoration: 'line-through', marginRight: 8 }}>€{woundCompletePack.compareAtCents / 100}</span>
                        <span style={{ fontSize: 16, fontWeight: 700, color: '#C9A24B' }}>€{woundCompletePack.priceCents / 100}</span>
                      </div>
                      <BundleBuyButton bundleId={woundCompletePack.id} label={`Get the pack — €${woundCompletePack.priceCents / 100}`} />
                    </div>
                  </div>
                )}
                {innerWoundsPack && (
                  <div>
                    <p style={{ fontSize: '.73rem', letterSpacing: '.1em', textTransform: 'uppercase', color: '#8E7AB5', marginBottom: '.6rem', fontWeight: 700 }}>Working on multiple wounds? The complete pack</p>
                    <div style={{ padding: '20px 22px', border: '1px solid rgba(201,162,75,0.25)', background: 'rgba(201,162,75,0.04)', display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <div style={{ fontSize: 10, letterSpacing: '.15em', textTransform: 'uppercase', color: '#C9A24B', opacity: 0.7 }}>Pack · 5 guides</div>
                      <h4 style={{ fontFamily: 'Fraunces, serif', fontWeight: 400, fontSize: '1rem', lineHeight: 1.25, margin: 0, color: '#F5EFE3' }}>{innerWoundsPack.title}</h4>
                      <div>
                        <span style={{ fontSize: 12, opacity: 0.4, textDecoration: 'line-through', marginRight: 8 }}>€{innerWoundsPack.compareAtCents / 100}</span>
                        <span style={{ fontSize: 16, fontWeight: 700, color: '#C9A24B' }}>€{innerWoundsPack.priceCents / 100}</span>
                      </div>
                      <BundleBuyButton bundleId={innerWoundsPack.id} label={`Get the pack — €${innerWoundsPack.priceCents / 100}`} />
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}
        </>
      ) : (
        <LeadMagnet lang="en" />
      )}

      {/* Your starting point */}
      <section className={styles.section} style={{ paddingTop: 0 }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{
            display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 28,
            borderBottom: '1px solid var(--line)', paddingBottom: 14,
          }}>
            <span style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontSize: 13, color: '#C9A24B' }}>Step 3</span>
            <span style={{ fontSize: 11, letterSpacing: '.3em', textTransform: 'uppercase', color: '#C9A24B', opacity: .85 }}>
              Your starting point
            </span>
          </div>
          <p style={{ fontSize: '.9rem', color: '#A9A3B8', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            Based on your core wound, here are the guides to start with:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {WOUNDS.map((w) => {
              const isDominant = dominantKeys.includes(w.key);
              return (
                <div key={w.key} style={{
                  padding: '20px 24px',
                  border: `1px solid ${isDominant ? 'rgba(201,162,75,0.5)' : 'var(--line)'}`,
                  background: isDominant ? 'rgba(201,162,75,0.07)' : 'rgba(28,24,51,0.3)',
                  transition: 'all .2s',
                }}>
                  <p style={{
                    fontSize: '.82rem', fontWeight: 700, letterSpacing: '.05em',
                    color: isDominant ? '#C9A24B' : '#8E7AB5',
                    marginBottom: '.6rem',
                  }}>
                    {w.label}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {w.guides.map((g) => (
                      <a
                        key={g.href}
                        href={g.href}
                        style={{
                          display: 'inline-block',
                          padding: '6px 14px',
                          border: `1px solid ${isDominant ? 'rgba(201,162,75,0.4)' : 'rgba(142,122,181,0.3)'}`,
                          background: isDominant ? 'rgba(201,162,75,0.08)' : 'rgba(142,122,181,0.06)',
                          color: isDominant ? '#C9A24B' : '#A9A3B8',
                          fontSize: '.82rem',
                          textDecoration: 'none',
                          borderRadius: '2px',
                          transition: 'all .15s',
                        }}
                      >
                        {g.label} →
                      </a>
                    ))}
                  </div>
                </div>
              );
            })}

            <div style={{
              padding: '20px 24px',
              border: '1px solid rgba(142,122,181,0.3)',
              background: 'rgba(142,122,181,0.06)',
            }}>
              <p style={{ fontSize: '.82rem', fontWeight: 700, letterSpacing: '.05em', color: '#8E7AB5', marginBottom: '.6rem' }}>
                And for everyone
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                <a href="/guides/anxiete-pensees-negatives" style={{
                  display: 'inline-block',
                  padding: '6px 14px',
                  border: '1px solid rgba(142,122,181,0.3)',
                  background: 'rgba(142,122,181,0.06)',
                  color: '#A9A3B8',
                  fontSize: '.82rem',
                  textDecoration: 'none',
                  borderRadius: '2px',
                }}>
                  Anxiety & Negative Thoughts →
                </a>
              </div>
              <p style={{ fontSize: '.8rem', color: '#A9A3B8', marginTop: '.6rem', opacity: .7 }}>
                To quiet the mind while you work on the root.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The method */}
      <section className={styles.section} style={{ paddingTop: 0 }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{
            display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 28,
            borderBottom: '1px solid var(--line)', paddingBottom: 14,
          }}>
            <span style={{ fontSize: 11, letterSpacing: '.3em', textTransform: 'uppercase', color: '#C9A24B', opacity: .85 }}>
              The method
            </span>
          </div>
          <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(1.4rem,3vw,1.9rem)', fontWeight: 400, marginBottom: '1.25rem', lineHeight: 1.25 }}>
            How a wound is transformed
          </h2>
          <p style={{ fontSize: '.9rem', color: '#A9A3B8', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            Each guide works your wound through <strong style={{ color: '#F5EFE3' }}>4 complementary lenses</strong>:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { n: '1', name: 'Psychodynamic', desc: 'understand the root of the wound.' },
              { n: '2', name: 'CBT', desc: 'spot and ease the negative thoughts and schemas.' },
              { n: '3', name: 'Humanistic', desc: 'reconcile with yourself, gently.' },
              { n: '4', name: 'Systemic', desc: 'act on your environment and relationships.' },
            ].map((item) => (
              <div key={item.n} style={{
                display: 'flex', gap: 20, alignItems: 'flex-start',
                padding: '18px 22px',
                border: '1px solid var(--line)',
                background: 'rgba(28,24,51,0.4)',
              }}>
                <span style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontSize: 28, color: '#C9A24B', opacity: .5, lineHeight: 1, flexShrink: 0 }}>
                  {item.n}.
                </span>
                <div>
                  <strong style={{ fontSize: '.92rem', display: 'block', marginBottom: 4, color: '#F5EFE3' }}>{item.name}</strong>
                  <span style={{ fontSize: '.87rem', color: '#A9A3B8' }}>— {item.desc}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{
            marginTop: 20,
            padding: '22px 24px',
            border: '1px solid rgba(201,162,75,0.3)',
            background: 'rgba(201,162,75,0.05)',
          }}>
            <p style={{ fontSize: '.82rem', letterSpacing: '.05em', color: '#C9A24B', fontWeight: 700, marginBottom: 8 }}>
              Each guide · €19
            </p>
            <p style={{ fontSize: '.87rem', color: '#A9A3B8', lineHeight: 1.6 }}>
              4 psychology approaches + guided exercises + an 11-page workbook to fill in. Instant access, at your own pace.
            </p>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section style={{ textAlign: 'center', padding: 'clamp(40px,8vw,80px) 24px' }}>
        <p style={{
          fontFamily: 'Fraunces, serif', fontStyle: 'italic',
          fontSize: 'clamp(1rem,2.5vw,1.3rem)',
          color: '#C5BFD4', marginBottom: 32, lineHeight: 1.5,
          maxWidth: 500, margin: '0 auto 32px',
        }}>
          &ldquo;Your wounds don&apos;t define you. Understood, they become your strength.&rdquo;
        </p>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 16 }}>
          <a
            href="/inner-wounds-starter-guide.pdf"
            download
            style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg,#C9A24B,#A87C2A)',
              color: '#0B0A14',
              fontWeight: 700,
              fontSize: '.9rem',
              padding: '14px 32px',
              borderRadius: '4px',
              textDecoration: 'none',
              letterSpacing: '.05em',
            }}
          >
            Download the free guide
          </a>
          <a
            href="/bibliotheque"
            style={{
              display: 'inline-block',
              border: '1px solid rgba(201,162,75,0.5)',
              color: '#C9A24B',
              fontWeight: 600,
              fontSize: '.9rem',
              padding: '14px 32px',
              borderRadius: '4px',
              textDecoration: 'none',
              letterSpacing: '.05em',
            }}
          >
            Browse all guides
          </a>
        </div>
        <p style={{ fontSize: 11, opacity: .35, letterSpacing: '.04em' }}>
          A free psychoeducation starter guide — not a substitute for therapy.<br />
          If you are going through a hard time, please reach out to a professional or a crisis line in your country.
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
