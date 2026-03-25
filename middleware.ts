import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

// Public routes that don't require authentication
const PUBLIC_ROUTES = [
  "/",
  "/auth",
  "/auth/callback",
  "/privacy",
  "/terms",
  "/contact",
];

// Route group prefixes that are public
const PUBLIC_PREFIXES = [
  "/(landing-pages)",
  "/about",
  "/ai-agents",
  "/apply",
  "/blog",
  "/careers",
  "/changelog",
  "/contact",
  "/decision-intelligence",
  "/docs",
  "/features",
  "/integrations",
  "/pricing",
  "/product",
  "/security",
  "/use-cases",
];

function isPublicRoute(pathname: string): boolean {
  if (PUBLIC_ROUTES.includes(pathname)) return true;
  return PUBLIC_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

export async function middleware(request: NextRequest) {
  const { supabaseResponse, user } = await updateSession(request);
  const { pathname } = request.nextUrl;

  // Public routes — allow through
  if (isPublicRoute(pathname)) {
    // If authenticated user visits /auth, redirect appropriately
    if (pathname === "/auth" && user) {
      // Check if onboarding is completed by reading cookie or DB
      // For now, redirect to dashboard (onboarding check happens in callback)
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
    return supabaseResponse;
  }

  // Protected routes — require authentication
  if (!user) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  // Admin routes — require admin role
  if (pathname.startsWith("/admin")) {
    // Create a server client to check user role
    const { createServerClient } = await import("@supabase/ssr");
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll() {
            // No-op in middleware for this read-only check
          },
        },
      }
    );

    const { data: profile } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single();

    if (!profile || profile.role !== "admin") {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all routes except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico (favicon)
     * - public files (svg, png, jpg, etc.)
     */
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
