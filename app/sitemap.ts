import type { MetadataRoute } from 'next';

const BASE_URL = 'https://perfectmatch-ai.vercel.app';

const GUIDE_IDS = [
  'anxiete-pensees-negatives',
  'couple-noir',
  'couples-mixtes',
  'desir-intimite',
  'gestion-celibat',
  'gestion-solitude',
  'identite-metisse',
  'se-reapproprier-sexualite',
  'sexualite-black',
  'sexualite-image-corps',
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
    ...guideEntries,
  ];
}
