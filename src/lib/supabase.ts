import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const SUPABASE_OPTIONS = {
  db: { schema: 'api' as const },
  auth: { persistSession: false },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _supabase: any = null;

export function getSupabase() {
  if (!_supabase) {
    if (!supabaseUrl || !supabaseAnonKey) {
      _supabase = createClient('https://placeholder.supabase.co', 'placeholder-key', SUPABASE_OPTIONS);
    } else {
      _supabase = createClient(supabaseUrl, supabaseAnonKey, SUPABASE_OPTIONS);
    }
  }
  return _supabase;
}
