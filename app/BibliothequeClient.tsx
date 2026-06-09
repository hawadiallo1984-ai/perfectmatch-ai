'use client';

import { useEffect } from 'react';
import { INTL_GUIDES } from '@/lib/guidesIntl';
import { NEW_GUIDES } from '@/lib/newGuides';
import { PRO_GUIDES } from '@/lib/proGuides';
import { PRO_GUIDES_2 } from '@/lib/proGuides2';
import { PRO_GUIDES_3 } from '@/lib/proGuides3';
import { PRO_GUIDES_4 } from '@/lib/proGuides4';
import { PRO_GUIDES_5 } from '@/lib/proGuides5';
import { PRO_GUIDES_6 } from '@/lib/proGuides6';
import { PRO_GUIDES_7 } from '@/lib/proGuides7';
import { PRO_GUIDES_8 } from '@/lib/proGuides8';
import { PRO_GUIDES_9 } from '@/lib/proGuides9';
import { PRO_GUIDES_10 } from '@/lib/proGuides10';
import { PRO_GUIDES_11 } from '@/lib/proGuides11';
import { PRO_GUIDES_12 } from '@/lib/proGuides12';
import { BUNDLES } from '@/lib/bundles';
import BundleBuyButton from '@/components/BundleBuyButton';
import SiteNav from '@/components/SiteNav';
import styles from '@/app/page.module.css';

