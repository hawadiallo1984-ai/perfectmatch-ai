import type { Metadata } from 'next';
import CareerClient from '@/app/CareerClient';

const BASE_URL = 'https://perfectmatch-ai.vercel.app';

export const metadata: Metadata = {
  title: 'Career & professional world — CBT guides · PerfectMatch',
  description:
    'CBT guides to take your place at work, ease the load of being the only one, and become a useful ally. Psychoeducation & professional coaching.',
  alternates: {
    canonical: BASE_URL + '/career',
    languages: { 'fr-FR': BASE_URL + '/travail', 'en': BASE_URL + '/career' },
  },
};

export default function Page() {
  return <CareerClient />;
}
