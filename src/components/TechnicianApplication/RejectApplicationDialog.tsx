"use client";

import { useState } from "react";
import {
  Dialog, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRejectApplication } from "@/hooks";
import type { TechnicianApplication } from "@/types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  application: TechnicianApplication | null;
}

export default function RejectApplicationDialog({ open, onOpenChange, application }: Props) {
  const [reason, setReason] = useState("");
  const mutation = useRejectApplication();

  const canSubmit = reason.trim().length >= 5;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!application || !canSubmit) return;

    mutation.mutate(
      { id: application.id, rejectionReason: reason.trim() },
      { onSuccess: () => { onOpenChange(false); setReason(""); } },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Reject Application</DialogTitle>
            <DialogDescription>
              This reason will be emailed to {application?.applicant?.name}.
            </DialogDescription>
          </DialogHeader>

          <div className="py-5">
            <Textarea
              placeholder="Reason for rejection (min 5 characters)"
              rows={4}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="destructive" disabled={!canSubmit || mutation.isPending}>
              {mutation.isPending ? "Rejecting..." : "Reject"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}