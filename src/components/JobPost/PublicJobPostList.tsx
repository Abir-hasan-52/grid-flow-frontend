"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllPublishedJobPosts } from "@/hooks";
import type { JobPost } from "@/types";
import JobPostDetailDialog from "./JobPostDetailDialog";
import InfrastructurePagination from "../Infrastructure/InfrastructurePagination";

export default function PublicJobPostList() {
  const skeletonKeys = ["first", "second", "third", "fourth"];
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [viewing, setViewing] = useState<JobPost | null>(null);
  const [open, setOpen] = useState(false);

  const { data, isPending } = useGetAllPublishedJobPosts({
    page, limit: 10, search: search || undefined,
  });

  const jobPosts = data?.data ?? [];
  const meta = data?.meta;

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search open positions..."
        value={search}
        onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        className="sm:max-w-sm"
      />

      {isPending ? (
        <div className="space-y-3">
          {skeletonKeys.map((key) => (
            <Skeleton key={key} className="h-24 w-full" />
          ))}
        </div>
      ) : !jobPosts.length ? (
        <div className="flex h-60 items-center justify-center rounded-xl border bg-background">
          <p className="text-sm text-muted-foreground">No open positions right now.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {jobPosts.map((j) => (
            <button
              key={j.id}
              type="button"
              onClick={() => { setViewing(j); setOpen(true); }}
              className="w-full rounded-xl border bg-background p-4 text-left transition hover:bg-muted/50"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium">{j.title}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                    {j.description}
                  </p>
                </div>
                {j.salary ? (
                  <Badge variant="secondary" className="shrink-0">৳{j.salary}</Badge>
                ) : null}
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span>{j.powerZone?.name ?? "All Zones"}</span>
                <span>&middot;</span>
                <span>Deadline: {new Date(j.deadline).toLocaleDateString()}</span>
                {j.workingHours ? (
                  <>
                    <span>&middot;</span>
                    <span>{j.workingHours}</span>
                  </>
                ) : null}
              </div>
            </button>
          ))}
        </div>
      )}

      {meta && meta.totalPages > 0 && (
        <InfrastructurePagination meta={meta} onPageChange={setPage} />
      )}

      <JobPostDetailDialog
        open={open}
        onOpenChange={setOpen}
        jobPost={viewing}
        showApplyButton
      />
    </div>
  );
}