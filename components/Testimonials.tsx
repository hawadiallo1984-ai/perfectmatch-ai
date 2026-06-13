'use client';

import Script from 'next/script';
import styles from '@/app/page.module.css';

const SENJA_WIDGET_ID = "REMPLACER_PAR_LE_DATA_ID_DU_WIDGET";
const SENJA_FORM_URL  = "REMPLACER_PAR_URL_DU_FORMULAIRE";

type Props = { lang?: 'fr' | 'en' };

export default function Testimonials({ lang = 'fr' }: Props) {
  const widgetReady = !SENJA_WIDGET_ID.includes('REMPLACER');
  const formReady   = !SENJA_FORM_URL.includes('REMPLACER');

  if (!widgetReady && !formReady) return null;

  const title    = lang === 'fr' ? 'Ils en parlent'  : 'What people say';
  const btnLabel = lang === 'fr' ? 'Laisser un avis' : 'Leave a review';

  return (
    <>
      {widgetReady && (
        <Script
          src="https://static.senja.io/dist/platform.js"
          strategy="lazyOnload"
          async
        />
      )}
      <section style={{
        padding: 'clamp(40px, 6vw, 64px) 24px',
        borderTop: '1px solid rgba(201,162,75,0.1)',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className={styles.offersHeader} style={{ marginBottom: 32 }}>
            <div className={styles.sectionLabel}>
              {lang === 'fr' ? 'Témoignages' : 'Reviews'}
            </div>
            <h2 className={styles.sectionTitle}>{title}</h2>
          </div>

          {widgetReady && (
            <div
              className="senja-embed"
              data-id={SENJA_WIDGET_ID}
              data-lazyload="false"
              style={{ marginBottom: 32 }}
            />
          )}

          {formReady && (
            <div style={{ textAlign: 'center' }}>
              <a
                href={SENJA_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  border: '1px solid rgba(201,162,75,0.4)',
                  color: '#C9A24B',
                  fontSize: 13,
                  padding: '10px 24px',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  letterSpacing: '.04em',
                }}
              >
                {btnLabel} →
              </a>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
