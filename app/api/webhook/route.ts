import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import Stripe from 'stripe';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');

  if (!sig) return NextResponse.json({ error: 'No signature' }, { status: 400 });

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    console.error('[webhook] signature fail', err.message);
    return NextResponse.json({ error: `Webhook error: ${err.message}` }, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const offerId = session.metadata?.offerId;
      console.log(`[webhook] Payment OK — offer=${offerId} session=${session.id}`);

      // ICI tu peux déclencher la génération du rapport en fond,
      // ou stocker un token qui permettra à /rapport de vérifier le paiement.
      // Pour un MVP, le client appelle /api/generate-report avec son session_id,
      // et cette route vérifie auprès de Stripe que le paiement est bien passé.
      break;
    }
    default:
      console.log(`[webhook] Unhandled: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
