import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function checkAuth(req: NextRequest): boolean {
  const secret = req.headers.get('x-admin-secret');
  return secret === process.env.ADMIN_SECRET && !!process.env.ADMIN_SECRET;
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await getSupabase()
    .from('testimonials')
    .select('id, name, rating, comment, lang, created_at, status')
    .eq('status', 'pending')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[admin/testimonials GET]', error);
    return NextResponse.json({ testimonials: [] });
  }

  return NextResponse.json({ testimonials: data ?? [] });
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id, action } = await req.json();

  if (!id || !['approve', 'reject'].includes(action)) {
    return NextResponse.json({ error: 'Paramètres invalides.' }, { status: 422 });
  }

  const status = action === 'approve' ? 'approved' : 'rejected';

  const { error } = await getSupabase()
    .from('testimonials')
    .update({ status })
    .eq('id', id);

  if (error) {
    console.error('[admin/testimonials POST]', error);
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
