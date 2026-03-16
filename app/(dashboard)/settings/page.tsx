"use client";

import { PageContainer } from "@/components/layout/page-container";
import { Tabs } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageTransition } from "@/components/animations/page-transition";

function ProfileTab() {
  return (
    <div className="max-w-xl space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent text-xl font-semibold">
          SC
        </div>
        <div>
          <Button variant="outline" size="sm">Change avatar</Button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-foreground">First name</label>
          <Input className="mt-1.5" defaultValue="Sarah" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground">Last name</label>
          <Input className="mt-1.5" defaultValue="Chen" />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-foreground">Email</label>
        <Input className="mt-1.5" defaultValue="sarah@stemmq.com" type="email" />
      </div>
      <div>
        <label className="text-sm font-medium text-foreground">Timezone</label>
        <select className="mt-1.5 flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <option>UTC-8 (Pacific Time)</option>
          <option>UTC-5 (Eastern Time)</option>
          <option>UTC+0 (GMT)</option>
          <option>UTC+1 (CET)</option>
        </select>
      </div>
      <Button variant="accent">Save Changes</Button>
    </div>
  );
}

function OrganizationTab() {
  return (
    <div className="max-w-xl space-y-6">
      <div>
        <label className="text-sm font-medium text-foreground">Organization name</label>
        <Input className="mt-1.5" defaultValue="StemmQ" />
      </div>
      <div>
        <label className="text-sm font-medium text-foreground">Organization logo</label>
        <div className="mt-1.5 rounded-lg border border-dashed border-border p-6 text-center">
          <p className="text-sm text-muted-foreground">Drag and drop or click to upload</p>
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-foreground">Default decision review cadence</label>
        <select className="mt-1.5 flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm">
          <option>Weekly</option>
          <option>Bi-weekly</option>
          <option>Monthly</option>
        </select>
      </div>
      <Button variant="accent">Save Changes</Button>
    </div>
  );
}

function IntegrationsTab() {
  const integrations = [
    { name: "Salesforce", description: "CRM validation layer", status: "coming_soon" },
    { name: "HubSpot", description: "CRM data integration", status: "coming_soon" },
    { name: "Pipedrive", description: "Deal-decision correlation", status: "coming_soon" },
    { name: "Slack", description: "Decision notifications", status: "coming_soon" },
    { name: "Jira", description: "Project-decision linking", status: "coming_soon" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {integrations.map((int) => (
        <Card key={int.name}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">{int.name}</CardTitle>
              <Badge variant="neutral">Coming Soon</Badge>
            </div>
            <CardDescription className="text-xs">{int.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" size="sm" disabled>Connect</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function SecurityTab() {
  return (
    <div className="max-w-xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Change Password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Current password</label>
            <Input type="password" className="mt-1.5" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">New password</label>
            <Input type="password" className="mt-1.5" />
          </div>
          <Button variant="accent" size="sm">Update Password</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm">Two-Factor Authentication</CardTitle>
            <Badge variant="warning">Disabled</Badge>
          </div>
          <CardDescription className="text-xs">Add an extra layer of security to your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" size="sm">Enable 2FA</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Active Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { device: "MacBook Pro — Chrome", location: "San Francisco, CA", current: true },
              { device: "iPhone 15 — Safari", location: "San Francisco, CA", current: false },
            ].map((session) => (
              <div key={session.device} className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm text-card-foreground">{session.device}</p>
                  <p className="text-xs text-muted-foreground">{session.location}</p>
                </div>
                {session.current ? (
                  <Badge variant="success">Current</Badge>
                ) : (
                  <Button variant="ghost" size="sm" className="text-danger text-xs">Revoke</Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function BillingTab() {
  return (
    <div className="max-w-xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Current Plan</CardTitle>
          <CardDescription className="text-xs">You are on the Professional plan.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-1 mb-4">
            <span className="text-3xl font-bold text-card-foreground">$119</span>
            <span className="text-sm text-muted-foreground">/month (annual)</span>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div>
              <p className="text-muted-foreground">Team members</p>
              <p className="font-medium">10 / 50</p>
            </div>
            <div>
              <p className="text-muted-foreground">Decisions this month</p>
              <p className="font-medium">47 / Unlimited</p>
            </div>
            <div>
              <p className="text-muted-foreground">Simulations</p>
              <p className="font-medium">6 / Unlimited</p>
            </div>
            <div>
              <p className="text-muted-foreground">Storage used</p>
              <p className="font-medium">2.4 GB / 50 GB</p>
            </div>
          </div>
          <Button variant="accent" size="sm">Upgrade to Enterprise</Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <PageTransition>
      <PageContainer title="Settings" description="Manage your account, organization, and preferences.">
        <Tabs
          tabs={[
            { label: "Profile", content: <ProfileTab /> },
            { label: "Organization", content: <OrganizationTab /> },
            { label: "Integrations", content: <IntegrationsTab /> },
            { label: "Security", content: <SecurityTab /> },
            { label: "Billing", content: <BillingTab /> },
          ]}
        />
      </PageContainer>
    </PageTransition>
  );
}
