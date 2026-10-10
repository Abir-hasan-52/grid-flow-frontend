"use client";

import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import type { LoadSheddingSchedule } from "@/types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  schedule: LoadSheddingSchedule | null;
}

export default function ScheduleDetailDialog({ open, onOpenChange, schedule }: Props) {
  if (!schedule) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{schedule.title}</DialogTitle>
          <DialogDescription  >
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <Badge variant="outline">{schedule.powerZone.name}</Badge>
              <Badge>{schedule.status}</Badge>
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 text-sm">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-muted-foreground">Start</p>
              <p>{new Date(schedule.startTime).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">End</p>
              <p>{new Date(schedule.endTime).toLocaleString()}</p>
            </div>
          </div>

          {schedule.reason ? (
            <div>
              <p className="mb-1 font-medium">Reason</p>
              <p className="whitespace-pre-wrap text-muted-foreground">{schedule.reason}</p>
            </div>
          ) : null}

          <div>
            <p className="mb-1 font-medium">Affected Areas ({schedule.areas.length})</p>
            <div className="flex flex-wrap gap-1.5">
              {schedule.areas.map((a) => (
                <Badge key={a.id} variant="secondary">{a.name}</Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground">
            <p>Created by {schedule.createdBy?.name ?? "—"}</p>
            {schedule.approvedBy ? <p>Approved by {schedule.approvedBy.name}</p> : null}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}