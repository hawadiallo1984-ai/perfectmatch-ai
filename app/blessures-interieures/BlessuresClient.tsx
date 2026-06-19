'use client';

import { useState } from 'react';
import { BLESSURE_RECO } from '@/lib/blessuresReco';
import { BUNDLES } from '@/lib/bundles';
import { GUIDE_PROMO, discountedCents } from '@/lib/promo';
import { GUIDES, GuideId } from '@/lib/guides';
import BundleBuyButton from '@/components/BundleBuyButton';
import GuideBuyButton from '@/components/GuideBuyButton';
import LeadMagnet from '@/components/LeadMagnet';
import SiteNav from '@/components/SiteNav';
import styles from '@/app/page.module.css';

const WOUNDS = [
  {
    key: 'A',
    label: 'Abandon',
    color: '#8E7AB5',
    desc: "La peur qu'on te quitte ou te délaisse. Tu t'accroches, ou tu redoutes la solitude au point de tout faire pour l'éviter.",
    questions: [
      "J'ai du mal à supporter la solitude.",
      "J'ai peur qu'on finisse par me quitter.",
    ],
    guides: [
      { label: "Styles d'attachement", href: '/guides/styles-attachement' },
      { label: "Guérir d'une rupture", href: '/guides/guerir-rupture' },
      { label: 'Apprivoiser la solitude', href: '/guides/gestion-solitude' },
    ],
  },
  {
    key: 'R',
    label: 'Rejet',
    color: '#8E7AB5',
    desc: "Le sentiment de ne pas avoir ta place, d'être « de trop ». Tu te fais petit·e, tu crains le jugement si tu te montres vraiment.",
    questions: [
      'Je me sens souvent « de trop ».',
      "Je crains d'être jugé·e si je me montre vraiment.",
    ],
    guides: [
      { label: 'Confiance & estime de soi', href: '/guides/confiance-estime-de-soi' },
      { label: 'Identité métisse', href: '/guides/identite-metisse' },
      { label: 'Misogynoir', href: '/guides/misogynoir' },
    ],
  },
  {
    key: 'E',
    label: 'Manque d\'estime (« pas assez »)',
    color: '#8E7AB5',
    desc: "L'impression de ne jamais être à la hauteur, quoi que tu fasses. Tu te critiques, tu doutes de ta valeur.",
    questions: [
      "J'ai l'impression que ce n'est jamais assez.",
      'Je doute beaucoup de ma valeur.',
    ],
    guides: [
      { label: 'Confiance & estime de soi', href: '/guides/confiance-estime-de-soi' },
      { label: "Syndrome de l'imposteur", href: '/guides/syndrome-imposteur' },
      { label: 'Honte de classe', href: '/guides/honte-de-classe' },
    ],
  },
  {
    key: 'T',
    label: 'Trahison / confiance',
    color: '#8E7AB5',
    desc: 'Du mal à faire confiance. Tu contrôles, ou tu te protèges en gardant tes distances.',
    questions: [
      "J'ai du mal à faire confiance.",
      'Je me protège en gardant mes distances.',
    ],
    guides: [
      { label: "Styles d'attachement", href: '/guides/styles-attachement' },
      { label: "Guérir d'une rupture", href: '/guides/guerir-rupture' },
    ],
  },
  {
    key: 'I',
    label: 'Injustice / invisibilité',
    color: '#8E7AB5',
    desc: "La douleur de ne pas être vu·e, reconnu·e, traité·e équitablement. Colère, hypervigilance, épuisement.",
    questions: [
      'Je souffre de ne pas être vu·e ou reconnu·e.',
      "Je suis souvent en alerte face à l'injustice.",
    ],
    guides: [
      { label: 'Misogynoir', href: '/guides/misogynoir' },
      { label: 'Racisme au quotidien', href: '/guides/racisme-au-quotidien' },
      { label: 'La charge raciale', href: '/guides/charge-raciale' },
    ],
  },
];

