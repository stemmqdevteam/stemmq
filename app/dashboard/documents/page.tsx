"use client";

import { Upload, FileText, File, Table2 } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { DataTable, type Column } from "@/components/dashboard/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageTransition } from "@/components/animations/page-transition";
import { mockDocuments } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import type { Document } from "@/lib/types";

const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  PDF: FileText,
  DOCX: File,
  PPTX: File,
  XLSX: Table2,
  CSV: Table2,
};

const processingVariant = {
  processed: "success" as const,
  processing: "info" as const,
  queued: "warning" as const,
  failed: "danger" as const,
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
      <Badge variant={processingVariant[d.processingStatus]}>
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
          data={mockDocuments}
          keyExtractor={(d) => d.id}
          emptyMessage="No documents uploaded yet"
        />
      </PageContainer>
    </PageTransition>
  );
}
