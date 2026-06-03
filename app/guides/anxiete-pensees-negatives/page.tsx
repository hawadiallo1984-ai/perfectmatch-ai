import type { Metadata } from 'next';
import styles from '@/app/page.module.css';
import BuyButtonAnxiete from './BuyButtonAnxiete';

export const metadata: Metadata = {
  title: 'Guide Anxiété & pensées négatives — 4 approches TCC',
  description:
    'Apaiser le mental, les ruminations et les pensées négatives en auto-aide TCC : un guide PDF de 4 approches concrètes pour reprendre la main sur tes pensées automatiques.',
};

export default function AnxietePenseesNegativesPage() {
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
          <a href="/resilience" className={styles.navCta}>Résilience</a>
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
          <BuyButtonAnxiete />
          <p style={{ marginTop: 14, fontSize: 12, opacity: 0.45, letterSpacing: '0.05em' }}>
            Paiement sécurisé · PDF envoyé par email · 19,00 €
          </p>
        </div>
      </section>

      {/* Header */}
      <section className={styles.section} style={{ paddingTop: 20 }}>
        <div className={styles.offersHeader}>
          <div className={styles.sectionLabel} style={{ justifyContent: 'center' }}>
            Guide PDF · Anxiété &amp; pensées négatives
          </div>
          <h1 className={`${styles.sectionTitle} reveal`} style={{ textAlign: 'center', margin: '0 auto 28px' }}>
            Anxiété &amp; pensées négatives —<br />
            <em>4 approches</em>
          </h1>
          <p className={`${styles.sectionLead} reveal`} style={{ textAlign: 'center', margin: '0 auto 20px', maxWidth: 560 }}>
            Le mental s&apos;emballe, les ruminations tournent en boucle, les pensées négatives s&apos;installent.
            Ce guide t&apos;accompagne à travers 4 regards TCC concrets pour apaiser le mental,
            défaire les spirales de pensées et reprendre la main — en auto-aide, à ton rythme.
          </p>
          <p className={`${styles.sectionLead} reveal`} style={{
            textAlign: 'center', margin: '0 auto',
            fontSize: 13, opacity: 0.55, maxWidth: 480,
          }}>
            Accompagnement mindset et bien-être, pas un conseil thérapeutique.
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
                title: 'D\'où vient ta petite voix',
                desc: 'Comprendre l\'origine de tes pensées automatiques et de tes ruminations — ce qu\'elles disent de toi et de ton histoire.',
              },
              {
                n: '02',
                title: 'Repérer et nuancer tes pensées',
                desc: 'Identifier les distorsions cognitives qui alimentent l\'anxiété et les reformuler avec justesse, sans les nier.',
              },
              {
                n: '03',
                title: 'T\'accueillir sans te juger',
                desc: 'Cultiver l\'auto-compassion pour sortir des spirales d\'autocritique et créer un espace intérieur plus apaisé.',
              },
              {
                n: '04',
                title: 'Ton environnement et tes boucles',
                desc: 'Identifier les déclencheurs externes qui alimentent l\'anxiété et restructurer les boucles pensées-comportements-émotions.',
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

          {/* Carnet de pensées */}
          <div style={{
            marginTop: 20,
            padding: '28px 28px 24px',
            border: '1px solid rgba(201,162,75,0.4)',
            background: 'rgba(201,162,75,0.06)',
          }}>
            <div style={{
              fontFamily: 'Fraunces, serif', fontStyle: 'italic',
              fontSize: 32, color: 'var(--gold)', opacity: 0.4,
              lineHeight: 1, marginBottom: 12,
            }}>
              ✦
            </div>
            <h3 style={{
              fontFamily: 'Fraunces, serif', fontSize: 20, fontWeight: 400,
              marginBottom: 10, lineHeight: 1.2,
            }}>
              Carnet de pensées inclus
            </h3>
            <p style={{ fontSize: 14, opacity: 0.7, lineHeight: 1.65, fontWeight: 300 }}>
              Espaces guidés pour observer, noter et transformer tes schémas de pensée — un outil concret pour avancer en auto-aide, au quotidien.
            </p>
          </div>
        </div>
      </section>

      {/* CTA bas de page */}
      <section style={{ textAlign: 'center', padding: 'clamp(40px, 8vw, 80px) 24px' }}>
        <p style={{
          fontFamily: 'Fraunces, serif', fontStyle: 'italic',
          fontSize: 20, color: 'var(--gold-soft)', marginBottom: 32, lineHeight: 1.4,
        }}>
          « Tes pensées ne sont pas des faits. Tu peux apprendre à les observer autrement. »
        </p>
        <BuyButtonAnxiete />
        <p style={{ marginTop: 16, fontSize: 12, opacity: 0.4, letterSpacing: '0.04em' }}>
          PDF livré par email · 19,00 € TTC · par EvaTalk
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
