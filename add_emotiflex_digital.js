var fs = require('fs');
var filePath = process.argv[2];
var c = fs.readFileSync(filePath, 'utf8');

// 1. Add emotiflex_digital to OfferId type
c = c.replace(
  "export type OfferId = 'celibataire' | 'complete' | 'couple' | 'emotiflex';",
  "export type OfferId = 'celibataire' | 'complete' | 'couple' | 'emotiflex' | 'emotiflex_digital';"
);

// 2. Add emotiflex_digital entry before closing };
var entry = `,
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
      'Parcours : peur du rejet, jalousie, confiance...',
      'Compatible avec le jeu physique Emotiflex',
    ],
    stripePriceEnvKey: 'STRIPE_PRICE_EMOTIFLEX_DIGITAL',
  }`;

c = c.replace(
  "  emotiflex: {",
  entry + ",\n  emotiflex: {"
);

// 3. Add to OFFERS_ORDER before emotiflex
c = c.replace(
  "['celibataire', 'complete', 'couple', 'emotiflex']",
  "['celibataire', 'complete', 'couple', 'emotiflex_digital', 'emotiflex']"
);

fs.writeFileSync(filePath, c);
console.log('done');
