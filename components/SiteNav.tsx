'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import styles from './SiteNav.module.css';

const NAV_LINKS = [
  { label: 'Résilience', href: '/resilience' },
  { label: 'Argent', href: '/argent' },
  { label: 'Sexualité', href: '/sexualite' },
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const commencerHref = pathname === '/' ? '#offres' : '/#offres';

  const close = () => setOpen(false);

  return (
    <nav className={styles.nav}>
      <a href="/" className={styles.logo} onClick={close}>
        <span className={styles.logoMark} />
        PerfectMatch
      </a>

      {/* Desktop links */}
      <div className={styles.links}>
        {NAV_LINKS.map(({ label, href }) => (
          <a key={href} href={href}>{label}</a>
        ))}
        <a href={commencerHref} className={styles.cta}>Commencer</a>
      </div>

      {/* Hamburger */}
      <button
        className={`${styles.hamburger} ${open ? styles.hamburgerOpen : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
        aria-expanded={open}
      >
        <span className={styles.bar} />
        <span className={styles.bar} />
        <span className={styles.bar} />
      </button>

      {/* Mobile panel (absolute child of fixed nav) */}
      {open && (
        <div className={styles.mobilePanel}>
          {NAV_LINKS.map(({ label, href }) => (
            <a key={href} href={href} onClick={close}>{label}</a>
          ))}
          <a href={commencerHref} className={styles.mobileCta} onClick={close}>
            Commencer
          </a>
        </div>
      )}
    </nav>
  );
}
