import type { Metadata } from 'next';
import CarnetDePensees from '@/components/CarnetDePensees';

export const metadata: Metadata = {
  title: 'Carnet de pensées — PerfectMatch TCC',
  description: 'Identifie tes pensées automatiques et distorsions cognitives, puis reformule avec Luna en mode socratique.',
};

export default function CarnetPage() {
  return <CarnetDePensees />;
}
