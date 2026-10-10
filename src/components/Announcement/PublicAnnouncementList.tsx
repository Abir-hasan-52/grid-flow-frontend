"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetPublicAnnouncements } from "@/hooks";
import type { Announcement } from "@/types";
import AnnouncementDetailDialog from "./AnnouncementDetailDialog";
import InfrastructurePagination from "../Infrastructure/InfrastructurePagination";

export default function PublicAnnouncementList() {
  const [page, setPage] = useState(1);
  const [viewing, setViewing] = useState<Announcement | null>(null);
  const [open, setOpen] = useState(false);

  const { data, isPending } = useGetPublicAnnouncements({ page, limit: 10 });
  const announcements = data?.data ?? [];
  console.log(announcements)
  const meta = data?.meta;

  if (isPending) {
    return (
      <div className="space-y-3">
        {["one", "two", "three", "four"].map((key) => (
          <Skeleton key={key} className="h-24 w-full" />
        ))}
      </div>
    );
  }

  if (!announcements.length) {
    return (
      <div className="flex h-60 items-center justify-center rounded-xl border bg-background">
        <p className="text-sm text-muted-foreground">No announcements yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {announcements.map((a) => (
          <button
            key={a.id}
            type="button"
            onClick={() => { setViewing(a); setOpen(true); }}
            className="w-full rounded-xl border bg-background p-4 text-left transition hover:bg-muted/50"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium">{a.title}</p>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                  {a.content}
                </p>
              </div>
              <Badge variant="secondary" className="shrink-0">{a.type}</Badge>
            </div>
            <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
              <span>{a.powerZone?.name ?? "All Zones"}</span>
              <span>&middot;</span>
              <span>{new Date(a.createdAt).toLocaleDateString()}</span>
            </div>
          </button>
        ))}
      </div>

      {meta && meta.totalPages > 0 && (
        <InfrastructurePagination meta={meta} onPageChange={setPage} />
      )}

      <AnnouncementDetailDialog open={open} onOpenChange={setOpen} announcement={viewing} />
    </div>
  );
}