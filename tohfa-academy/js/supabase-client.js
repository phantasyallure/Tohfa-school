/**
 * Loads the Supabase JS SDK from a CDN as an ES module and exposes a
 * single shared client on window.tohfaSupabase, plus a helper to check
 * whether the project has actually been configured yet.
 *
 * Loaded as type="module" so top-level import works without a bundler.
 */
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

export const isSupabaseConfigured =
  window.TOHFA_SUPABASE_URL &&
  window.TOHFA_SUPABASE_ANON_KEY &&
  !window.TOHFA_SUPABASE_URL.includes("YOUR-PROJECT") &&
  !window.TOHFA_SUPABASE_ANON_KEY.includes("YOUR-ANON");

export const supabase = isSupabaseConfigured
  ? createClient(window.TOHFA_SUPABASE_URL, window.TOHFA_SUPABASE_ANON_KEY)
  : null;

window.tohfaSupabase = supabase;
window.tohfaSupabaseConfigured = isSupabaseConfigured;

// Let other, non-module scripts on the page know the client is ready.
window.dispatchEvent(new CustomEvent("tohfa:supabase-ready", {
  detail: { configured: isSupabaseConfigured },
}));
