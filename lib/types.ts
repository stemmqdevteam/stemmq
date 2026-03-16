export type StrategicIntent =
  | "Growth"
  | "Defense"
  | "Efficiency"
  | "Experiment"
  | "Risk Mitigation";

export type DecisionStatus = "draft" | "active" | "completed" | "archived";
export type AssumptionStatus = "validated" | "pending" | "challenged" | "invalidated";
export type SimulationStatus = "draft" | "running" | "completed";
export type AgentStatus = "active" | "paused" | "reviewing";
export type DocumentType = "PDF" | "DOCX" | "PPTX" | "CSV" | "XLSX";
export type ProcessingStatus = "processed" | "processing" | "queued" | "failed";

export interface Decision {
  id: string;
  title: string;
  description: string;
  strategicIntent: StrategicIntent;
  category: string;
  owner: PersonReference;
  status: DecisionStatus;
  dqs: number;
  diw: number;
  assumptionCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Assumption {
  id: string;
  text: string;
  impactWeight: 1 | 2 | 3 | 4 | 5;
  status: AssumptionStatus;
  decisionId: string;
  decisionTitle: string;
  owner: string;
  updatedAt: string;
}

export interface Simulation {
  id: string;
  title: string;
  description: string;
  probability: number;
  status: SimulationStatus;
  outcomeCount: number;
  linkedDecisions: number;
  createdAt: string;
  updatedAt: string;
}

export interface SimulationOutcome {
  id: string;
  label: string;
  probability: number;
  impact: "positive" | "negative" | "neutral";
}

export interface Agent {
  id: string;
  name: string;
  objective: string;
  status: AgentStatus;
  pendingProposals: number;
  accuracyScore: number;
  decisionsProcessed: number;
  lastActive: string;
}

export interface AgentProposal {
  id: string;
  agentId: string;
  agentName: string;
  title: string;
  description: string;
  type: "decision" | "assumption" | "simulation";
  priority: "high" | "medium" | "low";
  createdAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  forecastReliability: number;
  lastActive: string;
}

export interface Document {
  id: string;
  name: string;
  type: DocumentType;
  size: string;
  uploadedBy: string;
  uploadedAt: string;
  processingStatus: ProcessingStatus;
  linkedDecisions: number;
}

export interface ActivityItem {
  id: string;
  user: string;
  avatar: string;
  action: string;
  target: string;
  targetType: "decision" | "assumption" | "simulation" | "agent" | "document" | "team";
  timestamp: string;
}

export interface MetricCardData {
  label: string;
  value: string;
  change: number;
  trend: "up" | "down" | "flat";
  icon: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: number;
}

export interface PersonReference {
  name: string;
  type: "human" | "agent";
  avatar?: string;
}

export interface PricingTier {
  name: string;
  price: string;
  annualPrice: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}
