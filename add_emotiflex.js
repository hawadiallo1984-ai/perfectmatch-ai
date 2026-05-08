var fs = require('fs');

// Read the file path from command line arg
var filePath = process.argv[2];
var c = fs.readFileSync(filePath, 'utf8');

var emotiflexEntry = `,
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
  }`;

// Insert before closing }; of OFFERS object
c = c.replace(/\n\};\n\nexport/, emotiflexEntry + '\n};\n\nexport');

// Add emotiflex to OFFERS_ORDER
c = c.replace("['celibataire', 'complete', 'couple']", "['celibataire', 'complete', 'couple', 'emotiflex']");

fs.writeFileSync(filePath, c);
console.log('done');
