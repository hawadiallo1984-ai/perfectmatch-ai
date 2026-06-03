import type { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: "PerfectMatch — Comprends tes schémas, transforme ta vie amoureuse",
  description:
    "Anxiété amoureuse, pensées négatives, schémas répétitifs ? PerfectMatch croise psychologie, astrologie et TCC pour identifier tes blocages et les transformer — en amour comme au travail.",
};

export default function Page() {
  return <HomeClient />;
}
