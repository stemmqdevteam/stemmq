"use client";

import { createContext, useState, useEffect, useCallback, type ReactNode } from "react";
import type { User } from "@/lib/types";
import * as authService from "@/lib/services/auth";

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (data: authService.SignUpData) => Promise<void>;
  signInWithOAuth: (provider: authService.AuthProvider) => Promise<void>;
  signOut: () => Promise<void>;
  sendOTP: (email: string) => Promise<void>;
  verifyOTP: (email: string, code: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    authService.getSession().then(session => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const { user } = await authService.signIn(email, password);
    setUser(user);
  }, []);

  const signUp = useCallback(async (data: authService.SignUpData) => {
    const { user } = await authService.signUp(data);
    setUser(user);
  }, []);

  const signInWithOAuth = useCallback(async (provider: authService.AuthProvider) => {
    const { user } = await authService.signInWithOAuth(provider);
    setUser(user);
  }, []);

  const signOut = useCallback(async () => {
    await authService.signOut();
    setUser(null);
  }, []);

  const sendOTP = useCallback(async (email: string) => {
    await authService.sendOTP(email);
  }, []);

  const verifyOTP = useCallback(async (email: string, code: string) => {
    const { user } = await authService.verifyOTP(email, code);
    setUser(user);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        signIn,
        signUp,
        signInWithOAuth,
        signOut,
        sendOTP,
        verifyOTP,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
