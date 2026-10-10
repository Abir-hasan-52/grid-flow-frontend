"use client";

import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import type { JobPost } from "@/types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobPost: JobPost | null;
}

export default function JobPostDetailDialog({ open, onOpenChange, jobPost }: Props) {
  if (!jobPost) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{jobPost.title}</DialogTitle>
          <DialogDescription  >
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <Badge variant="outline">{jobPost.powerZone?.name ?? "All Zones"}</Badge>
              {jobPost.salary ? <Badge variant="secondary">৳{jobPost.salary}</Badge> : null}
              {jobPost.workingHours ? <Badge variant="secondary">{jobPost.workingHours}</Badge> : null}
              <span className="text-xs text-muted-foreground">
                Deadline: {new Date(jobPost.deadline).toLocaleDateString()}
              </span>
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 text-sm leading-relaxed">
          <div>
            <p className="mb-1 font-medium">Description</p>
            <p className="whitespace-pre-wrap text-muted-foreground">{jobPost.description}</p>
          </div>

          {jobPost.requirements ? (
            <div>
              <p className="mb-1 font-medium">Requirements</p>
              <p className="whitespace-pre-wrap text-muted-foreground">{jobPost.requirements}</p>
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}