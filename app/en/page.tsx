import type { Metadata } from 'next';
import HomeClient from '@/app/HomeClient';
import { HOME_COPY } from '@/lib/homeCopy';

const BASE_URL = 'https://perfectmatch-ai.vercel.app';

export const metadata: Metadata = {
  title: HOME_COPY.en.meta.title,
  description: HOME_COPY.en.meta.description,
  alternates: {
    canonical: BASE_URL + '/en',
    languages: {
      'fr-FR': BASE_URL + '/',
      'en': BASE_URL + '/en',
    },
  },
};

export default function EnPage() {
  return <HomeClient lang="en" />;
}
