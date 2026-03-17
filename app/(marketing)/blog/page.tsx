import { MarketingHeader } from "@/components/layout/marketing-header";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeader } from "@/components/marketing/section-header";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";

const featuredPost = {
  category: "Decision Intelligence",
  title: "Why Every AI Agent Needs a Decision Gate",
  excerpt: "As AI agents proliferate across organizations, the question isn't whether to use them — it's how to govern them. Decision Gates are the answer organizations have been looking for.",
  author: "Sarah Chen",
  authorInitials: "SC",
  date: "March 12, 2026",
  readTime: "8 min read",
};

const posts = [
  {
    category: "AI Governance",
    title: "The Hidden Cost of Ungoverned AI Decisions",
    excerpt: "Organizations deploying AI without a decision layer are accumulating invisible debt. Here's how to quantify it.",
    author: "Marcus Webb",
    initials: "MW",
    date: "March 8, 2026",
    readTime: "6 min",
  },
  {
    category: "Decision Intelligence",
    title: "Decision Quality Score: A New Metric for Strategic Work",
    excerpt: "DQS is the metric that answers the question every executive wants answered: how confident should we be in this decision?",
    author: "Priya Sharma",
    initials: "PS",
    date: "March 4, 2026",
    readTime: "5 min",
  },
  {
    category: "Product",
    title: "How Assumption Calibration Reduces Strategic Risk",
    excerpt: "Most strategic mistakes aren't failures of execution — they're failures of assumption. Here's how to fix that.",
    author: "Jordan Kim",
    initials: "JK",
    date: "Feb 28, 2026",
    readTime: "7 min",
  },
  {
    category: "Enterprise AI",
    title: "Building Institutional Memory with AI: Beyond RAG",
    excerpt: "RAG retrieves information. Decision intelligence captures reasoning. The difference is profound for organizations at scale.",
    author: "Sarah Chen",
    initials: "SC",
    date: "Feb 22, 2026",
    readTime: "9 min",
  },
  {
    category: "Strategic Planning",
    title: "The Simulation Gap: Why Teams Stop at Scenarios",
    excerpt: "Most teams run one scenario. StemmQ users run dozens — and it fundamentally changes how they commit to strategy.",
    author: "Marcus Webb",
    initials: "MW",
    date: "Feb 17, 2026",
    readTime: "4 min",
  },
  {
    category: "AI Governance",
    title: "Multi-Agent Orchestration: Governance Before Capability",
    excerpt: "When agents depend on other agents, governance complexity multiplies. StemmQ's joint decision evaluation solves this.",
    author: "Priya Sharma",
    initials: "PS",
    date: "Feb 10, 2026",
    readTime: "6 min",
  },
];

const topics = [
  "Decision Intelligence", "AI Governance", "Assumption Calibration",
  "Strategic Planning", "Enterprise AI", "Decision Quality", "Agent Systems",
  "Org Memory", "Risk Modeling", "Leadership", "Product Strategy"
];

const categoryColors: Record<string, string> = {
  "Decision Intelligence": "bg-accent/10 text-accent",
  "AI Governance": "bg-purple-500/10 text-purple-500",
  "Product": "bg-success/10 text-success",
  "Enterprise AI": "bg-blue-500/10 text-blue-500",
  "Strategic Planning": "bg-warning/10 text-warning",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingHeader />

      {/* Hero */}
      <section className="pt-32 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <FadeIn>
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">Blog</span>
              <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
                Decision Intelligence <span className="gradient-text">Insights</span>
              </h1>
              <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
                Thought leadership on AI governance, strategic decision-making, and building organizations that learn.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <FadeIn>
            <div className="rounded-2xl border border-border bg-card overflow-hidden hover:shadow-xl hover:-translate-y-0.5 transition-all group">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 sm:p-10">
                  <span className={`inline-block text-[11px] font-semibold px-2.5 py-1 rounded-full mb-4 ${categoryColors[featuredPost.category] ?? "bg-muted text-muted-foreground"}`}>
                    {featuredPost.category}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight mb-4">
                    {featuredPost.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">{featuredPost.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center">
                        <span className="text-xs font-bold text-accent">{featuredPost.authorInitials}</span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">{featuredPost.author}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {featuredPost.readTime} · {featuredPost.date}
                        </div>
                      </div>
                    </div>
                    <span className="text-accent text-sm font-medium group-hover:underline flex items-center gap-1">
                      Read <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-accent/5 via-purple-500/5 to-blue-500/5 border-l border-border flex items-center justify-center p-10 min-h-[200px]">
                  <div className="text-center">
                    <div className="text-6xl font-bold gradient-text mb-2">DG</div>
                    <div className="text-xs text-muted-foreground">Decision Gate</div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-card p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all group cursor-pointer"
              >
                <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mb-3 ${categoryColors[post.category] ?? "bg-muted text-muted-foreground"}`}>
                  {post.category}
                </span>
                <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-accent transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center gap-2 pt-3 border-t border-border">
                  <div className="h-6 w-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <span className="text-[9px] font-bold text-accent">{post.initials}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{post.author}</span>
                  <span className="text-xs text-muted-foreground ml-auto flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="py-16 bg-muted/30 border-y border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <SectionHeader eyebrow="Topics" title="Explore by category" />
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {topics.map((topic) => (
              <span
                key={topic}
                className="px-4 py-2 rounded-full border border-border bg-card text-sm text-muted-foreground hover:border-accent/40 hover:text-foreground transition-colors cursor-pointer"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-xl px-4 sm:px-6 text-center">
          <FadeIn>
            <h2 className="text-2xl font-bold text-foreground mb-3">Stay sharp on decision intelligence</h2>
            <p className="text-muted-foreground mb-6">New posts on AI governance, strategic decisions, and org intelligence. Every two weeks.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="you@company.com"
                className="flex-1 h-11 rounded-lg border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/30"
              />
              <Button variant="accent" className="h-11 px-5 shrink-0">Subscribe</Button>
            </div>
          </FadeIn>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
