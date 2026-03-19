"use client";

import { useState } from "react";
import { Shield, Smartphone, Monitor, Globe, Trash2, Key, Lock } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { PageTransition } from "@/components/animations/page-transition";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn, formatRelativeTime } from "@/lib/utils";
import { mockActiveSessions, mockSecurityEvents } from "@/lib/mock-data";

const deviceIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  macOS: Monitor,
  iOS: Smartphone,
  Windows: Monitor,
};

export default function SecurityPage() {
  const [twoFAEnabled, setTwoFAEnabled] = useState(true);

  return (
    <PageTransition>
      <PageContainer title="Security" description="Manage your security settings and sessions">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Password */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Lock className="h-4 w-4" /> Change Password</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm font-medium text-foreground">Current password</label>
                <Input type="password" placeholder="Enter current password" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">New password</label>
                <Input type="password" placeholder="Enter new password" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Confirm new password</label>
                <Input type="password" placeholder="Confirm new password" className="mt-1" />
              </div>
              <Button variant="accent" size="sm">Update Password</Button>
            </CardContent>
          </Card>

          {/* 2FA */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Key className="h-4 w-4" /> Two-Factor Authentication</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                <div>
                  <p className="text-sm font-medium text-foreground">Authenticator App</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {twoFAEnabled ? "2FA is currently enabled" : "Add an extra layer of security"}
                  </p>
                </div>
                <Button
                  variant={twoFAEnabled ? "outline" : "accent"}
                  size="sm"
                  onClick={() => setTwoFAEnabled(!twoFAEnabled)}
                >
                  {twoFAEnabled ? "Disable" : "Enable"}
                </Button>
              </div>
              {twoFAEnabled && (
                <p className="mt-3 text-xs text-success flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5" /> Your account is protected with 2FA
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Active Sessions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Active Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockActiveSessions.map(session => {
                const DeviceIcon = deviceIcons[session.device] || Globe;
                return (
                  <div key={session.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                        <DeviceIcon className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-foreground">{session.browser} on {session.device}</p>
                          {session.current && <Badge variant="success" className="text-[10px]">Current</Badge>}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {session.location} · {session.ipAddress} · {formatRelativeTime(session.lastActive)}
                        </p>
                      </div>
                    </div>
                    {!session.current && (
                      <Button variant="ghost" size="sm" className="text-danger hover:text-danger hover:bg-danger/10">
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Security Events */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Security Log</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockSecurityEvents.map(event => (
                <div key={event.id} className="flex items-start gap-3 py-2">
                  <div className="h-2 w-2 rounded-full bg-muted-foreground/30 mt-1.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{event.description}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {event.device} · {event.location} · {formatRelativeTime(event.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </PageContainer>
    </PageTransition>
  );
}
