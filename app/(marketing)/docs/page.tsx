import { MarketingHeader } from "@/components/layout/marketing-header";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeader } from "@/components/marketing/section-header";
import { ArrowRight, Book, Code2, Zap, Shield, Bot, BarChart3, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";
import Link from "next/link";

const quickStart = [
  {
    step: "1",
    title: "Install the SDK",
    desc: "Add StemmQ to your project",
    code: "npm install @stemmq/sdk",
  },
  {
    step: "2",
    title: "Authenticate",
    desc: "Initialize with your API key",
    code: `import { StemmQ } from '@stemmq/sdk'
const client = new StemmQ({
  apiKey: process.env.STEMMQ_API_KEY
})`,
  },
  {
    step: "3",
    title: "Create your first Decision",
    desc: "Structure a decision object",
    code: `const decision = await client.decisions.create({
  title: "Launch EMEA expansion",
  intent: "Growth",
  assumptions: [
    { text: "TAM > $50M", weight: 5 }
  ]
})
// → { id: "dec_abc123", dqs: 74 }`,
  },
];

const apiSections = [
  { icon: Book, label: "Decisions", endpoints: ["POST /decisions", "GET /decisions/:id", "PATCH /decisions/:id", "DELETE /decisions/:id"] },
  { icon: Bot, label: "Agents", endpoints: ["POST /agents", "GET /agents", "POST /agents/:id/propose", "GET /agents/:id/performance"] },
  { icon: Shield, label: "Decision Gate", endpoints: ["POST /gate/evaluate", "POST /gate/approve", "POST /gate/reject", "GET /gate/pending"] },
  { icon: BarChart3, label: "Assumptions", endpoints: ["POST /assumptions", "PATCH /assumptions/:id/status", "GET /assumptions/accuracy"] },
  { icon: Code2, label: "Simulations", endpoints: ["POST /simulations", "POST /simulations/:id/run", "GET /simulations/:id/outcomes"] },
  { icon: Zap, label: "Webhooks", endpoints: ["POST /webhooks", "GET /webhooks", "DELETE /webhooks/:id"] },
];

const sdks = [
  { lang: "Node.js", install: "npm install @stemmq/sdk", color: "text-success" },
  { lang: "Python", install: "pip install stemmq", color: "text-blue-500" },
  { lang: "Go", install: "go get github.com/stemmq/sdk-go", color: "text-accent" },
  { lang: "Ruby", install: "gem install stemmq", color: "text-danger" },
];

const guides = [
  { title: "Governing AI Agents with Decision Gates", desc: "Connect external agents and enforce structured decision-making." },
  { title: "Assumption Calibration Workflow", desc: "Build a team-wide assumption tracking and validation process." },
  { title: "Setting Up Multi-Agent Orchestration", desc: "Configure agents that depend on each other's outputs." },
  { title: "Compliance Audit Log Export", desc: "Export decision history for regulatory reporting." },
  { title: "Integrating with Salesforce CRM", desc: "Cross-reference decisions against CRM data automatically." },
  { title: "Building a Custom Agent with the SDK", desc: "Create a native agent with full Decision Gate integration." },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingHeader />

      {/* Hero */}
      <section className="pt-32 pb-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <FadeIn>
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">Documentation</span>
            <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
              Everything you need to <span className="gradient-text">build with StemmQ</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">API reference, guides, SDKs, and integration docs.</p>

            {/* Visual search bar */}
            <div className="mt-8 flex items-center gap-3 max-w-lg mx-auto rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
              <Search className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="text-sm text-muted-foreground">Search docs — try "decision gate", "agents", "DQS"</span>
              <span className="ml-auto text-xs text-muted-foreground border border-border rounded px-1.5 py-0.5">⌘K</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader eyebrow="Quick Start" title="Up and running in 3 steps" align="left" />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickStart.map((item, i) => (
              <div key={i} className="rounded-xl border border-border bg-card overflow-hidden hover:shadow-md transition-shadow">
                <div className="px-5 py-4 border-b border-border bg-muted/20">
                  <div className="flex items-center gap-2">
                    <span className="h-6 w-6 rounded-full bg-accent text-white text-xs font-bold flex items-center justify-center">
                      {item.step}
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-foreground">{item.title}</div>
                      <div className="text-[11px] text-muted-foreground">{item.desc}</div>
                    </div>
                  </div>
                </div>
                <div className="bg-primary p-4">
                  <pre className="text-[11px] font-mono text-slate-300 overflow-x-auto whitespace-pre-wrap">
                    <code>{item.code}</code>
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API Reference */}
      <section className="py-16 bg-muted/30 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader eyebrow="API Reference" title="Full REST API" subtitle="Every StemmQ capability is available via REST API with OpenAPI 3.0 specification." />

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Sidebar mock */}
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="px-4 py-3 border-b border-border bg-muted/30">
                <span className="text-xs font-semibold text-foreground">Endpoint Groups</span>
              </div>
              <div className="divide-y divide-border">
                {apiSections.map((section, i) => (
                  <div key={section.label} className="px-4 py-3 hover:bg-muted/30 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-2.5 mb-2">
                      <section.icon className="h-3.5 w-3.5 text-accent" />
                      <span className="text-sm font-medium text-foreground">{section.label}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {section.endpoints.map((ep) => (
                        <code key={ep} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-accent/10 text-accent">
                          {ep}
                        </code>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sample endpoint */}
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="px-4 py-3 border-b border-border bg-muted/30 flex items-center gap-2">
                <span className="text-[10px] px-2 py-0.5 rounded bg-success/10 text-success font-bold font-mono">POST</span>
                <code className="text-xs font-mono text-foreground">/v1/decisions</code>
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Description</div>
                  <p className="text-sm text-foreground">Create a new Structured Decision Object (SDO) with intent classification, assumptions, and automatic DQS scoring.</p>
                </div>
                <div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Request Body</div>
                  <div className="rounded-lg bg-primary p-3">
                    <pre className="text-[10px] font-mono text-slate-300">{`{
  "title": string,         // required
  "intent": enum,          // Growth|Defense|...
  "owner": string,         // email
  "assumptions": Array,    // optional
  "tags": string[]         // optional
}`}</pre>
                  </div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Response: 201 Created</div>
                  <div className="rounded-lg bg-primary p-3">
                    <pre className="text-[10px] font-mono text-slate-300">{`{
  "id": "dec_abc123",
  "dqs": 74,
  "status": "active",
  "createdAt": "2026-03-17T..."
}`}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SDKs */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader eyebrow="SDKs" title="Official client libraries" />
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {sdks.map((sdk, i) => (
              <div key={sdk.lang} className="rounded-xl border border-border bg-card p-5 hover:shadow-md hover:-translate-y-0.5 transition-all group">
                <div className={`text-base font-bold mb-2 ${sdk.color}`}>{sdk.lang}</div>
                <code className="text-[10px] font-mono text-muted-foreground block bg-muted/50 rounded px-2 py-1.5 mb-3">
                  {sdk.install}
                </code>
                <span className="text-xs text-accent group-hover:underline">View docs →</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guides */}
      <section className="py-16 bg-muted/30 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader eyebrow="Guides" title="Popular integration guides" />
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {guides.map((guide, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-5 hover:shadow-md hover:-translate-y-0.5 transition-all group cursor-pointer">
                <h3 className="text-sm font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                  {guide.title}
                </h3>
                <p className="text-xs text-muted-foreground mb-3">{guide.desc}</p>
                <span className="text-xs text-accent flex items-center gap-1">
                  Read guide <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
