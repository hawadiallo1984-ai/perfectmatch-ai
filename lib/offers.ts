// Configuration centrale des 3 offres PerfectMatch
// Modifie ce fichier pour ajuster prix, features, badges

export type OfferId = 'celibataire' | 'complete' | 'couple' | 'emotiflex' | 'emotiflex_digital' | 'nutrition' | 'misogynoir' | 'racisme';

export interface Offer {
  id: OfferId;
  category: string;
  name: string;
  nameEmphasis: string;
  description: string;
  price: number;
  unit: string;
  badge?: string;
  featured?: boolean;
  comingSoon?: boolean;
  comingSoonNote?: string;
  features: string[];
  isNutrition?: boolean;
  trialDays?: number;
  nutritionUrl?: string;
    stripePriceEnvKey?: string;
  isAmazon?: boolean;
  isDigitalSubscription?: boolean;
  amazonUrl?: string;
}

export const OFFERS: Record<OfferId, Offer> = {
  celibataire: {
    id: 'celibataire',
    category: 'Pour celibataire',
    name: 'Analyse',
    nameEmphasis: 'Celibataire',
    description: "Le rapport psychologique complet pour comprendre ton profil amoureux, tes schemas, et ton partenaire ideal — avec analyse astrologique incluse.",
    price: 47,
    unit: 'rapport unique',
    features: [
      'Questionnaire psychologique approfondi',
      "Big Five + styles d'attachement complets",
      'Profil du partenaire ideal sur-mesure',
      '**Analyse astrologique complete** (theme natal)',
      'Detection des biais cognitifs et culturels',
      'Schemas repetitifs identifies',
      "Plan d'action concret sur 90 jours",
      'Rapport PDF premium telechargeable',
      'Acces a Luna IA (10 messages)',
      '**Carnet de pensées** TCC adapté aux rencontres',
      'Repérage de tes **distorsions cognitives** amoureuses',
      '**Échelle d\'exposition** à la peur du rejet',
    ],
    stripePriceEnvKey: 'STRIPE_PRICE_CELIBATAIRE',
  },
  complete: {
    id: 'complete',
    category: 'Psycho + clinique',
    name: 'Analyse Psycho',
    nameEmphasis: 'Complete',
    description: "Le rapport ultime : psychologie + astrologie + grille clinique approfondie. Pour celles et ceux qui veulent comprendre tout, en profondeur.",
    price: 99,
    unit: 'rapport unique',
    badge: 'Le plus complet',
    featured: true,
    features: [
      'Tout le rapport Analyse Celibataire',
      '**Grille clinique approfondie** (inspiree DSM-5)',
      'Depistage triade noire + gaslighting',
      'Profil ombre (approche jungienne)',
      'Analyse transgenerationnelle',
      'Carte complete de tes angles morts',
      'Astrologie avancee + progressions',
      '**Luna IA illimitee** pendant 3 mois',
      '1 mise a jour gratuite (6 mois)',
      'Ressources therapeutiques personnalisees',
      'Travail sur tes **croyances centrales** (approche schémas)',
      '**Restructuration cognitive** approfondie et guidée',
      '**Expériences comportementales** sur-mesure',
    ],
    stripePriceEnvKey: 'STRIPE_PRICE_COMPLETE',
  },
  couple: {
    id: 'couple',
    category: 'A faire a deux',
    name: 'Analyse',
    nameEmphasis: 'de Couple',
    description: "Le rapport complet pour comprendre la dynamique de votre couple — avec synastrie astrologique et diagnostic relationnel a deux voix.",
    price: 67,
    unit: 'pour 2',
    comingSoon: true,
    comingSoonNote: 'Lancement prochain',
    features: [
      'Double questionnaire (un par partenaire)',
      'Score de compatibilite multi-dimensions',
      "Croisement des styles d'attachement",
      '**Synastrie astrologique complete**',
      'Analyse des 4 cavaliers (Gottman)',
      'Dynamiques de pouvoir identifiees',
      'Green flags et red flags mutuels',
      'Plan de reparation sur 90 jours',
      'Rapport commun + rapports individuels',
      'Acces Luna partage (20 messages)',
      'Repérage des **attributions négatives**',
      'Reformulation **TCC** des 4 cavaliers de Gottman',
      '**Expériences comportementales à deux** sur 90 jours',
    ],
    stripePriceEnvKey: 'STRIPE_PRICE_COUPLE',
  },
  emotiflex_digital: {
    id: 'emotiflex_digital',
    category: 'Intelligence emotionnelle',
    name: 'Emotiflex',
    nameEmphasis: 'Digital',
    description: "La version interactive du jeu de cartes Emotiflex. Cartes digitales, check-in quotidien, journal emotionnel et exercices de communication — partout, tout le temps.",
    price: 12,
    unit: 'par mois',
    badge: 'Nouveau',
    featured: false,
    isDigitalSubscription: true,
    features: [
      '**Cartes emotionnelles digitales** (50+ cartes)',
      'Check-in emotionnel quotidien guide',
      'Journal emotionnel personnel',
      'Exercices de communication en couple',
      'IA de reformulation emotionnelle',
      '**Parcours TCC** : peur du rejet, jalousie, confiance...',
      'Compatible avec le jeu physique Emotiflex',
      '**Carnet de pensées digital** (pensée → émotion → comportement)',
      '**Luna en mode socratique** (restructuration guidée)',
    ],
    stripePriceEnvKey: 'STRIPE_PRICE_EMOTIFLEX_DIGITAL',
  },
  emotiflex: {
    id: 'emotiflex',
    category: 'Intelligence emotionnelle',
    name: 'Emotiflex',
    nameEmphasis: 'Jeu de cartes',
    description: "Le jeu de cartes therapeutique pour mieux communiquer, developper l'empathie et transformer vos relations. Le complement ideal de votre rapport PerfectMatch.",
    price: 29.90,
    unit: 'coffret physique',
    badge: 'Nouveau',
    amazonUrl: 'https://www.amazon.fr/EMOTIFLEX-Th%C3%A9rapeutique-Communiquer-empathie-Relations/dp/B0DYK3MSP1',
    isAmazon: true,
    features: [
      '**Jeu de cartes physique** livre chez vous',
      "Developpe l'intelligence emotionnelle",
      'Ameliore la communication en couple',
      "Cultive l'empathie et l'ecoute active",
      'Complement ideal de votre rapport PerfectMatch',
      'Disponible sur Amazon Prime',
      'Cree par PerfectMatch',
    ],
    stripePriceEnvKey: 'STRIPE_PRICE_EMOTIFLEX',
  },
  nutrition: {
    id: 'nutrition',
    category: 'Nutrition emotionnelle',
    name: 'Perfect Match',
    nameEmphasis: 'Nutrition',
    description: "La nutrition adaptee a ton profil emotionnel. Recettes, menus et routines anti-grignotage personnalises selon tes emotions et ton energie.",
    price: 19,
    unit: 'par mois',
    badge: 'Nouveau',
    trialDays: 7,
    isNutrition: true,
    features: [
      '**7 jours gratuits** sans engagement',
      'Profil nutritionnel emotionnel complet',
      'Routines anti-grignotage guidees',
      'Encouragements emotionnels quotidiens',
      'Suivi energie et humeur',
      '**Chaîne comportementale** : déclencheur → émotion → grignotage',
      '**Carnet alimentaire-émotionnel** quotidien',
      'Technique de l\'**urge surfing** (surfer l\'envie)',
    ],
    nutritionUrl: '/nutrition',
    stripePriceEnvKey: 'STRIPE_PRICE_NUTRITION',
  },
  misogynoir: {
    id: 'misogynoir',
    category: 'Résilience & bien-être',
    name: 'Parcours',
    nameEmphasis: 'Misogynoir',
    description: "Un parcours pensé pour les femmes noires qui portent le poids spécifique de la misogynoir — à la croisée du racisme et du sexisme. On valide ton vécu, puis on te donne des outils TCC concrets pour protéger ta santé mentale et reprendre ton pouvoir.",
    price: 29,
    unit: 'parcours unique',
    badge: 'Nouveau',
    features: [
      "Un espace qui **valide ton vécu** — le problème, c'est la misogynoir, pas toi",
      "Comprendre l'impact psychologique de l'intersection racisme + sexisme",
      "Outils **TCC** pour apaiser la rumination après une micro-agression",
      "Gérer l'**hypervigilance** et la charge mentale au quotidien",
      "Désamorcer les messages intériorisés — sans nier la réalité du racisme",
      "Renforcer l'**estime de soi** et l'auto-compassion",
      "Protéger ton énergie : poser des limites, choisir tes combats",
      "Accès à Luna, dans une posture culturellement consciente",
    ],
    stripePriceEnvKey: 'STRIPE_PRICE_MISOGYNOIR',
  },
  racisme: {
    id: 'racisme',
    category: 'Résilience & bien-être',
    name: 'Parcours',
    nameEmphasis: 'Négrophobie & Racisme',
    description: "Un parcours pour traverser l'impact psychologique de la négrophobie et du racisme. Le racisme est le problème — pas toi. Une TCC culturellement adaptée pour gérer le stress, apaiser la rumination et restaurer ton estime.",
    price: 29,
    unit: 'parcours unique',
    badge: 'Nouveau',
    features: [
      "Reconnaître le **traumatisme racial** (stress traumatique lié à la race)",
      "Outils **TCC** pour gérer le stress et l'hypervigilance liés aux discriminations",
      "Apaiser la rumination et les réactions après un incident raciste",
      "Distinguer ce qui t'appartient de ce que le racisme projette sur toi",
      "Restaurer l'**estime de soi** et l'auto-compassion",
      "Construire des ressources de soutien et de communauté",
      "Stratégies concrètes pour les situations pro, sociales, du quotidien",
      "Accès à Luna, posture validante et anti-raciste",
    ],
    stripePriceEnvKey: 'STRIPE_PRICE_RACISME',
  },
};

export const OFFERS_ORDER: OfferId[] = ['celibataire', 'complete', 'couple', 'emotiflex_digital', 'emotiflex', 'nutrition'];

export const RESILIENCE_ORDER: OfferId[] = ['misogynoir', 'racisme'];
