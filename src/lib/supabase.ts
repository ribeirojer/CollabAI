import { createClient } from '@supabase/supabase-js';

const { NEXT_PUBLIC_SUPABASE_URL } = process.env;
const { NEXT_PUBLIC_SUPABASE_ANON_KEY } = process.env;

if (!NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('NEXT_PUBLIC_Supabase URL must be defined in environment variables');
}

if (!NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('NEXT_PUBLIC_Supabase Anon Key must be defined in environment variables');
}

export const supabase = createClient(
  NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY
);
