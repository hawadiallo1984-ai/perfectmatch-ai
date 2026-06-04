import type { MetadataRoute } from 'next';

const BASE_URL = 'https://perfectmatch-ai.vercel.app';

const GUIDE_IDS = [
  // Amour & Relations
  'anxiete-pensees-negatives',
  'confiance-estime-de-soi',
  'couple-noir',
  'couples-mixtes',
  'desir-intimite',
  'gestion-celibat',
  'gestion-solitude',
  'guerir-rupture',
  'identite-metisse',
  'styles-attachement',
  // Sexualité
  'se-reapproprier-sexualite',
  'sexualite-black',
  'sexualite-image-corps',
  // Résilience
  'misogynoir',
  'charge-raciale',
  'racisme-au-quotidien',
  'colorisme',
  'dating-femme-noire',
  'parentalite-noire',
  'syndrome-imposteur',
  'foi-identite-bien-etre',
  // Argent
  'croyances-argent',
  'mentalite-abondance',
  'honte-de-classe',
  'oser-ta-valeur-tarifs',
  'anxiete-financiere',
  'argent-couple',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const guideEntries: MetadataRoute.Sitemap = GUIDE_IDS.map((id) => ({
    url: `${BASE_URL}/guides/${id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/resilience`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/argent`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/sexualite`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/bibliotheque`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...guideEntries,
  ];
}
