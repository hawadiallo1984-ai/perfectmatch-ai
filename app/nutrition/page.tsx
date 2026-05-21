'use client';

import { useState } from 'react';
import styles from './nutrition.module.css';

type Step = 'profil' | 'fatigue' | 'envies' | 'sucre' | 'stress' | 'compulsions' | 'energie' | 'resultat';

const STEPS: Step[] = ['profil', 'fatigue', 'envies', 'sucre', 'stress', 'compulsions', 'energie', 'resultat'];

const QUESTIONS: Record<Step, { title: string; subtitle: string; options: string[] }> = {
  profil: {
    title: "Quel est ton profil émotionnel ?",
    subtitle: "Ton rapport à la nourriture commence dans ta tête.",
    options: ["Je mange quand je suis stressé(e)", "Je saute des repas sans m'en rendre compte", "Je mange par ennui ou habitude", "J'ai une relation saine avec la nourriture", "Je mange mes émotions (tristesse, anxiété)"]
  },
  fatigue: {
    title: "Quel est ton niveau de fatigue ?",
    subtitle: "La fatigue influence directement tes choix alimentaires.",
    options: ["Épuisé(e) — je tiens à peine debout", "Fatigué(e) mais fonctionnel(le)", "Énergie correcte mais fluctuante", "En forme et énergique"]
  },
  envies: {
    title: "Quelles sont tes envies alimentaires ?",
    subtitle: "Tes envies parlent de tes besoins profonds.",
    options: ["Sucré — chocolat, gâteaux, bonbons", "Salé — chips, fromage, charcuterie", "Gras et réconfortant — pizza, burger", "Épicé et intense", "Je n'ai pas vraiment d'envies particulières"]
  },
  sucre: {
    title: "Ton rapport au sucre",
    subtitle: "Le sucre est souvent lié aux émotions.",
    options: ["Je suis accro — impossible de résister", "J'en mange trop mais je peux m'arrêter", "J'en mange modérément", "Je l'évite au maximum", "Je ne suis pas attiré(e) par le sucre"]
  },
  stress: {
    title: "Ton niveau de stress actuel",
    subtitle: "Le stress chronique perturbe la faim et les envies.",
    options: ["Très élevé — je suis constamment sous pression", "Élevé — plusieurs sources de stress", "Modéré — gérable au quotidien", "Faible — je me sens globalement serein(e)"]
  },
  compulsions: {
    title: "As-tu des compulsions alimentaires ?",
    subtitle: "Les compulsions sont souvent des signaux émotionnels.",
    options: ["Oui, souvent — surtout le soir", "Oui, parfois — lors de moments difficiles", "Rarement — seulement en période de stress", "Non — je mange de façon régulière et consciente"]
  },
  energie: {
    title: "Comment est ton énergie après les repas ?",
    subtitle: "L'énergie post-repas révèle beaucoup sur ta nutrition.",
    options: ["Je suis épuisé(e) — je dois faire une sieste", "Lourd(e) et sans entrain", "Stable — ni haut ni bas", "Énergique et focalisé(e)"]
  },
  resultat: {
    title: "", subtitle: "", options: []
  }
};

type Answers = Partial<Record<Step, string>>;

const RECETTES: Record<string, string[]> = {
  stress: ["Bowl zen au quinoa et légumes rôtis", "Soupe miso et tofu soyeux", "Porridge à la banane et graines de chia"],
  sucre: ["Dattes au beurre de cacahuète", "Smoothie banane-cacao sans sucre ajouté", "Carrés d'énergie avoine-miel"],
  fatigue: ["Salade boost au saumon et avocat", "Oeufs brouillés aux épinards et curcuma", "Granola protéiné maison"],
  defaut: ["Bowl méditerranéen équilibré", "Omelette aux herbes fraîches", "Salade de lentilles et feta"]
};

