import type { Metadata } from 'next';
import styles from '@/app/page.module.css';
import SiteNav from '@/components/SiteNav';
import BuyButton from './BuyButton';

export const metadata: Metadata = {
  title: 'Guide Se réapproprier sa sexualité — 4 approches TCC',
  description:
    'Renouer avec ton désir, ton corps et ton plaisir sans honte : un guide PDF de 4 approches TCC pour déconstruire les blocages et te réapproprier pleinement ta sexualité.',
};

export default function SeReapproprierSexualitePage() {
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
          <BuyButton />
          <p style={{ marginTop: 14, fontSize: 12, opacity: 0.45, letterSpacing: '0.05em' }}>
            Paiement sécurisé · PDF envoyé par email · 9,99 €
          </p>
        </div>
      </section>

      <section className={styles.section} style={{ paddingTop: 20 }}>
        <div className={styles.offersHeader}>
          <div className={styles.sectionLabel} style={{ justifyContent: 'center' }}>
            Guide PDF · Se réapproprier sa sexualité
          </div>
          <h1 className={`${styles.sectionTitle} reveal`} style={{ textAlign: 'center', margin: '0 auto 28px' }}>
            Se réapproprier sa sexualité —<br />
            <em>4 approches</em>
          </h1>
          <p className={`${styles.sectionLead} reveal`} style={{ textAlign: 'center', margin: '0 auto 20px', maxWidth: 560 }}>
            Ta sexualité t&apos;appartient — mais des années de messages, de silences ou de blessures ont parfois brouillé ce lien.
            Ce guide t&apos;accompagne à travers 4 regards TCC pour renouer avec ton désir, ton corps et ton plaisir,
            à ton propre rythme, sans honte.
          </p>
          <p className={`${styles.sectionLead} reveal`} style={{
            textAlign: 'center', margin: '0 auto',
            fontSize: 13, opacity: 0.55, maxWidth: 480,
          }}>
            Psychoéducation et bien-être sexuel pour adultes · cadre coaching, sans contenu explicite.
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
                title: 'Comprendre ce qui a été mis de côté',
                desc: 'Identifier les messages reçus — familiaux, culturels, religieux — qui ont façonné ta relation à ta sexualité sans que tu l\'aies choisi.',
              },
              {
                n: '02',
                title: 'Déconstruire la honte',
                desc: 'Restructuration cognitive des croyances limitantes sur le désir et le plaisir — pour séparer ce qui est à toi de ce qu\'on t\'a appris à ressentir.',
              },
              {
                n: '03',
                title: 'Reconnecter avec ton corps',
                desc: 'Exercices d\'ancrage et de pleine conscience pour retrouver le lien corporel — habiter ton corps de l\'intérieur, avec douceur.',
              },
              {
                n: '04',
                title: 'Reprendre la main',
                desc: 'Poser des limites, exprimer ses besoins et habiter sa sexualité avec confiance — scripts et mises en situation concrets.',
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
            }}>✦</div>
            <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: 20, fontWeight: 400, marginBottom: 10, lineHeight: 1.2 }}>
              Cahier d&apos;exercices inclus
            </h3>
            <p style={{ fontSize: 14, opacity: 0.7, lineHeight: 1.65, fontWeight: 300 }}>
              Espaces de réflexion guidés pour avancer à ton propre rythme — sans pression, sans jugement.
            </p>
          </div>
        </div>
      </section>

      <section style={{ textAlign: 'center', padding: 'clamp(40px, 8vw, 80px) 24px' }}>
        <p style={{
          fontFamily: 'Fraunces, serif', fontStyle: 'italic',
          fontSize: 20, color: 'var(--gold-soft)', marginBottom: 32, lineHeight: 1.4,
        }}>
          « Ta sexualité n&apos;a jamais eu besoin d&apos;être méritée. Elle t&apos;appartient. »
        </p>
        <BuyButton />
        <p style={{ marginTop: 16, fontSize: 12, opacity: 0.4, letterSpacing: '0.04em' }}>
          PDF livré par email · 9,99 € TTC · par EvaTalk
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
