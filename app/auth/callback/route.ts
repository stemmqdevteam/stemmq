import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const destination = searchParams.get("redirect") || "/dashboard";
  return NextResponse.redirect(new URL(destination, origin));
}