const SECTIONS = [
  {
    id: 'amour-relations',
    label: 'Amour & Relations',
    guides: [
      {
        id: 'styles-attachement',
        title: "Styles d'attachement",
        desc: 'Comprends ton schéma relationnel pour choisir et aimer autrement.',
        href: '/guides/styles-attachement',
      },
      {
        id: 'guerir-rupture',
        title: "Guérir d'une rupture",
        desc: 'Traverser le deuil amoureux et reconstruire sans se perdre.',
        href: '/guides/guerir-rupture',
      },
      {
        id: 'gestion-celibat',
        title: 'Bien vivre son célibat',
        desc: "Faire du célibat un espace de croissance, pas d'attente.",
        href: '/guides/gestion-celibat',
      },
      {
        id: 'reconnaitre-controle-coercitif',
        title: 'Reconnaître le contrôle coercitif',
        desc: 'Nommer l\'emprise pour t\'en libérer.',
        href: '/guides/reconnaitre-controle-coercitif',
      },
      {
        id: 'sortir-du-gaslighting',
        title: 'Sortir du gaslighting',
        desc: 'Te refaire confiance quand on te fait douter de tout.',
        href: '/guides/sortir-du-gaslighting',
      },
      {
        id: 'apprendre-a-dire-non',
        title: 'Apprendre à dire non',
        desc: 'Poser tes limites sans culpabiliser.',
        href: '/guides/apprendre-a-dire-non',
      },
      {
        id: 'communication-assertive',
        title: 'Communication assertive',
        desc: 'Te faire entendre, sans t\'écraser ni écraser.',
        href: '/guides/communication-assertive',
      },
      {
        id: 'habiletes-sociales',
        title: 'Habiletés sociales',
        desc: 'Créer du lien, ça s\'apprend.',
        href: '/guides/habiletes-sociales',
      },
      {
        id: 'couples-mixtes',
        title: 'Couples mixtes & interculturels',
        desc: 'Naviguer les différences culturelles pour construire ensemble.',
        href: '/guides/couples-mixtes',
      },
      {
        id: 'couple-noir',
        title: 'Couple noir face au monde',
        desc: 'Protéger et nourrir ton couple dans un environnement qui le questionne.',
        href: '/guides/couple-noir',
      },
      {
        id: 'communiquer-dans-le-couple',
        title: 'Communiquer dans le couple',
        desc: 'Se parler vraiment sans que ça dégénère.',
        href: '/guides/communiquer-dans-le-couple',
      },
      {
        id: 'sortir-dependance-affective',
        title: 'Sortir de la dépendance affective',
        desc: 'Aimer sans te perdre.',
        href: '/guides/sortir-dependance-affective',
      },
      {
        id: 'surmonter-une-rupture',
        title: 'Surmonter une rupture amoureuse',
        desc: 'Traverser le deuil amoureux et renaître.',
        href: '/guides/surmonter-une-rupture',
      },
      {
        id: 'gerer-la-jalousie',
        title: 'Gérer la jalousie',
        desc: 'Apaiser la jalousie et renforcer ta sécurité intérieure.',
        href: '/guides/gerer-la-jalousie',
      },
    ],
  },
  {
    id: 'bien-etre-soi',
    label: 'Bien-être & Soi',
    guides: [
      {
        id: 'confiance-estime-de-soi',
        title: 'Confiance & estime de soi',
        desc: 'Reconstruire une image de toi solide, loin du regard des autres.',
        href: '/guides/confiance-estime-de-soi',
      },
      {
        id: 'anxiete-pensees-negatives',
        title: 'Anxiété & pensées négatives',
        desc: 'Des outils TCC pour désamorcer les spirales mentales.',
        href: '/guides/anxiete-pensees-negatives',
      },
      {
        id: 'gestion-solitude',
        title: 'Apprivoiser la solitude',
        desc: "Transformer la solitude en ressource plutôt qu'en souffrance.",
        href: '/guides/gestion-solitude',
      },
      {
        id: 'identite-metisse',
        title: 'Identité métisse',
        desc: 'Habiter pleinement une identité plurielle sans la choisir entre deux.',
        href: '/guides/identite-metisse',
      },
      {
        id: 'se-reconstruire-apres-relation-toxique',
        title: 'Se reconstruire après une relation toxique',
        desc: 'Retrouver qui tu es après l\'emprise.',
        href: '/guides/se-reconstruire-apres-relation-toxique',
      },
      {
        id: 'briser-isolement',
        title: 'Briser l\'isolement',
        desc: 'Sortir du repli, un petit pas à la fois.',
        href: '/guides/briser-isolement',
      },
      {
        id: 'gerer-ses-emotions',
        title: 'Gérer ses émotions',
        desc: 'Tes émotions ne sont pas tes ennemies.',
        href: '/guides/gerer-ses-emotions',
      },
      {
        id: 'gerer-le-stress',
        title: 'Gérer le stress',
        desc: 'Reprendre la main quand tout s\'accélère.',
        href: '/guides/gerer-le-stress',
      },
    ],
  },
  {
    id: 'sexualite',
    label: 'Sexualité',
    guides: [
      {
        id: 'se-reapproprier-sexualite',
        title: 'Se réapproprier sa sexualité',
        desc: 'Dénouer la honte et retrouver un rapport libre à ton corps.',
        href: '/guides/se-reapproprier-sexualite',
      },
      {
        id: 'desir-intimite',
        title: 'Désir & intimité',
        desc: "Raviver le lien et l'élan, sans pression ni performance.",
        href: '/guides/desir-intimite',
      },
      {
        id: 'sexualite-image-corps',
        title: 'Sexualité & image du corps',
        desc: 'Habiter ton corps sans le juger, ni le comparer.',
        href: '/guides/sexualite-image-corps',
      },
      {
        id: 'sexualite-black',
        title: 'Sexualité black',
        desc: 'Habiter ton désir, libre du regard racial et des tabous communautaires.',
        href: '/guides/sexualite-black',
      },
    ],
  },
  {
    id: 'resilience',
    label: 'Résilience',
    guides: [
      {
        id: 'misogynoir',
        title: 'Misogynoir',
        desc: 'Déconstruire et traverser la haine croisée du genre et de la race.',
        href: '/guides/misogynoir',
      },
      {
        id: 'charge-raciale',
        title: 'Charge raciale',
        desc: 'Alléger le poids mental du racisme chronique au quotidien.',
        href: '/guides/charge-raciale',
      },
      {
        id: 'racisme-au-quotidien',
        title: 'Racisme au quotidien',
        desc: "Des outils TCC pour répondre aux microagressions sans t'épuiser.",
        href: '/guides/racisme-au-quotidien',
      },
      {
        id: 'colorisme',
        title: 'Colorisme',
        desc: 'Guérir les blessures liées à la teinte de peau, dedans et dehors.',
        href: '/guides/colorisme',
      },
      {
        id: 'dating-femme-noire',
        title: 'Dating femme noire',
        desc: 'Naviguer le dating sans effacer qui tu es.',
        href: '/guides/dating-femme-noire',
      },
      {
        id: 'parentalite-noire',
        title: 'Parentalité noire',
        desc: 'Élever ses enfants avec fierté dans un monde qui les questionne.',
        href: '/guides/parentalite-noire',
      },
      {
        id: 'syndrome-imposteur',
        title: "Syndrome de l'imposteur",
        desc: 'Déconstruire la voix intérieure qui doute de ta légitimité.',
        href: '/guides/syndrome-imposteur',
      },
      {
        id: 'foi-identite-bien-etre',
        title: 'Foi, identité & bien-être',
        desc: 'Réconcilier spiritualité, culture et santé mentale.',
        href: '/guides/foi-identite-bien-etre',
      },
      {
        id: 'parent-toxique',
        title: 'Parent toxique',
        desc: 'Te protéger, guérir, reprendre ta place.',
        href: '/guides/parent-toxique',
      },
      {
        id: 'sortir-solitude-femmes-noires',
        title: 'Sortir de la solitude — pour les femmes noires',
        desc: 'Créer des liens où tu es vue, entière.',
        href: '/guides/sortir-solitude-femmes-noires',
      },
    ],
  },
  {
    id: 'argent',
    label: 'Argent',
    guides: [
      {
        id: 'black-tax',
        title: 'Black Tax',
        desc: 'Comprendre et poser des limites face au poids financier familial.',
        href: '/argent/black-tax',
      },
      {
        id: 'croyances-argent',
        title: "Croyances sur l'argent",
        desc: "Désamorcer les croyances limitantes qui bloquent ta relation à l'argent.",
        href: '/guides/croyances-argent',
      },
      {
        id: 'mentalite-abondance',
        title: "Mentalité d'abondance",
        desc: 'Apaiser la peur du manque et cultiver un rapport serein à la prospérité.',
        href: '/guides/mentalite-abondance',
      },
      {
        id: 'honte-de-classe',
        title: 'Honte de classe',
        desc: "T'aimer d'où que tu viennes et dépasser la honte sociale.",
        href: '/guides/honte-de-classe',
      },
      {
        id: 'oser-ta-valeur-tarifs',
        title: 'Oser ta valeur & tes tarifs',
        desc: 'Fixer un prix juste sans honte ni sous-estimer ce que tu vaux.',
        href: '/guides/oser-ta-valeur-tarifs',
      },
      {
        id: 'anxiete-financiere',
        title: 'Anxiété financière',
        desc: "Apaiser la peur de l'argent et agir pas à pas vers plus de sécurité.",
        href: '/guides/anxiete-financiere',
      },
      {
        id: 'argent-couple',
        title: "L'argent dans le couple",
        desc: 'Construire confiance et équité financière dans la relation.',
        href: '/guides/argent-couple',
      },
      {
        id: 'trauma-financier-familles-noires',
        title: 'Trauma financier — familles noires',
        desc: "Comprendre l'héritage, briser le cycle.",
        href: '/guides/trauma-financier-familles-noires',
      },
    ],
  },
  {
    id: 'travail',
    label: 'Travail',
    guides: [
      {
        id: 'confiance-au-travail',
        title: 'Confiance au travail',
        desc: 'Oser prendre ta place, transformer le doute, te rendre visible.',
        href: '/guides/confiance-au-travail',
      },
      {
        id: 'etre-la-seule-au-travail',
        title: 'Être « la seule » au travail',
        desc: 'Alléger la charge, te protéger, trouver des appuis.',
        href: '/guides/etre-la-seule-au-travail',
      },
      {
        id: 'etre-allie-au-travail',
        title: 'Être un·e allié·e au travail',
        desc: "Passer de l'intention à l'action d'allié·e utile.",
        href: '/guides/etre-allie-au-travail',
      },
      {
        id: 'negocier-son-salaire',
        title: 'Négocier son salaire',
        desc: 'Demander ce que tu vaux, sans trembler.',
        href: '/guides/negocier-son-salaire',
      },
      {
        id: 'prevenir-burnout',
        title: 'Prévenir & guérir du burnout',
        desc: 'Reconnaître les signaux, comprendre, et te relever.',
        href: '/guides/prevenir-burnout',
      },
      {
        id: 'le-code-switching',
        title: 'Le code-switching',
        desc: "Le coût caché de t'adapter en permanence — et comment reprendre du choix.",
        href: '/guides/le-code-switching',
      },
      {
        id: 'manager-equipe-inclusive',
        title: 'Manager une équipe inclusive',
        desc: 'Créer la sécurité psychologique et des pratiques concrètes.',
        href: '/guides/manager-equipe-inclusive',
      },
      {
        id: 'reussir-entretien-embauche',
        title: "Réussir un entretien d'embauche",
        desc: 'Transformer le trac en atout, préparer des réponses solides.',
        href: '/guides/reussir-entretien-embauche',
      },
      {
        id: 'quitter-job-toxique',
        title: 'Quitter un job toxique',
        desc: 'Partir sans culpabilité ni précipitation.',
        href: '/guides/quitter-job-toxique',
      },
      {
        id: 'misogynoir-au-travail',
        title: 'Misogynoir au travail',
        desc: 'Protéger ton estime et répondre avec stratégie.',
        href: '/guides/misogynoir-au-travail',
      },
      {
        id: 'recruter-sans-discriminer',
        title: 'Recruter sans discriminer',
        desc: 'Repérer tes biais et bâtir un process équitable.',
        href: '/guides/recruter-sans-discriminer',
      },
      {
        id: 'gerer-conflit-travail',
        title: 'Gérer un conflit au travail',
        desc: 'Désamorcer sans fuir ni exploser.',
        href: '/guides/gerer-conflit-travail',
      },
      {
        id: 'prendre-la-parole-en-public',
        title: 'Prendre la parole en public',
        desc: 'Parler en réunion ou présenter sans paniquer.',
        href: '/guides/prendre-la-parole-en-public',
      },
      {
        id: 'trouver-mentors-sponsors',
        title: 'Trouver mentors & sponsors',
        desc: "T'entourer pour avancer quand on part isolée.",
        href: '/guides/trouver-mentors-sponsors',
      },
      {
        id: 'creer-culture-inclusive',
        title: 'Créer une culture inclusive',
        desc: "Faire de l'inclusion une réalité, pas un slogan.",
        href: '/guides/creer-culture-inclusive',
      },
      {
        id: 'harcelement-moral-au-travail',
        title: 'Le harcèlement moral au travail',
        desc: 'Reconnaître, documenter, te protéger.',
        href: '/guides/harcelement-moral-au-travail',
      },
      {
        id: 'reussir-sa-recherche-emploi',
        title: "Réussir sa recherche d'emploi",
        desc: 'Mener ta recherche avec méthode, confiance et réseau.',
        href: '/guides/reussir-sa-recherche-emploi',
      },
      {
        id: 'demander-une-promotion',
        title: 'Demander une promotion',
        desc: 'Oser demander et argumenter ta valeur.',
        href: '/guides/demander-une-promotion',
      },
      {
        id: 'composer-avec-manager-difficile',
        title: 'Composer avec un manager difficile',
        desc: "Te protéger et avancer sans t'épuiser.",
        href: '/guides/composer-avec-manager-difficile',
      },
      {
        id: 'leadership-femme-noire',
        title: 'Leadership en tant que femme noire',
        desc: 'Diriger pleinement, à ta façon.',
        href: '/guides/leadership-femme-noire',
      },
      {
        id: 'reussir-sa-prise-de-poste',
        title: 'Réussir sa prise de poste',
        desc: 'Bien démarrer, trouver ta place, piloter tes 30/60/90 premiers jours.',
        href: '/guides/reussir-sa-prise-de-poste',
      },
      {
        id: 'donner-recevoir-feedback',
        title: 'Donner et recevoir du feedback',
        desc: 'Des retours qui font grandir, pas qui blessent.',
        href: '/guides/donner-recevoir-feedback',
      },
      {
        id: 'equilibre-pro-perso',
        title: 'Équilibre pro-perso & charge mentale',
        desc: 'Poser des limites et alléger la charge mentale.',
        href: '/guides/equilibre-pro-perso',
      },
      {
        id: 'repondre-aux-microagressions',
        title: 'Répondre aux microagressions au travail',
        desc: 'Réagir aux petites phrases qui blessent, à ta façon.',
        href: '/guides/repondre-aux-microagressions',
      },
      {
        id: 'soutenir-collaborateur-en-difficulte',
        title: 'Soutenir un·e collaborateur·rice en difficulté',
        desc: 'La juste posture du manager — écouter, ajuster, orienter.',
        href: '/guides/soutenir-collaborateur-en-difficulte',
      },
      {
        id: 'entretiens-evaluation-equitables',
        title: "Mener des entretiens d'évaluation équitables",
        desc: 'Évaluer juste, motiver, sans biais.',
        href: '/guides/entretiens-evaluation-equitables',
      },
      {
        id: 'manager-retour-apres-arret',
        title: "Manager le retour après un arrêt",
        desc: 'Accueillir un retour en douceur et prévenir la rechute.',
        href: '/guides/manager-retour-apres-arret',
      },
      {
        id: 'prevenir-risques-psychosociaux',
        title: 'Prévenir les risques psychosociaux dans son équipe',
        desc: 'Repérer les signaux et protéger la santé de ton équipe.',
        href: '/guides/prevenir-risques-psychosociaux',
      },
      {
        id: 'reussir-sa-reconversion',
        title: 'Réussir une reconversion professionnelle',
        desc: 'Changer de voie avec méthode et courage.',
        href: '/guides/reussir-sa-reconversion',
      },
      {
        id: 'rebondir-apres-licenciement',
        title: 'Rebondir après un licenciement',
        desc: 'Encaisser puis te relever — stratégique et posé·e.',
        href: '/guides/rebondir-apres-licenciement',
      },
      {
        id: 'soigner-son-personal-branding',
        title: 'Soigner son personal branding',
        desc: 'Rendre ta valeur visible sans te trahir.',
        href: '/guides/soigner-son-personal-branding',
      },
      {
        id: 'developper-son-reseau',
        title: 'Développer son réseau',
        desc: 'Tisser des liens utiles sans faire semblant.',
        href: '/guides/developper-son-reseau',
      },
      {
        id: 'anxiete-de-performance',
        title: "Apprivoiser l'anxiété de performance",
        desc: 'Donner le meilleur sans que la peur te paralyse.',
        href: '/guides/anxiete-de-performance',
      },
      {
        id: 'gerer-son-temps-deleguer',
        title: 'Gérer son temps & déléguer',
        desc: "Faire l'essentiel sans tout porter.",
        href: '/guides/gerer-son-temps-deleguer',
      },
      {
        id: 'cheveux-apparence-au-travail',
        title: 'Cheveux & apparence au travail',
        desc: "T'affirmer telle que tu es sans te lisser.",
        href: '/guides/cheveux-apparence-au-travail',
      },
      {
        id: 'entreprendre-femme-noire',
        title: 'Entreprendre en tant que femme noire',
        desc: 'Lancer ton projet malgré les obstacles en plus.',
        href: '/guides/entreprendre-femme-noire',
      },
    ],
  },
  {
    id: 'intimite-sexualite',
    label: 'Intimité & Sexualité (18+)',
    guides: [
      {
        id: 'raviver-le-desir',
        title: 'Raviver le désir dans le couple',
        desc: 'Retrouver l\'envie, à deux, dans la durée — sans pression.',
        href: '/guides/raviver-le-desir',
      },
      {
        id: 'parler-de-sexe-sans-tabou',
        title: 'Parler de sexe sans tabou',
        desc: 'Oser dire ses envies, ses limites, ses ressentis.',
        href: '/guides/parler-de-sexe-sans-tabou',
      },
      {
        id: 'depasser-honte-blocages-sexuels',
        title: 'Dépasser la honte et les blocages',
        desc: 'Te réconcilier avec ton corps et ton plaisir, en douceur.',
        href: '/guides/depasser-honte-blocages-sexuels',
      },
      {
        id: 'desirs-desaccordes',
        title: 'Quand les désirs sont désaccordés',
        desc: 'Accueillir deux désirs différents et trouver un terrain commun.',
        href: '/guides/desirs-desaccordes',
      },
    ],
  },
];

