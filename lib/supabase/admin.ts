import { createClient as createServerClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

/**
 * Admin Supabase client using service role key.
 * Bypasses RLS — only use in admin server components/actions.
 * Never import this in client-side code.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_URL");
  }

  return createServerClient<Database>(url, serviceKey, {
    auth: { persistSession: false },
  });
}
