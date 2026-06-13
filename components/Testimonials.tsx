import { publishedTestimonials } from '@/lib/testimonials';
import styles from '@/app/page.module.css';

type Props = { lang: 'fr' | 'en' };

export default function Testimonials({ lang }: Props) {
  const list = publishedTestimonials(lang);
  if (list.length === 0) return null;

  const title = lang === 'fr' ? 'Ils en parlent' : 'What people say';

  return (
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {list.map((t) => (
            <div
              key={t.id}
              style={{
                padding: '24px 24px 20px',
                border: '1px solid var(--line)',
                background: 'rgba(28,24,51,0.4)',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              {t.rating !== undefined && (
                <div style={{ color: '#C9A24B', fontSize: 14, letterSpacing: 2 }}>
                  {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
                </div>
              )}
              <p style={{
                fontFamily: 'Fraunces, serif',
                fontStyle: 'italic',
                fontSize: '1rem',
                lineHeight: 1.65,
                color: 'var(--cream)',
                margin: 0,
              }}>
                « {t.text} »
              </p>
              <div>
                <strong style={{ display: 'block', fontSize: '.85rem', color: 'var(--cream)' }}>
                  {t.name}
                </strong>
                {t.context && (
                  <span style={{ fontSize: '.8rem', color: '#A9A3B8' }}>{t.context}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
