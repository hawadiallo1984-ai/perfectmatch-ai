import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY!);
  try {
    const { email, parcours } = await req.json();

    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ success: false, error: 'Email invalide' }, { status: 400 });
    }

    const parcoursLabel = (parcours as string) || 'Résilience';

    // Enregistrement du contact (on ignore l'erreur si déjà existant)
    try {
      await resend.contacts.create({
        email,
        unsubscribed: false,
        audienceId: process.env.RESEND_AUDIENCE_ID!,
      });
    } catch {
      // Contact déjà existant ou audience non configurée — on continue
    }

    // Notification interne
    await resend.emails.send({
      from: 'PerfectMatch <bonjour@eva-talk-coach.com>',
      replyTo: 'hawa.diallo1984@gmail.com',
      to: process.env.NOTIFY_EMAIL!,
      subject: `Liste d'accès — ${parcoursLabel} — ${email}`,
      html: `<p>${email} souhaite accéder au parcours : <strong>${parcoursLabel}</strong></p>`,
    });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erreur inconnue';
    console.error('[waitlist]', message);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
