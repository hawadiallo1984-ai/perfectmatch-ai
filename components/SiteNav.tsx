'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { HOME_COPY } from '@/lib/homeCopy';
import styles from './SiteNav.module.css';

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isEn = pathname.startsWith('/en');
  const lang = isEn ? 'en' : 'fr';
  const nav = HOME_COPY[lang].nav;

  const close = () => setOpen(false);

  const NAV_LINKS = [
    { label: nav.guides, href: isEn ? '/en/guides' : '/bibliotheque' },
    { label: nav.resilience, href: '/resilience' },
    { label: nav.argent, href: '/argent' },
    { label: nav.sexualite, href: '/sexualite' },
    { label: nav.travail, href: isEn ? '/career' : '/travail' },
    { label: nav.faq, href: '/faq' },
  ];

  const commencerHref = isEn ? '/inner-wounds' : '/blessures-interieures';

  return (
    <nav className={styles.nav}>
      <a href={isEn ? '/en' : '/'} className={styles.logo} onClick={close}>
        <span className={styles.logoMark} />
        PerfectMatch
      </a>

      {/* Desktop links */}
      <div className={styles.links}>
        {NAV_LINKS.map(({ label, href }) => (
          <a key={href} href={href}>{label}</a>
        ))}
        <a href={nav.toggleHref} style={{
          fontSize: 11,
          letterSpacing: '.12em',
          textTransform: 'uppercase',
          opacity: .6,
          color: 'var(--gold)',
          textDecoration: 'none',
          transition: 'opacity .2s',
        }}>
          {nav.toggle}
        </a>
        <a href={commencerHref} className={styles.cta}>
          {isEn ? 'Start' : 'Commencer'}
        </a>
      </div>

      {/* Hamburger */}
      <button
        className={`${styles.hamburger} ${open ? styles.hamburgerOpen : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
      >
        <span className={styles.bar} />
        <span className={styles.bar} />
        <span className={styles.bar} />
      </button>

      {/* Mobile panel */}
      {open && (
        <div className={styles.mobilePanel}>
          {NAV_LINKS.map(({ label, href }) => (
            <a key={href} href={href} onClick={close}>{label}</a>
          ))}
          <a href={nav.toggleHref} onClick={close} style={{ color: 'var(--gold)', opacity: .9 }}>
            {nav.toggle}
          </a>
          <a href={commencerHref} className={styles.mobileCta} onClick={close}>
            {isEn ? 'Start' : 'Commencer'}
          </a>
        </div>
      )}
    </nav>
  );
}
