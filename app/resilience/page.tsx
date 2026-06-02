import type { Metadata } from 'next';
import ResiliencePage from '@/components/ResiliencePage';

export const metadata: Metadata = {
  title: 'Racisme & misogynoir : protéger ta santé mentale — TCC | PerfectMatch',
  description:
    'Parcours TCC culturellement adaptés face au racisme, à la négrophobie et à la misogynoir. Outils concrets pour protéger ta santé mentale, apaiser la rumination et restaurer ton estime.',
};

export default function Page() {
  return <ResiliencePage />;
}
