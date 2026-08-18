import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Service-role key: server-side ONLY. Never import this file in client components.
// Lazy singleton so the constructor doesn't fire at build time when env vars are absent.
let _client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!_client) {
    _client = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
  }
  return _client;
}
