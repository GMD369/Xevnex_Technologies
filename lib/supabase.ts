import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Server-side routes can use the service role key for elevated permissions.
// Client components will fall back to the anon key.
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? supabaseAnonKey;

export const supabase = createClient(supabaseUrl, supabaseKey);
