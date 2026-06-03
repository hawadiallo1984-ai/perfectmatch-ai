import type { Metadata } from 'next';
import { stripe } from '@/lib/stripe';
import { GUIDES, GuideId } from '@/lib/guides';
import styles from '@/app/page.module.css';

export const metadata: Metadata = {
  title: 'Merci — EvaTalk',
};

export const dynamic = 'force-dynamic';

export default async function MerciPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string; guide?: string }>;
}) {
  const { session_id, guide: guideParam } = await searchParams;

  const guide = GUIDES[guideParam as GuideId] ?? null;
  let paid = false;

  if (session_id) {
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id);
      paid = session.payment_status === 'paid';
    } catch {
      // session invalide ou expirée
    }
  }

  return (
    <div style={{ position: 'relative', zIndex: 2, minHeight: '100vh' }}>

      {/* Nav */}
      <nav className={styles.nav}>
        <a href="/" className={styles.logo} style={{ textDecoration: 'none' }}>
          <span className={styles.logoMark}></span>
          PerfectMatch
        </a>
      </nav>

      <main style={{
        maxWidth: 680,
        margin: '0 auto',
        padding: 'clamp(60px, 10vw, 120px) 24px',
        textAlign: 'center',
      }}>

        {paid && guide ? (
          <>
            <div style={{
              fontFamily: 'Fraunces, serif',
              fontStyle: 'italic',
              fontSize: 15,
              color: 'var(--gold)',
              letterSpacing: '0.15em',
              marginBottom: 28,
              opacity: 0.85,
            }}>
              ✦ · ✦ · ✦
            </div>

            <h1 style={{
              fontFamily: 'Fraunces, serif',
              fontSize: 'clamp(36px, 6vw, 64px)',
              fontWeight: 300,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: 24,
            }}>
              Merci pour ta confiance,<br />
              <em style={{ fontStyle: 'italic', color: 'var(--gold-soft)' }}>c&apos;est à toi.</em>
            </h1>

            <p style={{
              fontSize: 16,
              opacity: 0.75,
              lineHeight: 1.75,
              fontWeight: 300,
              marginBottom: 48,
              maxWidth: 520,
              margin: '0 auto 48px',
            }}>
              Ton guide <strong style={{ color: 'var(--cream)', fontWeight: 500 }}>{guide.name}</strong> est prêt.
              Un email de livraison t&apos;a aussi été envoyé. À toi de l&apos;explorer à ton rythme.
            </p>

            <a
              href={guide.pdf}
              download
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                padding: '16px 36px',
                background: 'linear-gradient(135deg, var(--gold), var(--gold-soft))',
                color: 'var(--ink)',
                borderRadius: 100,
                fontSize: 14,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              Télécharger le guide PDF →
            </a>

            <p style={{
              marginTop: 48,
              fontSize: 13,
              opacity: 0.45,
              fontFamily: 'Fraunces, serif',
              fontStyle: 'italic',
            }}>
              par EvaTalk
            </p>
          </>
        ) : (
          <>
            <h1 style={{
              fontFamily: 'Fraunces, serif',
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              marginBottom: 20,
            }}>
              Paiement non confirmé
            </h1>
            <p style={{ opacity: 0.7, lineHeight: 1.7, marginBottom: 32 }}>
              Nous n&apos;avons pas pu vérifier ton paiement. Contacte-nous à{' '}
              <a
                href="mailto:contact@evatalk.fr"
                style={{ color: 'var(--gold-soft)', textDecoration: 'underline' }}
              >
                contact@evatalk.fr
              </a>{' '}
              en mentionnant ton email de paiement.
            </p>
            <a href="/" style={{ color: 'var(--gold-soft)', textDecoration: 'underline', fontSize: 14 }}>
              Retourner à l&apos;accueil
            </a>
          </>
        )}

      </main>

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