const EN_CONFLICT_IDS = new Set(['black-tax', 'misogynoir']);
const EN_EXTRA = [
  { id: 'misogynoir-en', title: 'Misogynoir', blurb: 'Free yourself from the tropes, reclaim your full humanity.', theme: 'Identity & Resilience' },
  { id: 'black-tax-en', title: 'Black Tax', blurb: 'Supporting your people without losing yourself.', theme: 'Money' },
];
const EN_THEME_ORDER = ['Wellbeing', 'Relationships', 'Identity & Resilience', 'Sexuality', 'Money', 'Career', 'Intimacy & Sexuality'];
const EN_BY_THEME = EN_THEME_ORDER.map((theme) => ({
  theme,
  guides: [
    ...INTL_GUIDES.filter((g) => g.lang === 'en' && g.theme === theme && !EN_CONFLICT_IDS.has(g.id)),
    ...NEW_GUIDES.filter((g) => g.lang === 'en' && g.theme === theme),
    ...PRO_GUIDES.filter((g) => g.lang === 'en' && g.theme === theme),
    ...PRO_GUIDES_2.filter((g) => g.lang === 'en' && g.theme === theme),
    ...PRO_GUIDES_3.filter((g) => g.lang === 'en' && g.theme === theme),
    ...PRO_GUIDES_4.filter((g) => g.lang === 'en' && g.theme === theme),
    ...PRO_GUIDES_5.filter((g) => g.lang === 'en' && g.theme === theme),
    ...PRO_GUIDES_6.filter((g) => g.lang === 'en' && g.theme === theme),
    ...PRO_GUIDES_7.filter((g) => g.lang === 'en' && g.theme === theme),
    ...PRO_GUIDES_8.filter((g) => g.lang === 'en' && g.theme === theme),
    ...PRO_GUIDES_9.filter((g) => g.lang === 'en' && g.theme === theme),
    ...PRO_GUIDES_10.filter((g) => g.lang === 'en' && g.theme === theme),
    ...PRO_GUIDES_11.filter((g) => g.lang === 'en' && g.theme === theme),
    ...PRO_GUIDES_12.filter((g) => g.lang === 'en' && g.theme === theme),
    ...EN_EXTRA.filter((g) => g.theme === theme),
  ],
})).filter((t) => t.guides.length > 0);

