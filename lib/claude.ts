import Anthropic from '@anthropic-ai/sdk';

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export const CLAUDE_MODEL = 'claude-opus-4-7';
// Pour réduire les coûts sur le teaser, utilise un modèle plus rapide :
export const CLAUDE_MODEL_FAST = 'claude-haiku-4-5-20251001';

export async function generateWithClaude(
  systemPrompt: string,
  userPrompt: string,
  opts: { maxTokens?: number; fast?: boolean } = {}
) {
  const { maxTokens = 4000, fast = false } = opts;

  const response = await anthropic.messages.create({
    model: fast ? CLAUDE_MODEL_FAST : CLAUDE_MODEL,
    max_tokens: maxTokens,
    system: systemPrompt,
    messages: [{ role: 'user', content: userPrompt }],
  });

  const textBlock = response.content.find((b) => b.type === 'text');
  return textBlock && textBlock.type === 'text' ? textBlock.text : '';
}
