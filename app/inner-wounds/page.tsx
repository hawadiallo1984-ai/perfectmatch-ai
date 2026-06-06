import type { Metadata } from 'next';
import InnerWoundsClient from './InnerWoundsClient';

export const metadata: Metadata = {
  title: 'Your Inner Wounds — Free Starter Guide · PerfectMatch',
  description:
    'Spot your core wound — abandonment, rejection, low self-worth, betrayal or injustice — and take the first step. Free starter guide by PerfectMatch · EvaTalk.',
};

export default function InnerWoundsPage() {
  return <InnerWoundsClient />;
}
