"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetMyApplications } from "@/hooks";
import type { ApplicationStatus } from "@/types";
import InfrastructurePagination from "../Infrastructure/InfrastructurePagination";

const statusVariant: Record<ApplicationStatus, "default" | "outline" | "destructive"> = {
  PENDING: "outline",
  APPROVED: "default",
  REJECTED: "destructive",
};

export default function MyApplicationsList() {
  const [page, setPage] = useState(1);
  const { data, isPending } = useGetMyApplications({ page, limit: 10 });

  const applications = data?.data ?? [];
  const meta = data?.meta;

  if (isPending) {
    return (
      <div className="space-y-3">
        {["first", "second", "third"].map((skeletonKey) => (
          <Skeleton key={skeletonKey} className="h-24 w-full" />
        ))}
      </div>
    );
  }

  if (!applications.length) {
    return (
      <div className="flex h-60 items-center justify-center rounded-xl border bg-background">
        <p className="text-sm text-muted-foreground">You haven&apos;t applied to any job posts yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {applications.map((app) => (
          <div key={app.id} className="rounded-xl border bg-background p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium">{app.jobPost.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Applied {new Date(app.createdAt).toLocaleDateString()}
                </p>
              </div>
              <Badge variant={statusVariant[app.status]}>{app.status}</Badge>
            </div>

            {app.status === "REJECTED" && app.rejectionReason ? (
              <p className="mt-3 rounded-md bg-destructive/10 p-2 text-sm text-destructive">
                {app.rejectionReason}
              </p>
            ) : null}

            {app.status === "APPROVED" ? (
              <p className="mt-3 rounded-md bg-primary/10 p-2 text-sm">
                Congratulations — you&apos;ve been promoted to Technician!
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