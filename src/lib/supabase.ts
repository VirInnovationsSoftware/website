import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

function isValidSupabaseConfig(url: string | undefined, key: string | undefined) {
  if (!url || !key || /YOUR_|PLACEHOLDER/i.test(url) || /YOUR_|PLACEHOLDER/i.test(key)) {
    return false;
  }

  try {
    const parsedUrl = new URL(url);
    return (parsedUrl.protocol === "https:" || parsedUrl.protocol === "http:") &&
      Boolean(parsedUrl.hostname && key.trim());
  } catch {
    return false;
  }
}

// Keep the public site usable when Supabase is missing or still has template values.
export const isSupabaseConfigured = isValidSupabaseConfig(supabaseUrl, supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
