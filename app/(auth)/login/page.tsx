import type { Metadata } from "next";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Sign In" };

export default function LoginPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-card-foreground">Welcome back</h1>
      <p className="mt-1 text-sm text-muted-foreground">Sign in to your StemmQ account</p>

      <form className="mt-6 space-y-4">
        <div>
          <label className="text-sm font-medium text-card-foreground" htmlFor="email">
            Email
          </label>
          <Input id="email" type="email" placeholder="you@company.com" className="mt-1.5" />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-card-foreground" htmlFor="password">
              Password
            </label>
            <Link href="#" className="text-xs text-accent hover:underline">
              Forgot password?
            </Link>
          </div>
          <Input id="password" type="password" placeholder="Enter your password" className="mt-1.5" />
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" id="remember" className="h-4 w-4 rounded border-border" />
          <label htmlFor="remember" className="text-sm text-muted-foreground">
            Remember me
          </label>
        </div>

        <Button variant="accent" className="w-full">
          Sign In
        </Button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-card px-2 text-muted-foreground">or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {["Google", "Microsoft", "GitHub"].map((provider) => (
          <Button key={provider} variant="outline" size="sm" className="text-xs">
            {provider}
          </Button>
        ))}
      </div>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-accent hover:underline font-medium">
          Sign up
        </Link>
      </p>
    </div>
  );
}
