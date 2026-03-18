import { MarketingHeader } from "@/components/layout/marketing-header";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { FadeIn } from "@/components/animations/fade-in";
import { Rss } from "lucide-react";

const entries = [
  {
    version: "v2.4.0",
    date: "March 14, 2026",
    category: "Feature",
    categoryColor: "bg-accent/10 text-accent",
    title: "Multi-Agent Orchestration",
    changes: [
      "Agents can now submit joint decisions that are evaluated as a single unit",
      "Dependency graph visualization for agent proposal chains",
      "New joint-decision API endpoint: POST /v1/decisions/joint",
      "Audit trail links all contributing agents to the combined outcome",
    ],
  },
  {
    version: "v2.3.2",
    date: "March 5, 2026",
    category: "Performance",
    categoryColor: "bg-success/10 text-success",
    title: "Decision Gate 40% Faster Evaluation",
    changes: [
      "Risk modeling engine refactored for 40% lower p95 latency",
      "Pattern recognition now runs in parallel with assumption validation",
      "Gate evaluation time reduced from ~800ms to ~480ms average",
    ],
  },
  {
    version: "v2.3.0",
    date: "Feb 24, 2026",
    category: "Feature",
    categoryColor: "bg-accent/10 text-accent",
    title: "External Agent Gateway (GA)",
    changes: [
      "POST /v1/external-agent/decision now generally available",
      "Passive observation mode detects and converts external system actions",
      "OpenAI and Anthropic function calling schemas supported out of the box",
      "Webhook retry logic with configurable backoff policies",
    ],
  },
  {
    version: "v2.2.1",
    date: "Feb 15, 2026",
    category: "Fix",
    categoryColor: "bg-warning/10 text-warning",
    title: "Assumption Calibration Edge Cases",
    changes: [
      "Fixed DQS miscalculation when all assumptions have equal weight",
      "Resolved edge case where invalidated assumptions still counted toward coverage score",
      "Improved accuracy scoring for assumptions updated retroactively",
    ],
  },
  {
    version: "v2.2.0",
    date: "Feb 5, 2026",
    category: "Feature",
    categoryColor: "bg-accent/10 text-accent",
    title: "Agent Performance Scoring",
    changes: [
      "New agent dashboard with five performance dimensions",
      "Forecast Accuracy, DQS contribution, ROI, Risk Exposure, Failure Rate, Success Rate",
      "Historical performance trends with 90-day rolling window",
      "Agents with sustained low scores auto-flagged for review",
    ],
  },
  {
    version: "v2.1.0",
    date: "Jan 22, 2026",
    category: "Security",
    categoryColor: "bg-danger/10 text-danger",
    title: "SOC 2 Type II Certification",
    changes: [
      "StemmQ is now SOC 2 Type II certified",
      "Audit log export now includes chain-of-custody certificate",
      "SAML 2.0 SSO support for enterprise organizations",
      "New security dashboard with session management",
    ],
  },
  {
    version: "v2.0.0",
    date: "Jan 8, 2026",
    category: "Feature",
    categoryColor: "bg-purple-500/10 text-purple-500",
    title: "Decision Intelligence v2 — Major Release",
    changes: [
      "Rebuilt Decision Gate with configurable risk threshold engine",
      "New strategic intent types: Experiment and Risk Mitigation",
      "Pattern Recognition Engine now learns from 100+ decision signals",
      "Institutional Memory layer stores organizational decision context across leadership transitions",
      "Full REST API v1 generally available",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingHeader />

      {/* Hero */}
      <section className="pt-32 pb-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <FadeIn>
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-accent">Product Updates</span>
                <h1 className="mt-2 text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
                  Changelog
                </h1>
                <p className="mt-3 text-muted-foreground max-w-lg">
                  Every update to StemmQ — new features, performance improvements, security fixes, and what's coming next.
                </p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card text-sm text-muted-foreground hover:border-accent/40 hover:text-foreground transition-colors">
                <Rss className="h-3.5 w-3.5" />
                Subscribe to RSS
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-8 pb-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border hidden sm:block" />

            <div className="space-y-0">
              {entries.map((entry, i) => (
                <div
                  key={entry.version}
                  className="relative flex flex-col sm:flex-row gap-6 sm:gap-8 pb-12"
                >
                  {/* Timeline node */}
                  <div className="hidden sm:flex flex-col items-center">
                    <div className="h-3 w-3 rounded-full bg-accent border-2 border-background ring-2 ring-accent/20 relative z-10 mt-1.5" />
                  </div>

                  {/* Content */}
                  <div
                    className="flex-1 rounded-xl border border-border bg-card p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="text-sm font-mono font-bold text-foreground">{entry.version}</span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${entry.categoryColor}`}>
                        {entry.category}
                      </span>
                      <span className="text-xs text-muted-foreground ml-auto">{entry.date}</span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-4">{entry.title}</h3>
                    <ul className="space-y-2">
                      {entry.changes.map((change, j) => (
                        <li key={j} className="flex items-start gap-2.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-accent mt-2 shrink-0" />
                          <span className="text-sm text-muted-foreground">{change}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