const WOUND_TO_RECO_KEY: Record<string, keyof typeof BLESSURE_RECO> = {
  A: 'abandon',
  R: 'rejet',
  E: 'humiliation',
  T: 'trahison',
  I: 'injustice',
};

export default function BlessuresClient() {
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

  const recoKey = dominantKeys.length > 0 ? WOUND_TO_RECO_KEY[dominantKeys[0]] : null;
  const reco = recoKey ? BLESSURE_RECO[recoKey] : null;
  const primaryGuide = reco ? (GUIDES[reco.primaryGuideId as GuideId] ?? null) : null;
  const tome2Guide = reco ? (GUIDES[reco.tome2GuideId as GuideId] ?? null) : null;
  const woundCompletePack = reco ? (BUNDLES.find(b => b.id === reco.completePack) ?? null) : null;
  const recoPack = reco ? (BUNDLES.find(b => b.id === reco.packId) ?? null) : null;
  const recoGuides = reco
    ? [...reco.guideIds].map(id => GUIDES[id as GuideId]).filter((g): g is NonNullable<typeof g> => g !== undefined)
    : [];

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
            Mini-guide gratuit · PerfectMatch · EvaTalk
          </div>
          <h1 style={{
            fontFamily: 'Fraunces, serif',
            fontSize: 'clamp(2rem,5vw,3rem)',
            fontWeight: 400,
            lineHeight: 1.15,
            marginBottom: '1.25rem',
          }}>
            Tes blessures<br /><em style={{ color: '#C9A24B' }}>intérieures</em>
          </h1>
          <p style={{ fontSize: '.95rem', color: '#A9A3B8', lineHeight: 1.7, marginBottom: '2rem', maxWidth: 520, margin: '0 auto 2rem' }}>
            Le mini-guide gratuit pour identifier ta blessure dominante — et faire le premier pas.
          </p>
          <a
            href="/mini-guide-blessures-interieures.pdf"
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
            Télécharger le guide gratuit (PDF)
          </a>
          <p style={{ marginTop: 12, fontSize: 11, opacity: 0.4, letterSpacing: '.05em' }}>
            Gratuit · 7 pages · par EvaTalk
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
              Avant tout
            </span>
          </div>
          <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(1.4rem,3vw,1.9rem)', fontWeight: 400, marginBottom: '1.25rem', lineHeight: 1.25 }}>
            Ce qui te fait réagir aujourd&apos;hui a souvent une racine ancienne
          </h2>
          <p style={{ fontSize: '.93rem', color: '#A9A3B8', lineHeight: 1.75, marginBottom: '1rem' }}>
            La plupart de nos réactions douloureuses — la peur d&apos;être quitté·e, le sentiment de ne pas être à la hauteur, la colère de ne pas être vu·e — ne viennent pas de nulle part. Elles prennent racine dans des <strong style={{ color: '#F5EFE3' }}>blessures intérieures</strong> formées tôt : abandon, rejet, trahison, injustice, manque d&apos;estime.
          </p>
          <p style={{ fontSize: '.93rem', color: '#A9A3B8', lineHeight: 1.75, marginBottom: '1.5rem' }}>
            La bonne nouvelle : une blessure n&apos;est pas une fatalité. Comprise et travaillée — avec la psychologie — elle peut se <strong style={{ color: '#F5EFE3' }}>transformer</strong>. Ce mini-guide t&apos;aide à repérer ta blessure dominante et à savoir par où commencer.
          </p>
          <div style={{
            padding: '18px 22px',
            borderLeft: '3px solid #C9A24B',
            background: 'rgba(201,162,75,0.06)',
            fontSize: '.87rem',
            color: '#C9A24B',
            lineHeight: 1.6,
          }}>
            <strong>Comment l&apos;utiliser</strong><br />
            <span style={{ color: '#A9A3B8' }}>Lis les 5 blessures, fais le mini-test ci-dessous, puis va voir ton point de départ. Sans jugement, à ton rythme.</span>
          </div>
        </div>
      </section>

      {/* Les 5 blessures */}
      <section className={styles.section} style={{ paddingTop: 0 }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{
            display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 28,
            borderBottom: '1px solid var(--line)', paddingBottom: 14,
          }}>
            <span style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontSize: 13, color: '#C9A24B' }}>Étape 1</span>
            <span style={{ fontSize: 11, letterSpacing: '.3em', textTransform: 'uppercase', color: '#C9A24B', opacity: .85 }}>
              Les 5 blessures intérieures
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
            <span style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontSize: 13, color: '#C9A24B' }}>Étape 2</span>
            <span style={{ fontSize: 11, letterSpacing: '.3em', textTransform: 'uppercase', color: '#C9A24B', opacity: .85 }}>
              Le mini-test
            </span>
          </div>
          <p style={{ fontSize: '.9rem', color: '#A9A3B8', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            Coche les phrases qui résonnent le plus. Le groupe où tu coches le plus = ta blessure dominante (on en a souvent une ou deux).
          </p>

          <div style={{
            padding: '28px',
            border: '1px solid rgba(201,162,75,0.3)',
            background: 'rgba(201,162,75,0.04)',
          }}>
            <p style={{ fontSize: '.75rem', letterSpacing: '.1em', textTransform: 'uppercase', color: '#C9A24B', marginBottom: '1.5rem', fontWeight: 700 }}>
              Coche ce qui te parle
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
              Ta blessure dominante :{' '}
              {dominantKeys.length > 0 ? (
                <span style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontSize: '1.1rem' }}>
                  {dominantKeys.join(' & ')} — {WOUNDS.filter(w => dominantKeys.includes(w.key)).map(w => w.label.split(' ')[0]).join(' & ')}
                </span>
              ) : (
                <span style={{ opacity: .5, fontWeight: 400, fontSize: '.85rem' }}>(la lettre où tu as le plus coché)</span>
              )}
            </div>
          </div>
        </div>
      </section>

      {reco ? (
        <>
          {/* A — Héros résultat */}
          <section className={styles.section} style={{ paddingTop: 0 }}>
            <div style={{ maxWidth: 680, margin: '0 auto' }}>
              <div style={{ padding: '28px 32px', border: '1px solid rgba(201,162,75,0.4)', background: 'rgba(201,162,75,0.06)' }}>
                <div style={{ fontSize: 11, letterSpacing: '.25em', textTransform: 'uppercase', color: '#C9A24B', opacity: .8, marginBottom: 10 }}>
                  Ta blessure dominante
                </div>
                <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(1.5rem,3.5vw,2rem)', fontWeight: 400, lineHeight: 1.2, marginBottom: '.75rem', color: '#F5EFE3' }}>
                  {reco.label}
                </h2>
                <p style={{ fontSize: '.93rem', color: '#C5BFD4', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                  {reco.intro}
                </p>
                <div style={{ borderTop: '1px solid rgba(201,162,75,0.2)', paddingTop: '1rem' }}>
                  <p style={{ fontSize: '.75rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: '#C9A24B', marginBottom: '.6rem' }}>
                    Tu te reconnais ?
                  </p>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {[...reco.signs].map((sign, i) => (
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

          {/* B — Guide héros */}
          {primaryGuide && (
            <section className={styles.section} style={{ paddingTop: 0 }}>
              <div style={{ maxWidth: 680, margin: '0 auto' }}>
                <p style={{ fontSize: '.75rem', letterSpacing: '.12em', textTransform: 'uppercase', color: '#C9A24B', fontWeight: 700, marginBottom: '.75rem' }}>
                  Le guide fait pour ta blessure
                </p>
                <div style={{ padding: '28px', border: '1px solid rgba(201,162,75,0.55)', background: 'rgba(201,162,75,0.08)', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ fontSize: 10, letterSpacing: '.15em', textTransform: 'uppercase', color: '#C9A24B', opacity: 0.7 }}>
                    {GUIDE_PROMO.active ? (
                      <>Guide PDF · <s style={{ opacity: 0.5 }}>19 €</s>{' '}<span style={{ fontWeight: 700 }}>{(discountedCents(1900) / 100).toFixed(2).replace('.', ',')} €</span>{' '}<span style={{ background: 'rgba(201,162,75,0.2)', padding: '1px 4px', borderRadius: 2, textTransform: 'none' as const, letterSpacing: 0 }}>-30%</span></>
                    ) : 'Guide PDF · 19 €'}
                  </div>
                  <h3 style={{ fontFamily: 'Fraunces, serif', fontWeight: 400, fontSize: 'clamp(1.05rem,2.5vw,1.25rem)', lineHeight: 1.25, margin: 0, color: '#F5EFE3' }}>
                    {primaryGuide.name}
                  </h3>
                  <p style={{ fontSize: '.87rem', opacity: 0.65, lineHeight: 1.65, margin: 0 }}>{primaryGuide.blurb}</p>
                  <GuideBuyButton guideId={primaryGuide.id} label={`Commencer à guérir ma blessure de ${reco.label} →`} />
                  <p style={{ fontSize: '.75rem', color: '#A9A3B8', textAlign: 'center', margin: 0 }}>
                    Téléchargement immédiat · méthode des 4 approches · format guide-cahier
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* C — Filet email */}
          <LeadMagnet lang="fr" />

          {/* D — Pour aller plus loin */}
          {(tome2Guide || woundCompletePack || recoPack || recoGuides.length > 0) && (
            <section className={styles.section} style={{ paddingTop: 0 }}>
              <div style={{ maxWidth: 680, margin: '0 auto' }}>
                <p style={{ fontSize: '.75rem', letterSpacing: '.12em', textTransform: 'uppercase', color: '#8E7AB5', fontWeight: 700, marginBottom: '1.25rem', opacity: .8 }}>
                  Pour aller plus loin
                </p>
                {tome2Guide && (
                  <div style={{ marginBottom: '1.25rem' }}>
                    <p style={{ fontSize: '.73rem', letterSpacing: '.1em', textTransform: 'uppercase', color: '#8E7AB5', marginBottom: '.6rem', fontWeight: 700 }}>Tome 2</p>
                    <div style={{ padding: '20px 22px', border: '1px solid rgba(142,122,181,0.35)', background: 'rgba(142,122,181,0.05)', display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <div style={{ fontSize: 10, letterSpacing: '.15em', textTransform: 'uppercase', color: '#8E7AB5', opacity: 0.8 }}>
                        {GUIDE_PROMO.active ? (
                          <>Guide PDF · <s style={{ opacity: 0.5 }}>19 €</s>{' '}<span style={{ fontWeight: 700, color: '#C9A24B' }}>{(discountedCents(1900) / 100).toFixed(2).replace('.', ',')} €</span>{' '}<span style={{ background: 'rgba(201,162,75,0.2)', color: '#C9A24B', padding: '1px 4px', borderRadius: 2, textTransform: 'none' as const, letterSpacing: 0 }}>-30%</span></>
                        ) : 'Guide PDF · 19 €'}
                      </div>
                      <h4 style={{ fontFamily: 'Fraunces, serif', fontWeight: 400, fontSize: '1rem', lineHeight: 1.25, margin: 0, color: '#F5EFE3' }}>{tome2Guide.name}</h4>
                      <p style={{ fontSize: '.83rem', opacity: 0.55, lineHeight: 1.6, margin: 0 }}>{tome2Guide.blurb}</p>
                      <GuideBuyButton guideId={tome2Guide.id} />
                    </div>
                  </div>
                )}
                {woundCompletePack && (
                  <div style={{ marginBottom: '1.25rem' }}>
                    <p style={{ fontSize: '.73rem', letterSpacing: '.1em', textTransform: 'uppercase', color: '#8E7AB5', marginBottom: '.6rem', fontWeight: 700 }}>Les deux tomes ensemble</p>
                    <div style={{ padding: '20px 22px', border: '1px solid rgba(201,162,75,0.35)', background: 'rgba(201,162,75,0.06)', display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <div style={{ fontSize: 10, letterSpacing: '.15em', textTransform: 'uppercase', color: '#C9A24B', opacity: 0.7 }}>Pack · 2 guides</div>
                      <h4 style={{ fontFamily: 'Fraunces, serif', fontWeight: 400, fontSize: '1rem', lineHeight: 1.25, margin: 0, color: '#F5EFE3' }}>{woundCompletePack.title}</h4>
                      <div>
                        <span style={{ fontSize: 12, opacity: 0.4, textDecoration: 'line-through', marginRight: 8 }}>{woundCompletePack.compareAtCents / 100} €</span>
                        <span style={{ fontSize: 16, fontWeight: 700, color: '#C9A24B' }}>{woundCompletePack.priceCents / 100} €</span>
                      </div>
                      <BundleBuyButton bundleId={woundCompletePack.id} label={`Acheter le pack — ${woundCompletePack.priceCents / 100} €`} />
                    </div>
                  </div>
                )}
                {recoPack && (
                  <div style={{ marginBottom: '1.25rem' }}>
                    <p style={{ fontSize: '.73rem', letterSpacing: '.1em', textTransform: 'uppercase', color: '#8E7AB5', marginBottom: '.6rem', fontWeight: 700 }}>Tu as plusieurs blessures ? Le pack complet</p>
                    <div style={{ padding: '20px 22px', border: '1px solid rgba(201,162,75,0.25)', background: 'rgba(201,162,75,0.04)', display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <div style={{ fontSize: 10, letterSpacing: '.15em', textTransform: 'uppercase', color: '#C9A24B', opacity: 0.7 }}>Pack · 10 guides</div>
                      <h4 style={{ fontFamily: 'Fraunces, serif', fontWeight: 400, fontSize: '1rem', lineHeight: 1.25, margin: 0, color: '#F5EFE3' }}>{recoPack.title}</h4>
                      <div>
                        <span style={{ fontSize: 12, opacity: 0.4, textDecoration: 'line-through', marginRight: 8 }}>{recoPack.compareAtCents / 100} €</span>
                        <span style={{ fontSize: 16, fontWeight: 700, color: '#C9A24B' }}>{recoPack.priceCents / 100} €</span>
                      </div>
                      <BundleBuyButton bundleId={recoPack.id} label={`Acheter le pack — ${recoPack.priceCents / 100} €`} />
                    </div>
                  </div>
                )}
                {recoGuides.length > 0 && (
                  <div>
                    <p style={{ fontSize: '.73rem', letterSpacing: '.1em', textTransform: 'uppercase', color: '#8E7AB5', marginBottom: '.6rem', fontWeight: 700 }}>Guides associés</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {recoGuides.map((g) => (
                        <a key={g.id} href={`/guides/${g.id}`} style={{
                          display: 'inline-flex', flexDirection: 'column', gap: 4,
                          padding: '10px 14px',
                          border: '1px solid rgba(142,122,181,0.25)',
                          background: 'rgba(142,122,181,0.04)',
                          color: '#F5EFE3',
                          textDecoration: 'none',
                          fontSize: '.82rem',
                          lineHeight: 1.3,
                          flex: '1 1 160px',
                          minWidth: 160,
                        }}>
                          <span style={{ fontWeight: 600 }}>{g.name}</span>
                          <span style={{ fontSize: '.75rem', color: '#8E7AB5', opacity: 0.8 }}>
                            {GUIDE_PROMO.active ? (
                              <><s style={{ opacity: 0.6 }}>19 €</s>{' '}<span style={{ color: '#C9A24B', fontWeight: 700 }}>{(discountedCents(1900) / 100).toFixed(2).replace('.', ',')} €</span>{' '}<span style={{ background: 'rgba(201,162,75,0.18)', color: '#C9A24B', padding: '1px 3px', borderRadius: 2, fontSize: '.85em', fontWeight: 700 }}>-30%</span>{' '}· Découvrir →</>
                            ) : '19 € · Découvrir →'}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}
        </>
      ) : (
        <LeadMagnet lang="fr" />
      )}

      {/* Ton point de départ */}
      <section className={styles.section} style={{ paddingTop: 0 }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{
            display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 28,
            borderBottom: '1px solid var(--line)', paddingBottom: 14,
          }}>
            <span style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontSize: 13, color: '#C9A24B' }}>Étape 3</span>
            <span style={{ fontSize: 11, letterSpacing: '.3em', textTransform: 'uppercase', color: '#C9A24B', opacity: .85 }}>
              Ton point de départ
            </span>
          </div>
          <p style={{ fontSize: '.9rem', color: '#A9A3B8', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            Selon ta blessure dominante, voici les guides par où commencer :
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

            {/* Et pour tout le monde */}
            <div style={{
              padding: '20px 24px',
              border: '1px solid rgba(142,122,181,0.3)',
              background: 'rgba(142,122,181,0.06)',
            }}>
              <p style={{ fontSize: '.82rem', fontWeight: 700, letterSpacing: '.05em', color: '#8E7AB5', marginBottom: '.6rem' }}>
                Et pour tout le monde
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
                  Anxiété & pensées négatives →
                </a>
              </div>
              <p style={{ fontSize: '.8rem', color: '#A9A3B8', marginTop: '.6rem', opacity: .7 }}>
                Pour apaiser le mental pendant que tu travailles la racine.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* La méthode */}
      <section className={styles.section} style={{ paddingTop: 0 }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{
            display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 28,
            borderBottom: '1px solid var(--line)', paddingBottom: 14,
          }}>
            <span style={{ fontSize: 11, letterSpacing: '.3em', textTransform: 'uppercase', color: '#C9A24B', opacity: .85 }}>
              La méthode
            </span>
          </div>
          <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(1.4rem,3vw,1.9rem)', fontWeight: 400, marginBottom: '1.25rem', lineHeight: 1.25 }}>
            Comment on transforme une blessure
          </h2>
          <p style={{ fontSize: '.9rem', color: '#A9A3B8', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            Chaque guide travaille ta blessure sous <strong style={{ color: '#F5EFE3' }}>4 angles complémentaires</strong> :
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { n: '1', name: 'Psychodynamique', desc: 'comprendre la racine de la blessure.' },
              { n: '2', name: 'TCC', desc: 'repérer et apaiser les pensées et schémas négatifs.' },
              { n: '3', name: 'Humaniste', desc: 'te réconcilier avec toi, avec douceur.' },
              { n: '4', name: 'Systémique', desc: 'agir sur ton environnement et tes relations.' },
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
              Chaque guide · 19€
            </p>
            <p style={{ fontSize: '.87rem', color: '#A9A3B8', lineHeight: 1.6 }}>
              4 approches de la psychologie + des exercices guidés + un cahier de 11 pages à remplir. Résultat immédiat, à ton rythme.
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
          « Tes blessures ne te définissent pas. Comprises, elles deviennent ta force. »
        </p>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 16 }}>
          <a
            href="/mini-guide-blessures-interieures.pdf"
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
            Télécharger le guide gratuit
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
            Voir tous les guides
          </a>
        </div>
        <p style={{ fontSize: 11, opacity: .35, letterSpacing: '.04em' }}>
          Mini-guide de psychoéducation offert — pas un substitut à une thérapie.<br />
          Si tu traverses une période difficile : Suisse 143 · France 3114 · Belgique 0800 32 123
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
