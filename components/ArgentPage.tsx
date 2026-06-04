'use client';

import { useEffect } from 'react';
import SiteNav from '@/components/SiteNav';
import styles from '@/app/page.module.css';

const GUIDES = [
  {
    id: 'black-tax',
    title: 'Black Tax',
    desc: "Soutenir sa famille sans s’oublier.",
    href: '/argent/black-tax',
  },
  {
    id: 'croyances-argent',
    title: "Croyances sur l’argent",
    desc: 'Désamorcer ce qui te bloque.',
    href: '/guides/croyances-argent',
  },
  {
    id: 'mentalite-abondance',
    title: "Mentalité d’abondance",
    desc: 'Apaiser la peur du manque.',
    href: '/guides/mentalite-abondance',
  },
  {
    id: 'honte-de-classe',
    title: 'Honte de classe',
    desc: "T’aimer d’où que tu viennes.",
    href: '/guides/honte-de-classe',
  },
  {
    id: 'oser-ta-valeur-tarifs',
    title: 'Oser ta valeur & tes tarifs',
    desc: 'Fixer un prix juste sans honte.',
    href: '/guides/oser-ta-valeur-tarifs',
  },
  {
    id: 'anxiete-financiere',
    title: 'Anxiété financière',
    desc: 'Apaiser la peur, agir pas à pas.',
    href: '/guides/anxiete-financiere',
  },
  {
    id: 'argent-couple',
    title: "L’argent dans le couple",
    desc: 'Confiance & équité.',
    href: '/guides/argent-couple',
  },
];

export default function ArgentPage() {
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
            Argent, business &amp; mental
          </div>
          <h1 className={`${styles.sectionTitle} reveal`} style={{ textAlign: 'center', margin: '0 auto 28px' }}>
            Ton rapport à l&apos;argent, <em>sans honte</em>
          </h1>
          <p className={`${styles.sectionLead} reveal`} style={{ textAlign: 'center', margin: '0 auto 16px' }}>
            Tes croyances sur l&apos;argent ont été façonnées par ton histoire, ta classe, ta couleur — elles ne sont pas une fatalité.
            Ici, des outils TCC pour les transformer.
          </p>
          <p className={`${styles.sectionLead} reveal`} style={{ textAlign: 'center', margin: '0 auto 16px', fontSize: 13, opacity: 0.6 }}>
            Accompagnement mindset et bien-être, pas un conseil financier.
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
