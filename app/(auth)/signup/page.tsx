import type { Metadata } from "next";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Create Account" };

export default function SignupPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-card-foreground">Create your account</h1>
      <p className="mt-1 text-sm text-muted-foreground">Start making decisions that compound</p>

      <form className="mt-6 space-y-4">
        <div>
          <label className="text-sm font-medium text-card-foreground" htmlFor="name">
            Full name
          </label>
          <Input id="name" placeholder="Jane Smith" className="mt-1.5" />
        </div>
        <div>
          <label className="text-sm font-medium text-card-foreground" htmlFor="email">
            Work email
          </label>
          <Input id="email" type="email" placeholder="jane@company.com" className="mt-1.5" />
        </div>
        <div>
          <label className="text-sm font-medium text-card-foreground" htmlFor="company">
            Company name
          </label>
          <Input id="company" placeholder="Acme Inc" className="mt-1.5" />
        </div>
        <div>
          <label className="text-sm font-medium text-card-foreground" htmlFor="password">
            Password
          </label>
          <Input id="password" type="password" placeholder="Create a strong password" className="mt-1.5" />
        </div>

        <div className="flex items-start gap-2">
          <input type="checkbox" id="terms" className="h-4 w-4 rounded border-border mt-0.5" />
          <label htmlFor="terms" className="text-sm text-muted-foreground">
            I agree to the{" "}
            <Link href="/terms" className="text-accent hover:underline">Terms of Service</Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-accent hover:underline">Privacy Policy</Link>
          </label>
        </div>

        <Button variant="accent" className="w-full">
          Create Account
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
        Already have an account?{" "}
        <Link href="/login" className="text-accent hover:underline font-medium">
          Sign in
        </Link>
      </p>
    </div>
  );
}
