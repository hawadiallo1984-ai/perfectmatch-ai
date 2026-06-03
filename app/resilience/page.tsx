import type { Metadata } from 'next';
import ResiliencePage from '@/components/ResiliencePage';

export const metadata: Metadata = {
  title: 'Résilience — Racisme, misogynoir & santé mentale',
  description:
    'Parcours TCC culturellement adaptés face au racisme, à la négrophobie et à la misogynoir. Outils concrets pour protéger ta santé mentale, apaiser la rumination et restaurer ton estime.',
};

export default function Page() {
  return <ResiliencePage />;
}
