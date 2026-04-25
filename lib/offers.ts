// Configuration centrale des 3 offres PerfectMatch
// Modifie ce fichier pour ajuster prix, features, badges

export type OfferId = 'celibataire' | 'complete' | 'couple';

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
  stripePriceEnvKey: string;
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
    ],
    stripePriceEnvKey: 'STRIPE_PRICE_COUPLE',
  },
};

export const OFFERS_ORDER: OfferId[] = ['celibataire', 'complete', 'couple'];
