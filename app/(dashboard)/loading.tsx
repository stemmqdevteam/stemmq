import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Page header skeleton */}
      <div className="space-y-2">
        <Skeleton variant="line" className="h-7 w-48" />
        <Skeleton variant="line" className="h-4 w-72" />
      </div>

      {/* Metric cards skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton variant="line" className="h-4 w-24" />
              <Skeleton variant="circle" className="h-8 w-8" />
            </div>
            <Skeleton variant="line" className="h-8 w-16" />
            <Skeleton variant="line" className="h-3 w-20" />
          </div>
        ))}
      </div>

      {/* Charts skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-5 space-y-4">
            <Skeleton variant="line" className="h-5 w-40" />
            <Skeleton variant="card" className="h-48" />
          </div>
        ))}
      </div>

      {/* Table skeleton */}
      <div className="rounded-xl border border-border bg-card p-5 space-y-4">
        <Skeleton variant="line" className="h-5 w-36" />
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton variant="line" className="h-4 flex-1" />
              <Skeleton variant="line" className="h-4 w-20" />
              <Skeleton variant="line" className="h-4 w-16" />
              <Skeleton variant="line" className="h-4 w-24" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
