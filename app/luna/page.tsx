'use client';

import { useEffect, useRef, useState } from 'react';

interface Message { role: 'user' | 'assistant'; content: string; }

export default function LunaPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Bonsoir. Je vois ton rapport devant moi. De quoi veux-tu qu'on parle ce soir ?" }
  ]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);

  const userReport = typeof window !== 'undefined' ? JSON.parse(sessionStorage.getItem('pm_report') || 'null') : null;

  useEffect(() => {
    messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || sending) return;
    const newMessages: Message[] = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setSending(true);

    try {
      const res = await fetch('/api/luna', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, userReport }),
      });
      const data = await res.json();
      setMessages([...newMessages, { role: 'assistant', content: data.reply || '…' }]);
    } catch {
      setMessages([...newMessages, { role: 'assistant', content: 'Désolée, une erreur est survenue.' }]);
    }
    setSending(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', position: 'relative', zIndex: 2 }}>
      <header style={{ padding: '20px 40px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 16, background: 'rgba(11,10,20,0.6)', backdropFilter: 'blur(14px)' }}>
        <div style={{ width: 46, height: 46, borderRadius: '50%', background: 'radial-gradient(circle at 30% 30%, var(--violet-soft) 0%, var(--violet) 60%, #5E4B85 100%)', boxShadow: '0 0 30px rgba(142,122,181,0.25)' }} />
        <div>
          <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 400 }}>Luna</h1>
          <div style={{ fontSize: 12, opacity: 0.65, fontStyle: 'italic', fontFamily: 'Fraunces, serif' }}>
            {userReport ? '✦ connaît ton rapport' : '✦ en ligne'}
          </div>
        </div>
      </header>

      <div ref={messagesRef} style={{ flex: 1, overflowY: 'auto', padding: 40 }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, marginBottom: 28, flexDirection: m.role === 'user' ? 'row-reverse' : 'row' }}>
              <div style={{
                width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
                background: m.role === 'user'
                  ? 'linear-gradient(135deg, var(--gold), var(--gold-soft))'
                  : 'radial-gradient(circle at 30% 30%, var(--violet-soft) 0%, var(--violet) 60%, #5E4B85 100%)',
              }} />
              <div style={{
                maxWidth: '78%',
                padding: '18px 22px',
                borderRadius: 2,
                background: m.role === 'user' ? 'rgba(201,162,75,0.1)' : 'rgba(28,24,51,0.6)',
                border: `1px solid ${m.role === 'user' ? 'var(--line-strong)' : 'var(--line)'}`,
                fontSize: 15.5, lineHeight: 1.65, fontWeight: 300,
              }}>
                {m.content.split('\n').map((line, j) => <p key={j} style={{ marginBottom: 10 }}>{line}</p>)}
              </div>
            </div>
          ))}
          {sending && (
            <div style={{ display: 'flex', gap: 16, marginBottom: 28 }}>
              <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'radial-gradient(circle at 30% 30%, var(--violet-soft) 0%, var(--violet) 60%, #5E4B85 100%)' }} />
              <div style={{ padding: '18px 22px', background: 'rgba(28,24,51,0.6)', border: '1px solid var(--line)', display: 'flex', gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--violet-soft)', animation: 'pulse 1.4s infinite' }} />
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--violet-soft)', animation: 'pulse 1.4s 0.2s infinite' }} />
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--violet-soft)', animation: 'pulse 1.4s 0.4s infinite' }} />
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={{ padding: '20px 40px 28px', borderTop: '1px solid var(--line)', background: 'rgba(11,10,20,0.85)', backdropFilter: 'blur(14px)' }}>
        <div style={{ maxWidth: 820, margin: '0 auto', display: 'flex', gap: 12, padding: '8px 8px 8px 20px', border: '1px solid var(--line-strong)', background: 'rgba(28,24,51,0.5)', borderRadius: 28 }}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            placeholder="Écris à Luna…"
            rows={1}
            style={{ flex: 1, minHeight: 40, padding: '10px 0', fontSize: 15, color: 'var(--cream)', background: 'transparent', border: 'none', outline: 'none', resize: 'none' }}
          />
          <button onClick={handleSend} disabled={sending || !input.trim()}
            style={{
              width: 42, height: 42, borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--violet), var(--violet-soft))',
              color: 'var(--ink)', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>↑</button>
        </div>
      </div>
    </div>
  );
}
