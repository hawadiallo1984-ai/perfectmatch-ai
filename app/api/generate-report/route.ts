import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { generateWithClaude } from '@/lib/claude';
import {
  REPORT_CELIBATAIRE_SYSTEM_PROMPT,
  REPORT_COMPLETE_SYSTEM_PROMPT,
  REPORT_COUPLE_SYSTEM_PROMPT,
} from '@/lib/prompts';
import { OfferId } from '@/lib/offers';

const PROMPT_BY_OFFER: Record<OfferId, string> = {
  celibataire: REPORT_CELIBATAIRE_SYSTEM_PROMPT,
  complete: REPORT_COMPLETE_SYSTEM_PROMPT,
  couple: REPORT_COUPLE_SYSTEM_PROMPT,
};

export async function POST(req: NextRequest) {
  try {
    const { sessionId, answers } = await req.json();

    if (!sessionId) return NextResponse.json({ error: 'Missing session_id' }, { status: 400 });

    // Verify payment against Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== 'paid') {
      return NextResponse.json({ error: 'Payment not completed' }, { status: 402 });
    }

    const offerId = session.metadata?.offerId as OfferId;
    if (!offerId || !(offerId in PROMPT_BY_OFFER)) {
      return NextResponse.json({ error: 'Invalid offer metadata' }, { status: 400 });
    }

    const systemPrompt = PROMPT_BY_OFFER[offerId];
    const userPrompt = `Voici les réponses complètes au questionnaire :\n\n${JSON.stringify(answers, null, 2)}\n\nGénère le rapport JSON complet selon la structure demandée.`;

    const raw = await generateWithClaude(systemPrompt, userPrompt, {
      maxTokens: offerId === 'complete' ? 8000 : 5000,
    });

    const cleaned = raw.replace(/```json\n?|\n?```/g, '').trim();
    const report = JSON.parse(cleaned);

    return NextResponse.json({ report, offerId });
  } catch (err: any) {
    console.error('[generate-report]', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
