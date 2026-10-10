"use client";

import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import type { Announcement } from "@/types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  announcement: Announcement | null;
}

export default function AnnouncementDetailDialog({
  open,
  onOpenChange,
  announcement,
}: Props) {
  if (!announcement) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{announcement.title}</DialogTitle>
          <DialogDescription  >
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <Badge variant="secondary">{announcement.type}</Badge>
              <Badge variant="outline">
                {announcement.powerZone?.name ?? "All Zones"}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {new Date(announcement.createdAt).toLocaleString()}
              </span>
            </div>
          </DialogDescription>
        </DialogHeader>

        <p className="whitespace-pre-wrap text-sm leading-relaxed">
          {announcement.content}
        </p>
      </DialogContent>
    </Dialog>
  );
}