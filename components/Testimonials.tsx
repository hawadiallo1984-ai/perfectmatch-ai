'use client';

import { useEffect, useState } from 'react';
import ReviewForm from './ReviewForm';
import styles from '@/app/page.module.css';

type Testimonial = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  created_at: string;
};

type Props = { lang?: 'fr' | 'en' };

// Témoignage statique — toujours affiché, indépendant de Supabase/API.
const STATIC_TESTIMONIAL: Testimonial = {
  id: 'static-hawa',
  name: 'Hawa',
  rating: 5,
  comment:
    "J'ai lu le guide et franchement il était très bien. Ça m'a fait prendre conscience de beaucoup de choses, et surtout faire un travail intérieur sur moi. Je vais même acheter le guide estime de soi !",
  created_at: '',
};

const COPY = {
  fr: {
    label: 'Témoignages',
    title: 'Ils en parlent',
    waitingTitle: 'Les premiers avis arrivent bientôt',
    waitingText: "Ce guide est récent. Si tu l'as déjà lu, ton retour compte vraiment — il aide d'autres personnes à franchir le pas.",
    btnLeave: 'Laisser un avis',
    btnClose: 'Fermer',
  },
  en: {
    label: 'Reviews',
    title: 'What people say',
    waitingTitle: 'Reviews coming soon',
    waitingText: "This guide is new. If you've already read it, your feedback matters — it helps others take the step.",
    btnLeave: 'Leave a review',
    btnClose: 'Close',
  },
};

function Stars({ rating }: { rating: number }) {
  return (
    <span style={{ color: '#C9A24B', fontSize: 15, letterSpacing: 1 }}>
      {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
    </span>
  );
}

export default function Testimonials({ lang = 'fr' }: Props) {
  const copy = COPY[lang];
  const [items, setItems] = useState<Testimonial[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch(`/api/testimonials?lang=${lang}`)
      .then((r) => r.json())
      .then((d) => setItems(d.testimonials ?? []))
      .catch(() => {});
  }, [lang]);

  const allItems = [STATIC_TESTIMONIAL, ...items];

  return (
    <section style={{
      padding: 'clamp(48px, 7vw, 80px) 24px',
      borderTop: '1px solid rgba(201,162,75,0.10)',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* En-tête */}
        <div className={styles.offersHeader} style={{ marginBottom: 40 }}>
          <div className={styles.sectionLabel}>{copy.label}</div>
          <h2 className={styles.sectionTitle}>{copy.title}</h2>
        </div>

        {/* Grille d'avis — toujours au moins le témoignage statique */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 20,
          marginBottom: 40,
        }}>
          {allItems.map((t) => (
            <div key={t.id} style={{
              background: 'rgba(28,24,51,0.55)',
              border: '1px solid rgba(201,162,75,0.12)',
              borderRadius: 16,
              padding: '28px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}>
              <Stars rating={t.rating} />
              <p style={{
                fontSize: 15,
                lineHeight: 1.7,
                fontStyle: 'italic',
                opacity: 0.85,
                flexGrow: 1,
              }}>
                &ldquo;{t.comment}&rdquo;
              </p>
              <p style={{
                fontSize: 13,
                fontWeight: 600,
                color: 'var(--gold-soft)',
                letterSpacing: '0.04em',
              }}>
                — {t.name}
              </p>
            </div>
          ))}
        </div>

        {/* Bouton "Laisser un avis" */}
        <div style={{ textAlign: 'center', marginBottom: showForm ? 32 : 0 }}>
          <button
            onClick={() => setShowForm((v) => !v)}
            className="btn btn--primary"
            style={{
              padding: '13px 32px',
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: '0.08em',
              borderRadius: 100,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {showForm ? copy.btnClose : copy.btnLeave}
          </button>
        </div>

        {showForm && (
          <div style={{ marginTop: 32 }}>
            <ReviewForm lang={lang} onClose={() => setShowForm(false)} />
          </div>
        )}
      </div>
    </section>
  );
}
