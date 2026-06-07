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
  // Nouveaux FR
  'trauma-financier-familles-noires',
  'parent-toxique',
  // Pro FR (etape5)
  'confiance-au-travail',
  'etre-la-seule-au-travail',
  'etre-allie-au-travail',
  // Nouveaux FR (etape4)
  'sortir-solitude-femmes-noires',
  'apprendre-a-dire-non',
  'briser-isolement',
  'communication-assertive',
  'habiletes-sociales',
  'gerer-ses-emotions',
  'gerer-le-stress',
  // In English — Wellbeing
  'confidence-self-esteem',
  'anxiety-negative-thoughts',
  'coping-with-loneliness',
  'imposter-syndrome',
  'toxic-parents',
  // In English — Relationships
  'attachment-styles',
  'healing-from-a-breakup',
  'thriving-single',
  'intercultural-couples',
  'black-couples',
  'dating-as-a-black-woman',
  // In English — Identity & Resilience
  'misogynoir-en',
  'mixed-race-identity',
  'racial-fatigue',
  'everyday-racism',
  'colorism',
  'raising-black-children',
  'faith-identity-wellbeing',
  'class-shame',
  // In English — Sexuality
  'reclaiming-your-sexuality',
  'desire-and-intimacy',
  'sexuality-and-body-image',
  'sexuality-and-black-identity',
  // In English — Money
  'black-tax-en',
  'money-beliefs',
  'abundance-mindset',
  'own-your-worth-and-rates',
  'financial-anxiety',
  'money-in-relationships',
  'financial-trauma-black-families',
  // Pro EN (etape5)
  'confidence-at-work',
  'being-the-only-one-at-work',
  'being-an-ally-at-work',
  // New EN (etape4)
  'overcoming-loneliness-black-women',
  'learning-to-say-no',
  'breaking-isolation',
  'assertive-communication',
  'social-skills',
  'managing-your-emotions',
  'managing-stress',
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
      url: `${BASE_URL}/en`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/en/guides`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/blessures-interieures`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/inner-wounds`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
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
      url: `${BASE_URL}/travail`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/career`,
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
