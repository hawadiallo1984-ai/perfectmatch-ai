import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { GUIDES, GuideId } from '@/lib/guides';
import { BUNDLES } from '@/lib/bundles';

export async function POST(req: NextRequest) {
  try {
    const { guideId, bundleId } = await req.json();
    const origin = req.headers.get('origin') ?? process.env.NEXT_PUBLIC_APP_URL ?? 'https://perfectmatch-ai.vercel.app';

    if (bundleId) {
      const bundle = BUNDLES.find((b) => b.id === bundleId);
      if (!bundle) {
        return NextResponse.json({ error: 'Pack introuvable.' }, { status: 404 });
      }
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: bundle.currency as string,
              product_data: { name: bundle.title },
              unit_amount: bundle.priceCents,
            },
            quantity: 1,
          },
        ],
        success_url: `${origin}/merci?session_id={CHECKOUT_SESSION_ID}&bundle=${bundle.id}`,
        cancel_url: origin,
        metadata: { bundleId: bundle.id },
      });
      return NextResponse.json({ url: session.url });
    }

    const guide = GUIDES[guideId as GuideId];
    if (!guide) {
      return NextResponse.json({ error: 'Guide introuvable.' }, { status: 404 });
    }
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
