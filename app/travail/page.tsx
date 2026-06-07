import type { Metadata } from 'next';
import TravailClient from '@/app/TravailClient';

const BASE_URL = 'https://perfectmatch-ai.vercel.app';

export const metadata: Metadata = {
  title: 'Travail & monde pro — guides TCC · PerfectMatch',
  description:
    "Guides TCC pour prendre ta place au travail, alléger la charge d'être la seule, et devenir un·e allié·e utile. Psychoéducation & coaching professionnel.",
  alternates: {
    canonical: BASE_URL + '/travail',
    languages: { 'fr-FR': BASE_URL + '/travail', 'en': BASE_URL + '/career' },
  },
};

export default function Page() {
  return <TravailClient />;
}
