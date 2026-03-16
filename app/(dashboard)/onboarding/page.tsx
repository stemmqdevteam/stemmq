"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: "company", title: "Company Info", description: "Tell us about your organization" },
  { id: "role", title: "Your Role", description: "Help us personalize your experience" },
  { id: "goals", title: "Goals", description: "What do you want to achieve?" },
  { id: "invite", title: "Invite Team", description: "Collaborate with your team" },
  { id: "setup", title: "Get Started", description: "Set up your workspace" },
];

const INDUSTRIES = ["Technology", "Finance", "Healthcare", "Manufacturing", "Consulting", "Government", "Education", "Retail", "Energy", "Other"];
const TEAM_SIZES = ["1-10", "11-50", "51-200", "201-1000", "1000+"];
const ROLES = ["Executive / C-Suite", "VP / Director", "Product Manager", "Data Analyst", "Strategy Consultant", "Operations Manager", "Engineer", "Other"];
const GOALS = [
  { id: "quality", label: "Improve decision quality", icon: "🎯" },
  { id: "speed", label: "Speed up decision-making", icon: "⚡" },
  { id: "alignment", label: "Align team on strategy", icon: "🤝" },
  { id: "assumptions", label: "Track & validate assumptions", icon: "🔍" },
  { id: "ai", label: "Govern AI agent decisions", icon: "🤖" },
  { id: "audit", label: "Create decision audit trails", icon: "📋" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState({
    companyName: "",
    website: "",
    teamSize: "",
    industry: "",
    role: "",
    goals: [] as string[],
    inviteEmails: [""],
    workspaceName: "",
  });

  const goNext = () => {
    if (currentStep < STEPS.length - 1) {
      setDirection(1);
      setCurrentStep(prev => prev + 1);
    }
  };

  const goBack = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    router.push("/dashboard");
  };

  const toggleGoal = (id: string) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(id) ? prev.goals.filter(g => g !== id) : [...prev.goals, id],
    }));
  };

  const addEmailField = () => {
    setFormData(prev => ({ ...prev, inviteEmails: [...prev.inviteEmails, ""] }));
  };

  const updateEmail = (index: number, value: string) => {
    const newEmails = [...formData.inviteEmails];
    newEmails[index] = value;
    setFormData(prev => ({ ...prev, inviteEmails: newEmails }));
  };

  const progress = ((currentStep + 1) / STEPS.length) * 100;

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-8 h-16 border-b border-border shrink-0">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg gradient-bg">
            <span className="text-xs font-bold text-white">S</span>
          </div>
          <span className="text-base font-semibold text-foreground">StemmQ</span>
        </Link>
        <button onClick={handleComplete} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Skip setup
        </button>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-muted h-1">
        <motion.div
          className="h-full bg-accent"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Step indicator */}
      <div className="flex items-center justify-center gap-2 py-6 px-4">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center gap-2">
            <div className={cn(
              "flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium transition-colors",
              i < currentStep ? "bg-accent text-white" : i === currentStep ? "bg-accent text-white" : "bg-muted text-muted-foreground"
            )}>
              {i < currentStep ? <Check className="h-3.5 w-3.5" /> : i + 1}
            </div>
            <span className={cn("hidden sm:inline text-xs", i === currentStep ? "text-foreground font-medium" : "text-muted-foreground")}>
              {s.title}
            </span>
            {i < STEPS.length - 1 && <div className="w-6 sm:w-10 h-px bg-border" />}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-lg mx-auto px-4 sm:px-6 py-8">
          <AnimatePresence mode="wait" custom={direction}>
            {/* Step 0: Company Info */}
            {currentStep === 0 && (
              <motion.div key="company" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
                <h2 className="text-2xl font-bold text-foreground">{STEPS[0].title}</h2>
                <p className="mt-1 text-sm text-muted-foreground mb-8">{STEPS[0].description}</p>
                <div className="space-y-5">
                  <div>
                    <label className="text-sm font-medium text-foreground">Company name</label>
                    <Input className="mt-1.5 h-11" placeholder="Enter company name" value={formData.companyName} onChange={e => setFormData(p => ({ ...p, companyName: e.target.value }))} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Website (optional)</label>
                    <Input className="mt-1.5 h-11" placeholder="https://company.com" value={formData.website} onChange={e => setFormData(p => ({ ...p, website: e.target.value }))} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Team size</label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mt-1.5">
                      {TEAM_SIZES.map(size => (
                        <button key={size} onClick={() => setFormData(p => ({ ...p, teamSize: size }))} className={cn("rounded-lg border px-3 py-2 text-sm transition-colors", formData.teamSize === size ? "border-accent bg-accent/10 text-accent" : "border-border hover:border-muted-foreground/30 text-muted-foreground")}>
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Industry</label>
                    <div className="grid grid-cols-2 gap-2 mt-1.5">
                      {INDUSTRIES.map(ind => (
                        <button key={ind} onClick={() => setFormData(p => ({ ...p, industry: ind }))} className={cn("rounded-lg border px-3 py-2 text-sm text-left transition-colors", formData.industry === ind ? "border-accent bg-accent/10 text-accent" : "border-border hover:border-muted-foreground/30 text-muted-foreground")}>
                          {ind}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 1: Role */}
            {currentStep === 1 && (
              <motion.div key="role" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
                <h2 className="text-2xl font-bold text-foreground">{STEPS[1].title}</h2>
                <p className="mt-1 text-sm text-muted-foreground mb-8">{STEPS[1].description}</p>
                <div className="grid grid-cols-1 gap-2">
                  {ROLES.map(role => (
                    <button key={role} onClick={() => setFormData(p => ({ ...p, role }))} className={cn("rounded-lg border px-4 py-3 text-sm text-left transition-colors", formData.role === role ? "border-accent bg-accent/10 text-accent font-medium" : "border-border hover:border-muted-foreground/30 text-foreground")}>
                      {role}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Goals */}
            {currentStep === 2 && (
              <motion.div key="goals" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
                <h2 className="text-2xl font-bold text-foreground">{STEPS[2].title}</h2>
                <p className="mt-1 text-sm text-muted-foreground mb-8">Select all that apply</p>
                <div className="grid grid-cols-1 gap-2">
                  {GOALS.map(goal => (
                    <button key={goal.id} onClick={() => toggleGoal(goal.id)} className={cn("flex items-center gap-3 rounded-lg border px-4 py-3.5 text-left transition-colors", formData.goals.includes(goal.id) ? "border-accent bg-accent/10" : "border-border hover:border-muted-foreground/30")}>
                      <span className="text-lg">{goal.icon}</span>
                      <span className={cn("text-sm", formData.goals.includes(goal.id) ? "text-accent font-medium" : "text-foreground")}>{goal.label}</span>
                      {formData.goals.includes(goal.id) && <Check className="h-4 w-4 text-accent ml-auto" />}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Invite */}
            {currentStep === 3 && (
              <motion.div key="invite" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
                <h2 className="text-2xl font-bold text-foreground">{STEPS[3].title}</h2>
                <p className="mt-1 text-sm text-muted-foreground mb-8">Decision-making is better together</p>
                <div className="space-y-3">
                  {formData.inviteEmails.map((email, i) => (
                    <Input key={i} type="email" placeholder="colleague@company.com" value={email} onChange={e => updateEmail(i, e.target.value)} className="h-11" />
                  ))}
                  <button onClick={addEmailField} className="text-sm text-accent hover:underline">+ Add another email</button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Workspace Setup */}
            {currentStep === 4 && (
              <motion.div key="setup" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                    className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 mb-6"
                  >
                    <Sparkles className="h-8 w-8 text-accent" />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-foreground">You&apos;re all set!</h2>
                  <p className="mt-2 text-sm text-muted-foreground">Let&apos;s name your workspace and dive in</p>
                </div>
                <div className="mt-8">
                  <label className="text-sm font-medium text-foreground">Workspace name</label>
                  <Input className="mt-1.5 h-11" placeholder={formData.companyName ? `${formData.companyName} HQ` : "My Workspace"} value={formData.workspaceName} onChange={e => setFormData(p => ({ ...p, workspaceName: e.target.value }))} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer with navigation */}
      <div className="border-t border-border px-4 sm:px-8 py-4 flex items-center justify-between shrink-0">
        <Button variant="ghost" onClick={goBack} disabled={currentStep === 0} className="gap-1.5">
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        {currentStep < STEPS.length - 1 ? (
          <Button variant="accent" onClick={goNext} className="gap-1.5">
            Continue <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button variant="accent" onClick={handleComplete} className="gap-1.5">
            Launch StemmQ <Sparkles className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
