'use client';

import { useState } from 'react';
import styles from './emotiflex.module.css';

const CARDS = [
  { emotion: "Je me sens ignoré(e)", question: "Quel besoin n'est pas satisfait en ce moment ?", conseil: "Exprime ce besoin avec douceur, sans reproche." },
  { emotion: "J'ai peur d'être abandonné(e)", question: "D'où vient cette peur ? Est-elle liée au présent ou au passé ?", conseil: "Distingue la réalité de la projection émotionnelle." },
  { emotion: "Je me sens incompris(e)", question: "As-tu vraiment exprimé ce que tu ressentais ?", conseil: "Commence par décrire ton émotion avant d'expliquer la situation." },
  { emotion: "Je suis en colère", question: "Quelle blessure se cache derrière cette colère ?", conseil: "La colère est souvent de la tristesse ou de la peur déguisée." },
  { emotion: "Je me sens seul(e)", question: "De quelle forme de connexion as-tu besoin en ce moment ?", conseil: "La solitude émotionnelle peut exister même entouré(e) de monde." },
  { emotion: "Je doute de moi", question: "Quel serait ton message si tu te parlais comme à un ami ?", conseil: "Tu mérites la même bienveillance que tu offres aux autres." },
];

const REFORMULATIONS = [
  { brut: "Tu ne fais jamais attention à moi.", reformule: "Quand je n'ai pas de nouvelles, je me sens mis(e) à distance et j'aurais besoin de plus de présence." },
  { brut: "Tu m'ignores toujours.", reformule: "Quand je me sens ignoré(e), j'ai besoin de me sentir important(e) dans notre relation." },
  { brut: "Tu ne m'aimes plus.", reformule: "Lately, j'ai du mal à me sentir connecté(e) à toi. As-tu remarqué quelque chose ?" },
];

