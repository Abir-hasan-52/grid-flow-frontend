"use client";

import { useState } from "react";
import {
  Dialog, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { useReportOutage } from "@/hooks";

export default function ReportOutageDialog() {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");
  const mutation = useReportOutage();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate(
      { description: description.trim() || undefined },
      { onSuccess: () => { setOpen(false); setDescription(""); } },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="destructive" />}>
        <Zap /> Report Outage
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Report a Power Outage</DialogTitle>
            <DialogDescription>
              We&apos;ll use your registered area to locate the affected feeder.
            </DialogDescription>
          </DialogHeader>

          <div className="py-5">
            <Textarea
              placeholder="Describe what you're experiencing (optional)"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Submitting..." : "Submit Report"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}