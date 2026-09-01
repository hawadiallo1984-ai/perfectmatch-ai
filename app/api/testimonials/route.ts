import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';
import { Resend } from 'resend';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const lang = req.nextUrl.searchParams.get('lang') ?? 'fr';

  const { data, error } = await getSupabase()
    .from('testimonials')
    .select('id, name, rating, comment, lang, created_at')
    .eq('status', 'approved')
    .eq('lang', lang)
    .order('created_at', { ascending: false })
    .limit(30);

  if (error) {
    console.error('[testimonials GET]', error);
    return NextResponse.json({ testimonials: [] });
  }

  return NextResponse.json({ testimonials: data ?? [] });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, rating, comment, lang, website } = body;

  // honeypot: si rempli, on simule un succès sans rien insérer
  if (website) {
    return NextResponse.json({ ok: true });
  }

  // validation
  const errors: string[] = [];
  if (typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 40)
    errors.push('Prénom invalide (2–40 caractères).');
  if (!Number.isInteger(rating) || rating < 1 || rating > 5)
    errors.push('Note invalide (1–5).');
  if (typeof comment !== 'string' || comment.trim().length < 5 || comment.trim().length > 600)
    errors.push('Commentaire invalide (5–600 caractères).');
  if (!['fr', 'en'].includes(lang))
    errors.push('Langue invalide.');

  if (errors.length > 0) {
    return NextResponse.json({ error: errors.join(' ') }, { status: 422 });
  }

  const { error: insertError } = await getSupabase().from('testimonials').insert({
    name: name.trim(),
    rating,
    comment: comment.trim(),
    lang,
    status: 'pending',
  });

  if (insertError) {
    console.error('[testimonials POST insert]', insertError);
    return NextResponse.json(
      { error: 'Erreur serveur.', detail: insertError.message },
      { status: 500 }
    );
  }

  // notif email à la vendeuse (sans casser la réponse si ça échoue)
  try {
    const resend = new Resend(process.env.RESEND_API_KEY!);
    const notifyTo = process.env.NOTIFY_EMAIL;
    const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://perfectmatch-ai.vercel.app';
    if (notifyTo) {
      await resend.emails.send({
        from: 'EvaTalk <guides@eva-talk-coach.com>',
        to: notifyTo,
        subject: '⭐ Nouveau témoignage à valider',
        html: `
          <div style="font-family:Georgia,serif;max-width:520px;padding:32px;background:#F5EFE3;color:#0B0A14;">
            <h2 style="font-weight:400;margin-bottom:16px;">Nouveau témoignage reçu</h2>
            <p><strong>Prénom :</strong> ${name.trim()}</p>
            <p><strong>Note :</strong> ${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</p>
            <p><strong>Langue :</strong> ${lang}</p>
            <blockquote style="border-left:3px solid #C9A24B;margin:16px 0;padding-left:16px;font-style:italic;">
              ${comment.trim()}
            </blockquote>
            <a href="${siteUrl}/admin/temoignages" style="display:inline-block;padding:12px 24px;background:#C9A24B;color:#0B0A14;border-radius:100px;font-weight:700;text-decoration:none;margin-top:16px;">
              Valider →
            </a>
          </div>
        `,
      });
    }
  } catch (emailErr) {
    console.error('[testimonials POST email]', emailErr);
  }

  return NextResponse.json({ ok: true });
}
