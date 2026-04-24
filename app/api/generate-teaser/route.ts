import { NextRequest, NextResponse } from 'next/server';
import { generateWithClaude } from '@/lib/claude';
import { TEASER_SYSTEM_PROMPT } from '@/lib/prompts';

export async function POST(req: NextRequest) {
  try {
    const { answers } = await req.json();

    if (!answers) return NextResponse.json({ error: 'Missing answers' }, { status: 400 });

    const userPrompt = `Voici les réponses au questionnaire :\n\n${JSON.stringify(answers, null, 2)}\n\nGénère le teaser JSON.`;

    const raw = await generateWithClaude(TEASER_SYSTEM_PROMPT, userPrompt, {
      maxTokens: 1000,
      fast: true, // Utilise Haiku pour le teaser = moins cher
    });

    // Clean potential markdown fences
    const cleaned = raw.replace(/```json\n?|\n?```/g, '').trim();
    const teaser = JSON.parse(cleaned);

    return NextResponse.json(teaser);
  } catch (err: any) {
    console.error('[generate-teaser]', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
