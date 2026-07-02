import type { Metadata } from 'next';
import styles from '@/app/page.module.css';
import SiteNav from '@/components/SiteNav';
import BuyButtonAttachement from './BuyButtonAttachement';

export const metadata: Metadata = {
  title: "Guide Styles d'attachement — 4 approches TCC",
  description:
    "Comprendre d'où vient ton style d'attachement et évoluer vers une base sécure : un guide PDF de 4 approches TCC sur l'anxieux, l'évitant et la danse relationnelle.",
};

export default function StylesAttachementPage() {
  return (
    <div style={{ position: 'relative', zIndex: 2, minHeight: '100vh' }}>

      <SiteNav />

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
          <BuyButtonAttachement />
          <p style={{ marginTop: 14, fontSize: 12, opacity: 0.45, letterSpacing: '0.05em' }}>
            Paiement sécurisé · PDF envoyé par email · 9,99 €
          </p>
        </div>
      </section>

      {/* Header */}
      <section className={styles.section} style={{ paddingTop: 20 }}>
        <div className={styles.offersHeader}>
          <div className={styles.sectionLabel} style={{ justifyContent: 'center' }}>
            Guide PDF · Styles d&apos;attachement
          </div>
          <h1 className={`${styles.sectionTitle} reveal`} style={{ textAlign: 'center', margin: '0 auto 28px' }}>
            Styles d&apos;attachement —<br />
            <em>4 approches</em>
          </h1>
          <p className={`${styles.sectionLead} reveal`} style={{ textAlign: 'center', margin: '0 auto 20px', maxWidth: 560 }}>
            Ton style d&apos;attachement s&apos;est formé bien avant tes premières relations amoureuses.
            Ce guide t&apos;aide à comprendre d&apos;où il vient, ce qu&apos;il active en toi —
            et comment évoluer vers une base sécure, seul·e ou à deux.
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
                title: "D'où vient ton style",
                desc: "Comprendre la formation de l'attachement dans l'enfance et ses traces dans tes relations actuelles — pourquoi tu réagis comme tu réagis.",
              },
              {
                n: '02',
                title: "Les pensées de l'anxieux et de l'évitant",
                desc: "Identifier les schémas cognitifs propres à chaque style — les pensées qui alimentent la peur du rejet ou la fuite de la proximité.",
              },
              {
                n: '03',
                title: 'Vers une base sécure',
                desc: "Exercices TCC pour moduler les réponses automatiques d'anxiété ou de retrait et construire progressivement une sécurité intérieure.",
              },
              {
                n: '04',
                title: 'La danse anxieux-évitant',
                desc: "Comprendre et sortir des dynamiques relationnelles les plus courantes — reconnaître le cycle, l'interrompre et proposer autre chose.",
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

          {/* Cahier d'exercices */}
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
              Mises en situation pour répondre autrement à la peur du rejet ou de la proximité — des outils concrets pour amorcer le changement.
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
          « Ton style d&apos;attachement n&apos;est pas une condamnation. C&apos;est un point de départ. »
        </p>
        <BuyButtonAttachement />
        <p style={{ marginTop: 16, fontSize: 12, opacity: 0.4, letterSpacing: '0.04em' }}>
          PDF livré par email · 9,99 € TTC · par EvaTalk
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
