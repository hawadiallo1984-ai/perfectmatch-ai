import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    const origin = req.headers.get('origin') ?? process.env.NEXT_PUBLIC_APP_URL ?? 'https://perfectmatch-ai.vercel.app';

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Guide Black Tax — 4 approches (EvaTalk)',
            },
            unit_amount: 1400,
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/merci?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/argent/black-tax`,
      metadata: {
        product: 'black-tax-guide',
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('[checkout-guide]', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
