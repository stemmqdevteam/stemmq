/**
 * UI-only authentication stubs for demo mode.
 */
export async function signInWithGoogle(redirectTo?: string) {
  const destination = redirectTo || "/dashboard";
  window.location.href = destination;
}

export async function signInWithMagicLink(_email: string, redirectTo?: string) {
  const destination = redirectTo || "/dashboard";
  window.location.href = destination;
}

export async function signOut() {
  window.location.href = "/auth";
}
