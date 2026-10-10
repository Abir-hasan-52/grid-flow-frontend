"use client";

import { useState } from "react";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { JobPost } from "@/types";
import ApplyJobDialog from "../TechnicianApplication/ApplyJobDialog";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobPost: JobPost | null;
  showApplyButton?: boolean; // true on the customer-facing public listing
}

export default function JobPostDetailDialog({
  open,
  onOpenChange,
  jobPost,
  showApplyButton = false,
}: Props) {
  const [applyOpen, setApplyOpen] = useState(false);

  if (!jobPost) return null;

  const isExpired = new Date(jobPost.deadline) <= new Date();
  const canApply = showApplyButton && jobPost.status === "PUBLISHED" && !isExpired;

  return (
    <>
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

          {canApply ? (
            <Button className="mt-2 w-full" onClick={() => setApplyOpen(true)}>
              Apply Now
            </Button>
          ) : showApplyButton && isExpired ? (
            <p className="mt-2 text-center text-sm text-muted-foreground">
              The application deadline for this job post has passed.
            </p>
          ) : null}
        </DialogContent>
      </Dialog>

      <ApplyJobDialog
        open={applyOpen}
        onOpenChange={setApplyOpen}
        jobPostId={jobPost.id}
        jobTitle={jobPost.title}
      />
    </>
  );
}