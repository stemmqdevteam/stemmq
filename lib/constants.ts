import type { NavItem, PricingTier, FeatureItem } from "./types";

export const ROUTES = {
  home: "/",
  product: "/product",
  features: "/features",
  pricing: "/pricing",
  about: "/about",
  login: "/login",
  signup: "/signup",
  oauth: "/oauth",
  privacy: "/privacy",
  terms: "/terms",
  dashboard: "/dashboard",
  decisions: "/decisions",
  assumptions: "/assumptions",
  simulations: "/simulations",
  agents: "/agents",
  strategyGraph: "/strategy-graph",
  documents: "/documents",
  analytics: "/analytics",
  team: "/team",
  settings: "/settings",
} as const;

export const MARKETING_NAV = [
  { label: "Product", href: ROUTES.product },
  { label: "Features", href: ROUTES.features },
  { label: "Pricing", href: ROUTES.pricing },
  { label: "About", href: ROUTES.about },
];

export const SIDEBAR_NAV: NavItem[] = [
  { label: "Overview", href: ROUTES.dashboard, icon: "LayoutDashboard" },
  { label: "Decisions", href: ROUTES.decisions, icon: "GitBranch", badge: 12 },
  { label: "Assumptions", href: ROUTES.assumptions, icon: "Target" },
  { label: "Simulations", href: ROUTES.simulations, icon: "Activity" },
  { label: "Agents", href: ROUTES.agents, icon: "Bot", badge: 3 },
  { label: "Strategy Graph", href: ROUTES.strategyGraph, icon: "Network" },
  { label: "Documents", href: ROUTES.documents, icon: "FileText" },
  { label: "Analytics", href: ROUTES.analytics, icon: "BarChart3" },
  { label: "Team", href: ROUTES.team, icon: "Users" },
  { label: "Settings", href: ROUTES.settings, icon: "Settings" },
];

export const PRICING_TIERS: PricingTier[] = [
  {
    name: "Starter",
    price: "$49",
    annualPrice: "$39",
    description: "For teams getting started with structured decision-making.",
    features: [
      "Up to 10 team members",
      "100 decisions per month",
      "Basic assumption tracking",
      "Decision quality scoring",
      "Email support",
      "Standard analytics",
    ],
    cta: "Start Free Trial",
  },
  {
    name: "Professional",
    price: "$149",
    annualPrice: "$119",
    description: "For organizations scaling decision intelligence across teams.",
    features: [
      "Up to 50 team members",
      "Unlimited decisions",
      "Advanced assumption calibration",
      "AI-powered simulations",
      "Agent decision governance",
      "Strategy graph visualization",
      "Document intelligence",
      "Priority support",
      "Custom integrations",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    annualPrice: "Custom",
    description: "For enterprises requiring full strategic decision infrastructure.",
    features: [
      "Unlimited team members",
      "Unlimited everything",
      "Institutional continuity engine",
      "Autonomous audit trails",
      "CRM validation layer",
      "Advanced pattern recognition",
      "SSO & SAML",
      "Dedicated success manager",
      "Custom SLA",
      "On-premise deployment option",
    ],
    cta: "Contact Sales",
  },
];

export const FEATURES_LIST: FeatureItem[] = [
  {
    icon: "Brain",
    title: "Decision Intelligence Engine",
    description:
      "Capture every strategic decision as a Structured Decision Object with context, assumptions, and projected outcomes.",
  },
  {
    icon: "Target",
    title: "Assumption Calibration",
    description:
      "Track, validate, and challenge the assumptions behind every decision. Never let unexamined beliefs drive strategy.",
  },
  {
    icon: "ScanSearch",
    title: "Pattern Recognition",
    description:
      "Detect recurring decision patterns, behavioral biases, and organizational tendencies across your decision history.",
  },
  {
    icon: "Gauge",
    title: "Confidence Scoring",
    description:
      "Quantify decision quality with composite scores based on assumption validity, data coverage, and historical accuracy.",
  },
  {
    icon: "Activity",
    title: "Projection & Simulation",
    description:
      "Model probabilistic outcomes and simulate future scenarios before committing to a strategic direction.",
  },
  {
    icon: "Building2",
    title: "Institutional Continuity",
    description:
      "Preserve strategic context through leadership transitions. Generate decision briefs and rationale histories.",
  },
  {
    icon: "Network",
    title: "Decision Graph",
    description:
      "Visualize relationships between decisions, assumptions, and outcomes as an interactive knowledge graph.",
  },
  {
    icon: "BarChart3",
    title: "Visual Intelligence",
    description:
      "Executive dashboards with real-time KPIs, trend analysis, and strategic health indicators.",
  },
  {
    icon: "FileText",
    title: "Document Intelligence",
    description:
      "Extract decisions, assumptions, and strategic signals from PDFs, documents, and presentations automatically.",
  },
  {
    icon: "Handshake",
    title: "CRM Validation",
    description:
      "Cross-reference strategic decisions with CRM data to validate assumptions against real customer outcomes.",
  },
  {
    icon: "Bot",
    title: "Agent Governance",
    description:
      "Govern AI agent decisions with approval gates, audit trails, and human-in-the-loop oversight frameworks.",
  },
  {
    icon: "ShieldCheck",
    title: "Autonomous Audit",
    description:
      "Complete decision audit trails with immutable logs, compliance tracking, and regulatory readiness.",
  },
];

export const FOOTER_LINKS = {
  product: [
    { label: "Features", href: ROUTES.features },
    { label: "Pricing", href: ROUTES.pricing },
    { label: "Changelog", href: "#" },
    { label: "Documentation", href: "#" },
  ],
  company: [
    { label: "About", href: ROUTES.about },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: ROUTES.privacy },
    { label: "Terms of Service", href: ROUTES.terms },
    { label: "Security", href: "#" },
  ],
};
