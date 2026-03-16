import type { User, Session } from "@/lib/types";

// Simulated delay for mock API calls
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

export type AuthProvider = "google" | "microsoft" | "apple";

export interface SignUpData {
  name: string;
  email: string;
  password: string;
  company?: string;
}

export interface AuthResponse {
  user: User;
  session: Session;
}

export interface OTPResponse {
  success: boolean;
  message: string;
}

const mockUser: User = {
  id: "usr-001",
  name: "Sarah Chen",
  email: "sarah@stemmq.com",
  avatar: "SC",
  role: "Chief Strategy Officer",
  company: "StemmQ",
  workspaceId: "ws-001",
  onboardingCompleted: true,
};

const mockSession: Session = {
  accessToken: "mock-access-token-xyz",
  expiresAt: new Date(Date.now() + 86400000).toISOString(),
};

export async function signIn(email: string, password: string): Promise<AuthResponse> {
  await delay(800);
  if (!email || !password) throw new Error("Email and password are required");
  return { user: mockUser, session: mockSession };
}

export async function signUp(data: SignUpData): Promise<AuthResponse> {
  await delay(800);
  if (!data.email || !data.password || !data.name) throw new Error("All fields are required");
  return {
    user: { ...mockUser, name: data.name, email: data.email, onboardingCompleted: false },
    session: mockSession,
  };
}

export async function signInWithOAuth(provider: AuthProvider): Promise<AuthResponse> {
  await delay(1000);
  return { user: mockUser, session: mockSession };
}

export async function signOut(): Promise<void> {
  await delay(300);
}

export async function getSession(): Promise<{ user: User; session: Session } | null> {
  await delay(300);
  // Mock: always return session (swap to real auth check)
  return { user: mockUser, session: mockSession };
}

export async function sendOTP(email: string): Promise<OTPResponse> {
  await delay(600);
  return { success: true, message: "Verification code sent" };
}

export async function verifyOTP(email: string, code: string): Promise<AuthResponse> {
  await delay(600);
  if (code.length !== 6) throw new Error("Invalid verification code");
  return { user: mockUser, session: mockSession };
}

export async function resetPassword(email: string): Promise<OTPResponse> {
  await delay(600);
  return { success: true, message: "Password reset link sent" };
}
