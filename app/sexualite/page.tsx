import type { Metadata } from 'next';
import SexualiteClient from '@/app/SexualiteClient';

export const metadata: Metadata = {
  title: 'Sexualité & bien-être — guides TCC sans honte',
  description:
    'Guides TCC pour renouer avec ton désir, ton corps et ton intimité : se réapproprier sa sexualité, désir & intimité, image du corps, sexualité black. Psychoéducation pour adultes, cadre coaching.',
};

export default function Page() {
  return <SexualiteClient />;
}
