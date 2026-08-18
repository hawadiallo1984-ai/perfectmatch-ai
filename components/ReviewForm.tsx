'use client';

import { useState } from 'react';

type Props = { lang?: 'fr' | 'en'; onClose?: () => void };

const COPY = {
  fr: {
    title: 'Laisser un avis',
    namePlaceholder: 'Ton prénom',
    commentPlaceholder: 'Partage ton expérience (5–600 caractères)…',
    submit: 'Envoyer mon avis',
    submitting: 'Envoi…',
    success: 'Merci 🌸 Ton avis sera publié après validation.',
    errorGeneric: 'Une erreur est survenue. Réessaie.',
  },
  en: {
    title: 'Leave a review',
    namePlaceholder: 'Your first name',
    commentPlaceholder: 'Share your experience (5–600 characters)…',
    submit: 'Send my review',
    submitting: 'Sending…',
    success: 'Thank you 🌸 Your review will be published after moderation.',
    errorGeneric: 'Something went wrong. Please try again.',
  },
};

export default function ReviewForm({ lang = 'fr', onClose }: Props) {
  const copy = COPY[lang];
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, rating, comment, lang, website }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus('success');
      } else {
        setErrorMsg(data.error ?? copy.errorGeneric);
        setStatus('error');
      }
    } catch {
      setErrorMsg(copy.errorGeneric);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div style={{
        background: 'rgba(201,162,75,0.08)',
        border: '1px solid rgba(201,162,75,0.25)',
        borderRadius: 12,
        padding: '32px 28px',
        textAlign: 'center',
      }}>
        <p style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--gold-soft)' }}>{copy.success}</p>
      </div>
    );
  }

  const activeRating = hoverRating || rating;

  return (
    <form onSubmit={handleSubmit} style={{
      background: 'rgba(28,24,51,0.7)',
      border: '1px solid rgba(201,162,75,0.18)',
      borderRadius: 16,
      padding: '36px 32px',
      maxWidth: 540,
      margin: '0 auto',
    }}>
      <h3 style={{
        fontFamily: 'Fraunces, serif',
        fontWeight: 400,
        fontSize: 22,
        color: 'var(--cream)',
        marginBottom: 28,
      }}>
        {copy.title}
      </h3>

      {/* honeypot — caché visuellement */}
      <input
        type="text"
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        tabIndex={-1}
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0 }}
      />

      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder={copy.namePlaceholder}
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={40}
          required
          style={{
            width: '100%',
            padding: '12px 16px',
            borderRadius: 8,
            border: '1px solid rgba(201,162,75,0.25)',
            background: 'rgba(11,10,20,0.6)',
            color: 'var(--cream)',
            fontSize: 15,
            boxSizing: 'border-box',
          }}
        />
      </div>

      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: 32,
                color: star <= activeRating ? '#C9A24B' : 'rgba(201,162,75,0.25)',
                padding: '0 2px',
                lineHeight: 1,
                transition: 'color 0.15s',
              }}
            >
              ★
            </button>
          ))}
        </div>
        {rating === 0 && status === 'error' && (
          <p style={{ fontSize: 12, color: '#D99B9B', textAlign: 'center', marginTop: 6 }}>
            {lang === 'fr' ? 'Sélectionne une note.' : 'Please select a rating.'}
          </p>
        )}
      </div>

      <div style={{ marginBottom: 24 }}>
        <textarea
          placeholder={copy.commentPlaceholder}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          minLength={5}
          maxLength={600}
          required
          rows={4}
          style={{
            width: '100%',
            padding: '12px 16px',
            borderRadius: 8,
            border: '1px solid rgba(201,162,75,0.25)',
            background: 'rgba(11,10,20,0.6)',
            color: 'var(--cream)',
            fontSize: 15,
            resize: 'vertical',
            boxSizing: 'border-box',
            fontFamily: 'inherit',
          }}
        />
        <p style={{ fontSize: 12, opacity: 0.4, textAlign: 'right', marginTop: 4 }}>{comment.length}/600</p>
      </div>

      {errorMsg && (
        <p style={{ color: '#D99B9B', fontSize: 13, marginBottom: 16 }}>{errorMsg}</p>
      )}

      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <button
          type="submit"
          disabled={status === 'loading' || rating === 0}
          className="btn btn--primary"
          style={{
            padding: '13px 28px',
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: '0.08em',
            borderRadius: 100,
            border: 'none',
            cursor: status === 'loading' || rating === 0 ? 'not-allowed' : 'pointer',
            opacity: rating === 0 ? 0.6 : 1,
          }}
        >
          {status === 'loading' ? copy.submitting : copy.submit}
        </button>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(245,239,227,0.5)',
              cursor: 'pointer',
              fontSize: 13,
            }}
          >
            {lang === 'fr' ? 'Annuler' : 'Cancel'}
          </button>
        )}
      </div>
    </form>
  );
}
