import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { GUIDES, GuideId } from '@/lib/guides';

export async function POST(req: NextRequest) {
  try {
    const { guideId } = await req.json();
    const guide = GUIDES[guideId as GuideId];

    if (!guide) {
      return NextResponse.json({ error: 'Guide introuvable.' }, { status: 404 });
    }

    const origin = req.headers.get('origin') ?? process.env.NEXT_PUBLIC_APP_URL ?? 'https://perfectmatch-ai.vercel.app';

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: guide.currency,
            product_data: { name: guide.name },
            unit_amount: guide.priceCents,
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/merci?session_id={CHECKOUT_SESSION_ID}&guide=${guide.id}`,
      cancel_url: origin,
      metadata: { guideId: guide.id },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('[checkout-guide]', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
