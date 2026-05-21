var fs = require('fs');
var c = fs.readFileSync('lib/offers.ts', 'utf8');

c = c.replace(
  "export type OfferId = 'celibataire' | 'complete' | 'couple' | 'emotiflex' | 'emotiflex_digital';",
  "export type OfferId = 'celibataire' | 'complete' | 'couple' | 'emotiflex' | 'emotiflex_digital' | 'nutrition';"
);

var entry = `,
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
      'Recettes personnalisees chaque semaine',
      'Menus anti-stress et anti-fatigue',
      'Routines anti-grignotage guidees',
      'Encouragements emotionnels quotidiens',
      'Suivi energie et humeur',
    ],
    nutritionUrl: '/nutrition',
    stripePriceEnvKey: 'STRIPE_PRICE_NUTRITION',
  }`;

c = c.replace('\n};\n\nexport', entry + '\n};\n\nexport');
c = c.replace(
  "['celibataire', 'complete', 'couple', 'emotiflex_digital', 'emotiflex']",
  "['celibataire', 'complete', 'couple', 'emotiflex_digital', 'emotiflex', 'nutrition']"
);

fs.writeFileSync('lib/offers.ts', c);
console.log('done');
