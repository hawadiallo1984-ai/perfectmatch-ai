'use client';

import { useState } from 'react';
import styles from './emotiflex.module.css';

type Dimension = 'couple' | 'prive' | 'professionnel';

const CARDS: Record<Dimension, Array<{emotion: string; question: string; conseil: string}>> = {
  couple: [
    { emotion: "Je me sens ignoré(e) par mon partenaire", question: "Quel besoin affectif n'est pas satisfait en ce moment ?", conseil: "Exprime ce besoin avec douceur, sans reproche direct." },
    { emotion: "J'ai peur que notre relation s'essouffle", question: "Qu'est-ce qui te manque dans votre connexion ?", conseil: "Parle de tes attentes avant qu'elles deviennent des frustrations." },
    { emotion: "Je ne me sens pas compris(e)", question: "As-tu vraiment exprimé ce que tu ressentais à ton partenaire ?", conseil: "Commence par décrire ton émotion avant d'expliquer la situation." },
    { emotion: "Je ressens de la jalousie", question: "Quelle insécurité se cache derrière cette jalousie ?", conseil: "La jalousie révèle souvent une peur de perdre ou de ne pas être suffisant(e)." },
    { emotion: "Nous n'arrêtons pas de nous disputer", question: "Quel besoin profond chacun de vous deux cherche-t-il à défendre ?", conseil: "Les conflits répétés cachent souvent un manque de reconnaissance mutuelle." },
  ],
  prive: [
    { emotion: "Je me sens perdu(e) dans ma vie", question: "Qu'est-ce qui te donnait du sens avant et que tu as perdu ?", conseil: "Reconnecter avec ses valeurs fondamentales aide à retrouver la direction." },
    { emotion: "J'ai peur d'être abandonné(e)", question: "D'où vient cette peur ? Est-elle liée au présent ou au passé ?", conseil: "Distingue la réalité de la projection émotionnelle." },
    { emotion: "Je doute de ma valeur", question: "Quel serait ton message si tu te parlais comme à un ami proche ?", conseil: "Tu mérites la même bienveillance que tu offres aux autres." },
    { emotion: "Je me sens seul(e) même entouré(e)", question: "De quelle forme de connexion as-tu réellement besoin ?", conseil: "La solitude émotionnelle peut exister même au milieu de la foule." },
    { emotion: "Je suis épuisé(e) émotionnellement", question: "Qu'est-ce qui consomme le plus ton énergie émotionnelle en ce moment ?", conseil: "Identifier ses vampires émotionnels est la première étape pour se protéger." },
  ],
  professionnel: [
    { emotion: "Je me sens sous-estimé(e) au travail", question: "Qu'est-ce que tu aimerais que tes collègues reconnaissent en toi ?", conseil: "Communiquer ses besoins de reconnaissance est une force, pas une faiblesse." },
    { emotion: "Je suis en conflit avec un collègue", question: "Quel besoin professionnel non satisfait alimente ce conflit ?", conseil: "Cherche le besoin derrière le comportement, pas seulement le comportement." },
    { emotion: "Je n'ose pas m'affirmer dans mon équipe", question: "Quelle peur t'empêche de prendre ta place ?", conseil: "S'affirmer avec empathie est une compétence qui s'apprend et se pratique." },
    { emotion: "Je ressens du stress face à mon manager", question: "Qu'est-ce qui te manque pour te sentir en sécurité dans cette relation ?", conseil: "Clarifier les attentes mutuelles réduit considérablement le stress relationnel." },
    { emotion: "Je me sens vidé(e) après les réunions", question: "Quelles interactions t'épuisent le plus et pourquoi ?", conseil: "Reconnaitre ses limites relationnelles est essentiel pour se préserver." },
  ],
};

