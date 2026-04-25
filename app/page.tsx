'use client';

import { useEffect } from 'react';
import { OFFERS, OFFERS_ORDER } from '@/lib/offers';
import styles from './page.module.css';

export default function HomePage() {
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

  const handleCheckout = (offerId: string) => {
    sessionStorage.setItem('pm_offer', offerId);
    window.location.href = '/questionnaire';
  };

  const renderFeature = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) =>
      part.startsWith('**') && part.endsWith('**') ? (
        <strong key={i}>{part.slice(2, -2)}</strong>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <span className={styles.logoMark}></span>
          PerfectMatch
        </div>
        <div className={styles.navLinks}>
          <a href="#pillars">Methode</a>
          <a href="#offres">Tarifs</a>
          <a href="#methode">Processus</a>
          <a href="#offres" className={styles.navCta}>Commencer</a>
        </div>
      </nav>

      <section className={styles.hero}>
        <svg className={styles.zodiacRing} viewBox="0 0 900 900" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <path id="circle-path" d="M 450, 450 m -380, 0 a 380,380 0 1,1 760,0 a 380,380 0 1,1 -760,0" />
          </defs>
          <circle cx="450" cy="450" r="380" fill="none" stroke="#C9A24B" strokeWidth="0.5" opacity="0.6" />
          <circle cx="450" cy="450" r="340" fill="none" stroke="#C9A24B" strokeWidth="0.3" opacity="0.4" />
          <circle cx="450" cy="450" r="420" fill="none" stroke="#C9A24B" strokeWidth="0.3" opacity="0.4" strokeDasharray="3 8" />
          <text fontFamily="Fraunces, serif" fontSize="28" fill="#C9A24B" opacity="0.8" letterSpacing="8">
            <textPath href="#circle-path">Aries Taurus Gemini Cancer Leo Virgo Libra Scorpio Sagittarius Capricorn Aquarius Pisces</textPath>
          </text>
        </svg>

        <div className={styles.eyebrow}>IA · Psychologie · Astrologie</div>
        <h1 className={styles.heroTitle}>
          Trouve la clarte<br />
          <em>avant</em> de trouver l&apos;amour
        </h1>
        <p className={styles.heroSub}>
          L&apos;algorithme de compatibilite le plus avance jamais concu. Trois parcours pour explorer ton <strong>profil psychologique</strong>, ton theme <strong>astral</strong> et la dynamique de ton <strong>couple</strong>.
        </p>
        <div className={styles.heroCtaGroup}>
          <a href="#offres" className={styles.btnPrimary}>Voir les 3 offres</a>
          <a href="/questionnaire" className={styles.btnGhost}>Commencer le test</a>
        </div>
      </section>

      <section id="pillars" className={styles.section}>
        <div className={styles.sectionLabel}>Les fondations</div>
        <h2 className={`${styles.sectionTitle} reveal`}>Une methode <em>triple</em> - unique au monde.</h2>
        <p className={`${styles.sectionLead} reveal`}>Chaque analyse repose sur trois piliers rigoureusement valides.</p>

        <div className={styles.pillars}>
          <div className={`${styles.pillar} reveal`}>
            <div className={styles.pillarNum}>i.</div>
            <h3>Psychologie scientifique</h3>
            <p>Big Five, styles d&apos;attachement, Gottman, Chapman. Les modeles les plus valides par la recherche academique contemporaine.</p>
          </div>
          <div className={`${styles.pillar} reveal`}>
            <div className={styles.pillarNum}>ii.</div>
            <h3>Astrologie symbolique</h3>
            <p>Theme natal, maisons, aspects, synastrie de couple. Une lecture symbolique serieuse.</p>
          </div>
          <div className={`${styles.pillar} reveal`}>
            <div className={styles.pillarNum}>iii.</div>
            <h3>Grille clinique</h3>
            <p>Analyse de la triade noire, depistage des schemas dysfonctionnels, grille diagnostique inspiree du DSM-5.</p>
          </div>
        </div>
      </section>

      <section id="offres" className={`${styles.section} ${styles.offersSection}`}>
        <div className={styles.offersHeader}>
          <div className={styles.sectionLabel}>Choisir ton parcours</div>
          <h2 className={`${styles.sectionTitle} reveal`}>Trois chemins. <em>Un seul</em> objectif : la clarte.</h2>
          <p className={`${styles.sectionLead} reveal`}>Paiement unique, rapport IA complet, aucun abonnement.</p>
        </div>

        <div className={styles.offersGrid}>
          {OFFERS_ORDER.map((id) => {
            const offer = OFFERS[id];
            return (
              <div key={id} className={`${styles.offer} ${offer.featured ? styles.offerFeatured : ''} reveal`}>
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

                <button onClick={() => handleCheckout(offer.id)} className={styles.offerCta}>
                  Obtenir pour {offer.price}€
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <section id="methode" className={styles.section}>
        <div className={styles.methodGrid}>
          <div>
            <div className={styles.sectionLabel}>Le processus</div>
            <h2 className={`${styles.sectionTitle} reveal`}>De la question<br />a la <em>clarte</em>.</h2>
          </div>

          <ul className={`${styles.methodList} reveal`}>
            <li>
              <div className={styles.methodNum}>01.</div>
              <div>
                <h4>Tu choisis ton parcours</h4>
                <p>Celibataire, psycho complete avec clinique, ou couple.</p>
              </div>
            </li>
            <li>
              <div className={styles.methodNum}>02.</div>
              <div>
                <h4>Tu reponds en profondeur</h4>
                <p>Entre 10 et 20 minutes selon l&apos;offre.</p>
              </div>
            </li>
            <li>
              <div className={styles.methodNum}>03.</div>
              <div>
                <h4>L&apos;IA genere ton rapport</h4>
                <p>Claude analyse tes 127 variables selon nos modeles cliniques.</p>
              </div>
            </li>
            <li>
              <div className={styles.methodNum}>04.</div>
              <div>
                <h4>Tu approfondis avec Luna</h4>
                <p>Luna, ton IA relationnelle, connait tes resultats.</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.logo} style={{ justifyContent: 'center', marginBottom: 20 }}>
          <span className={styles.logoMark}></span>
          PerfectMatch
        </div>
        <p className={styles.footerTagline}>« La sante mentale est un droit, pas un luxe. Nous veillons a le rendre accessible au plus grand nombre. »</p>
        <p className={styles.copyright}>© 2026 PerfectMatch</p>
      </footer>
    </>
  );
}
