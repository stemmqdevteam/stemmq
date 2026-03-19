"use client";

import { useState } from "react";
import { Key, Copy, Trash2, Plus, Eye, EyeOff } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { PageTransition } from "@/components/animations/page-transition";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { formatDate, formatRelativeTime } from "@/lib/utils";
import { mockAPIKeys } from "@/lib/mock-data";

export default function APIKeysPage() {
  const [showKey, setShowKey] = useState<string | null>(null);
  const [createOpen, setCreateOpen] = useState(false);

  const maskKey = (key: string) => {
    return key.slice(0, 7) + "\u2022".repeat(20) + key.slice(-4);
  };

  return (
    <PageTransition>
      <PageContainer
        title="API Keys"
        description="Manage your API keys for programmatic access"
        actions={
          <Button variant="accent" size="sm" onClick={() => setCreateOpen(true)} className="gap-1.5">
            <Plus className="h-3.5 w-3.5" /> Create Key
          </Button>
        }
      >
        <div className="space-y-3">
          {mockAPIKeys.map(key => (
            <Card key={key.id}>
              <CardContent className="pt-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted shrink-0">
                      <Key className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-foreground">{key.name}</p>
                        <div className="flex gap-1">
                          {key.permissions.map(p => (
                            <Badge key={p} variant="neutral" className="text-[10px]">{p}</Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <code className="text-xs font-mono text-muted-foreground">
                          {showKey === key.id ? key.key : maskKey(key.key)}
                        </code>
                        <button onClick={() => setShowKey(showKey === key.id ? null : key.id)} className="text-muted-foreground hover:text-foreground">
                          {showKey === key.id ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                        </button>
                        <button className="text-muted-foreground hover:text-foreground">
                          <Copy className="h-3 w-3" />
                        </button>
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-[10px] text-muted-foreground">
                        <span>Created {formatDate(key.createdAt)}</span>
                        {key.lastUsed && <span>Last used {formatRelativeTime(key.lastUsed)}</span>}
                        {key.expiresAt && <span>Expires {formatDate(key.expiresAt)}</span>}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-danger hover:text-danger hover:bg-danger/10 shrink-0">
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Create key dialog */}
        <Dialog open={createOpen} onClose={() => setCreateOpen(false)} title="Create API Key">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Key Name</label>
              <Input placeholder="e.g., Production API" className="mt-1.5" />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setCreateOpen(false)}>Cancel</Button>
              <Button variant="accent" onClick={() => setCreateOpen(false)}>Create Key</Button>
            </div>
          </div>
        </Dialog>
      </PageContainer>
    </PageTransition>
  );
}
