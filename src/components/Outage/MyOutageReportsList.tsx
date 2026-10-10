"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetMyReports } from "@/hooks";
import type { OutageStatus } from "@/types";
import InfrastructurePagination from "../Infrastructure/InfrastructurePagination";

const statusVariant: Record<OutageStatus, "default" | "outline" | "secondary" | "destructive"> = {
  REPORTED: "outline",
  VERIFIED: "secondary",
  ASSIGNED: "secondary",
  IN_PROGRESS: "destructive",
  RESTORED: "default",
  CLOSED: "default",
};

export default function MyOutageReportsList() {
  const [page, setPage] = useState(1);
  const { data, isPending } = useGetMyReports({ page, limit: 10 });

  const reports = data?.data ?? [];
  const meta = data?.meta;

  if (isPending) {
    return (
      <div className="space-y-3">
        {["skeleton-1", "skeleton-2", "skeleton-3"].map((key) => (
          <Skeleton key={key} className="h-20 w-full" />
        ))}
      </div>
    );
  }

  if (!reports.length) {
    return (
      <div className="flex h-60 items-center justify-center rounded-xl border bg-background">
        <p className="text-sm text-muted-foreground">You haven&apos;t reported any outages yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {reports.map((r) => (
          <div key={r.id} className="rounded-xl border bg-background p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-muted-foreground">
                  Reported {new Date(r.createdAt).toLocaleString()}
                </p>
                {r.description ? <p className="mt-1 text-sm">{r.description}</p> : null}
              </div>
              {r.outage ? (
                <Badge variant={statusVariant[r.outage.status]}>{r.outage.status}</Badge>
              ) : null}
            </div>
            {r.outage?.closedAt ? (
              <p className="mt-2 text-xs text-muted-foreground">
                Restored {new Date(r.outage.closedAt).toLocaleString()}
              </p>
            ) : null}
          </div>
        ))}
      </div>

      {meta && meta.totalPages > 0 && (
        <InfrastructurePagination meta={meta} onPageChange={setPage} />
      )}
    </div>
  );
}