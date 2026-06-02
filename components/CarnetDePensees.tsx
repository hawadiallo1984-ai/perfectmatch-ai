'use client';

import { useRef, useState } from 'react';
import { track } from '@vercel/analytics';

const DISTORTIONS = [
  'Tout ou rien',
  'Surgénéralisation',
  'Filtre mental',
  'Déqualification du positif',
  'Conclusion hâtive',
  'Catastrophisme',
  'Raisonnement émotionnel',
  'Obligations (je devrais)',
  'Étiquetage',
  'Personnalisation',
];

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface Entry {
  situation: string;
  emotion: string;
  intensityBefore: number;
  automaticThoughts: string;
  distortions: string[];
  alternativeThought: string;
  intensityAfter: number;
}

const emptyEntry = (): Entry => ({
  situation: '',
  emotion: '',
  intensityBefore: 50,
  automaticThoughts: '',
  distortions: [],
  alternativeThought: '',
  intensityAfter: 50,
});

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 11,
  fontWeight: 500,
  letterSpacing: '0.09em',
  textTransform: 'uppercase',
  color: 'var(--gold)',
  marginBottom: 8,
};

const textareaStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(28,24,51,0.5)',
  border: '1px solid var(--line)',
  borderRadius: 4,
  padding: '12px 14px',
  color: 'var(--cream)',
  fontSize: 14,
  lineHeight: 1.65,
  resize: 'vertical',
  fontFamily: 'inherit',
  outline: 'none',
  boxSizing: 'border-box',
};

