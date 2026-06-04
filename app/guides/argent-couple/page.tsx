import type { Metadata } from 'next';
import styles from '@/app/page.module.css';
import SiteNav from '@/components/SiteNav';
import GuideBuyButton from '@/components/GuideBuyButton';

export const metadata: Metadata = {
  title: "Guide L'argent dans le couple — 4 approches TCC",
  description:
    "Comprendre vos histoires d'argent, désamorcer les conflits et construire un système équitable : 4 approches TCC pour l'argent dans le couple.",
};

export default function Page() {
  return (
    <div style={{ position: 'relative', zIndex: 2, minHeight: '100vh' }}>

      <SiteNav />

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
          <GuideBuyButton guideId="argent-couple" />
          <p style={{ marginTop: 14, fontSize: 12, opacity: 0.45, letterSpacing: '0.05em' }}>
            Paiement sécurisé · PDF envoyé par email · 19,00 €
          </p>
        </div>
      </section>

      <section className={styles.section} style={{ paddingTop: 20 }}>
        <div className={styles.offersHeader}>
          <div className={styles.sectionLabel} style={{ justifyContent: 'center' }}>
            Guide PDF · L&apos;argent dans le couple
          </div>
          <h1 className={`${styles.sectionTitle} reveal`} style={{ textAlign: 'center', margin: '0 auto 28px' }}>
            L&apos;argent dans le couple —<br />
            <em>4 approches</em>
          </h1>
          <p className={`${styles.sectionLead} reveal`} style={{ textAlign: 'center', margin: '0 auto 20px', maxWidth: 560 }}>
            L&apos;argent est l&apos;un des premiers terrains de conflit dans les couples
            car chacun arrive avec ses héritages, ses croyances et ses peurs.
            Ce guide t&apos;accompagne à travers 4 regards TCC pour comprendre vos histoires respectives
            et construire un système équitable qui vous ressemble.
          </p>
          <p className={`${styles.sectionLead} reveal`} style={{
            textAlign: 'center', margin: '0 auto',
            fontSize: 13, opacity: 0.55, maxWidth: 480,
          }}>
            Accompagnement mindset et bien-être, pas un conseil financier.
          </p>
        </div>
      </section>

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
                title: "Vos histoires d'argent",
                desc: "Comprendre les héritages financiers de chaque partenaire et leur impact invisible sur le couple.",
              },
              {
                n: '02',
                title: 'Désamorcer les conflits',
                desc: "Des outils TCC pour gérer les tensions autour de l'argent et sortir des impasses relationnelles.",
              },
              {
                n: '03',
                title: "Parler d'argent en confiance",
                desc: "Construire une communication ouverte et bienveillante autour des finances communes.",
              },
              {
                n: '04',
                title: 'Un système équitable',
                desc: "Créer une organisation financière qui reflète vos valeurs communes et votre dynamique de couple.",
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
              Cahier d&apos;exercices inclus
            </h3>
            <p style={{ fontSize: 14, opacity: 0.7, lineHeight: 1.65, fontWeight: 300 }}>
              Exercices à faire seul·e ou à deux pour aligner vos visions et avancer ensemble.
            </p>
          </div>
        </div>
      </section>

      <section style={{ textAlign: 'center', padding: 'clamp(40px, 8vw, 80px) 24px' }}>
        <p style={{
          fontFamily: 'Fraunces, serif', fontStyle: 'italic',
          fontSize: 20, color: 'var(--gold-soft)', marginBottom: 32, lineHeight: 1.4,
        }}>
          « Parler d&apos;argent en couple, c&apos;est parler de confiance, de valeurs et de projet commun. »
        </p>
        <GuideBuyButton guideId="argent-couple" />
        <p style={{ marginTop: 16, fontSize: 12, opacity: 0.4, letterSpacing: '0.04em' }}>
          PDF livré par email · 19,00 € TTC · par EvaTalk
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
