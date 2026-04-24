// Configuration centrale des 3 offres PerfectMatch
// Modifie ce fichier pour ajuster prix, features, badges

export type OfferId = 'celibataire' | 'complete' | 'couple';

export interface Offer {
  id: OfferId;
  category: string;
  name: string;
  nameEmphasis: string; // Mot mis en italique doré
  description: string;
  price: number;
  unit: string;
  badge?: string;
  featured?: boolean;
  features: string[];
  stripePriceEnvKey: string;
}

export const OFFERS: Record<OfferId, Offer> = {
  celibataire: {
    id: 'celibataire',
    category: 'Pour célibataire',
    name: 'Analyse',
    nameEmphasis: 'Célibataire',
    description: "Le rapport psychologique complet pour comprendre ton profil amoureux, tes schémas, et ton partenaire idéal — avec analyse astrologique incluse.",
    price: 47,
    unit: 'rapport unique',
    features: [
      'Questionnaire psychologique approfondi',
      "Big Five + styles d'attachement complets",
      'Profil du partenaire idéal sur-mesure',
      '**Analyse astrologique complète** (thème natal)',
      'Détection des biais cognitifs et culturels',
      'Schémas répétitifs identifiés',
      "Plan d'action concret sur 90 jours",
      'Rapport PDF premium téléchargeable',
      'Accès à Luna IA (10 messages)',
    ],
    stripePriceEnvKey: 'STRIPE_PRICE_CELIBATAIRE',
  },
  complete: {
    id: 'complete',
    category: 'Psycho + clinique',
    name: 'Analyse Psycho',
    nameEmphasis: 'Complète',
    description: "Le rapport ultime : psychologie + astrologie + grille clinique approfondie. Pour celles et ceux qui veulent comprendre tout, en profondeur.",
    price: 99,
    unit: 'rapport unique',
    badge: 'Le plus complet',
    featured: true,
    features: [
      'Tout le rapport Analyse Célibataire',
      '**Grille clinique approfondie** (inspirée DSM-5)',
      'Dépistage triade noire + gaslighting',
      'Profil ombre (approche jungienne)',
      'Analyse transgénérationnelle',
      'Carte complète de tes angles morts',
      'Astrologie avancée + progressions',
      '**Luna IA illimitée** pendant 3 mois',
      '1 mise à jour gratuite (6 mois)',
      'Ressources thérapeutiques personnalisées',
    ],
    stripePriceEnvKey: 'STRIPE_PRICE_COMPLETE',
  },
  couple: {
    id: 'couple',
    category: 'À faire à deux',
    name: 'Analyse',
    nameEmphasis: 'de Couple',
    description: "Le rapport complet pour comprendre la dynamique de votre couple — avec synastrie astrologique et diagnostic relationnel à deux voix.",
    price: 67,
    unit: 'pour 2',
    features: [
      'Double questionnaire (un par partenaire)',
      'Score de compatibilité multi-dimensions',
      "Croisement des styles d'attachement",
      '**Synastrie astrologique complète**',
      'Analyse des 4 cavaliers (Gottman)',
      'Dynamiques de pouvoir identifiées',
      'Green flags et red flags mutuels',
      'Plan de réparation sur 90 jours',
      'Rapport commun + rapports individuels',
      'Accès Luna partagé (20 messages)',
    ],
    stripePriceEnvKey: 'STRIPE_PRICE_COUPLE',
  },
};

export const OFFERS_ORDER: OfferId[] = ['celibataire', 'complete', 'couple'];