export default function BibliothequeClient() {
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

  return (
    <div style={{ position: 'relative', zIndex: 2, minHeight: '100vh' }}>

      <SiteNav />

      {/* Header */}
      <section className={styles.section} style={{ textAlign: 'center', paddingBottom: 0 }}>
        <div className={styles.offersHeader}>
          <div className={styles.sectionLabel} style={{ justifyContent: 'center' }}>
            Bibliothèque
          </div>
          <h1 className={`${styles.sectionTitle} reveal`} style={{ textAlign: 'center', margin: '0 auto 28px' }}>
            Tous les guides, <em>un seul endroit</em>
          </h1>
          <p className={`${styles.sectionLead} reveal`} style={{ textAlign: 'center', margin: '0 auto 40px', maxWidth: 560 }}>
            Amour, bien-être, sexualité, argent — chaque guide est un espace de travail concret,
            ancré dans la réalité des personnes noires et métisses, avec des outils TCC actionnables.
          </p>
        </div>
      </section>

      {/* Sections thématiques */}
      {SECTIONS.map((section) => (
        <section key={section.id} className={styles.section} style={{ paddingTop: 0 }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
            <h2
              className={`${styles.sectionTitle} reveal`}
              style={{ fontSize: 'clamp(18px, 3vw, 24px)', marginBottom: 32, letterSpacing: '0.02em' }}
            >
              {section.label}
            </h2>
            <div
              className={styles.offersGrid}
              style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}
            >
              {section.guides.map((guide) => (
                <div key={guide.id} className={`${styles.offer} reveal`}>
                  <div className={styles.offerCategory}>Guide PDF · 19 €</div>
                  <h3 className={styles.offerName}>{guide.title}</h3>
                  <p className={styles.offerDesc}>{guide.desc}</p>
                  <div style={{ marginTop: 'auto' }}>
                    <a
                      href={guide.href}
                      className={styles.offerCta}
                      style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}
                    >
                      Découvrir →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Packs FR */}
      <section className={styles.section} style={{ paddingTop: 0 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <h2
            className={`${styles.sectionTitle} reveal`}
            style={{ fontSize: 'clamp(18px, 3vw, 24px)', marginBottom: 12, letterSpacing: '0.02em' }}
          >
            Nos packs
          </h2>
          <p className="reveal" style={{ fontSize: 14, opacity: 0.55, marginBottom: 40, lineHeight: 1.6 }}>
            4 guides thématiques à prix réduit — 49 € au lieu de 76 €.
          </p>
          <div
            className={styles.offersGrid}
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}
          >
            {BUNDLES.filter((b) => b.lang === 'fr').map((bundle) => (
              <div key={bundle.id} className={`${styles.offer} reveal`}>
                <div className={styles.offerCategory}>Pack · 4 guides</div>
                <h3 className={styles.offerName}>{bundle.title}</h3>
                <p className={styles.offerDesc}>{bundle.blurb}</p>
                <div style={{ marginTop: 'auto' }}>
                  <div style={{ marginBottom: 12, textAlign: 'center' }}>
                    <span style={{ fontSize: 13, opacity: 0.4, textDecoration: 'line-through', marginRight: 8 }}>
                      {bundle.compareAtCents / 100} €
                    </span>
                    <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--gold)' }}>
                      {bundle.priceCents / 100} €
                    </span>
                  </div>
                  <BundleBuyButton bundleId={bundle.id} label={`Acheter le pack — ${bundle.priceCents / 100} €`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* In English */}
      <section className={styles.section} style={{ paddingTop: 0 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <h2
            className={`${styles.sectionTitle} reveal`}
            style={{ fontSize: 'clamp(18px, 3vw, 24px)', marginBottom: 12, letterSpacing: '0.02em' }}
          >
            In English
          </h2>
          <p className="reveal" style={{ fontSize: 14, opacity: 0.55, marginBottom: 48, lineHeight: 1.6 }}>
            All guides available in English — same CBT framework, same workbook format.
          </p>
          {EN_BY_THEME.map(({ theme, guides }) => (
            <div key={theme} style={{ marginBottom: 52 }}>
              <div style={{
                fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase',
                color: 'var(--gold)', opacity: 0.8, marginBottom: 20,
              }}>
                {theme}
              </div>
              <div
                className={styles.offersGrid}
                style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}
              >
                {guides.map((guide) => (
                  <div key={guide.id} className={`${styles.offer} reveal`}>
                    <div className={styles.offerCategory}>Guide PDF · 19 €</div>
                    <h3 className={styles.offerName}>{guide.title}</h3>
                    <p className={styles.offerDesc}>{guide.blurb}</p>
                    <div style={{ marginTop: 'auto' }}>
                      <a
                        href={`/guides/${guide.id}`}
                        className={styles.offerCta}
                        style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}
                      >
                        Discover →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
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
