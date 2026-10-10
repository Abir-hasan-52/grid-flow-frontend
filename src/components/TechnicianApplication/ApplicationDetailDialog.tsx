"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { TechnicianApplication } from "@/types";
import Link from "next/link";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  application: TechnicianApplication | null;
}

export default function ApplicationDetailDialog({
  open,
  onOpenChange,
  application,
}: Props) {
  if (!application) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{application.applicant?.name}</DialogTitle>
          <DialogDescription>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <Badge variant="outline">{application.jobPost.title}</Badge>
              <span className="text-xs text-muted-foreground">
                Applied {new Date(application.createdAt).toLocaleString()}
              </span>
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 text-sm">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p>{application.applicant?.email}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Phone</p>
              <p>{application.applicant?.phone ?? "—"}</p>
            </div>
          </div>

          {application.experience ? (
            <div>
              <p className="mb-1 font-medium">Experience</p>
              <p className="whitespace-pre-wrap text-muted-foreground">
                {application.experience}
              </p>
            </div>
          ) : null}

          {application.rejectionReason ? (
            <div className="rounded-md bg-destructive/10 p-3">
              <p className="mb-1 font-medium text-destructive">
                Rejection Reason
              </p>
              <p className="text-destructive">{application.rejectionReason}</p>
            </div>
          ) : null}

          <Button
            variant="outline"
            className="w-full"
            render={
              <Link
                href={application.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Resume
              </Link>
            }
          ></Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
