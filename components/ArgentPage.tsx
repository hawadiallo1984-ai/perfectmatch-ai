'use client';

import { useEffect, useState } from 'react';
import { OFFERS, ARGENT_ORDER, type OfferId } from '@/lib/offers';
import styles from '@/app/page.module.css';

export default function ArgentPage() {
  const [email, setEmail] = useState('');
  const [sentOffer, setSentOffer] = useState<string | null>(null);
  const [loadingOffer, setLoadingOffer] = useState<string | null>(null);
  const [errorOffer, setErrorOffer] = useState<string | null>(null);

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

  const handleWaitlist = async (e: React.FormEvent, offerId: OfferId) => {
    e.preventDefault();
    if (!email || loadingOffer) return;
    setLoadingOffer(offerId);
    setErrorOffer(null);
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, parcours: OFFERS[offerId].nameEmphasis }),
      });
      if (!res.ok) throw new Error('Erreur serveur');
      setSentOffer(offerId);
      setEmail('');
      setTimeout(() => setSentOffer(null), 6000);
    } catch {
      setErrorOffer(offerId);
    }
    setLoadingOffer(null);
  };

  const renderFeature = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) =>
      part.startsWith('**') && part.endsWith('**')
        ? <strong key={i}>{part.slice(2, -2)}</strong>
        : <span key={i}>{part}</span>
    );
  };

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
          <a href="/#offres">Offres</a>
          <a href="/resilience">Racisme &amp; misogynoir</a>
          <a href="/argent" className={styles.navCta}>Argent &amp; business</a>
        </div>
      </nav>

      {/* Header */}
      <section className={styles.section} style={{ textAlign: 'center', paddingBottom: 0 }}>
        <div className={styles.offersHeader}>
          <div className={styles.sectionLabel} style={{ justifyContent: 'center' }}>
            Argent, business &amp; mental
          </div>
          <h1 className={`${styles.sectionTitle} reveal`} style={{ textAlign: 'center', margin: '0 auto 28px' }}>
            Ton rapport à l&apos;argent, <em>sans honte</em>
          </h1>
          <p className={`${styles.sectionLead} reveal`} style={{ textAlign: 'center', margin: '0 auto 16px' }}>
            Tes croyances sur l&apos;argent ont été façonnées par ton histoire, ta classe, ta couleur — elles ne sont pas une fatalité.
            Ici, des outils TCC pour les transformer.
          </p>
          <p className={`${styles.sectionLead} reveal`} style={{ textAlign: 'center', margin: '0 auto 16px', fontSize: 13, opacity: 0.6 }}>
            Accompagnement mindset et bien-être, pas un conseil financier.
          </p>
          <p className="reveal" style={{
            textAlign: 'center', fontSize: 13.5, color: 'var(--violet-soft)',
            fontStyle: 'italic', fontFamily: 'Fraunces, serif', opacity: 0.85,
          }}>
            Ces parcours arrivent progressivement — rejoins la liste d&apos;accès anticipé pour être prévenu·e en premier.
          </p>
        </div>
      </section>

      {/* Cartes */}
      <section className={`${styles.section} ${styles.offersSection}`}>
        <div
          className={styles.offersGrid}
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}
        >
          {ARGENT_ORDER.map((id) => {
            const offer = OFFERS[id];
            const isSent = sentOffer === id;
            const isLoading = loadingOffer === id;
            const hasError = errorOffer === id;
            return (
              <div key={id} className={`${styles.offer} reveal`}>
                {offer.badge && <div className={styles.offerBadge}>{offer.badge}</div>}
                <div className={styles.offerCategory}>{offer.category}</div>
                <h3 className={styles.offerName}>
                  {offer.name}{' '}<em>{offer.nameEmphasis}</em>
                </h3>
                <p className={styles.offerDesc}>{offer.description}</p>

                <div className={styles.offerPrice}>
                  <span className={styles.amount}>{offer.price === 0 ? 'Gratuit' : offer.price}</span>
                  {offer.price > 0 && <span className={styles.currency}>€</span>}
                  <span className={styles.unit}>· {offer.unit}</span>
                </div>

                <ul className={styles.offerFeatures}>
                  {offer.features.map((feature, i) => (
                    <li key={i}>{renderFeature(feature)}</li>
                  ))}
                </ul>

                <div style={{ marginTop: 'auto' }}>
                  {isSent ? (
                    <div style={{
                      padding: '18px 12px',
                      textAlign: 'center',
                      border: '1px dashed rgba(142, 122, 181, 0.5)',
                      background: 'rgba(142, 122, 181, 0.08)',
                      fontFamily: 'Fraunces, serif',
                      fontStyle: 'italic',
                      color: '#A995C7',
                      fontSize: 14,
                    }}>
                      ✦ Tu seras prévenu·e en premier
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => handleWaitlist(e, id)}
                      style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
                    >
                      <input
                        type="email"
                        required
                        placeholder="Ton email pour rejoindre la liste d'accès"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '14px 16px',
                          border: '1px solid rgba(142, 122, 181, 0.4)',
                          background: 'rgba(28, 24, 51, 0.5)',
                          color: '#F5EFE3',
                          fontFamily: 'inherit',
                          fontSize: 14,
                          outline: 'none',
                          borderRadius: 2,
                          boxSizing: 'border-box',
                        }}
                      />
                      <button
                        type="submit"
                        className={styles.offerCta}
                        disabled={isLoading}
                        style={{ opacity: isLoading ? 0.6 : 1 }}
                      >
                        {isLoading ? 'Envoi en cours…' : 'Rejoindre la liste d\'accès'}
                      </button>
                      {hasError && (
                        <p style={{ fontSize: 13, color: 'var(--danger)', textAlign: 'center', margin: 0 }}>
                          Une erreur est survenue — réessaie dans un instant.
                        </p>
                      )}
                    </form>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer minimal */}
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
