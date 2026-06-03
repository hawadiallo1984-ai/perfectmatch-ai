import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://perfectmatch-ai.vercel.app'),
  title: {
    default: "PerfectMatch — Sortir de l'anxiété amoureuse et des schémas répétitifs",
    template: '%s · PerfectMatch',
  },
  description:
    "Anxiété, pensées négatives, distorsions cognitives, schémas qui se répètent ? PerfectMatch combine psychologie, astrologie et outils de TCC pour comprendre tes blocages et les transformer — en amour comme au travail.",
  openGraph: {
    title: "PerfectMatch — Sortir de l'anxiété amoureuse et des schémas répétitifs",
    description:
      "Anxiété, pensées négatives, distorsions cognitives, schémas qui se répètent ? PerfectMatch combine psychologie, astrologie et outils de TCC pour comprendre tes blocages et les transformer — en amour comme au travail.",
    type: 'website',
    locale: 'fr_FR',
    url: 'https://perfectmatch-ai.vercel.app',
    siteName: 'PerfectMatch',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <div className="stars" />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
