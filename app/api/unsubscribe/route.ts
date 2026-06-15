import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email');
  if (!email) {
    return new NextResponse('Email manquant.', { status: 400, headers: { 'Content-Type': 'text/plain' } });
  }

  const resend = new Resend(process.env.RESEND_API_KEY!);

  try {
    const result = await resend.contacts.list({ audienceId: process.env.RESEND_AUDIENCE_ID! });
    const contacts = (result.data as { data?: { id: string; email: string }[] } | null)?.data ?? [];
    const contact = contacts.find((c) => c.email === email);
    if (contact) {
      await resend.contacts.update({
        id: contact.id,
        audienceId: process.env.RESEND_AUDIENCE_ID!,
        unsubscribed: true,
      });
    }
  } catch (err) {
    console.error('[unsubscribe]', err);
  }

  return new NextResponse(
    `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"/><title>Désabonnement</title></head>
<body style="font-family:Helvetica,Arial,sans-serif;text-align:center;padding:80px 24px;color:#2B2622;background:#faf9f7">
  <p style="font-size:1.15rem;line-height:1.6">Tu es désabonné·e. À bientôt 💛</p>
  <p style="font-size:.85rem;color:#999;margin-top:12px">EvaTalk · PerfectMatch</p>
</body></html>`,
    { status: 200, headers: { 'Content-Type': 'text/html' } }
  );
}
