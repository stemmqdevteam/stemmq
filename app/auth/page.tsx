"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Loader2, CheckCircle2, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/providers/auth-provider";
import { setPlanCookie } from "./actions";

type AuthStep = "initial" | "magic-link-sent";

export default function AuthPage() {
  const searchParams = useSearchParams();
  const { signInWithGoogle } = useAuth();
  const [step, setStep] = useState<AuthStep>("initial");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const error = searchParams.get("error");

  // Store selected plan from URL into HTTP-only cookie
  useEffect(() => {
    const plan = searchParams.get("plan");
    if (plan) {
      setPlanCookie(plan);
    }
  }, [searchParams]);

  const handleGoogleAuth = async () => {
    setGoogleLoading(true);
    try {
      const redirect = searchParams.get("redirect") ?? undefined;
      await signInWithGoogle(redirect);
    } catch {
      setGoogleLoading(false);
    }
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const { signInWithMagicLink } = await import("@/lib/services/auth");
      const redirect = searchParams.get("redirect") ?? undefined;
      await signInWithMagicLink(email, redirect);
      setStep("magic-link-sent");
    } catch {
      // Error handling — could show toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {/* INITIAL STEP — Google + Magic Link */}
        {step === "initial" && (
          <motion.div
            key="initial"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-foreground">
                Welcome to StemmQ
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Sign in or create an account to get started
              </p>
            </div>

            {error && (
              <div className="mb-4 rounded-lg border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
                Authentication failed. Please try again.
              </div>
            )}

            {/* Google OAuth */}
            <Button
              variant="outline"
              className="w-full h-11 justify-center gap-3 font-medium"
              onClick={handleGoogleAuth}
              disabled={googleLoading || loading}
            >
              {googleLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
              )}
              Continue with Google
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-background px-3 text-muted-foreground">
                  or
                </span>
              </div>
            </div>

            {/* Magic Link */}
            <form onSubmit={handleMagicLink} className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11"
                required
              />
              <Button
                variant="accent"
                className="w-full h-11"
                disabled={loading || !email || googleLoading}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Mail className="h-4 w-4 mr-2" />
                    Send Magic Link
                  </>
                )}
              </Button>
            </form>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              By continuing, you agree to StemmQ&apos;s{" "}
              <a href="/terms" className="text-accent hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-accent hover:underline">
                Privacy Policy
              </a>
            </p>
          </motion.div>
        )}

        {/* MAGIC LINK SENT — Check email */}
        {step === "magic-link-sent" && (
          <motion.div
            key="magic-link-sent"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="text-center"
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
              <CheckCircle2 className="h-8 w-8 text-accent" />
            </div>

            <h1 className="text-2xl font-bold text-foreground">
              Check your email
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              We sent a sign-in link to
            </p>
            <p className="mt-1 text-sm font-medium text-foreground">{email}</p>

            <div className="mt-8 rounded-lg border border-border bg-muted/50 px-4 py-3">
              <p className="text-xs text-muted-foreground">
                Click the link in your email to sign in. The link will expire in
                1 hour. Check your spam folder if you don&apos;t see it.
              </p>
            </div>

            <button
              onClick={() => setStep("initial")}
              className="mt-6 inline-flex items-center gap-1.5 text-sm text-accent hover:underline"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to sign in
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
