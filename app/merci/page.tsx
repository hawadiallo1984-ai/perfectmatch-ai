import type { Metadata } from 'next';
import { stripe } from '@/lib/stripe';
import { GUIDES, GuideId } from '@/lib/guides';
import { BUNDLES } from '@/lib/bundles';
import SiteNav from '@/components/SiteNav';
import styles from '@/app/page.module.css';

export const metadata: Metadata = {
  title: 'Merci — EvaTalk',
};

export const dynamic = 'force-dynamic';

export default async function MerciPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string; guide?: string; bundle?: string }>;
}) {
  const { session_id, guide: guideParam, bundle: bundleParam } = await searchParams;

  const guide = GUIDES[guideParam as GuideId] ?? null;
  const bundleMeta = bundleParam ? (BUNDLES.find((b) => b.id === bundleParam) ?? null) : null;
  let paid = false;

  if (session_id) {
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id);
      paid = session.payment_status === 'paid';
    } catch {
      // session invalide ou expirée
    }
  }

  const isEn = bundleMeta?.lang === 'en';

  return (
    <div style={{ position: 'relative', zIndex: 2, minHeight: '100vh' }}>

      <SiteNav />

      <main style={{
        maxWidth: 680,
        margin: '0 auto',
        padding: 'clamp(60px, 10vw, 120px) 24px',
        textAlign: 'center',
      }}>

        {paid && bundleMeta ? (
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
              {isEn ? <>Thank you,<br /><em style={{ fontStyle: 'italic', color: 'var(--gold-soft)' }}>it&apos;s yours.</em></> : <>Merci pour ta confiance,<br /><em style={{ fontStyle: 'italic', color: 'var(--gold-soft)' }}>c&apos;est à toi.</em></>}
            </h1>

            <p style={{
              fontSize: 16,
              opacity: 0.75,
              lineHeight: 1.75,
              fontWeight: 300,
              margin: '0 auto 40px',
              maxWidth: 520,
            }}>
              {isEn
                ? <>Your pack <strong style={{ color: 'var(--cream)', fontWeight: 500 }}>{bundleMeta.title}</strong> is ready. A delivery email has also been sent.</>
                : <>Ton pack <strong style={{ color: 'var(--cream)', fontWeight: 500 }}>{bundleMeta.title}</strong> est prêt. Un email de livraison t&apos;a aussi été envoyé.</>
              }
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
              {(bundleMeta.guideIds as readonly string[]).map((id) => {
                const g = GUIDES[id as GuideId];
                if (!g) return null;
                return (
                  <a
                    key={id}
                    href={g.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 10,
                      padding: '14px 32px',
                      background: 'linear-gradient(135deg, var(--gold), var(--gold-soft))',
                      color: 'var(--ink)',
                      borderRadius: 100,
                      fontSize: 13,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      fontWeight: 700,
                      textDecoration: 'none',
                    }}
                  >
                    {isEn ? 'Download' : 'Télécharger'} {g.name} →
                  </a>
                );
              })}
            </div>

            <p style={{ fontSize: 15, lineHeight: 1.7, marginBottom: 12 }}>
              {isEn
                ? <>On vient aussi de t&apos;envoyer ton guide par email 📩 (check your spam folder)</>
                : <>On vient aussi de t&apos;envoyer ton guide par email 📩 (vérifie tes spams)</>
              }
            </p>
            <p style={{ fontSize: 13, opacity: 0.6, lineHeight: 1.7, marginBottom: 32 }}>
              {isEn
                ? 'Download issue? Open this page in Safari or Chrome (not in the TikTok/Instagram browser).'
                : 'Souci de téléchargement ? Ouvre cette page dans Safari ou Chrome (pas dans le navigateur de TikTok/Insta).'
              }
            </p>

            <p style={{
              marginTop: 8,
              fontSize: 13,
              opacity: 0.45,
              fontFamily: 'Fraunces, serif',
              fontStyle: 'italic',
            }}>
              par EvaTalk
            </p>
          </>

        ) : paid && guide ? (
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
              target="_blank"
              rel="noopener noreferrer"
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

            <p style={{ fontSize: 15, lineHeight: 1.7, marginTop: 28, marginBottom: 10 }}>
              On vient aussi de t&apos;envoyer ton guide par email 📩 (vérifie tes spams)
            </p>
            <p style={{ fontSize: 13, opacity: 0.6, lineHeight: 1.7, marginBottom: 40 }}>
              Souci de téléchargement ? Ouvre cette page dans Safari ou Chrome (pas dans le navigateur de TikTok/Insta).
            </p>

            <p style={{
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
