import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const redirectPath = searchParams.get("redirect");

  if (!code) {
    // No code — redirect back to auth
    return NextResponse.redirect(new URL("/auth", origin));
  }

  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    }
  );

  // Exchange the code for a session
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return NextResponse.redirect(new URL("/auth?error=callback_failed", origin));
  }

  // Get the authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.redirect(new URL("/auth", origin));
  }

  // Check if user exists in public.users
  const { data: existingUser } = await supabase
    .from("users")
    .select("id, onboarding_completed")
    .eq("id", user.id)
    .single();

  if (!existingUser) {
    // New user — create profile
    await supabase.from("users").insert({
      id: user.id,
      email: user.email!,
      full_name: user.user_metadata?.full_name ?? user.user_metadata?.name ?? null,
      avatar_url: user.user_metadata?.avatar_url ?? null,
      role: "user",
      onboarding_completed: false,
    });

    // Redirect to onboarding
    return NextResponse.redirect(new URL("/auth/onboarding", origin));
  }

  // Existing user — check onboarding status
  if (!existingUser.onboarding_completed) {
    return NextResponse.redirect(new URL("/auth/onboarding", origin));
  }

  // Redirect to original destination or dashboard
  const destination = redirectPath || "/dashboard";
  return NextResponse.redirect(new URL(destination, origin));
}
