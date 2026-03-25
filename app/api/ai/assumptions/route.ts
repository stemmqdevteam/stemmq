import { createClient } from "@/lib/supabase/server";
import { generateAssumptions } from "@/lib/services/ai";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Verify auth
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { decisionTitle, strategicIntent, context } = body;

    if (!decisionTitle || !strategicIntent) {
      return NextResponse.json(
        { error: "decisionTitle and strategicIntent are required" },
        { status: 400 }
      );
    }

    const assumptions = await generateAssumptions(decisionTitle, strategicIntent, context);
    return NextResponse.json({ assumptions });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
