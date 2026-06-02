import type { Metadata } from 'next';
import ResiliencePage from '@/components/ResiliencePage';

export const metadata: Metadata = {
  title: 'Résilience & bien-être — Parcours TCC | PerfectMatch',
  description:
    'Parcours TCC culturellement adaptés pour traverser l\'impact psychologique du racisme et de la misogynoir. Outils concrets, posture validante, santé mentale et résilience.',
};

export default function Page() {
  return <ResiliencePage />;
}
