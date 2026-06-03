import type { Metadata } from 'next';
import styles from '@/app/page.module.css';

export const metadata: Metadata = {
  title: 'Sexualité & bien-être — TCC & psychoéducation | PerfectMatch',
  description:
    'Guides TCC de psychoéducation sexuelle pour adultes : réappropriation, désir, image du corps, sexualité black. Cadre coaching, sans contenu explicite. Par EvaTalk.',
};

const GUIDES = [
  {
    id: 'se-reapproprier-sexualite',
    title: 'Se réapproprier sa sexualité',
    emphasis: '4 approches',
    desc: 'Renouer avec ton désir, ton corps et ton plaisir — à ton propre rythme, sans honte.',
    href: '/guides/se-reapproprier-sexualite',
  },
  {
    id: 'desir-intimite',
    title: 'Désir & intimité',
    emphasis: '4 approches',
    desc: 'Comprendre les cycles du désir, lever les freins à l\'intimité et cultiver une connexion authentique, seul·e ou à deux.',
    href: '/guides/desir-intimite',
  },
  {
    id: 'sexualite-image-corps',
    title: 'Sexualité & image du corps',
    emphasis: '4 approches',
    desc: 'Déconstruire la honte corporelle et retrouver une présence apaisée dans l\'intimité.',
    href: '/guides/sexualite-image-corps',
  },
  {
    id: 'sexualite-black',
    title: 'Sexualité black',
    emphasis: '4 approches',
    desc: 'Habiter ton désir en terrain propre, libre du regard racial et des tabous communautaires.',
    href: '/guides/sexualite-black',
  },
];

export default function SexualitePage() {
  return (
    <div style={{ position: 'relative', zIndex: 2, minHeight: '100vh' }}>

      {/* Nav */}
      <nav className={styles.nav}>
        <a href="/" className={styles.logo} style={{ textDecoration: 'none' }}>
          <span className={styles.logoMark}></span>
          PerfectMatch
        </a>
        <div className={styles.navLinks}>
          <a href="/">Accueil</a>
          <a href="/resilience">Résilience</a>
          <a href="/argent">Argent</a>
          <a href="/sexualite" className={styles.navCta}>Sexualité</a>
        </div>
      </nav>

      {/* Header */}
      <section className={styles.section} style={{ textAlign: 'center', paddingBottom: 0 }}>
        <div className={styles.offersHeader}>
          <div className={styles.sectionLabel} style={{ justifyContent: 'center' }}>
            Sexualité &amp; bien-être
          </div>
          <h1 className={`${styles.sectionTitle} reveal`} style={{ textAlign: 'center', margin: '0 auto 28px' }}>
            Ton rapport à la sexualité, <em>sans honte</em>
          </h1>
          <p className={`${styles.sectionLead} reveal`} style={{ textAlign: 'center', margin: '0 auto 16px', maxWidth: 580 }}>
            La sexualité est un terrain chargé — par l&apos;éducation, la culture, le regard des autres, parfois les blessures.
            Ces guides t&apos;accompagnent avec des outils TCC concrets pour renouer avec ton désir, ton corps et ton intimité,
            à ton rythme.
          </p>
          <p className={`${styles.sectionLead} reveal`} style={{
            textAlign: 'center', margin: '0 auto 16px',
            fontSize: 13, opacity: 0.6, maxWidth: 520,
          }}>
            Bien-être sexuel &amp; psychoéducation pour adultes — cadre coaching, sans contenu explicite.
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
                  Découvrir ce guide →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Encadré cadrage */}
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
            Ces guides sont des outils de psychoéducation et de bien-être sexuel pour adultes.
            Ils s&apos;inscrivent dans un cadre de coaching et ne remplacent pas un suivi thérapeutique.
            Aucun contenu explicite.
          </p>
        </div>
      </section>

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
