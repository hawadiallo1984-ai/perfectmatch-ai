import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import Stripe from 'stripe';
import { Resend } from 'resend';
import { GUIDES, GuideId } from '@/lib/guides';

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
      const guideId = session.metadata?.guideId as GuideId | undefined;
      console.log(`[webhook] Payment OK — offer=${offerId} guideId=${guideId} session=${session.id}`);

      if (guideId && GUIDES[guideId]) {
        const guide = GUIDES[guideId];
        const email = session.customer_details?.email;
        if (email) {
          const resend = new Resend(process.env.RESEND_API_KEY!);
          const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://perfectmatch-ai.vercel.app';
          const guidePdfUrl = `${siteUrl}${guide.pdf}`;
          await resend.emails.send({
            from: 'EvaTalk <guides@eva-talk-coach.com>',
            replyTo: 'hawa.diallo1984@gmail.com',
            to: email,
            subject: `Ton ${guide.name} est là ✦`,
            html: `
              <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #0B0A14; background: #F5EFE3; padding: 48px 40px;">
                <p style="font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #C9A24B; margin-bottom: 32px;">✦ EvaTalk</p>
                <h1 style="font-size: 32px; font-weight: 400; line-height: 1.15; letter-spacing: -0.02em; margin-bottom: 20px;">
                  Merci pour ta confiance.
                </h1>
                <p style="font-size: 16px; line-height: 1.75; font-weight: 300; margin-bottom: 28px;">
                  Ton guide <strong>${guide.name}</strong> est prêt à être téléchargé.
                  Je l'ai conçu avec soin pour t'aider à nommer, comprendre et transformer ce que tu portes — sans honte.
                </p>
                <a href="${guidePdfUrl}" style="display: inline-block; padding: 14px 32px; background: #C9A24B; color: #0B0A14; border-radius: 100px; font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700; text-decoration: none; margin-bottom: 36px;">
                  Télécharger mon guide →
                </a>
                <p style="font-size: 14px; line-height: 1.7; opacity: 0.7; margin-bottom: 8px;">
                  Si tu as la moindre question, réponds simplement à cet email — je lis tout.
                </p>
                <p style="font-size: 14px; font-style: italic; color: #C9A24B; margin-top: 32px;">
                  Avec douceur,<br />Eva — EvaTalk
                </p>
              </div>
            `,
          });
          console.log(`[webhook] Guide email sent to ${email} for ${guideId}`);
        }
      }

      break;
    }
    default:
      console.log(`[webhook] Unhandled: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
