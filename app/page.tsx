'use client';

import { useEffect, useState } from 'react';
import { OFFERS, OFFERS_ORDER } from '@/lib/offers';
import styles from './page.module.css';

export default function HomePage() {
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistStatus, setWaitlistStatus] = useState<'idle' | 'sent'>('idle');

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

  const handleWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail) return;
    // Pour l'instant on stocke en local, on connectera Resend plus tard
    const existing = JSON.parse(localStorage.getItem('pm_couple_waitlist') || '[]');
    existing.push({ email: waitlistEmail, date: new Date().toISOString() });
    localStorage.setItem('pm_couple_waitlist', JSON.stringify(existing));
    setWaitlistStatus('sent');
    setTimeout(() => {
      setWaitlistStatus('idle');
      setWaitlistEmail('');
    }, 4000);
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

        <div className={styles.eyebrow}>IA · Psychologie · Astrologie · TCC</div>
        <h1 className={styles.heroTitle}>
          Comprends ce qui se rejoue.<br />
          <em>Puis transforme-le.</em>
        </h1>
        <p className={styles.heroSub}>
          Anxiété amoureuse, pensées qui tournent en boucle, mêmes scénarios qui se répètent — en couple, au travail, dans ta vie. PerfectMatch croise <strong>psychologie</strong>, <strong>astrologie</strong> et outils de <strong>TCC&nbsp;(thérapie cognitivo-comportementale)</strong> pour identifier tes <strong>pensées automatiques</strong>, tes <strong>distorsions cognitives</strong> et tes <strong>schémas répétitifs</strong> — et t&apos;aider à les dénouer, concrètement.
        </p>
        <div className={styles.heroCtaGroup}>
          <a href="#offres" className={styles.btnPrimary}>Voir les 3 offres</a>
          <a href="/questionnaire" className={styles.btnGhost}>Commencer le test</a>
        </div>
        <div className={styles.painBand}>
          <span className={styles.painLabel}>Ce que PerfectMatch t&apos;aide à dénouer&nbsp;:</span>
          <ul>
            <li>Anxiété et peur du rejet</li>
            <li>Pensées négatives et automatiques</li>
            <li>Schémas amoureux répétitifs</li>
            <li>Blocages en couple, au travail, dans la vie</li>
            <li>Manque de confiance</li>
            <li>Distorsions cognitives</li>
            <li>Mal-être et baisse de moral</li>
          </ul>
        </div>
      </section>

      <section id="distorsions" className={styles.distSection}>
        <div className={styles.sectionLabel}>Les pièges de pensée</div>
        <h2 className={`${styles.sectionTitle} reveal`}>Tu reconnais une de ces <em>voix</em>&nbsp;?</h2>
        <div className={styles.distGrid}>
          <div className={`${styles.distCard} reveal`}>
            <strong>La lecture de pensée</strong>
            <span>« Il a mis trois heures à répondre : il se désintéresse de moi. »</span>
          </div>
          <div className={`${styles.distCard} reveal`}>
            <strong>Le catastrophisme</strong>
            <span>« Ce rendez-vous va forcément mal se passer. »</span>
          </div>
          <div className={`${styles.distCard} reveal`}>
            <strong>Le tout-ou-rien</strong>
            <span>« Si ce n&apos;est pas parfait, c&apos;est un échec. »</span>
          </div>
          <div className={`${styles.distCard} reveal`}>
            <strong>La surgénéralisation</strong>
            <span>« Je tombe toujours sur les mauvaises personnes. »</span>
          </div>
          <div className={`${styles.distCard} reveal`}>
            <strong>L&apos;étiquetage</strong>
            <span>« Je suis nul·le en couple. »</span>
          </div>
          <div className={`${styles.distCard} reveal`}>
            <strong>Le raisonnement émotionnel</strong>
            <span>« Je me sens rejetée, donc je le suis. »</span>
          </div>
        </div>
        <p className={`${styles.distFoot} reveal`}>
          Ces pièges de pensée se repèrent, se questionnent et se remplacent. C&apos;est précisément le travail que tu fais avec PerfectMatch.
        </p>
      </section>

      <section id="pillars" className={styles.section}>
        <div className={styles.sectionLabel}>Les fondations</div>
        <h2 className={`${styles.sectionTitle} reveal`}>Une methode <em>quadruple</em> - unique au monde.</h2>
        <p className={`${styles.sectionLead} reveal`}>Chaque analyse repose sur quatre piliers : trois pour comprendre, un pour transformer.</p>

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
            <p>Triade noire, schémas dysfonctionnels, grille inspirée du DSM-5. <em>Pour comprendre ce qui se rejoue.</em></p>
          </div>
          <div className={`${styles.pillar} reveal`}>
            <div className={styles.pillarNum}>iv.</div>
            <h3>Boîte à outils TCC</h3>
            <p>Carnet de pensées, restructuration cognitive, exercices d&apos;exposition et défis comportementaux. <em>Pour transformer.</em></p>
          </div>
        </div>
      </section>


      <section style={{
        background: 'linear-gradient(135deg,rgba(142,122,181,0.15),rgba(201,162,75,0.08))',
        borderTop: '2px solid rgba(201,162,75,0.4)',
        borderBottom: '2px solid rgba(201,162,75,0.4)',
        padding: '4rem 1.5rem',
        textAlign: 'center'
      }}>
        <div style={{maxWidth: '600px', margin: '0 auto'}}>
          <div style={{display:'inline-block',background:'rgba(201,162,75,0.1)',border:'1px solid rgba(201,162,75,0.3)',color:'#C9A24B',fontSize:'.75rem',fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',padding:'5px 14px',borderRadius:'100px',marginBottom:'1.25rem'}}>
            Nouveau
          </div>
          <h2 style={{fontSize:'clamp(1.5rem,3vw,2rem)',fontWeight:700,marginBottom:'.75rem'}}>
            Emotiflex <em style={{color:'#C9A24B'}}>Digital</em>
          </h2>
          <p style={{color:'#A9A3B8',fontSize:'.95rem',lineHeight:1.6,marginBottom:'2rem'}}>
            Le module d&apos;intelligence emotionnelle de PerfectMatch. Cartes, check-in quotidien, IA de reformulation et exercices de couple.
          </p>
          <a href="/emotiflex" style={{display:'inline-block',background:'linear-gradient(135deg,#C9A24B,#A87C2A)',color:'#0B0A14',fontWeight:700,fontSize:'.95rem',padding:'14px 36px',borderRadius:'4px',textDecoration:'none'}}>
            Decouvrir Emotiflex Digital
          </a>
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
            const isComingSoon = offer.comingSoon === true;
            return (
              <div
                key={id}
                className={`${styles.offer} ${offer.featured ? styles.offerFeatured : ''} reveal`}
                style={isComingSoon ? { opacity: 0.78, position: 'relative' } : {}}
              >
                {isComingSoon && (
                  <div style={{
                    position: 'absolute',
                    top: -12,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(142, 122, 181, 0.95)',
                    color: '#0B0A14',
                    fontSize: 11,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    padding: '6px 16px',
                    borderRadius: 100,
                    zIndex: 5,
                    whiteSpace: 'nowrap',
                  }}>
                    {offer.comingSoonNote || 'Bientot disponible'}
                  </div>
                )}
                {offer.badge && !isComingSoon && <div className={styles.offerBadge}>{offer.badge}</div>}
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

                {isComingSoon ? (
                  <div style={{ marginTop: 'auto' }}>
                    {waitlistStatus === 'sent' ? (
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
                        ✦ Tu seras prevenu·e en premier
                      </div>
                    ) : (
                      <form onSubmit={handleWaitlist} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <input
                          type="email"
                          required
                          placeholder="Ton email pour etre prevenu·e"
                          value={waitlistEmail}
                          onChange={(e) => setWaitlistEmail(e.target.value)}
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
                          }}
                        />
                        <button
                          type="submit"
                          style={{
                            width: '100%',
                            padding: 16,
                            border: '1px solid rgba(142, 122, 181, 0.6)',
                            background: 'linear-gradient(135deg, rgba(142, 122, 181, 0.2), rgba(142, 122, 181, 0.05))',
                            color: '#F5EFE3',
                            fontFamily: 'inherit',
                            fontSize: 13,
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            fontWeight: 500,
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            borderRadius: 2,
                          }}
                        >
                          Me prevenir au lancement
                        </button>
                      </form>
                    )}
                  </div>
                ) : (
                  offer.isAmazon ? (<a href={offer.amazonUrl as string} target="_blank" rel="noopener noreferrer" className={styles.offerCta} style={{display:"block",textAlign:"center",textDecoration:"none"}}>Commander sur Amazon</a>) : offer.isNutrition ? (<a href="/nutrition" className={styles.offerCta} style={{display:"block",textAlign:"center",textDecoration:"none"}}>7 jours gratuits →</a>) : (<button onClick={() => handleCheckout(offer.id)} className={styles.offerCta}>Obtenir pour {offer.price}€</button>)
                )}
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
            <li>
              <div className={styles.methodNum}>05.</div>
              <div>
                <h4>Tu passes à l&apos;action</h4>
                <p>Carnet de pensées, exercices TCC et micro-défis : tu transformes ce que tu as compris en habitudes concrètes.</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section style={{background:"rgba(142,122,181,0.06)",borderTop:"1px solid rgba(142,122,181,0.2)",borderBottom:"1px solid rgba(142,122,181,0.2)",padding:"4rem 1.5rem",textAlign:"center"}}><div style={{maxWidth:"600px",margin:"0 auto"}}><div style={{display:"inline-block",background:"rgba(201,162,75,0.1)",border:"1px solid rgba(201,162,75,0.3)",color:"#C9A24B",fontSize:".75rem",fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",padding:"5px 14px",borderRadius:"100px",marginBottom:"1.25rem"}}>Nouveau</div><h2 style={{fontSize:"clamp(1.5rem,3vw,2rem)",fontWeight:700,marginBottom:".75rem"}}>Emotiflex <em style={{color:"#C9A24B"}}>Digital</em></h2><p style={{color:"#A9A3B8",fontSize:".95rem",lineHeight:1.6,marginBottom:"2rem"}}>Le module d intelligence emotionnelle de PerfectMatch. Cartes, check-in quotidien, IA de reformulation et exercices de couple — pour des relations plus saines.</p><div style={{display:"flex",gap:".75rem",flexWrap:"wrap",justifyContent:"center",marginBottom:"2rem"}}><span style={{background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",padding:"6px 14px",borderRadius:"100px",fontSize:".82rem",color:"#C5BFD4"}}>Cartes emotionnelles</span><span style={{background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",padding:"6px 14px",borderRadius:"100px",fontSize:".82rem",color:"#C5BFD4"}}>IA de reformulation</span><span style={{background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",padding:"6px 14px",borderRadius:"100px",fontSize:".82rem",color:"#C5BFD4"}}>Mode couple</span></div><a href="/emotiflex" style={{display:"inline-block",background:"linear-gradient(135deg,#C9A24B,#A87C2A)",color:"#0B0A14",fontWeight:700,fontSize:".95rem",padding:"14px 36px",borderRadius:"4px",textDecoration:"none"}}>Decouvrir Emotiflex Digital</a></div></section>

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
