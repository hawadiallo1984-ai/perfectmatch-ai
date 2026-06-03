'use client';

import { useEffect } from 'react';
import SiteNav from '@/components/SiteNav';
import styles from '@/app/page.module.css';

const SECTIONS = [
  {
    id: 'amour-relations',
    label: 'Amour & Relations',
    guides: [
      {
        id: 'styles-attachement',
        title: "Styles d'attachement",
        desc: 'Comprends ton schéma relationnel pour choisir et aimer autrement.',
        href: '/guides/styles-attachement',
      },
      {
        id: 'guerir-rupture',
        title: "Guérir d'une rupture",
        desc: 'Traverser le deuil amoureux et reconstruire sans se perdre.',
        href: '/guides/guerir-rupture',
      },
      {
        id: 'gestion-celibat',
        title: 'Bien vivre son célibat',
        desc: "Faire du célibat un espace de croissance, pas d'attente.",
        href: '/guides/gestion-celibat',
      },
      {
        id: 'couples-mixtes',
        title: 'Couples mixtes & interculturels',
        desc: 'Naviguer les différences culturelles pour construire ensemble.',
        href: '/guides/couples-mixtes',
      },
      {
        id: 'couple-noir',
        title: 'Couple noir face au monde',
        desc: 'Protéger et nourrir ton couple dans un environnement qui le questionne.',
        href: '/guides/couple-noir',
      },
    ],
  },
  {
    id: 'bien-etre-soi',
    label: 'Bien-être & Soi',
    guides: [
      {
        id: 'confiance-estime-de-soi',
        title: 'Confiance & estime de soi',
        desc: 'Reconstruire une image de toi solide, loin du regard des autres.',
        href: '/guides/confiance-estime-de-soi',
      },
      {
        id: 'anxiete-pensees-negatives',
        title: 'Anxiété & pensées négatives',
        desc: 'Des outils TCC pour désamorcer les spirales mentales.',
        href: '/guides/anxiete-pensees-negatives',
      },
      {
        id: 'gestion-solitude',
        title: 'Apprivoiser la solitude',
        desc: "Transformer la solitude en ressource plutôt qu'en souffrance.",
        href: '/guides/gestion-solitude',
      },
      {
        id: 'identite-metisse',
        title: 'Identité métisse',
        desc: 'Habiter pleinement une identité plurielle sans la choisir entre deux.',
        href: '/guides/identite-metisse',
      },
    ],
  },
  {
    id: 'sexualite',
    label: 'Sexualité',
    guides: [
      {
        id: 'se-reapproprier-sexualite',
        title: 'Se réapproprier sa sexualité',
        desc: 'Dénouer la honte et retrouver un rapport libre à ton corps.',
        href: '/guides/se-reapproprier-sexualite',
      },
      {
        id: 'desir-intimite',
        title: 'Désir & intimité',
        desc: "Raviver le lien et l'élan, sans pression ni performance.",
        href: '/guides/desir-intimite',
      },
      {
        id: 'sexualite-image-corps',
        title: 'Sexualité & image du corps',
        desc: 'Habiter ton corps sans le juger, ni le comparer.',
        href: '/guides/sexualite-image-corps',
      },
      {
        id: 'sexualite-black',
        title: 'Sexualité black',
        desc: 'Habiter ton désir, libre du regard racial et des tabous communautaires.',
        href: '/guides/sexualite-black',
      },
    ],
  },
  {
    id: 'argent',
    label: 'Argent',
    guides: [
      {
        id: 'black-tax',
        title: 'Black Tax',
        desc: 'Comprendre et poser des limites face au poids financier familial.',
        href: '/argent/black-tax',
      },
    ],
  },
];

export default function BibliothequeClient() {
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
            Bibliothèque
          </div>
          <h1 className={`${styles.sectionTitle} reveal`} style={{ textAlign: 'center', margin: '0 auto 28px' }}>
            14 guides, <em>un seul endroit</em>
          </h1>
          <p className={`${styles.sectionLead} reveal`} style={{ textAlign: 'center', margin: '0 auto 40px', maxWidth: 560 }}>
            Amour, bien-être, sexualité, argent — chaque guide est un espace de travail concret,
            ancré dans la réalité des personnes noires et métisses, avec des outils TCC actionnables.
          </p>
        </div>
      </section>

      {/* Sections thématiques */}
      {SECTIONS.map((section) => (
        <section key={section.id} className={styles.section} style={{ paddingTop: 0 }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
            <h2
              className={`${styles.sectionTitle} reveal`}
              style={{ fontSize: 'clamp(18px, 3vw, 24px)', marginBottom: 32, letterSpacing: '0.02em' }}
            >
              {section.label}
            </h2>
            <div
              className={styles.offersGrid}
              style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}
            >
              {section.guides.map((guide) => (
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
                      Découvrir →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Footer */}
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
