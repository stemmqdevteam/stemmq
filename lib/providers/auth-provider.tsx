"use client";

import { createContext, useState, useCallback, useContext, type ReactNode } from "react";

type SupabaseUser = {
  id: string;
  email?: string | null;
  user_metadata?: Record<string, unknown> | null;
};

type UserProfile = {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string | null;
  role: string;
  onboarding_completed: boolean;
};

interface AuthContextValue {
  user: SupabaseUser | null;
  profile: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signInWithGoogle: (redirectTo?: string) => Promise<void>;
  signInWithMagicLink: (email: string, redirectTo?: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

const demoUser: SupabaseUser = {
  id: "demo-user",
  email: "demo@stemmq.com",
  user_metadata: { full_name: "Demo User" },
};

const demoProfile: UserProfile = {
  id: "demo-user",
  email: "demo@stemmq.com",
  full_name: "Demo User",
  avatar_url: null,
  role: "admin",
  onboarding_completed: true,
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SupabaseUser | null>(demoUser);
  const [profile, setProfile] = useState<UserProfile | null>(demoProfile);
  const [isLoading] = useState(false);

  const signInWithGoogle = useCallback(async (redirectTo?: string) => {
    const destination = redirectTo || "/dashboard";
    window.location.href = destination;
  }, []);

  const signInWithMagicLink = useCallback(async (_email: string, redirectTo?: string) => {
    const destination = redirectTo || "/dashboard";
    window.location.href = destination;
  }, []);

  const signOut = useCallback(async () => {
    setUser(null);
    setProfile(null);
    window.location.href = "/auth";
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isAuthenticated: !!user,
        isLoading,
        signInWithGoogle,
        signInWithMagicLink,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
