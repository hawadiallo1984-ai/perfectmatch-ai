// Configuration centrale des 3 offres PerfectMatch
// Modifie ce fichier pour ajuster prix, features, badges

export type OfferId = 'celibataire' | 'complete' | 'couple' | 'emotiflex' | 'emotiflex_digital' | 'nutrition';

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
  }
};

export const OFFERS_ORDER: OfferId[] = ['celibataire', 'complete', 'couple', 'emotiflex_digital', 'emotiflex', 'nutrition'];
