import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { WELCOME_EMAILS, WELCOME_FROM, WELCOME_REPLY_TO } from '@/lib/welcomeEmails';

export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization');
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY!);
  let sent = 0;
  let skipped = 0;

  try {
    const result = await resend.contacts.list({ audienceId: process.env.RESEND_AUDIENCE_ID! });
    const contacts = (result.data as { data?: { id: string; email: string; unsubscribed: boolean; created_at: string }[] } | null)?.data ?? [];

    for (const contact of contacts) {
      if (contact.unsubscribed) { skipped++; continue; }
      try {
        const days = Math.floor((Date.now() - new Date(contact.created_at).getTime()) / 86400000);
        const mail = WELCOME_EMAILS.find((e) => e.day === days && e.day > 0);
        if (mail) {
          await resend.emails.send({
            from: WELCOME_FROM,
            to: contact.email,
            replyTo: WELCOME_REPLY_TO,
            subject: mail.subject,
            html: mail.html(contact.email),
          });
          sent++;
        } else {
          skipped++;
        }
      } catch (err) {
        console.error(`[drip] failed for ${contact.email}:`, err);
        skipped++;
      }
    }
  } catch (err) {
    console.error('[drip] list contacts failed:', err);
    return NextResponse.json({ error: 'Failed to list contacts' }, { status: 500 });
  }

  return NextResponse.json({ sent, skipped });
}
