import Link from 'next/link'
import { Zap } from 'lucide-react'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950 flex">
      {/* Left — Brand panel (desktop only) */}
      <div className="hidden lg:flex lg:w-[420px] xl:w-[480px] flex-col bg-brand-600 text-white p-10 relative overflow-hidden flex-shrink-0">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.15),transparent_60%)]" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-brand-500/40 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-1/2 -left-16 w-48 h-48 bg-brand-700/50 rounded-full blur-2xl" />

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 relative z-10">
          <div className="w-8 h-8 rounded-[9px] bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" fill="white" />
          </div>
          <span className="font-display font-bold text-xl">StemmQ</span>
        </Link>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center relative z-10">
          <p className="text-brand-200 text-xs font-semibold uppercase tracking-widest mb-4">Decision Intelligence</p>
          <h2 className="font-display font-bold text-3xl xl:text-4xl leading-tight mb-6">
            Build smarter organizations with structured decision-making
          </h2>
          <p className="text-brand-100 leading-relaxed mb-10 text-sm">
            Track every assumption. Measure every outcome. Build the institutional memory that compounds over time.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Teams using StemmQ', value: '500+' },
              { label: 'Avg assumption accuracy', value: '87%' },
              { label: 'Decisions tracked', value: '50k+' },
              { label: 'Avg quality score', value: '78 DQS' },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <p className="font-display font-bold text-2xl mb-0.5">{s.value}</p>
                <p className="text-brand-200 text-xs">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10">
          <p className="text-brand-300 text-xs">
            © {new Date().getFullYear()} StemmQ · <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link> · <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          </p>
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
        {/* Mobile logo */}
        <div className="absolute top-6 left-6 lg:hidden">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-[8px] bg-brand-600 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" fill="white" />
            </div>
            <span className="font-display font-bold text-base">StemmQ</span>
          </Link>
        </div>
        <div className="w-full max-w-[400px]">
          {children}
        </div>
      </div>
    </div>
  )
}
