import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Service-role key: server-side ONLY. Never import this file in client components.
// Lazy singleton so the constructor doesn't fire at build time when env vars are absent.
let _client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!_client) {
    const url = process.env.SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url) console.error('[supabase] variable d\'environnement manquante: SUPABASE_URL');
    if (!serviceRoleKey) console.error('[supabase] variable d\'environnement manquante: SUPABASE_SERVICE_ROLE_KEY');

    _client = createClient(url!, serviceRoleKey!);
  }
  return _client;
}