function getRecettes(answers: Answers): string[] {
  if (answers.stress === "Très élevé — je suis constamment sous pression") return RECETTES.stress;
  if (answers.sucre === "Je suis accro — impossible de résister") return RECETTES.sucre;
  if (answers.fatigue === "Épuisé(e) — je tiens à peine debout") return RECETTES.fatigue;
  return RECETTES.defaut;
}

function getMessage(answers: Answers): string {
  if (answers.profil?.includes("émotions")) return "Tu utilises la nourriture comme régulateur émotionnel — c'est très courant. Perfect Match Nutrition va t'aider à identifier tes déclencheurs et trouver des alternatives saines et délicieuses.";
  if (answers.stress?.includes("Très élevé")) return "Ton niveau de stress impacte directement tes choix alimentaires. On va commencer par des recettes anti-stress qui nourrissent ton système nerveux.";
  if (answers.fatigue?.includes("Épuisé")) return "La fatigue te pousse vers des aliments rapides et énergétiques. On va construire des menus qui stabilisent ton énergie tout au long de la journée.";
  return "Ton profil nutritionnel est unique. Perfect Match Nutrition va personnaliser tes menus selon tes émotions, ton énergie et tes envies du moment.";
}

export default function NutritionPage() {
  const [currentStep, setCurrentStep] = useState<Step>('profil');
  const [answers, setAnswers] = useState<Answers>({});
  const [started, setStarted] = useState(false);

  const stepIndex = STEPS.indexOf(currentStep);
  const progress = (stepIndex / (STEPS.length - 1)) * 100;

  const handleAnswer = (answer: string) => {
    const newAnswers = { ...answers, [currentStep]: answer };
    setAnswers(newAnswers);
    const next = STEPS[stepIndex + 1];
    if (next) setCurrentStep(next);
  };

  const recettes = getRecettes(answers);
  const message = getMessage(answers);

  if (!started) {
    return (
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.badge}>🥗 Nouveau</div>
          <h1 className={styles.title}>
            Perfect Match<br /><span className={styles.green}>Nutrition</span>
          </h1>
          <p className={styles.subtitle}>
            La nutrition qui correspond à ton profil émotionnel.<br />
            Recettes, menus et routines personnalisés selon tes émotions, ton stress et ton énergie.
          </p>
          <div className={styles.pillsGrid}>
            {["🧠 Profil émotionnel", "⚡ Niveau d'énergie", "🍫 Rapport au sucre", "😤 Gestion du stress", "🍽️ Recettes adaptées", "💪 Routines anti-grignotage"].map(p => (
              <span key={p} className={styles.pill}>{p}</span>
            ))}
          </div>
          <button className={styles.btnPrimary} onClick={() => setStarted(true)}>
            Découvrir mon profil nutritionnel
          </button>
          <p className={styles.muted} style={{ marginTop: '1rem', fontSize: '0.82rem' }}>
            7 jours gratuits · Puis 19€/mois · Sans engagement
          </p>
        </section>

        {/* FEATURES */}
        <section className={styles.section}>
          <h2 className={styles.h2} style={{ textAlign: 'center' }}>Comment ça fonctionne ?</h2>
          <div className={styles.stepsGrid}>
            {[
              { num: "01", title: "Profil en 7 questions", desc: "Réponds à 7 questions sur tes émotions, ta fatigue, tes envies et ton stress." },
              { num: "02", title: "Analyse personnalisée", desc: "L'IA analyse ton profil nutritionnel émotionnel unique." },
              { num: "03", title: "Recettes et menus", desc: "Reçois des recettes adaptées, des menus de la semaine et des routines anti-grignotage." },
              { num: "04", title: "Suivi et ajustement", desc: "Ton profil évolue avec toi. Chaque semaine, de nouvelles suggestions adaptées." },
            ].map(s => (
              <div key={s.num} className={styles.stepCard}>
                <div className={styles.stepNum}>{s.num}</div>
                <div className={styles.stepTitle}>{s.title}</div>
                <div className={styles.stepDesc}>{s.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* OFFRE */}
        <section id="offre" className={styles.offreSection}>
          <div className={styles.offreBadge}>🎁 7 jours offerts</div>
          <h2 className={styles.h2}>Perfect Match Nutrition</h2>
          <div className={styles.price}>
            <span className={styles.priceAmount}>19</span>
            <span className={styles.priceCur}>€</span>
            <span className={styles.priceUnit}>/mois</span>
          </div>
          <p className={styles.muted} style={{ marginBottom: '2rem' }}>Après 7 jours d&apos;essai gratuit</p>
          <ul className={styles.featureList}>
            <li>✅ Profil nutritionnel émotionnel complet</li>
            <li>✅ Recettes personnalisées chaque semaine</li>
            <li>✅ Menus anti-stress et anti-fatigue</li>
            <li>✅ Routines anti-grignotage guidées</li>
            <li>✅ Encouragements émotionnels quotidiens</li>
            <li>✅ Suivi de ton énergie et humeur</li>
            <li>✅ Mis à jour chaque semaine</li>
          </ul>
          <button className={styles.btnPrimary} style={{ fontSize: '1.1rem', padding: '18px 48px' }} onClick={() => setStarted(true)}>
            Commencer gratuitement — 7 jours offerts
          </button>
          <p className={styles.muted} style={{ marginTop: '1rem', fontSize: '0.82rem' }}>
            Sans engagement · Annulable à tout moment · 19€/mois après l&apos;essai
          </p>
        </section>
      </main>
    );
  }

  if (currentStep === 'resultat') {
    return (
      <main className={styles.page}>
        <section className={styles.resultatSection}>
          <div className={styles.badge}>🥗 Ton profil nutritionnel</div>
          <h2 className={styles.h2}>Tes résultats personnalisés</h2>
          <div className={styles.messageCard}>
            <p>{message}</p>
          </div>

          <h3 className={styles.h3}>🍽️ Recettes recommandées pour toi</h3>
          <div className={styles.recettesGrid}>
            {recettes.map(r => (
              <div key={r} className={styles.recetteCard}>
                <div className={styles.recetteIcon}>🥗</div>
                <div className={styles.recetteTitle}>{r}</div>
              </div>
            ))}
          </div>

          <h3 className={styles.h3}>💪 Routine anti-grignotage</h3>
          <div className={styles.routineCard}>
            <div className={styles.routineItem}>⏰ <strong>Matin</strong> — Petit-déjeuner protéiné pour éviter les fringales de 10h</div>
            <div className={styles.routineItem}>🌿 <strong>Collation</strong> — Une poignée d&apos;oléagineux ou un fruit frais</div>
            <div className={styles.routineItem}>🌙 <strong>Soir</strong> — Tisane apaisante pour couper l&apos;envie de grignoter</div>
          </div>

          <div className={styles.ctaBlock}>
            <div className={styles.offreBadge}>🎁 7 jours gratuits</div>
            <h3 className={styles.h3}>Accéder à ton programme complet</h3>
            <p className={styles.muted}>Recettes hebdomadaires, menus complets, suivi émotionnel et routines personnalisées.</p>
            <button className={styles.btnPrimary} style={{ fontSize: '1.05rem', padding: '16px 40px', marginTop: '1.5rem' }}>
              Commencer — 7 jours gratuits
            </button>
            <p className={styles.muted} style={{ fontSize: '0.8rem', marginTop: '0.75rem' }}>Puis 19€/mois · Sans engagement</p>
          </div>
        </section>
      </main>
    );
  }

  const q = QUESTIONS[currentStep];

  return (
    <main className={styles.page}>
      <section className={styles.quizSection}>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>
        <div className={styles.stepCount}>{stepIndex + 1} / {STEPS.length - 1}</div>
        <h2 className={styles.quizTitle}>{q.title}</h2>
        <p className={styles.quizSubtitle}>{q.subtitle}</p>
        <div className={styles.optionsGrid}>
          {q.options.map(opt => (
            <button key={opt} className={styles.optionBtn} onClick={() => handleAnswer(opt)}>
              {opt}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
