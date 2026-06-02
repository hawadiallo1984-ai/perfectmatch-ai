'use client';

import { useEffect, useState } from 'react';
import { OFFERS, RESILIENCE_ORDER } from '@/lib/offers';
import styles from '@/app/page.module.css';

export default function ResiliencePage() {
  const [email, setEmail] = useState('');
  const [sentOffer, setSentOffer] = useState<string | null>(null);

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

  const handleWaitlist = (e: React.FormEvent, offerId: string) => {
    e.preventDefault();
    if (!email) return;
    const existing = JSON.parse(localStorage.getItem('pm_resilience_waitlist') || '[]');
    existing.push({ email, offerId, date: new Date().toISOString() });
    localStorage.setItem('pm_resilience_waitlist', JSON.stringify(existing));
    setSentOffer(offerId);
    setTimeout(() => {
      setSentOffer(null);
      setEmail('');
    }, 4000);
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
          <a href="/carnet">Carnet TCC</a>
          <a href="/resilience" className={styles.navCta}>Résilience</a>
        </div>
      </nav>

      {/* Header */}
      <section className={styles.section} style={{ textAlign: 'center', paddingBottom: 0 }}>
        <div className={styles.offersHeader}>
          <div className={styles.sectionLabel} style={{ justifyContent: 'center' }}>
            Résilience & bien-être
          </div>
          <h1 className={`${styles.sectionTitle} reveal`} style={{ textAlign: 'center', margin: '0 auto 28px' }}>
            Racisme & misogynoir : <em>protéger ta santé mentale</em>
          </h1>
          <p className={`${styles.sectionLead} reveal`} style={{ textAlign: 'center', margin: '0 auto' }}>
            Ici, des outils issus de la TCC culturellement adaptés pour valider ton vécu,
            protéger ta santé mentale et reprendre ton pouvoir.
          </p>
        </div>
      </section>

      {/* Cartes */}
      <section className={`${styles.section} ${styles.offersSection}`}>
        <div
          className={styles.offersGrid}
          style={{ gridTemplateColumns: 'repeat(2, 1fr)', maxWidth: 900, margin: '0 auto' }}
        >
          {RESILIENCE_ORDER.map((id) => {
            const offer = OFFERS[id];
            const isSent = sentOffer === id;
            return (
              <div key={id} className={`${styles.offer} reveal`}>
                {offer.badge && <div className={styles.offerBadge}>{offer.badge}</div>}
                <div className={styles.offerCategory}>{offer.category}</div>
                <h3 className={styles.offerName}>
                  {offer.name}{' '}<em>{offer.nameEmphasis}</em>
                </h3>
                <p className={styles.offerDesc}>{offer.description}</p>

                <div className={styles.offerPrice}>
                  <span className={styles.amount}>{offer.price}</span>
                  <span className={styles.currency}>€</span>
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
                      <button type="submit" className={styles.offerCta}>
                        Rejoindre la liste d&apos;accès
                      </button>
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
