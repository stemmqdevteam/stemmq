import type { Metadata } from "next";

export const metadata: Metadata = { title: "Completing Sign In" };

export default function OAuthPage() {
  return (
    <div className="flex flex-col items-center py-8">
      <div className="flex gap-1 mb-4">
        <span className="h-2 w-2 rounded-full bg-accent animate-bounce [animation-delay:0ms]" />
        <span className="h-2 w-2 rounded-full bg-accent animate-bounce [animation-delay:150ms]" />
        <span className="h-2 w-2 rounded-full bg-accent animate-bounce [animation-delay:300ms]" />
      </div>
      <h2 className="text-lg font-semibold text-card-foreground">Completing sign in...</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Please wait while we verify your identity.
      </p>
    </div>
  );
}
