import type { OnboardingState } from "@/lib/types";

const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

const defaultState: OnboardingState = {
  currentStep: 0,
  totalSteps: 5,
  completed: false,
  data: {},
};

let onboardingState = { ...defaultState };

export async function getOnboardingState(): Promise<OnboardingState> {
  await delay(300);
  return { ...onboardingState };
}

export async function updateOnboardingStep(step: number, data: Record<string, unknown>): Promise<OnboardingState> {
  await delay(400);
  onboardingState = {
    ...onboardingState,
    currentStep: step,
    data: { ...onboardingState.data, ...data },
  };
  return { ...onboardingState };
}

export async function completeOnboarding(): Promise<void> {
  await delay(500);
  onboardingState = { ...onboardingState, completed: true };
}
