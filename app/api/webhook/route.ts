import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import Stripe from 'stripe';
import { Resend } from 'resend';
import { GUIDES, GuideId } from '@/lib/guides';
import { BUNDLES } from '@/lib/bundles';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Anti-double-envoi : Stripe rejoue l'événement si on ne répond pas 200 dans les 30s.
// Pour une protection stricte en production, stocker les session.id traités dans une DB
// et ignorer les doublons. Ici on retourne toujours 200 ce qui limite les renvois Stripe.

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
      const guideId = session.metadata?.guideId as GuideId | undefined;
      const bundleId = session.metadata?.bundleId;
      console.log(`[webhook] Payment OK — guideId=${guideId} bundleId=${bundleId} session=${session.id}`);

      if (bundleId) {
        const bundle = BUNDLES.find((b) => b.id === bundleId);
        const email = session.customer_details?.email;
        if (bundle && email) {
          const resend = new Resend(process.env.RESEND_API_KEY!);
          const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://perfectmatch-ai.vercel.app';
          const isEn = bundle.lang === 'en';

          const guides = (bundle.guideIds as readonly string[])
            .map((id) => GUIDES[id as GuideId])
            .filter((g): g is NonNullable<typeof g> => g !== undefined);

          const pdfLinks = guides
            .map((g) => `<li style="margin-bottom:10px;"><a href="${siteUrl}${g.pdf}" style="color:#C9A24B;font-family:Georgia,serif;">${g.name} →</a></li>`)
            .join('');

          const attachments = guides.map((g) => ({
            filename: `${g.id}.pdf`,
            path: `${siteUrl}${g.pdf}`,
          }));

          try {
            await resend.emails.send({
              from: 'EvaTalk <guides@eva-talk-coach.com>',
              replyTo: 'hawa.diallo1984@gmail.com',
              to: email,
              subject: isEn ? `Your pack "${bundle.title}" is ready ✦` : `Ton pack "${bundle.title}" est là ✦`,
              attachments,
              html: `
                <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #0B0A14; background: #F5EFE3; padding: 48px 40px;">
                  <p style="font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #C9A24B; margin-bottom: 32px;">✦ EvaTalk</p>
                  <h1 style="font-size: 32px; font-weight: 400; line-height: 1.15; letter-spacing: -0.02em; margin-bottom: 20px;">
                    ${isEn ? 'Thank you for your trust.' : 'Merci pour ta confiance.'}
                  </h1>
                  <p style="font-size: 16px; line-height: 1.75; font-weight: 300; margin-bottom: 24px;">
                    ${isEn
                      ? `Your pack <strong>${bundle.title}</strong> is ready. Here are your ${bundle.guideIds.length} guides (also attached to this email):`
                      : `Ton pack <strong>${bundle.title}</strong> est prêt. Voici tes ${bundle.guideIds.length} guides (aussi en pièce jointe) :`
                    }
                  </p>
                  <ul style="list-style:none; padding:0; margin:0 0 36px;">
                    ${pdfLinks}
                  </ul>
                  <p style="font-size: 13px; line-height: 1.7; opacity: 0.6; margin-bottom: 8px;">
                    ${isEn
                      ? 'Trouble downloading? Open this email in Safari or Chrome (not in the TikTok/Instagram browser).'
                      : 'Souci de téléchargement ? Ouvre cet email dans Safari ou Chrome (pas dans le navigateur de TikTok/Insta).'
                    }
                  </p>
                  <p style="font-size: 14px; line-height: 1.7; opacity: 0.7; margin-bottom: 8px;">
                    ${isEn ? 'If you have any questions, just reply to this email — I read everything.' : 'Si tu as la moindre question, réponds simplement à cet email — je lis tout.'}
                  </p>
                  <p style="font-size: 14px; font-style: italic; color: #C9A24B; margin-top: 32px;">
                    ${isEn ? 'With care,<br />Eva — EvaTalk' : 'Avec douceur,<br />Eva — EvaTalk'}
                  </p>
                </div>
              `,
            });
            console.log(`[webhook] Bundle email sent to ${email} for ${bundleId}`);
          } catch (emailErr) {
            console.error('[webhook] Bundle email send failed', emailErr);
          }
        }
      } else if (guideId && GUIDES[guideId]) {
        const guide = GUIDES[guideId];
        const email = session.customer_details?.email;
        if (email) {
          const resend = new Resend(process.env.RESEND_API_KEY!);
          const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://perfectmatch-ai.vercel.app';
          const guidePdfUrl = `${siteUrl}${guide.pdf}`;
          const isEn = (guide.lang ?? 'fr') === 'en';

          try {
            await resend.emails.send({
              from: 'EvaTalk <guides@eva-talk-coach.com>',
              replyTo: 'hawa.diallo1984@gmail.com',
              to: email,
              subject: isEn ? `Your "${guide.name}" guide is ready ✦` : `Ton guide "${guide.name}" est là ✦`,
              attachments: [{ filename: `${guide.id}.pdf`, path: guidePdfUrl }],
              html: `
                <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #0B0A14; background: #F5EFE3; padding: 48px 40px;">
                  <p style="font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #C9A24B; margin-bottom: 32px;">✦ EvaTalk</p>
                  <h1 style="font-size: 32px; font-weight: 400; line-height: 1.15; letter-spacing: -0.02em; margin-bottom: 20px;">
                    ${isEn ? 'Thank you for your trust.' : 'Merci pour ta confiance.'}
                  </h1>
                  <p style="font-size: 16px; line-height: 1.75; font-weight: 300; margin-bottom: 28px;">
                    ${isEn
                      ? `Your guide <strong>${guide.name}</strong> is ready to download — I've attached it directly to this email.
                         I designed it with care to help you name, understand, and transform what you carry — without shame.`
                      : `Ton guide <strong>${guide.name}</strong> est prêt. Je l'ai joint directement à cet email.
                         Je l'ai conçu avec soin pour t'aider à nommer, comprendre et transformer ce que tu portes — sans honte.`
                    }
                  </p>
                  <a href="${guidePdfUrl}" style="display: inline-block; padding: 14px 32px; background: #C9A24B; color: #0B0A14; border-radius: 100px; font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700; text-decoration: none; margin-bottom: 16px;">
                    ${isEn ? 'Download my guide →' : 'Télécharger mon guide →'}
                  </a>
                  <p style="font-size: 13px; line-height: 1.7; opacity: 0.6; margin-bottom: 24px;">
                    ${isEn
                      ? 'Trouble downloading? Open this email in Safari or Chrome (not in the TikTok/Instagram browser).'
                      : 'Souci de téléchargement ? Ouvre cet email dans Safari ou Chrome (pas dans le navigateur de TikTok/Insta).'
                    }
                  </p>
                  <p style="font-size: 14px; line-height: 1.7; opacity: 0.7; margin-bottom: 8px;">
                    ${isEn ? 'If you have any questions, just reply to this email — I read everything.' : 'Si tu as la moindre question, réponds simplement à cet email — je lis tout.'}
                  </p>
                  <p style="font-size: 14px; font-style: italic; color: #C9A24B; margin-top: 32px;">
                    ${isEn ? 'With care,<br />Eva — EvaTalk' : 'Avec douceur,<br />Eva — EvaTalk'}
                  </p>
                </div>
              `,
            });
            console.log(`[webhook] Guide email sent to ${email} for ${guideId}`);
          } catch (emailErr) {
            console.error('[webhook] Guide email send failed', emailErr);
          }
        }
      }

      break;
    }
    default:
      console.log(`[webhook] Unhandled: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
