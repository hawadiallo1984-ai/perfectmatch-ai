import type { Metadata } from 'next';
import DesirClient from './DesirClient';

export const metadata: Metadata = {
  title: 'Ton rapport au désir et à l\'intimité — Test gratuit (18+) · PerfectMatch',
  description:
    '9 questions pour identifier ce qui freine ton intimité : libido en veille, anxiété de performance, blocages ou désaccord avec ton/ta partenaire. Test gratuit de psychoéducation.',
};

export default function RapportAuDesirPage() {
  return <DesirClient />;
}
