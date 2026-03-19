"use client";

import { CreditCard, ArrowUpRight, Download, Check } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { PageTransition } from "@/components/animations/page-transition";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress";
import { formatDate } from "@/lib/utils";
import { mockBillingData, mockInvoices } from "@/lib/mock-data";

export default function BillingPage() {
  const plan = mockBillingData;

  return (
    <PageTransition>
      <PageContainer title="Billing" description="Manage your subscription and billing">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Plan */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Current Plan</CardTitle>
                <Badge variant="success">Active</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-bold text-foreground">${plan.price}</span>
                <span className="text-muted-foreground">/ month</span>
              </div>
              <div className="flex flex-wrap gap-4 mb-6">
                {plan.features.map(f => (
                  <div key={f} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Check className="h-3.5 w-3.5 text-success" /> {f}
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <Button variant="accent" size="sm">Upgrade Plan</Button>
                <Button variant="outline" size="sm">Change to Annual</Button>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 rounded-lg border border-border p-3">
                <div className="flex h-8 w-12 items-center justify-center rounded bg-muted text-xs font-bold text-muted-foreground">VISA</div>
                <div>
                  <p className="text-sm font-medium text-foreground">**** 4242</p>
                  <p className="text-xs text-muted-foreground">Expires 12/27</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="mt-3 w-full">Update Payment Method</Button>
            </CardContent>
          </Card>
        </div>

        {/* Usage */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Current Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Team Members</span>
                  <span className="text-sm font-medium text-foreground">{plan.usage.members.used}/{plan.usage.members.limit}</span>
                </div>
                <ProgressBar value={plan.usage.members.used} max={plan.usage.members.limit} size="sm" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Storage</span>
                  <span className="text-sm font-medium text-foreground">{plan.usage.storage.used} / {plan.usage.storage.limit} {plan.usage.storage.unit}</span>
                </div>
                <ProgressBar value={plan.usage.storage.used} max={plan.usage.storage.limit} size="sm" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">API Calls</span>
                  <span className="text-sm font-medium text-foreground">{(plan.usage.apiCalls.used / 1000).toFixed(1)}K / {plan.usage.apiCalls.limit / 1000}K</span>
                </div>
                <ProgressBar value={plan.usage.apiCalls.used} max={plan.usage.apiCalls.limit} size="sm" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Decisions</span>
                  <span className="text-sm font-medium text-foreground">{plan.usage.decisions.used} / Unlimited</span>
                </div>
                <ProgressBar value={100} max={100} size="sm" variant="success" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Invoices */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Invoice History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-border">
              {mockInvoices.map(invoice => (
                <div key={invoice.id} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-4">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-foreground">${invoice.amount}.00</p>
                      <p className="text-xs text-muted-foreground">{formatDate(invoice.date)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={invoice.status === "paid" ? "success" : invoice.status === "pending" ? "warning" : "danger"}>
                      {invoice.status}
                    </Badge>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                      <Download className="h-3.5 w-3.5" />
                    </Button>
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
