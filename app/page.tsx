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

  const handleCheckout = async (offerId: string) => {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ offerId }),
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  };

  // Helper for markdown-style bold in features
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
      {/* NAV */}
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <span className={styles.logoMark}></span>
          PerfectMatch
        </div>
        <div className={styles.navLinks}>
          <a href="#pillars">Méthode</a>
          <a href="#offres">Tarifs</a>
          <a href="#methode">Processus</a>
          <a href="#offres" className={styles.navCta}>Commencer</a>
        </div>
      </nav>

      {/* HERO */}
      <section className={styles.hero}>
        <svg className={styles.zodiacRing} viewBox="0 0 900 900" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <path id="circle-path" d="M 450, 450 m -380, 0 a 380,380 0 1,1 760,0 a 380,380 0 1,1 -760,0" />
          </defs>
          <circle cx="450" cy="450" r="380" fill="none" stroke="#C9A24B" strokeWidth="0.5" opacity="0.6" />
          <circle cx="450" cy="450" r="340" fill="none" stroke="#C9A24B" strokeWidth="0.3" opacity="0.4" />
          <circle cx="450" cy="450" r="420" fill="none" stroke="#C9A24B" strokeWidth="0.3" opacity="0.4" strokeDasharray="3 8" />
          <text fontFamily="Fraunces, serif" fontSize="28" fill="#C9A24B" opacity="0.8" letterSpacing="8">
            <textPath href="#circle-path">♈ ♉ ♊ ♋ ♌ ♍ ♎ ♏ ♐ ♑ ♒ ♓ ♈ ♉ ♊ ♋ ♌ ♍ ♎ ♏ ♐ ♑ ♒ ♓</textPath>
          </text>
        </svg>

        <div className={styles.eyebrow}>IA · Psychologie · Astrologie</div>
        <h1 className={styles.heroTitle}>
          Trouve la clarté<br />
          <em>avant</em> de trouver l'amour
        </h1>
        <p className={styles.heroSub}>
          L'algorithme de compatibilité le plus avancé jamais conçu. Trois parcours pour explorer ton <strong>profil psychologique</strong>, ton thème <strong>astral</strong> et la dynamique de ton <strong>couple</strong> — avec la profondeur d'un vrai thérapeute.
        </p>
        <div className={styles.heroCtaGroup}>
          <a href="#offres" className={styles.btnPrimary}>Voir les 3 offres →</a>
          <a href="/questionnaire" className={styles.btnGhost}>Commencer le test</a>
        </div>
      </section>

      {/* PILLARS */}
      <section id="pillars" className={styles.section}>
        <div className={styles.sectionLabel}>Les fondations</div>
        <h2 className={`${styles.sectionTitle} reveal`}>Une méthode <em>triple</em> — unique au monde.</h2>
        <p className={`${styles.sectionLead} reveal`}>Chaque analyse repose sur trois piliers rigoureusement validés. La psychologie pour comprendre, l'astrologie pour symboliser, la clinique pour soigner.</p>

        <div className={styles.pillars}>
          <div className={`${styles.pillar} reveal`}>
            <div className={styles.pillarNum}>i.</div>
            <span className={styles.pillarIcon}>🧠</span>
            <h3>Psychologie scientifique</h3>
            <p>Big Five, styles d'attachement, théorie des besoins de Maslow, Gottman, Chapman. Les modèles les plus validés par la recherche académique contemporaine.</p>
          </div>
          <div className={`${styles.pillar} reveal`}>
            <div className={styles.pillarNum}>ii.</div>
            <span className={styles.pillarIcon}>🌙</span>
            <h3>Astrologie symbolique</h3>
            <p>Thème natal, maisons, aspects, synastrie de couple. Une lecture symbolique sérieuse, doublée d'un regard épistémologique honnête sur ses limites.</p>
          </div>
          <div className={`${styles.pillar} reveal`}>
            <div className={styles.pillarNum}>iii.</div>
            <span className={styles.pillarIcon}>🩺</span>
            <h3>Grille clinique</h3>
            <p>Analyse de la triade noire, dépistage des schémas dysfonctionnels, grille diagnostique inspirée du DSM-5. Une rigueur thérapeutique, pas du coaching.</p>
          </div>
        </div>
      </section>

      {/* OFFERS */}
      <section id="offres" className={`${styles.section} ${styles.offersSection}`}>
        <div className={styles.offersHeader}>
          <div className={styles.sectionLabel}>Choisir ton parcours</div>
          <h2 className={`${styles.sectionTitle} reveal`}>Trois chemins. <em>Un seul</em> objectif : la clarté.</h2>
          <p className={`${styles.sectionLead} reveal`}>Paiement unique, rapport IA complet, aucun abonnement. Chaque offre inclut une analyse astrologique approfondie et l'accès à Luna, ton IA relationnelle.</p>
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

      {/* METHOD */}
      <section id="methode" className={styles.section}>
        <div className={styles.methodGrid}>
          <div>
            <div className={styles.sectionLabel}>Le processus</div>
            <h2 className={`${styles.sectionTitle} reveal`}>De la question<br />à la <em>clarté</em>.</h2>
            <p className={`${styles.sectionLead} reveal`}>Un parcours en quatre temps, conçu pour délivrer un rapport d'une précision rare — en moins de 15 minutes.</p>
          </div>

          <ul className={`${styles.methodList} reveal`}>
            {[
              { n: '01.', t: 'Tu choisis ton parcours', d: 'Célibataire, psycho complète avec clinique, ou couple. Chaque offre est pensée pour un moment précis de ta vie amoureuse.' },
              { n: '02.', t: 'Tu réponds en profondeur', d: 'Entre 10 et 20 minutes selon l\'offre. Les questions sont intimes — c\'est voulu. Plus tu es honnête, plus le rapport est précis.' },
              { n: '03.', t: 'L\'IA génère ton rapport', d: 'Claude d\'Anthropic analyse tes 127 variables selon nos modèles cliniques. Le rapport est unique, jamais recopié.' },
              { n: '04.', t: 'Tu approfondis avec Luna', d: 'Luna, ton IA relationnelle, connaît tes résultats. Tu peux lui poser toutes tes questions — sans jugement, à toute heure.' },
            ].map((item) => (
              <li key={item.n}>
                <div className={styles.methodNum}>{item.n}</div>
                <div>
                  <h4>{item.t}</h4>
                  <p>{item.d}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.logo} style={{ justifyContent: 'center', marginBottom: 20 }}>
          <span className={styles.logoMark}></span>
          PerfectMatch
        </div>
        <p className={styles.footerTagline}>« La santé mentale est un droit, pas un luxe. Nous veillons à le rendre accessible au plus grand nombre. »</p>
        <div className={styles.footerLinks}>
          <a href="/mentions">Mentions légales</a>
          <a href="/rgpd">Politique RGPD</a>
          <a href="/conditions">Conditions</a>
          <a href="/contact">Contact</a>
          <a href="/sources">Sources académiques</a>
        </div>
        <p className={styles.copyright}>© 2026 PerfectMatch · Chiffrement TLS · Paiement Stripe · Données non revendues</p>
      </footer>
    </>
  );
}
