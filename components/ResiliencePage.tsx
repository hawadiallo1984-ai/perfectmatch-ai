'use client';

import { useEffect } from 'react';
import { BUNDLES } from '@/lib/bundles';
import BundleBuyButton from '@/components/BundleBuyButton';
import SiteNav from '@/components/SiteNav';
import styles from '@/app/page.module.css';

const PACK = BUNDLES.find((b) => b.id === 'pack-identite-resilience')!;
const PACK_RELATIONS = BUNDLES.find((b) => b.id === 'pack-relations-plurielles');

const RELATIONS_PLURIELLES_GUIDES = [
  { id: 'vivre-la-polygamie', title: 'Vivre la polygamie', desc: "Polygamie traditionnelle ou non-monogamie choisie : estime de soi, jalousie, identité, limites.", href: '/guides/vivre-la-polygamie' },
  { id: 'coepouses-apaiser-rivalites', title: 'Coépouses : apaiser les rivalités', desc: "Sortir de la guerre entre coépouses et protéger ta paix.", href: '/guides/coepouses-apaiser-rivalites' },
  { id: 'partager-lepoux', title: "Partager l'époux", desc: "Faire la paix avec le partage ou clarifier ce que tu veux vraiment.", href: '/guides/partager-lepoux' },
  { id: 'enfants-dans-la-polygamie', title: 'Les enfants dans la polygamie', desc: "Protéger tes enfants — et toi — dans une famille plurielle.", href: '/guides/enfants-dans-la-polygamie' },
  { id: 'quand-lepoux-en-prefere-une-autre', title: "Quand l'époux en préfère une autre", desc: "Quand tu te sens mise de côté : préserver ta valeur intacte.", href: '/guides/quand-lepoux-en-prefere-une-autre' },
  { id: 'te-sentir-desirable', title: 'Te sentir désirable et vivante', desc: "Te réapproprier ton corps et ta lumière — pour toi.", href: '/guides/te-sentir-desirable' },
  { id: 'inegalites-et-tensions', title: 'Inégalités et tensions : poser un cadre juste', desc: "Repérer ce qui est juste, désamorcer les tensions.", href: '/guides/inegalites-et-tensions' },
];

const FEATURED_GUIDES = [
  { id: 'se-reconstruire-face-negrophobie', title: 'Se reconstruire face à la négrophobie', href: '/guides/se-reconstruire-face-negrophobie' },
  { id: 'se-liberer-misogynoir', title: 'Se libérer de la misogynoir', href: '/guides/se-liberer-misogynoir' },
  { id: 'preserver-sante-mentale-racisme', title: 'Préserver sa santé mentale face au racisme', href: '/guides/preserver-sante-mentale-racisme' },
];

const GUIDES = [
  {
    id: 'misogynoir',
    title: 'Misogynoir',
    desc: 'Déconstruire et traverser la haine croisée du genre et de la race.',
    href: '/guides/misogynoir',
  },
  {
    id: 'charge-raciale',
    title: 'Charge raciale',
    desc: 'Alléger le poids mental du racisme chronique au quotidien.',
    href: '/guides/charge-raciale',
  },
  {
    id: 'racisme-au-quotidien',
    title: 'Racisme au quotidien',
    desc: "Des outils TCC pour répondre aux microagressions sans t'épuiser.",
    href: '/guides/racisme-au-quotidien',
  },
  {
    id: 'colorisme',
    title: 'Colorisme',
    desc: 'Guérir les blessures liées à la teinte de peau, dedans et dehors.',
    href: '/guides/colorisme',
  },
  {
    id: 'dating-femme-noire',
    title: 'Dating femme noire',
    desc: 'Naviguer le dating sans effacer qui tu es.',
    href: '/guides/dating-femme-noire',
  },
  {
    id: 'parentalite-noire',
    title: 'Parentalité noire',
    desc: 'Élever ses enfants avec fierté dans un monde qui les questionne.',
    href: '/guides/parentalite-noire',
  },
  {
    id: 'syndrome-imposteur',
    title: "Syndrome de l'imposteur",
    desc: 'Déconstruire la voix intérieure qui doute de ta légitimité.',
    href: '/guides/syndrome-imposteur',
  },
  {
    id: 'foi-identite-bien-etre',
    title: 'Foi, identité & bien-être',
    desc: 'Réconcilier spiritualité, culture et santé mentale.',
    href: '/guides/foi-identite-bien-etre',
  },
  {
    id: 'identite-metisse',
    title: 'Identité métisse',
    desc: 'Habiter pleinement une identité plurielle sans la choisir entre deux.',
    href: '/guides/identite-metisse',
  },
  {
    id: 'couple-noir',
    title: 'Couple noir face au monde',
    desc: 'Protéger et nourrir ton couple dans un environnement qui le questionne.',
    href: '/guides/couple-noir',
  },
];

