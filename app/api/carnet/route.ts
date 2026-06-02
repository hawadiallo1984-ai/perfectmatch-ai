import { NextRequest, NextResponse } from 'next/server';
import { anthropic, CLAUDE_MODEL_FAST } from '@/lib/claude';
import { CARNET_SOCRATIC_PROMPT } from '@/lib/prompts';

export async function POST(req: NextRequest) {
  try {
    const { messages, context } = await req.json();

    const contextSummary = context
      ? `\n\n=== CONTEXTE DU CARNET ===
Situation : ${context.situation || '—'}
Émotion : ${context.emotion || '—'} (intensité avant : ${context.intensityBefore ?? '—'}/100)
Pensées automatiques : ${context.automaticThoughts || '—'}
Distorsions identifiées : ${context.distortions?.length ? context.distortions.join(', ') : '—'}
=== FIN CONTEXTE ===`
      : '';

    const system = CARNET_SOCRATIC_PROMPT + contextSummary;

    const response = await anthropic.messages.create({
      model: CLAUDE_MODEL_FAST,
      max_tokens: 400,
      system,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role,
        content: m.content,
      })),
    });

    const textBlock = response.content.find((b) => b.type === 'text');
    const reply = textBlock && textBlock.type === 'text' ? textBlock.text : '';

    return NextResponse.json({ reply });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erreur inconnue';
    console.error('[carnet]', err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
