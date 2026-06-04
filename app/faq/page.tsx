import type { Metadata } from 'next';
import FaqClient from '@/app/FaqClient';

export const metadata: Metadata = {
  title: 'FAQ — Comment utiliser les guides',
  description:
    'Tout ce que tu dois savoir sur les guides PerfectMatch : format, utilisation, méthode TCC à 4 approches, accompagnement EvaTalk.',
};

export default function Page() {
  return <FaqClient />;
}
