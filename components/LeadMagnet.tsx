'use client';

import { useState } from 'react';

const PDF_URL = {
  fr: '/guides/mini-guide-gratuit-blessures.pdf',
  en: '/guides/free-mini-guide-wounds.pdf',
};

const COPY = {
  fr: {
    title: 'Reçois ton mini-guide offert 💛',
    text: '« Ta blessure ne te définit pas » — le premier pas pour t\'en libérer, la méthode EvaTalk. Entre ton email, je te l\'envoie.',
    placeholder: 'ton@email.com',
    button: 'Recevoir mon mini-guide',
    success: 'C\'est parti ! Ton mini-guide se télécharge — pense à vérifier tes mails.',
  },
  en: {
    title: 'Get your free mini-guide 💛',
    text: "'Your Wound Doesn't Define You' — the first step to free yourself, the EvaTalk method. Enter your email and I'll send it.",
    placeholder: 'your@email.com',
    button: 'Get my mini-guide',
    success: 'Done! Your mini-guide is downloading — check your inbox too.',
  },
};

type Props = { lang?: 'fr' | 'en' };

export default function LeadMagnet({ lang = 'fr' }: Props) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');
  const copy = COPY[lang];
  const pdfUrl = PDF_URL[lang];

  const triggerDownload = () => {
    const a = document.createElement('a');
    a.href = pdfUrl;
    a.download = pdfUrl.split('/').pop() ?? 'mini-guide.pdf';
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    setStatus('loading');

    try {
      await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, parcours: 'lead-magnet-blessures' }),
      });
    } catch (err) {
      console.error('[LeadMagnet] email capture failed:', err);
    }

    triggerDownload();
    setStatus('done');
  };

  if (status === 'done') {
    return (
      <section style={{ padding: '0 24px clamp(32px,6vw,48px)' }}>
        <div style={{
          maxWidth: 560,
          margin: '0 auto',
          padding: '28px 32px',
          border: '1px solid rgba(201,162,75,0.4)',
          background: 'rgba(201,162,75,0.07)',
          textAlign: 'center',
        }}>
          <p style={{
            fontFamily: 'Fraunces, serif',
            fontSize: 'clamp(1rem,2.5vw,1.2rem)',
            color: '#F5EFE3',
            lineHeight: 1.5,
            margin: 0,
          }}>
            {copy.success}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section style={{ padding: '0 24px clamp(32px,6vw,48px)' }}>
      <div style={{
        maxWidth: 560,
        margin: '0 auto',
        padding: '28px 32px',
        border: '1px solid rgba(201,162,75,0.3)',
        background: 'rgba(201,162,75,0.05)',
      }}>
        <p style={{
          fontSize: '.75rem',
          letterSpacing: '.15em',
          textTransform: 'uppercase',
          color: '#C9A24B',
          fontWeight: 700,
          marginBottom: '.75rem',
        }}>
          Mini-guide offert
        </p>
        <p style={{
          fontFamily: 'Fraunces, serif',
          fontSize: 'clamp(1rem,2.5vw,1.25rem)',
          fontWeight: 400,
          color: '#F5EFE3',
          lineHeight: 1.35,
          marginBottom: '.75rem',
        }}>
          {copy.title}
        </p>
        <p style={{ fontSize: '.87rem', color: '#A9A3B8', lineHeight: 1.65, marginBottom: '1.25rem' }}>
          {copy.text}
        </p>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={copy.placeholder}
            style={{
              padding: '11px 14px',
              border: '1px solid rgba(201,162,75,0.35)',
              background: 'rgba(11,10,20,0.6)',
              color: '#F5EFE3',
              fontSize: '.9rem',
              borderRadius: '3px',
              outline: 'none',
            }}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            style={{
              background: 'linear-gradient(135deg,#C9A24B,#A87C2A)',
              color: '#0B0A14',
              fontWeight: 700,
              fontSize: '.88rem',
              padding: '12px 24px',
              border: 'none',
              borderRadius: '3px',
              cursor: status === 'loading' ? 'not-allowed' : 'pointer',
              opacity: status === 'loading' ? 0.7 : 1,
              letterSpacing: '.04em',
            }}
          >
            {status === 'loading' ? '…' : copy.button}
          </button>
        </form>
      </div>
    </section>
  );
}
