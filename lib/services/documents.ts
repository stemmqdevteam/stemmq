import type { Document } from "@/lib/types";
import { mockDocuments } from "@/lib/mock-data";

const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

export async function getDocuments(): Promise<Document[]> {
  await delay(400);
  return [...mockDocuments];
}

export async function uploadDocument(file: File): Promise<Document> {
  await delay(1500);
  const ext = file.name.split(".").pop()?.toUpperCase() ?? "PDF";
  return {
    id: `doc-${String(mockDocuments.length + 1).padStart(3, "0")}`,
    name: file.name,
    type: ext as Document["type"],
    size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
    uploadedBy: "Sarah Chen",
    uploadedAt: new Date().toISOString(),
    processingStatus: "queued",
    linkedDecisions: 0,
  };
}

export async function deleteDocument(id: string): Promise<void> {
  await delay(400);
}