export default function CarnetDePensees() {
  const [entry, setEntry] = useState<Entry>(emptyEntry());
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [contextSent, setContextSent] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () =>
    setTimeout(() => chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' }), 50);

  const setField = <K extends keyof Entry>(key: K, value: Entry[K]) =>
    setEntry((prev) => ({ ...prev, [key]: value }));

  const toggleDistortion = (d: string) =>
    setEntry((prev) => ({
      ...prev,
      distortions: prev.distortions.includes(d)
        ? prev.distortions.filter((x) => x !== d)
        : [...prev.distortions, d],
    }));

  const postToLuna = async (msgs: Message[]) => {
    setSending(true);
    try {
      const res = await fetch('/api/carnet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: msgs,
          context: {
            situation: entry.situation,
            emotion: entry.emotion,
            intensityBefore: entry.intensityBefore,
            automaticThoughts: entry.automaticThoughts,
            distortions: entry.distortions,
          },
        }),
      });
      const data = await res.json();
      const reply = data.reply || '…';
      setMessages([...msgs, { role: 'assistant', content: reply }]);
      scrollToBottom();
    } catch {
      setMessages([...msgs, { role: 'assistant', content: 'Désolée, une erreur est survenue.' }]);
    }
    setSending(false);
  };

  const consultLuna = async () => {
    track('luna_consulted');
    const init: Message = {
      role: 'user',
      content: "J'ai rempli les 4 premières colonnes de mon carnet. Aide-moi à examiner ma pensée automatique.",
    };
    const msgs = [init];
    setMessages(msgs);
    setContextSent(true);
    scrollToBottom();
    await postToLuna(msgs);
  };

  const handleSend = async () => {
    if (!input.trim() || sending) return;
    const msgs: Message[] = [...messages, { role: 'user', content: input }];
    setMessages(msgs);
    setInput('');
    scrollToBottom();
    await postToLuna(msgs);
  };

  const delta = entry.intensityAfter - entry.intensityBefore;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      {/* Header */}
      <header style={{
        padding: '16px 36px',
        borderBottom: '1px solid var(--line)',
        background: 'rgba(11,10,20,0.7)',
        backdropFilter: 'blur(14px)',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        flexShrink: 0,
      }}>
        <div style={{
          width: 38, height: 38, borderRadius: 4,
          background: 'linear-gradient(135deg, var(--violet) 0%, var(--gold) 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16, color: 'var(--ink)',
        }}>✦</div>
        <div>
          <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: 20, fontWeight: 400 }}>
            Carnet de pensées
          </h1>
          <div style={{ fontSize: 11, opacity: 0.5, fontStyle: 'italic', fontFamily: 'Fraunces, serif' }}>
            Outil TCC — 6 colonnes de Beck
          </div>
        </div>
      </header>

      {/* Body */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* ── Formulaire (gauche) ── */}
        <div style={{
          flex: '0 0 52%',
          overflowY: 'auto',
          padding: '28px 36px 40px',
          borderRight: '1px solid var(--line)',
        }}>

          {/* 1 — Situation */}
          <div style={{ marginBottom: 26 }}>
            <span style={labelStyle}>1 · Situation</span>
            <textarea
              placeholder="Décris la situation objectivement — qui, quoi, quand, où."
              rows={3}
              value={entry.situation}
              onChange={(e) => setField('situation', e.target.value)}
              style={textareaStyle}
            />
          </div>

          {/* 2 — Émotion + intensité avant */}
          <div style={{ marginBottom: 26 }}>
            <span style={labelStyle}>2 · Émotion + intensité avant</span>
            <input
              type="text"
              placeholder="Quelle émotion as-tu ressentie ? (ex : anxiété, colère, honte…)"
              value={entry.emotion}
              onChange={(e) => setField('emotion', e.target.value)}
              style={{ ...textareaStyle, height: 42, resize: 'none', marginBottom: 12 }}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <input
                type="range" min={0} max={100}
                value={entry.intensityBefore}
                onChange={(e) => setField('intensityBefore', Number(e.target.value))}
                style={{ flex: 1, accentColor: 'var(--gold)' }}
              />
              <span style={{ minWidth: 36, textAlign: 'right', fontFamily: 'Fraunces, serif', color: 'var(--gold)', fontSize: 20 }}>
                {entry.intensityBefore}
              </span>
            </div>
          </div>

          {/* 3 — Pensées automatiques */}
          <div style={{ marginBottom: 26 }}>
            <span style={labelStyle}>3 · Pensées automatiques</span>
            <textarea
              placeholder="Qu'est-ce que tu t'es dit spontanément ? (sans filtrer)"
              rows={3}
              value={entry.automaticThoughts}
              onChange={(e) => setField('automaticThoughts', e.target.value)}
              style={textareaStyle}
            />
          </div>

          {/* 4 — Distorsions cognitives */}
          <div style={{ marginBottom: 28 }}>
            <span style={labelStyle}>4 · Distorsions cognitives</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {DISTORTIONS.map((d) => {
                const active = entry.distortions.includes(d);
                return (
                  <button
                    key={d}
                    onClick={() => toggleDistortion(d)}
                    style={{
                      padding: '6px 13px',
                      borderRadius: 20,
                      fontSize: 12.5,
                      border: `1px solid ${active ? 'var(--violet)' : 'var(--line)'}`,
                      background: active ? 'rgba(142,122,181,0.18)' : 'transparent',
                      color: active ? 'var(--violet-soft)' : 'var(--cream-soft)',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                      fontFamily: 'inherit',
                    }}
                  >
                    {d}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bouton consulter Luna */}
          {!contextSent && (
            <button
              onClick={consultLuna}
              disabled={!entry.situation.trim() && !entry.automaticThoughts.trim()}
              style={{
                width: '100%',
                padding: '13px 0',
                marginBottom: 28,
                borderRadius: 4,
                background: 'linear-gradient(135deg, var(--violet), var(--violet-soft))',
                border: 'none',
                color: 'var(--ink)',
                fontSize: 13.5,
                fontWeight: 600,
                letterSpacing: '0.05em',
                cursor: 'pointer',
                opacity: !entry.situation.trim() && !entry.automaticThoughts.trim() ? 0.4 : 1,
                fontFamily: 'inherit',
              }}
            >
              ✦ Consulter Luna en mode socratique
            </button>
          )}

          {/* 5 — Pensée alternative */}
          <div style={{ marginBottom: 26 }}>
            <span style={labelStyle}>5 · Pensée alternative</span>
            <textarea
              placeholder="Après réflexion avec Luna, formule une pensée plus juste — pas forcément positive, juste plus équilibrée."
              rows={3}
              value={entry.alternativeThought}
              onChange={(e) => setField('alternativeThought', e.target.value)}
              style={textareaStyle}
            />
          </div>

          {/* 6 — Émotion après + intensité */}
          <div style={{ marginBottom: 32 }}>
            <span style={labelStyle}>6 · Intensité après</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <input
                type="range" min={0} max={100}
                value={entry.intensityAfter}
                onChange={(e) => setField('intensityAfter', Number(e.target.value))}
                style={{ flex: 1, accentColor: 'var(--gold)' }}
              />
              <span style={{ minWidth: 36, textAlign: 'right', fontFamily: 'Fraunces, serif', color: 'var(--gold)', fontSize: 20 }}>
                {entry.intensityAfter}
              </span>
            </div>
            {entry.emotion && (
              <div style={{ marginTop: 10, fontSize: 12, opacity: 0.55, fontStyle: 'italic' }}>
                {entry.emotion} : {entry.intensityBefore} → {entry.intensityAfter}
                {delta < 0 ? ` (−${Math.abs(delta)} pts)` : delta > 0 ? ` (+${delta} pts)` : ' (inchangé)'}
              </div>
            )}
          </div>

          <button
            onClick={() => { if (entry.situation || entry.automaticThoughts) track('carnet_entry_saved'); setEntry(emptyEntry()); setMessages([]); setContextSent(false); }}
            style={{
              padding: '8px 18px',
              border: '1px solid var(--line)',
              borderRadius: 4,
              background: 'transparent',
              color: 'var(--cream-soft)',
              fontSize: 12,
              cursor: 'pointer',
              opacity: 0.55,
              fontFamily: 'inherit',
            }}
          >
            Nouvelle entrée
          </button>
        </div>

        {/* ── Luna (droite) ── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

          {/* Luna header */}
          <div style={{
            padding: '14px 24px',
            borderBottom: '1px solid var(--line)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            flexShrink: 0,
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: 'radial-gradient(circle at 30% 30%, var(--violet-soft) 0%, var(--violet) 60%, #5E4B85 100%)',
            }} />
            <div>
              <div style={{ fontFamily: 'Fraunces, serif', fontSize: 15 }}>Luna</div>
              <div style={{ fontSize: 10, opacity: 0.5, fontStyle: 'italic', fontFamily: 'Fraunces, serif' }}>mode socratique TCC</div>
            </div>
          </div>

          {/* Messages */}
          <div ref={chatRef} style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
            {messages.length === 0 ? (
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', height: '100%', opacity: 0.35, gap: 12,
              }}>
                <div style={{ fontSize: 28 }}>✦</div>
                <div style={{
                  fontFamily: 'Fraunces, serif', fontSize: 13.5, fontStyle: 'italic',
                  textAlign: 'center', maxWidth: 240, lineHeight: 1.6,
                }}>
                  Remplis les 4 premières colonnes puis consulte Luna pour examiner ta pensée.
                </div>
              </div>
            ) : (
              messages.map((m, i) => (
                <div key={i} style={{
                  display: 'flex', gap: 10, marginBottom: 18,
                  flexDirection: m.role === 'user' ? 'row-reverse' : 'row',
                }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                    background: m.role === 'user'
                      ? 'linear-gradient(135deg, var(--gold), var(--gold-soft))'
                      : 'radial-gradient(circle at 30% 30%, var(--violet-soft) 0%, var(--violet) 60%, #5E4B85 100%)',
                  }} />
                  <div style={{
                    maxWidth: '82%', padding: '13px 16px', borderRadius: 2,
                    background: m.role === 'user' ? 'rgba(201,162,75,0.1)' : 'rgba(28,24,51,0.6)',
                    border: `1px solid ${m.role === 'user' ? 'var(--line-strong)' : 'var(--line)'}`,
                    fontSize: 14, lineHeight: 1.65, fontWeight: 300,
                  }}>
                    {m.content.split('\n').map((line, j) => (
                      <p key={j} style={{ marginBottom: 6 }}>{line}</p>
                    ))}
                  </div>
                </div>
              ))
            )}
            {sending && (
              <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: 'radial-gradient(circle at 30% 30%, var(--violet-soft) 0%, var(--violet) 60%, #5E4B85 100%)',
                }} />
                <div style={{
                  padding: '13px 16px', background: 'rgba(28,24,51,0.6)',
                  border: '1px solid var(--line)', display: 'flex', gap: 5, alignItems: 'center',
                }}>
                  {[0, 0.2, 0.4].map((delay, i) => (
                    <span key={i} style={{
                      width: 5, height: 5, borderRadius: '50%',
                      background: 'var(--violet-soft)',
                      animation: `pulse 1.4s ${delay}s infinite`,
                    }} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          {contextSent && (
            <div style={{ padding: '14px 24px 18px', borderTop: '1px solid var(--line)', flexShrink: 0 }}>
              <div style={{
                display: 'flex', gap: 8, padding: '5px 5px 5px 14px',
                border: '1px solid var(--line-strong)',
                background: 'rgba(28,24,51,0.5)', borderRadius: 22,
              }}>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                  placeholder="Réponds à Luna…"
                  rows={1}
                  style={{
                    flex: 1, minHeight: 34, padding: '7px 0',
                    fontSize: 14, color: 'var(--cream)',
                    background: 'transparent', border: 'none', outline: 'none',
                    resize: 'none', fontFamily: 'inherit',
                  }}
                />
                <button
                  onClick={handleSend}
                  disabled={sending || !input.trim()}
                  style={{
                    width: 34, height: 34, borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--violet), var(--violet-soft))',
                    color: 'var(--ink)', border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, flexShrink: 0,
                  }}
                >↑</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
