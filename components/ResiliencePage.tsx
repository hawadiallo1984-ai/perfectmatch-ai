'use client';

import { useEffect } from 'react';
import SiteNav from '@/components/SiteNav';
import styles from '@/app/page.module.css';

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
