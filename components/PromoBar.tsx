'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const STORAGE_KEY = 'promobar_dismissed';
const BAR_H = '40px';

export default function PromoBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const isEN = pathname?.startsWith('/en');

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) !== '1') {
      setVisible(true);
      document.documentElement.style.setProperty('--promobar-h', BAR_H);
    }
  }, []);

  const dismiss = () => {
    setVisible(false);
    localStorage.setItem(STORAGE_KEY, '1');
    document.documentElement.style.setProperty('--promobar-h', '0px');
  };

  if (!visible) return null;

  const href = isEN ? '/en/guides' : '/bibliotheque';
  const text = isEN
    ? '✨ Launch offer — 15% off all guides & packs with code BIENVENUE15 · limited time'
    : '✨ Offre de lancement — –15 % sur tous les guides & packs avec le code BIENVENUE15 · offre limitée';
  const cta = isEN ? 'Shop now' : "J'en profite";

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: BAR_H,
      background: 'linear-gradient(90deg,#6B5B95,#8E7AB5)',
      color: '#FBF8F2',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      fontSize: '.73rem',
      fontWeight: 500,
      letterSpacing: '.02em',
      zIndex: 200,
      padding: '0 44px 0 8px',
    }}>
      <span style={{ textAlign: 'center', lineHeight: 1.3 }}>{text}</span>
      <a href={href} style={{
        color: '#FBF8F2',
        fontWeight: 700,
        textDecoration: 'underline',
        whiteSpace: 'nowrap',
        fontSize: '.73rem',
        flexShrink: 0,
      }}>
        {cta} →
      </a>
      <button
        onClick={dismiss}
        aria-label="Fermer"
        style={{
          position: 'absolute',
          right: 10,
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'none',
          border: 'none',
          color: '#FBF8F2',
          cursor: 'pointer',
          fontSize: '1.1rem',
          opacity: 0.7,
          lineHeight: 1,
          padding: '4px 6px',
        }}
      >
        ×
      </button>
    </div>
  );
}
