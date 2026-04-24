import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PerfectMatch — Trouve la clarté avant de trouver l\'amour',
  description:
    "L'algorithme de compatibilité le plus avancé jamais conçu — au-delà des sites de rencontre, des coachs, des thérapeutes.",
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
