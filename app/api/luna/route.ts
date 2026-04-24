import { NextRequest, NextResponse } from 'next/server';
import { anthropic, CLAUDE_MODEL } from '@/lib/claude';
import { LUNA_SYSTEM_PROMPT } from '@/lib/prompts';

export async function POST(req: NextRequest) {
  try {
    const { messages, userReport } = await req.json();

    // User's report is injected into the system prompt so Luna "knows" the user
    const contextualSystem =
      LUNA_SYSTEM_PROMPT +
      (userReport
        ? `\n\n=== RAPPORT DE L'UTILISATEUR ===\n${JSON.stringify(userReport, null, 2)}\n=== FIN RAPPORT ===`
        : '');

    const response = await anthropic.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 1500,
      system: contextualSystem,
      messages: messages.map((m: any) => ({
        role: m.role,
        content: m.content,
      })),
    });

    const textBlock = response.content.find((b) => b.type === 'text');
    const reply = textBlock && textBlock.type === 'text' ? textBlock.text : '';

    return NextResponse.json({ reply });
  } catch (err: any) {
    console.error('[luna]', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
