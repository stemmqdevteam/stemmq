import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

/**
 * Sign in with Google OAuth.
 * Redirects the browser to Google's consent screen.
 */
export async function signInWithGoogle(redirectTo?: string) {
  const callbackUrl = new URL("/auth/callback", window.location.origin);
  if (redirectTo) {
    callbackUrl.searchParams.set("redirect", redirectTo);
  }

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: callbackUrl.toString(),
    },
  });

  if (error) throw error;
}

/**
 * Sign in with email magic link.
 * Sends a one-time login link to the user's email.
 */
export async function signInWithMagicLink(email: string, redirectTo?: string) {
  const callbackUrl = new URL("/auth/callback", window.location.origin);
  if (redirectTo) {
    callbackUrl.searchParams.set("redirect", redirectTo);
  }

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: callbackUrl.toString(),
    },
  });

  if (error) throw error;
}

/**
 * Sign out the current user.
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
