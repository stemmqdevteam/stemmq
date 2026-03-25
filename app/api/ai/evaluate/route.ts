import { createClient } from "@/lib/supabase/server";
import { evaluateDecision } from "@/lib/services/ai";
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
    const { title, description, strategicIntent, expectedOutcome, assumptions } = body;

    if (!title || !strategicIntent) {
      return NextResponse.json(
        { error: "title and strategicIntent are required" },
        { status: 400 }
      );
    }

    const evaluation = await evaluateDecision({
      title,
      description,
      strategicIntent,
      expectedOutcome,
      assumptions: assumptions ?? [],
    });

    return NextResponse.json({ evaluation });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