export default function ResiliencePage() {
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
            Résilience & bien-être
          </div>
          <h1 className={`${styles.sectionTitle} reveal`} style={{ textAlign: 'center', margin: '0 auto 28px' }}>
            Racisme & misogynoir : <em>protéger ta santé mentale</em>
          </h1>
          <p className={`${styles.sectionLead} reveal`} style={{ textAlign: 'center', margin: '0 auto 16px' }}>
            Ici, des outils issus de la TCC culturellement adaptés pour valider ton vécu,
            protéger ta santé mentale et reprendre ton pouvoir.
          </p>
        </div>
      </section>

      {/* Pack Identité & Résilience */}
      <section className={styles.section} style={{ paddingTop: 0 }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>
          <div style={{
            padding: '28px 32px',
            border: '1px solid rgba(201,162,75,0.35)',
            background: 'rgba(201,162,75,0.05)',
            marginBottom: 32,
          }}>
            <div style={{ fontSize: 10, letterSpacing: '.15em', textTransform: 'uppercase', color: '#C9A24B', opacity: 0.8, marginBottom: 8 }}>
              Pack · 4 guides
            </div>
            <h2 style={{ fontFamily: 'Fraunces, serif', fontWeight: 400, fontSize: 'clamp(1.1rem,2.5vw,1.4rem)', lineHeight: 1.25, marginBottom: '.5rem', color: '#F5EFE3' }}>
              {PACK.title}
            </h2>
            <p style={{ fontSize: '.87rem', opacity: 0.6, lineHeight: 1.6, marginBottom: '1rem' }}>{PACK.blurb}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1rem' }}>
              <span style={{ fontSize: 13, opacity: 0.4, textDecoration: 'line-through' }}>{PACK.compareAtCents / 100} €</span>
              <span style={{ fontSize: 20, fontWeight: 700, color: '#C9A24B' }}>{PACK.priceCents / 100} €</span>
            </div>
            <BundleBuyButton bundleId={PACK.id} label={`Acheter le pack — ${PACK.priceCents / 100} €`} />
          </div>

          <p style={{ fontSize: '.75rem', letterSpacing: '.12em', textTransform: 'uppercase', color: '#C9A24B', opacity: .8, marginBottom: 16 }}>
            3 guides phares
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px,1fr))', gap: 12, marginBottom: 12 }}>
            {FEATURED_GUIDES.map((g) => (
              <a key={g.id} href={g.href} style={{
                display: 'block', padding: '16px 18px',
                border: '1px solid var(--line)',
                background: 'rgba(28,24,51,0.4)',
                color: '#F5EFE3', textDecoration: 'none',
                fontSize: '.87rem', lineHeight: 1.4,
              }}>
                {g.title} <span style={{ color: '#C9A24B', fontSize: '.8rem' }}>→</span>
              </a>
            ))}
          </div>
          <a href="/bibliotheque#resilience" style={{ fontSize: '.82rem', color: '#8E7AB5', textDecoration: 'none' }}>
            Voir tous les guides Identité &amp; Résilience →
          </a>
        </div>
      </section>

      {/* Cartes guides */}
      <section className={`${styles.section} ${styles.offersSection}`}>
        <div
          className={styles.offersGrid}
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}
        >
          {GUIDES.map((guide) => (
            <div key={guide.id} className={`${styles.offer} reveal`}>
              <div className={styles.offerCategory}>Guide PDF · 19 €</div>
              <h3 className={styles.offerName}>{guide.title}</h3>
              <p className={styles.offerDesc}>{guide.desc}</p>
              <div style={{ marginTop: 'auto' }}>
                <a
                  href={guide.href}
                  className={styles.offerCta}
                  style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}
                >
                  Acheter — 19€ →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Relations plurielles */}
      <section className={styles.section} style={{ paddingTop: 0 }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>
          <p style={{ fontSize: '.75rem', letterSpacing: '.12em', textTransform: 'uppercase', color: '#C9A24B', opacity: .8, marginBottom: 8 }}>
            Relations plurielles
          </p>
          <h2 style={{ fontFamily: 'Fraunces, serif', fontWeight: 400, fontSize: 'clamp(1.1rem,2.5vw,1.4rem)', lineHeight: 1.25, marginBottom: '.5rem', color: '#F5EFE3' }}>
            Polygamie & vie à plusieurs
          </h2>
          <p style={{ fontSize: '.87rem', opacity: 0.55, lineHeight: 1.6, marginBottom: 24 }}>
            Ces guides demandent beaucoup d&apos;estime de soi et de résilience — ils trouvent naturellement leur place ici.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px,1fr))', gap: 12, marginBottom: 24 }}>
            {RELATIONS_PLURIELLES_GUIDES.map((g) => (
              <a key={g.id} href={g.href} style={{
                display: 'block', padding: '16px 18px',
                border: '1px solid var(--line)',
                background: 'rgba(28,24,51,0.4)',
                color: '#F5EFE3', textDecoration: 'none',
                fontSize: '.87rem', lineHeight: 1.4,
              }}>
                <strong style={{ display: 'block', marginBottom: 4 }}>{g.title}</strong>
                <span style={{ opacity: 0.6, fontSize: '.82rem' }}>{g.desc}</span>
                <span style={{ color: '#C9A24B', fontSize: '.8rem', display: 'block', marginTop: 6 }}>→</span>
              </a>
            ))}
          </div>
          {PACK_RELATIONS && (
            <div style={{ padding: '20px 24px', border: '1px solid rgba(201,162,75,0.35)', background: 'rgba(201,162,75,0.05)' }}>
              <div style={{ fontSize: 10, letterSpacing: '.15em', textTransform: 'uppercase', color: '#C9A24B', marginBottom: 6 }}>Pack collection complète</div>
              <p style={{ fontWeight: 600, marginBottom: 4, color: '#F5EFE3' }}>{PACK_RELATIONS.title}</p>
              <p style={{ fontSize: '.83rem', opacity: 0.6, lineHeight: 1.6, marginBottom: 10 }}>{PACK_RELATIONS.blurb}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <span style={{ fontSize: 13, opacity: 0.4, textDecoration: 'line-through' }}>{PACK_RELATIONS.compareAtCents / 100} €</span>
                <span style={{ fontSize: 18, fontWeight: 700, color: '#C9A24B' }}>{PACK_RELATIONS.priceCents / 100} €</span>
              </div>
              <BundleBuyButton bundleId={PACK_RELATIONS.id} label={`Acheter le pack — ${PACK_RELATIONS.priceCents / 100} €`} />
            </div>
          )}
        </div>
      </section>

      {/* Footer minimal */}
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
