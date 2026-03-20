"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Mail, Chrome, Building2, Apple, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type AuthStep = "initial" | "password" | "otp" | "signup" | "forgot";

export default function AuthPage() {
  const router = useRouter();
  const [step, setStep] = useState<AuthStep>("initial");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // Simulate checking if user exists
    await new Promise(r => setTimeout(r, 600));
    setLoading(false);
    // Mock: existing user goes to password, new user goes to signup
    setStep(email.includes("new") ? "signup" : "password");
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    router.push("/dashboard");
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    router.push("/auth/onboarding");
  };

  const handleOAuth = async (provider: string) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    router.push("/auth/onboarding");
  };

  const handleOTP = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    setLoading(false);
    setStep("otp");
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    router.push("/dashboard");
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    setLoading(false);
    // Show success, then go back
    setStep("initial");
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    if (!/^\d*$/.test(value)) return;
    const newValues = [...otpValues];
    newValues[index] = value;
    setOtpValues(newValues);
    // Auto-focus next input
    if (value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`);
      next?.focus();
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction > 0 ? -40 : 40, opacity: 0 }),
  };

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait" custom={1}>
        {/* INITIAL STEP */}
        {step === "initial" && (
          <motion.div
            key="initial"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-foreground">Welcome to StemmQ</h1>
              <p className="mt-2 text-sm text-muted-foreground">Sign in or create an account to get started</p>
            </div>

            {/* OAuth Buttons */}
            <div className="space-y-2.5">
              <Button
                variant="outline"
                className="w-full h-11 justify-center gap-3 font-medium"
                onClick={() => handleOAuth("google")}
                disabled={loading}
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Continue with Google
              </Button>
              <Button
                variant="outline"
                className="w-full h-11 justify-center gap-3 font-medium"
                onClick={() => handleOAuth("microsoft")}
                disabled={loading}
              >
                <Building2 className="h-4 w-4" />
                Continue with Microsoft
              </Button>
              <Button
                variant="outline"
                className="w-full h-11 justify-center gap-3 font-medium"
                onClick={() => handleOAuth("apple")}
                disabled={loading}
              >
                <Apple className="h-4 w-4" />
                Continue with Apple
              </Button>
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-background px-3 text-muted-foreground">or</span>
              </div>
            </div>

            {/* Email Continue */}
            <form onSubmit={handleContinue} className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11"
                required
              />
              <Button variant="accent" className="w-full h-11" disabled={loading || !email}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Continue with Email"}
              </Button>
            </form>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              By continuing, you agree to StemmQ&apos;s{" "}
              <a href="/terms" className="text-accent hover:underline">Terms of Service</a>{" "}
              and{" "}
              <a href="/privacy" className="text-accent hover:underline">Privacy Policy</a>
            </p>
          </motion.div>
        )}

        {/* PASSWORD STEP */}
        {step === "password" && (
          <motion.div
            key="password"
            custom={1}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.2 }}
          >
            <button
              onClick={() => setStep("initial")}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back
            </button>

            <h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
            <p className="mt-1 text-sm text-muted-foreground">Sign in as {email}</p>

            <form onSubmit={handleSignIn} className="mt-6 space-y-4">
              {/* Email chip */}
              <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-foreground">{email}</span>
                <button type="button" onClick={() => setStep("initial")} className="ml-auto text-xs text-accent hover:underline">Change</button>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-sm font-medium text-foreground" htmlFor="password">Password</label>
                  <button type="button" onClick={() => setStep("forgot")} className="text-xs text-accent hover:underline">Forgot password?</button>
                </div>
                <Input id="password" type="password" placeholder="Enter your password" className="h-11" autoFocus />
              </div>

              <Button variant="accent" className="w-full h-11" disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign In"}
              </Button>
            </form>

            <button
              onClick={handleOTP}
              className="mt-4 w-full text-center text-sm text-accent hover:underline"
            >
              Sign in with one-time code instead
            </button>
          </motion.div>
        )}

        {/* OTP STEP */}
        {step === "otp" && (
          <motion.div
            key="otp"
            custom={1}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.2 }}
          >
            <button
              onClick={() => setStep("password")}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back
            </button>

            <h1 className="text-2xl font-bold text-foreground">Check your email</h1>
            <p className="mt-1 text-sm text-muted-foreground">We sent a verification code to {email}</p>

            <form onSubmit={handleVerifyOTP} className="mt-8">
              <div className="flex justify-center gap-2.5">
                {otpValues.map((val, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={val}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace" && !val && i > 0) {
                        document.getElementById(`otp-${i - 1}`)?.focus();
                      }
                    }}
                    className="h-12 w-11 rounded-lg border border-input bg-card text-center text-lg font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                ))}
              </div>

              <Button variant="accent" className="w-full h-11 mt-6" disabled={loading || otpValues.some(v => !v)}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify"}
              </Button>
            </form>

            <p className="mt-4 text-center text-sm text-muted-foreground">
              Didn&apos;t receive a code?{" "}
              <button onClick={handleOTP} className="text-accent hover:underline">Resend</button>
            </p>
          </motion.div>
        )}

        {/* SIGNUP STEP */}
        {step === "signup" && (
          <motion.div
            key="signup"
            custom={1}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.2 }}
          >
            <button
              onClick={() => setStep("initial")}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back
            </button>

            <h1 className="text-2xl font-bold text-foreground">Create your account</h1>
            <p className="mt-1 text-sm text-muted-foreground">Getting started as {email}</p>

            <form onSubmit={handleSignUp} className="mt-6 space-y-4">
              <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-foreground">{email}</span>
                <button type="button" onClick={() => setStep("initial")} className="ml-auto text-xs text-accent hover:underline">Change</button>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground" htmlFor="name">Full name</label>
                <Input id="name" placeholder="Enter your full name" className="mt-1.5 h-11" autoFocus />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground" htmlFor="new-password">Password</label>
                <Input id="new-password" type="password" placeholder="Create a password (8+ characters)" className="mt-1.5 h-11" />
              </div>

              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" className="mt-1 h-4 w-4 rounded border-border accent-accent" />
                <span className="text-xs text-muted-foreground leading-relaxed">
                  I agree to the <a href="/terms" className="text-accent hover:underline">Terms of Service</a> and <a href="/privacy" className="text-accent hover:underline">Privacy Policy</a>
                </span>
              </label>

              <Button variant="accent" className="w-full h-11" disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Account"}
              </Button>
            </form>
          </motion.div>
        )}

        {/* FORGOT PASSWORD STEP */}
        {step === "forgot" && (
          <motion.div
            key="forgot"
            custom={1}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.2 }}
          >
            <button
              onClick={() => setStep("password")}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back
            </button>

            <h1 className="text-2xl font-bold text-foreground">Reset your password</h1>
            <p className="mt-1 text-sm text-muted-foreground">We&apos;ll send a reset link to your email</p>

            <form onSubmit={handleForgotPassword} className="mt-6 space-y-4">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11"
              />
              <Button variant="accent" className="w-full h-11" disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send Reset Link"}
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