const REFORMULATIONS = [
  { brut: "Tu ne fais jamais attention à moi.", reformule: "Quand je n'ai pas de nouvelles, je me sens mis(e) à distance et j'aurais besoin de plus de présence." },
  { brut: "Tu m'ignores toujours.", reformule: "Quand je me sens ignoré(e), j'ai besoin de me sentir important(e) dans notre relation." },
  { brut: "Il/elle ne me respecte pas.", reformule: "Je me sens blessé(e) par cette situation et j'aimerais qu'on en parle pour trouver quelque chose de plus respectueux pour nous deux." },
  { brut: "Personne ne m'écoute dans cette équipe.", reformule: "J'ai l'impression que mes idées ne sont pas entendues. J'aimerais qu'on me donne l'opportunité de m'exprimer davantage." },
];

const EMOTIONS = ["Anxieux(se)", "Frustré(e)", "Triste", "Reconnaissant(e)", "Distant(e)", "Incompris(e)", "En colère", "Seul(e)", "Épuisé(e)", "Confiant(e)"];

const DIM_LABELS: Record<Dimension, {label: string; icon: string; color: string; desc: string}> = {
  couple: { label: "Couple", icon: "💑", color: "#e8547a", desc: "Relations amoureuses et communication intime" },
  prive: { label: "Privé", icon: "🌿", color: "#8E7AB5", desc: "Introspection et développement personnel" },
  professionnel: { label: "Professionnel", icon: "💼", color: "#C9A24B", desc: "Relations au travail et affirmation de soi" },
};

