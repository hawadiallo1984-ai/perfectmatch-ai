import type { Metadata } from 'next';
import { GUIDES } from '@/lib/guides';
import { GUIDE_PROMO, discountedCents } from '@/lib/promo';
import styles from '@/app/page.module.css';
import SiteNav from '@/components/SiteNav';
import GuideBuyButton from '@/components/GuideBuyButton';

export async function generateStaticParams() {
  return Object.keys(GUIDES).map((id) => ({ slug: id }));
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const guide = GUIDES[params.slug];
  if (!guide) return {};
  return {
    title: `${guide.name} — PDF guide`,
    description: guide.blurb,
  };
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const guide = GUIDES[params.slug];
  if (!guide) return null;

  const bullets = Array.from(guide.bullets) as string[];
  const mainBullets = bullets.slice(0, -1);
  const lastBullet = bullets[bullets.length - 1];

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
          <GuideBuyButton guideId={guide.id} />
          <p style={{ marginTop: 14, fontSize: 12, opacity: 0.45, letterSpacing: '0.05em' }}>
            Paiement sécurisé · PDF envoyé par email ·{' '}
            {GUIDE_PROMO.active ? (
              <><s>19,00 €</s> <strong style={{ opacity: 1 }}>{(discountedCents(1900) / 100).toFixed(2).replace('.', ',')} €</strong> <span style={{ background: 'rgba(201,162,75,0.2)', color: '#C9A24B', padding: '1px 4px', borderRadius: 2, fontWeight: 700 }}>-30%</span></>
            ) : '19,00 €'}
          </p>
        </div>
      </section>

      <section className={styles.section} style={{ paddingTop: 20 }}>
        <div className={styles.offersHeader}>
          <div className={styles.sectionLabel} style={{ justifyContent: 'center' }}>
            Guide PDF · {guide.name}
          </div>
          <h1 className={styles.sectionTitle} style={{ textAlign: 'center', margin: '0 auto 28px' }}>
            {guide.name}
          </h1>
          <p className={styles.sectionLead} style={{ textAlign: 'center', margin: '0 auto', maxWidth: 560 }}>
            {guide.blurb}
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
            <span style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase' as const, color: 'var(--gold)', opacity: 0.85 }}>
              Au programme
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {mainBullets.map((bullet, i) => (
              <div key={i} style={{
                padding: '28px 28px 24px',
                border: '1px solid var(--line)',
                background: 'rgba(28,24,51,0.4)',
              }}>
                <div style={{
                  fontFamily: 'Fraunces, serif', fontStyle: 'italic',
                  fontSize: 32, color: 'var(--gold)', opacity: 0.4,
                  lineHeight: 1, marginBottom: 12,
                }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <p style={{ fontSize: 14, opacity: 0.7, lineHeight: 1.65, fontWeight: 300 }}>
                  {bullet}
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
              Workbook inclus
            </h3>
            <p style={{ fontSize: 14, opacity: 0.7, lineHeight: 1.65, fontWeight: 300 }}>
              {lastBullet}
            </p>
          </div>
        </div>
      </section>

      <section style={{ textAlign: 'center', padding: 'clamp(40px, 8vw, 80px) 24px' }}>
        <GuideBuyButton guideId={guide.id} />
        <p style={{ marginTop: 16, fontSize: 12, opacity: 0.4, letterSpacing: '0.04em' }}>
          PDF livré par email ·{' '}
            {GUIDE_PROMO.active ? (
              <><s>19,00 €</s> <strong style={{ opacity: 1 }}>{(discountedCents(1900) / 100).toFixed(2).replace('.', ',')} € TTC</strong> <span style={{ background: 'rgba(201,162,75,0.2)', color: '#C9A24B', padding: '1px 4px', borderRadius: 2, fontWeight: 700 }}>-30%</span></>
            ) : '19,00 € TTC'}{' '}
            · par EvaTalk
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
