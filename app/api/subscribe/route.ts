import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { WELCOME_EMAILS, WELCOME_FROM, WELCOME_REPLY_TO } from '@/lib/welcomeEmails';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY!);

  let email: string;
  try {
    ({ email } = await req.json());
  } catch {
    return NextResponse.json({ success: false, error: 'Corps invalide' }, { status: 400 });
  }

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ success: false, error: 'Email invalide' }, { status: 400 });
  }

  // Ajout à l'audience Resend
  try {
    await resend.contacts.create({
      email,
      unsubscribed: false,
      audienceId: process.env.RESEND_AUDIENCE_ID!,
    });
  } catch {
    // Contact déjà existant — on continue
  }

  // Email jour 0
  try {
    const e0 = WELCOME_EMAILS.find((e) => e.day === 0);
    if (e0) {
      await resend.emails.send({
        from: WELCOME_FROM,
        to: email,
        replyTo: WELCOME_REPLY_TO,
        subject: e0.subject,
        html: e0.html(email),
      });
    }
  } catch (err) {
    console.error('[subscribe] day-0 email failed:', err);
  }

  return NextResponse.json({ success: true });
}