export default function EmotiflexPage() {
  const [activeDim, setActiveDim] = useState<Dimension>('couple');
  const [activeCard, setActiveCard] = useState(0);
  const [showCard, setShowCard] = useState(false);
  const [checkin, setCheckin] = useState<string | null>(null);
  const [reformIdx, setReformIdx] = useState(0);

  const dimColor = DIM_LABELS[activeDim].color;

  return (
    <main className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.badge}>✨ 53 cartes · 3 dimensions</div>
        <h1 className={styles.title}>
          <span className={styles.gold}>Emotiflex</span>
          <br />Intelligence émotionnelle
        </h1>
        <p className={styles.subtitle}>
          Comprenez vos émotions. Transformez votre communication.<br />
          Renforcez vos relations — amoureuses, personnelles et professionnelles.
        </p>
        <div className={styles.dimPills}>
          {(Object.keys(DIM_LABELS) as Dimension[]).map(d => (
            <div key={d} className={styles.dimPill}>
              <span>{DIM_LABELS[d].icon}</span>
              <span style={{ fontWeight: 600 }}>{DIM_LABELS[d].label}</span>
              <span style={{ color: '#A9A3B8', fontSize: '0.8rem' }}>{DIM_LABELS[d].desc}</span>
            </div>
          ))}
        </div>
        <a href="#offre" className={styles.btnPrimary}>Découvrir l&apos;offre</a>
      </section>

      {/* DEMO CHECK-IN */}
      <section className={styles.section}>
        <div className={styles.sectionLabel}>1 — Check-in émotionnel</div>
        <h2 className={styles.h2}>Comment te sens-tu aujourd&apos;hui ?</h2>
        <p className={styles.text}>Identifie ton émotion dominante pour mieux la comprendre et l&apos;exprimer.</p>
        <div className={styles.emotionGrid}>
          {EMOTIONS.map(e => (
            <button key={e} className={`${styles.emotionBtn} ${checkin === e ? styles.selected : ''}`} onClick={() => setCheckin(e)}>
              {e}
            </button>
          ))}
        </div>
        {checkin && (
          <div className={styles.checkinResult}>
            <p>Tu te sens <strong>{checkin}</strong>.</p>
            <p className={styles.muted}>Emotiflex va t&apos;aider à explorer et exprimer cette émotion.</p>
          </div>
        )}
      </section>

      {/* DEMO CARTES avec 3 dimensions */}
      <section className={styles.section}>
        <div className={styles.sectionLabel}>2 — Cartes émotionnelles</div>
        <h2 className={styles.h2}>3 dimensions · 53 cartes</h2>
        <p className={styles.text}>Chaque dimension explore un aspect différent de ta vie émotionnelle.</p>
        
        {/* Dimension selector */}
        <div className={styles.dimSelector}>
          {(Object.keys(DIM_LABELS) as Dimension[]).map(d => (
            <button
              key={d}
              className={`${styles.dimBtn} ${activeDim === d ? styles.dimActive : ''}`}
              style={activeDim === d ? { borderColor: DIM_LABELS[d].color, color: DIM_LABELS[d].color, background: `${DIM_LABELS[d].color}15` } : {}}
              onClick={() => { setActiveDim(d); setShowCard(false); }}
            >
              {DIM_LABELS[d].icon} {DIM_LABELS[d].label}
            </button>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <button
            className={styles.btnPrimary}
            style={{ background: `linear-gradient(135deg, ${dimColor}, ${dimColor}99)` }}
            onClick={() => {
              setActiveCard(Math.floor(Math.random() * CARDS[activeDim].length));
              setShowCard(true);
            }}
          >
            🃏 Tirer une carte {DIM_LABELS[activeDim].label}
          </button>
        </div>

        {showCard && (
          <div className={styles.card} style={{ borderColor: dimColor }}>
            <div className={styles.cardDimBadge} style={{ background: `${dimColor}20`, color: dimColor }}>
              {DIM_LABELS[activeDim].icon} {DIM_LABELS[activeDim].label}
            </div>
            <div className={styles.cardEmotion}>&ldquo;{CARDS[activeDim][activeCard].emotion}&rdquo;</div>
            <div className={styles.cardQuestion}>❓ {CARDS[activeDim][activeCard].question}</div>
            <div className={styles.cardConseil}>💡 {CARDS[activeDim][activeCard].conseil}</div>
          </div>
        )}
      </section>

      {/* DEMO IA REFORMULATION */}
      <section className={styles.section}>
        <div className={styles.sectionLabel}>3 — IA émotionnelle</div>
        <h2 className={styles.h2}>Transforme tes messages</h2>
        <p className={styles.text}>L&apos;IA reformule tes messages pour une communication plus empathique et efficace.</p>
        <div className={styles.reformCard}>
          <div className={styles.reformBrut}>
            <span className={styles.tag}>Message brut</span>
            <p>&ldquo;{REFORMULATIONS[reformIdx].brut}&rdquo;</p>
          </div>
          <div className={styles.arrow}>→</div>
          <div className={styles.reformResult}>
            <span className={styles.tagGreen}>Reformulation empathique</span>
            <p>&ldquo;{REFORMULATIONS[reformIdx].reformule}&rdquo;</p>
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
        <h2 className={styles.h2} style={{ textAlign: 'center' }}>Tout ce qu&apos;inclut Emotiflex Digital</h2>
        <div className={styles.featGrid}>
          {[
            { icon: '💑', title: 'Dimension Couple', desc: '15 cartes pour améliorer la communication amoureuse et renforcer la connexion.' },
            { icon: '🌿', title: 'Dimension Privé', desc: '20 cartes pour l\'introspection, la connaissance de soi et le développement personnel.' },
            { icon: '💼', title: 'Dimension Professionnel', desc: '18 cartes pour s\'affirmer, gérer les conflits et améliorer les relations au travail.' },
            { icon: '📅', title: 'Check-in quotidien', desc: 'Identifie ton humeur, ton émotion et ton besoin chaque jour.' },
            { icon: '🤖', title: 'IA de reformulation', desc: 'Transforme tes messages pour une communication saine et empathique.' },
            { icon: '📓', title: 'Journal émotionnel', desc: 'Suis tes émotions, tes déclencheurs et ton évolution dans le temps.' },
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
          <li>✅ 53 cartes émotionnelles digitales (3 dimensions)</li>
          <li>✅ Check-in émotionnel quotidien guidé</li>
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
            La version digitale est le compagnon idéal du jeu de cartes. 53 cartes · 3 dimensions : Couple, Privé, Professionnel.
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
