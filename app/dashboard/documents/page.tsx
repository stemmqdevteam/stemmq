"use client";

import { useState, useEffect } from "react";
import { Upload, FileText, File, Table2 } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { DataTable, type Column } from "@/components/dashboard/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageTransition } from "@/components/animations/page-transition";
import { useOrg } from "@/lib/hooks/use-org";
import { createClient } from "@/lib/supabase/client";
import { formatDate } from "@/lib/utils";
import type { Document } from "@/lib/types";

const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  PDF: FileText,
  DOCX: File,
  PPTX: File,
  XLSX: Table2,
  CSV: Table2,
};

const processingVariant: Record<string, "success" | "info" | "warning" | "danger"> = {
  processed: "success",
  processing: "info",
  queued: "warning",
  failed: "danger",
};

const columns: Column<Document>[] = [
  {
    key: "name",
    label: "Document",
    render: (d) => {
      const Icon = typeIcons[d.type] || File;
      return (
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
            <Icon className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium text-card-foreground">{d.name}</p>
            <p className="text-xs text-muted-foreground">{d.size}</p>
          </div>
        </div>
      );
    },
  },
  {
    key: "type",
    label: "Type",
    render: (d) => <Badge variant="neutral">{d.type}</Badge>,
  },
  {
    key: "uploadedBy",
    label: "Uploaded By",
    render: (d) => <span className="text-sm">{d.uploadedBy}</span>,
  },
  {
    key: "status",
    label: "Status",
    render: (d) => (
      <Badge variant={processingVariant[d.processingStatus] || "neutral"}>
        {d.processingStatus.charAt(0).toUpperCase() + d.processingStatus.slice(1)}
      </Badge>
    ),
  },
  {
    key: "linked",
    label: "Linked",
    render: (d) => <span className="text-sm text-muted-foreground">{d.linkedDecisions} decisions</span>,
  },
  {
    key: "date",
    label: "Date",
    render: (d) => <span className="text-sm text-muted-foreground">{formatDate(d.uploadedAt)}</span>,
  },
];

export default function DocumentsPage() {
  const { orgId, isLoading: orgLoading } = useOrg();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orgId) return;

    const supabase = createClient();

    async function fetchDocuments() {
      setLoading(true);
      const { data } = await supabase
        .from("documents")
        .select("*")
        .eq("org_id", orgId!)
        .order("created_at", { ascending: false });

      if (data) {
        setDocuments(
          data.map((d: any) => ({
            id: d.id,
            name: d.name,
            type: (d.type || "PDF").toUpperCase(),
            size: d.size || "0 KB",
            uploadedBy: d.uploaded_by || "Unknown",
            processingStatus: d.processing_status || "queued",
            linkedDecisions: d.linked_decisions ?? 0,
            uploadedAt: d.created_at,
          }))
        );
      }
      setLoading(false);
    }

    fetchDocuments();
  }, [orgId]);

  if (orgLoading || loading) {
    return (
      <PageTransition>
        <PageContainer title="Documents" description="Upload and analyze documents for strategic intelligence extraction.">
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-14 rounded-lg bg-muted animate-pulse" />
            ))}
          </div>
        </PageContainer>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <PageContainer
        title="Documents"
        description="Upload and analyze documents for strategic intelligence extraction."
        actions={
          <Button variant="accent" size="sm" className="gap-1.5">
            <Upload className="h-4 w-4" />
            Upload Document
          </Button>
        }
      >
        {/* Upload zone */}
        <div className="mb-6 rounded-xl border-2 border-dashed border-border bg-muted/20 p-8 text-center hover:border-accent/40 hover:bg-muted/30 transition-colors cursor-pointer">
          <Upload className="h-8 w-8 text-muted-foreground/40 mx-auto mb-2" />
          <p className="text-sm font-medium text-muted-foreground">
            Drag and drop files here, or click to browse
          </p>
          <p className="text-xs text-muted-foreground/60 mt-1">
            Supports PDF, DOCX, PPTX, XLSX, CSV up to 50MB
          </p>
        </div>

        <DataTable
          columns={columns}
          data={documents}
          keyExtractor={(d) => d.id}
          emptyMessage="No documents uploaded yet"
        />
      </PageContainer>
    </PageTransition>
  );
}
