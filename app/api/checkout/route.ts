import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { OFFERS, OfferId } from '@/lib/offers';

export async function POST(req: NextRequest) {
  try {
    const { offerId, answers } = await req.json();

    if (!offerId || !(offerId in OFFERS)) {
      return NextResponse.json({ error: 'Invalid offer' }, { status: 400 });
    }

    const offer = OFFERS[offerId as OfferId];
    const priceId = process.env[offer.stripePriceEnvKey];

    if (!priceId) {
      // Fallback if user hasn't configured Stripe Price IDs yet
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'eur',
              product_data: {
                name: `${offer.name} ${offer.nameEmphasis}`,
                description: offer.description,
              },
              unit_amount: offer.price * 100,
            },
            quantity: 1,
          },
        ],
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/rapport?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/apercu`,
        metadata: {
          offerId,
          // Store user answers hash to retrieve them post-payment if needed
          answers_snapshot: answers ? JSON.stringify(answers).slice(0, 500) : '',
        },
      });
      return NextResponse.json({ url: session.url });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/rapport?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/apercu`,
      metadata: {
        offerId,
        answers_snapshot: answers ? JSON.stringify(answers).slice(0, 500) : '',
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('[checkout]', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
