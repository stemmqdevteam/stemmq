import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 py-12">
      <div className="absolute inset-0 gradient-mesh opacity-30" />
      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-bg">
              <span className="text-sm font-bold text-white">S</span>
            </div>
            <span className="text-xl font-semibold text-foreground">StemmQ</span>
          </Link>
        </div>
        <div className="rounded-xl border border-border bg-card p-8 shadow-lg">
          {children}
        </div>
      </div>
    </div>
  );
}
