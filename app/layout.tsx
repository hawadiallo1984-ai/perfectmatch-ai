import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "PerfectMatch — Sortir de l'anxiété amoureuse et des schémas répétitifs",
  description:
    "Anxiété, pensées négatives, distorsions cognitives, schémas qui se répètent ? PerfectMatch combine psychologie, astrologie et outils de TCC pour comprendre tes blocages et les transformer — en amour comme au travail.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <div className="stars" />
        {children}
      </body>
    </html>
  );
}
