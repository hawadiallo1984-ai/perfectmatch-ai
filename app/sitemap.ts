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
  // Violences psychologiques FR (etape9)
  'reconnaitre-controle-coercitif',
  'sortir-du-gaslighting',
  'harcelement-moral-au-travail',
  'se-reconstruire-apres-relation-toxique',
  // Pro FR lot 4 (etape8)
  'gerer-conflit-travail',
  'prendre-la-parole-en-public',
  'trouver-mentors-sponsors',
  'creer-culture-inclusive',
  // Pro FR lot 3 (etape7)
  'reussir-entretien-embauche',
  'quitter-job-toxique',
  'misogynoir-au-travail',
  'recruter-sans-discriminer',
  // Pro FR lot 2 (etape6)
  'negocier-son-salaire',
  'prevenir-burnout',
  'le-code-switching',
  'manager-equipe-inclusive',
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
  // Psychological violence EN (etape9)
  'recognizing-coercive-control',
  'recovering-from-gaslighting',
  'psychological-harassment-at-work',
  'rebuilding-after-a-toxic-relationship',
  // Pro EN lot 4 (etape8)
  'handling-conflict-at-work',
  'public-speaking-at-work',
  'finding-mentors-and-sponsors',
  'building-an-inclusive-culture',
  // Pro EN lot 3 (etape7)
  'acing-your-job-interview',
  'leaving-a-toxic-job',
  'misogynoir-at-work',
  'hiring-without-bias',
  // Pro EN lot 2 (etape6)
  'negotiating-your-salary',
  'preventing-burnout',
  'code-switching',
  'managing-an-inclusive-team',
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
  // Relations saines FR (etape10)
  'communiquer-dans-le-couple',
  'sortir-dependance-affective',
  'surmonter-une-rupture',
  'gerer-la-jalousie',
  // Relations saines EN (etape10)
  'communicating-in-your-relationship',
  'overcoming-emotional-dependency',
  'getting-over-a-breakup',
  'managing-jealousy',
  // Travail lot 2 FR (etape11)
  'reussir-sa-recherche-emploi',
  'demander-une-promotion',
  'composer-avec-manager-difficile',
  'leadership-femme-noire',
  // Career lot 2 EN (etape11)
  'succeeding-in-your-job-search',
  'asking-for-a-promotion',
  'dealing-with-a-difficult-manager',
  'leadership-as-a-black-woman',
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
