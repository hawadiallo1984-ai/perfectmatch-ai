import type { Metadata } from 'next';
import BlessuresClient from './BlessuresClient';

export const metadata: Metadata = {
  title: 'Tes blessures intérieures — Mini-guide gratuit · PerfectMatch',
  description:
    'Identifie ta blessure dominante — abandon, rejet, estime, trahison ou injustice — et fais le premier pas. Mini-guide gratuit offert par PerfectMatch · EvaTalk.',
};

export default function BlessuresPage() {
  return <BlessuresClient />;
}
