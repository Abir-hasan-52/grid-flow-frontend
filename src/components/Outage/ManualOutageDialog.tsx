"use client";

import { useState } from "react";
import {
  Dialog, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useCreateManualOutage, useGetAllFeeders } from "@/hooks";

export default function ManualOutageDialog() {
  const [open, setOpen] = useState(false);
  const [feederId, setFeederId] = useState("");

  const mutation = useCreateManualOutage();
  const { data: feederData } = useGetAllFeeders({ page: 1, limit: 100, sortBy: "name", sortOrder: "asc" });
  const feeders = feederData?.data ?? [];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!feederId) return;

    mutation.mutate(
      { feederId },
      { onSuccess: () => { setOpen(false); setFeederId(""); } },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button />}>
        <Plus /> Report Manual Outage
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create Manual Outage</DialogTitle>
            <DialogDescription>
              This creates the outage as already VERIFIED and notifies affected customers immediately.
            </DialogDescription>
          </DialogHeader>

          <div className="py-5">
            <Select value={feederId} onValueChange={(value) => setFeederId(value ?? "")}>
              <SelectTrigger>
                <SelectValue placeholder="Select feeder" />
              </SelectTrigger>
              <SelectContent>
                {feeders.map((feeder) => (
                  <SelectItem key={feeder.id} value={feeder.id}>{feeder.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!feederId || mutation.isPending}>
              {mutation.isPending ? "Creating..." : "Create & Notify"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}