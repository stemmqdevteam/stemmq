/**
 * AI Service Layer — Claude API integration for decision intelligence.
 * Server-side only. Never import in client components.
 */

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";

async function callClaude(systemPrompt: string, userPrompt: string): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY is not configured");
  }

  const response = await fetch(ANTHROPIC_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Claude API error: ${response.status} ${error}`);
  }

  const data = await response.json();
  const textBlock = data.content?.find((b: { type: string }) => b.type === "text");
  return textBlock?.text ?? "";
}

/**
 * Generate assumptions for a decision.
 */
export async function generateAssumptions(
  decisionTitle: string,
  strategicIntent: string,
  context?: string
): Promise<Array<{ text: string; suggestedImpactWeight: number; reasoning: string }>> {
  const systemPrompt = `You are a strategic decision intelligence assistant for StemmQ.
Your job is to identify the critical assumptions underlying a strategic decision.
Respond ONLY with a valid JSON array. No other text.
Each element must have: "text" (the assumption), "suggestedImpactWeight" (1-5), "reasoning" (why this assumption matters).`;

  const userPrompt = `Decision: "${decisionTitle}"
Strategic Intent: ${strategicIntent}
${context ? `Additional Context: ${context}` : ""}

Generate 3-5 critical assumptions that underlie this decision. Focus on assumptions that:
- Could invalidate the decision if wrong
- Are testable and measurable
- Cover market, financial, and operational dimensions`;

  const response = await callClaude(systemPrompt, userPrompt);

  try {
    // Extract JSON from response (in case of any wrapper text)
    const jsonMatch = response.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return JSON.parse(response);
  } catch {
    // Fallback: return a single generic assumption
    return [{
      text: "Market conditions will remain stable during execution period",
      suggestedImpactWeight: 3,
      reasoning: "AI generation encountered an issue. Please add specific assumptions manually.",
    }];
  }
}

/**
 * Evaluate a decision's quality and provide analysis.
 */
export async function evaluateDecision(decision: {
  title: string;
  description?: string;
  strategicIntent: string;
  expectedOutcome?: string;
  assumptions: string[];
}): Promise<{
  score: number;
  strengths: string[];
  risks: string[];
  blindSpots: string[];
  recommendation: string;
}> {
  const systemPrompt = `You are a strategic decision intelligence assistant.
Evaluate the quality of strategic decisions.
Respond ONLY with a valid JSON object with keys: "score" (0-100), "strengths" (string[]), "risks" (string[]), "blindSpots" (string[]), "recommendation" (string).`;

  const userPrompt = `Evaluate this decision:
Title: "${decision.title}"
Intent: ${decision.strategicIntent}
${decision.description ? `Description: ${decision.description}` : ""}
${decision.expectedOutcome ? `Expected Outcome: ${decision.expectedOutcome}` : ""}
Assumptions: ${decision.assumptions.join("; ")}

Provide a Decision Quality Score (0-100) and analysis.`;

  const response = await callClaude(systemPrompt, userPrompt);

  try {
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return JSON.parse(response);
  } catch {
    return {
      score: 50,
      strengths: ["Decision has been structured with assumptions"],
      risks: ["AI evaluation encountered an issue"],
      blindSpots: ["Manual review recommended"],
      recommendation: "Consider reviewing the decision with your team.",
    };
  }
}