export default function EmotiflexPage() {
  const [activeCard, setActiveCard] = useState(0);
  const [showCard, setShowCard] = useState(false);
  const [checkin, setCheckin] = useState<string | null>(null);
  const [reformIdx, setReformIdx] = useState(0);

  const EMOTIONS = ["Anxieux(se)", "Frustré(e)", "Triste", "Reconnais(sant)e", "Distant(e)", "Incompris(e)", "En colère", "Seul(e)"];

  return (
    <main className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.badge}>✨ Nouveau module</div>
        <h1 className={styles.title}>
          <span className={styles.gold}>Emotiflex</span>
          <br />Intelligence émotionnelle
        </h1>
        <p className={styles.subtitle}>
          Comprenez vos émotions. Transformez votre communication. Renforcez vos relations.
        </p>
        <div className={styles.pills}>
          <span>🃏 Cartes émotionnelles</span>
          <span>📅 Check-in quotidien</span>
          <span>🤖 IA émotionnelle</span>
          <span>💑 Mode couple</span>
        </div>
        <a href="#offre" className={styles.btnPrimary}>Découvrir l'offre</a>
      </section>

      {/* DEMO CHECK-IN */}
      <section className={styles.section}>
        <div className={styles.sectionLabel}>1 — Check-in émotionnel</div>
        <h2 className={styles.h2}>Comment te sens-tu aujourd'hui ?</h2>
        <p className={styles.text}>Chaque jour, identifie ton émotion dominante pour mieux la comprendre et l'exprimer.</p>
        <div className={styles.emotionGrid}>
          {EMOTIONS.map(e => (
            <button
              key={e}
              className={`${styles.emotionBtn} ${checkin === e ? styles.selected : ''}`}
              onClick={() => setCheckin(e)}
            >
              {e}
            </button>
          ))}
        </div>
        {checkin && (
          <div className={styles.checkinResult}>
            <p>Tu te sens <strong>{checkin}</strong>.</p>
            <p className={styles.muted}>Emotiflex va t'aider à explorer et exprimer cette émotion.</p>
          </div>
        )}
      </section>

      {/* DEMO CARTES */}
      <section className={styles.section}>
        <div className={styles.sectionLabel}>2 — Cartes émotionnelles</div>
        <h2 className={styles.h2}>Tire une carte émotionnelle</h2>
        <p className={styles.text}>50+ cartes pour explorer tes émotions en profondeur avec des questions guidées.</p>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <button
            className={styles.btnPrimary}
            onClick={() => { setActiveCard(Math.floor(Math.random() * CARDS.length)); setShowCard(true); }}
          >
            🃏 Tirer une carte
          </button>
        </div>
        {showCard && (
          <div className={styles.card}>
            <div className={styles.cardEmotion}>"{CARDS[activeCard].emotion}"</div>
            <div className={styles.cardQuestion}>❓ {CARDS[activeCard].question}</div>
            <div className={styles.cardConseil}>💡 {CARDS[activeCard].conseil}</div>
          </div>
        )}
      </section>

      {/* DEMO IA REFORMULATION */}
      <section className={styles.section}>
        <div className={styles.sectionLabel}>3 — IA émotionnelle</div>
        <h2 className={styles.h2}>Transforme tes messages</h2>
        <p className={styles.text}>L'IA reformule tes messages pour une communication plus empathique et efficace.</p>
        <div className={styles.reformCard}>
          <div className={styles.reformBrut}>
            <span className={styles.tag}>Message brut</span>
            <p>"{REFORMULATIONS[reformIdx].brut}"</p>
          </div>
          <div className={styles.arrow}>→</div>
          <div className={styles.reformResult}>
            <span className={styles.tagGreen}>Reformulation empathique</span>
            <p>"{REFORMULATIONS[reformIdx].reformule}"</p>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <button className={styles.btnGhost} onClick={() => setReformIdx((reformIdx + 1) % REFORMULATIONS.length)}>
            Voir un autre exemple →
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section className={styles.section}>
        <h2 className={styles.h2} style={{ textAlign: 'center' }}>Tout ce qu'inclut Emotiflex Digital</h2>
        <div className={styles.featGrid}>
          {[
            { icon: '📅', title: 'Check-in quotidien', desc: 'Identifie ton humeur, ton émotion et ton besoin chaque jour.' },
            { icon: '🃏', title: '50+ cartes émotionnelles', desc: 'Explore chaque émotion avec des questions guidées profondes.' },
            { icon: '🤖', title: 'IA de reformulation', desc: 'Transforme tes messages pour une communication saine.' },
            { icon: '💑', title: 'Mode couple', desc: 'Exercices à deux, discussions guidées, check-in partagé.' },
            { icon: '📓', title: 'Journal émotionnel', desc: 'Suis tes émotions, tes déclencheurs et ton évolution.' },
            { icon: '🗺️', title: 'Parcours guidés', desc: 'Peur du rejet, jalousie, confiance, communication...' },
          ].map(f => (
            <div key={f.title} className={styles.featCard}>
              <div className={styles.featIcon}>{f.icon}</div>
              <div className={styles.featTitle}>{f.title}</div>
              <div className={styles.featDesc}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* OFFRE */}
      <section id="offre" className={styles.offreSection}>
        <div className={styles.offreBadge}>✨ Lancement</div>
        <h2 className={styles.h2}>Emotiflex Digital</h2>
        <div className={styles.price}>
          <span className={styles.priceAmount}>12</span>
          <span className={styles.priceCur}>€</span>
          <span className={styles.priceUnit}>/mois</span>
        </div>
        <ul className={styles.featureList}>
          <li>✅ Check-in émotionnel quotidien</li>
          <li>✅ 50+ cartes émotionnelles digitales</li>
          <li>✅ IA de reformulation émotionnelle</li>
          <li>✅ Exercices de communication en couple</li>
          <li>✅ Journal émotionnel personnel</li>
          <li>✅ Parcours guidés thématiques</li>
          <li>✅ Compatible avec le jeu physique Emotiflex</li>
        </ul>
        <button className={styles.btnPrimary} style={{ fontSize: '1.1rem', padding: '18px 48px' }}>
          Commencer — 12€/mois
        </button>
        <p className={styles.muted} style={{ marginTop: '1rem', fontSize: '0.82rem' }}>
          Sans engagement · Annulable à tout moment
        </p>
        <div style={{ marginTop: '2rem', padding: '1.25rem', border: '1px solid rgba(212,168,67,0.3)', borderRadius: '8px' }}>
          <p style={{ fontSize: '0.85rem', color: '#c9a24b', marginBottom: '0.5rem' }}>💡 Vous avez le jeu physique Emotiflex ?</p>
          <p className={styles.muted} style={{ fontSize: '0.82rem' }}>
            La version digitale est le compagnon idéal du jeu de cartes. Ensemble, ils forment un système complet d'intelligence émotionnelle.
          </p>
          <a
            href="https://www.amazon.fr/EMOTIFLEX-Th%C3%A9rapeutique-Communiquer-empathie-Relations/dp/B0DYK3MSP1"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnGhost}
            style={{ marginTop: '0.75rem', display: 'inline-block' }}
          >
            Commander le jeu physique sur Amazon — 29,90€
          </a>
        </div>
      </section>
    </main>
  );
}
