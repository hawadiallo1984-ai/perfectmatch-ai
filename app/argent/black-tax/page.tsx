import type { Metadata } from 'next';
import styles from '@/app/page.module.css';
import BuyButton from './BuyButton';

export const metadata: Metadata = {
  title: 'Guide Black Tax — 4 approches | EvaTalk',
  description:
    'Comprendre et transformer la Black Tax : un guide PDF de 4 approches TCC pour nommer ce que tu portes, sans honte. Par EvaTalk.',
};

export default function BlackTaxPage() {
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
          <a href="/argent" className={styles.navCta}>Argent &amp; business</a>
        </div>
      </nav>

      {/* Bouton d'achat en vedette */}
      <section style={{ paddingTop: 80, paddingBottom: 0, textAlign: 'center' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 24px 48px' }}>
          <div style={{
            display: 'inline-block',
            fontFamily: 'Fraunces, serif',
            fontStyle: 'italic',
            fontSize: 13,
            color: 'var(--gold)',
            letterSpacing: '0.12em',
            marginBottom: 20,
            opacity: 0.9,
          }}>
            ✦ Disponible maintenant
          </div>
          <BuyButton />
          <p style={{ marginTop: 14, fontSize: 12, opacity: 0.45, letterSpacing: '0.05em' }}>
            Paiement sécurisé · PDF envoyé par email · 14,00 €
          </p>
        </div>
      </section>

      {/* Header */}
      <section className={styles.section} style={{ paddingTop: 20 }}>
        <div className={styles.offersHeader}>
          <div className={styles.sectionLabel} style={{ justifyContent: 'center' }}>
            Guide PDF · Black Tax
          </div>
          <h1 className={`${styles.sectionTitle} reveal`} style={{ textAlign: 'center', margin: '0 auto 28px' }}>
            Black Tax —<br />
            <em>4 approches</em>
          </h1>
          <p className={`${styles.sectionLead} reveal`} style={{ textAlign: 'center', margin: '0 auto 20px', maxWidth: 560 }}>
            La Black Tax, c&apos;est cet argent que tu donnes à la famille, cette charge invisible que tu portes seul·e.
            Ce guide te donne 4 approches TCC concrètes pour la nommer, la gérer, et te protéger — sans culpabilité.
          </p>
          <p className={`${styles.sectionLead} reveal`} style={{
            textAlign: 'center', margin: '0 auto',
            fontSize: 13, opacity: 0.55, maxWidth: 480,
          }}>
            Accompagnement mindset et bien-être, pas un conseil financier.
          </p>
        </div>
      </section>

      {/* Ce que contient le guide */}
      <section className={styles.section} style={{ paddingTop: 0 }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{
            display: 'flex', alignItems: 'baseline', gap: 20, marginBottom: 36,
            borderBottom: '1px solid var(--line)', paddingBottom: 16,
          }}>
            <span style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontSize: 18, color: 'var(--gold)' }}>✦</span>
            <span style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', opacity: 0.85 }}>
              Au programme
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {[
              {
                n: '01',
                title: 'Nommer sans honte',
                desc: 'Comprendre d\'où vient la Black Tax et pourquoi tu en portes autant sans jamais l\'avoir choisie.',
              },
              {
                n: '02',
                title: 'Restructuration cognitive',
                desc: 'Identifier les croyances automatiques qui t\'empêchent de poser des limites — et les reformuler.',
              },
              {
                n: '03',
                title: 'Communiquer clairement',
                desc: 'Des scripts TCC pour parler d\'argent avec ta famille sans déclencher de crise ou de culpabilité.',
              },
              {
                n: '04',
                title: 'Protéger ta stabilité',
                desc: 'Construire un cadre soutenable : ce que tu peux donner sans te vider — et le tenir dans le temps.',
              },
            ].map((item) => (
              <div key={item.n} style={{
                padding: '28px 28px 24px',
                border: '1px solid var(--line)',
                background: 'rgba(28,24,51,0.4)',
              }}>
                <div style={{
                  fontFamily: 'Fraunces, serif', fontStyle: 'italic',
                  fontSize: 32, color: 'var(--gold)', opacity: 0.4,
                  lineHeight: 1, marginBottom: 12,
                }}>
                  {item.n}
                </div>
                <h3 style={{
                  fontFamily: 'Fraunces, serif', fontSize: 20, fontWeight: 400,
                  marginBottom: 10, lineHeight: 1.2,
                }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: 14, opacity: 0.7, lineHeight: 1.65, fontWeight: 300 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA bas de page */}
      <section style={{ textAlign: 'center', padding: 'clamp(40px, 8vw, 80px) 24px' }}>
        <p style={{
          fontFamily: 'Fraunces, serif', fontStyle: 'italic',
          fontSize: 20, color: 'var(--gold-soft)', marginBottom: 32, lineHeight: 1.4,
        }}>
          « Tu mérites de vivre bien, sans te sacrifier pour y arriver. »
        </p>
        <BuyButton />
        <p style={{ marginTop: 16, fontSize: 12, opacity: 0.4, letterSpacing: '0.04em' }}>
          PDF livré par email · 14,00 € TTC · par EvaTalk
        </p>
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
