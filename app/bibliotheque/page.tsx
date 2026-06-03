import type { Metadata } from 'next';
import BibliothequeClient from '@/app/BibliothequeClient';

export const metadata: Metadata = {
  title: 'Bibliothèque — 14 guides TCC par thème',
  description:
    'Tous les guides PerfectMatch réunis : amour & relations, bien-être & soi, sexualité, argent. Des outils TCC concrets pour les personnes noires et métisses.',
};

export default function Page() {
  return <BibliothequeClient />;
}
