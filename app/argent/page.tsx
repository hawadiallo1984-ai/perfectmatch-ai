import type { Metadata } from 'next';
import ArgentPage from '@/components/ArgentPage';

export const metadata: Metadata = {
  title: "Argent & business — TCC pour transformer ton rapport à l'argent",
  description:
    "Parcours TCC pour transformer ton rapport à l'argent : Black Tax, croyances limitantes, syndrome de l'imposteur, anxiété financière, honte de classe. Mindset et bien-être, pas un conseil financier.",
};

export default function Page() {
  return <ArgentPage />;
}
