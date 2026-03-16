"use client";

import { AuthProvider } from "@/lib/providers/auth-provider";
import { ToastProvider } from "@/lib/providers/toast-provider";
import { ToastContainer } from "@/components/ui/toast";
import { useToast } from "@/lib/hooks/use-toast";
import type { ReactNode } from "react";

function ToastRenderer() {
  const { toasts, removeToast } = useToast();
  return <ToastContainer toasts={toasts} onRemove={removeToast} />;
}

export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <ToastProvider>
        {children}
        <ToastRenderer />
      </ToastProvider>
    </AuthProvider>
  );
}
