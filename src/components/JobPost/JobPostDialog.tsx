"use client";

import { useEffect, useState } from "react";
import {
  Dialog, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useCreateJobPost, useGetAllZones, useUpdateJobPost } from "@/hooks";
import type { JobPost } from "@/types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobPost: JobPost | null;
}

function toDateInputValue(iso?: string) {
  if (!iso) return "";
  return new Date(iso).toISOString().slice(0, 10);
}

export default function JobPostDialog({ open, onOpenChange, jobPost }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [deadline, setDeadline] = useState("");
  const [salary, setSalary] = useState("");
  const [workingHours, setWorkingHours] = useState("");
  const [powerZoneId, setPowerZoneId] = useState("");

  const createMutation = useCreateJobPost();
  const updateMutation = useUpdateJobPost();
  const { data: zoneData } = useGetAllZones({ page: 1, limit: 100, sortBy: "name", sortOrder: "asc" });
  const zones = zoneData?.data ?? [];

  const editing = !!jobPost;

  useEffect(() => {
    setTitle(jobPost?.title ?? "");
    setDescription(jobPost?.description ?? "");
    setRequirements(jobPost?.requirements ?? "");
    setDeadline(toDateInputValue(jobPost?.deadline));
    setSalary(jobPost?.salary != null ? String(jobPost.salary) : "");
    setWorkingHours(jobPost?.workingHours ?? "");
    setPowerZoneId(jobPost?.powerZoneId ?? "");
  }, [jobPost ]);

  const canSubmit =
    title.trim().length >= 2 &&
    description.trim().length >= 10 &&
    (!!deadline && new Date(deadline) > new Date());

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) return;

    const payload = {
      title: title.trim(),
      description: description.trim(),
      requirements: requirements.trim() || undefined,
      deadline: new Date(deadline).toISOString(),
      salary: salary ? Number(salary) : undefined,
      workingHours: workingHours.trim() || undefined,
      powerZoneId: powerZoneId || undefined,
    };

    if (editing) {
      updateMutation.mutate(
        { id: jobPost.id, payload },
        { onSuccess: () => onOpenChange(false) },
      );
      return;
    }

    createMutation.mutate(payload, {
      onSuccess: () => {
        onOpenChange(false);
        setTitle("");
        setDescription("");
        setRequirements("");
        setDeadline("");
        setSalary("");
        setWorkingHours("");
        setPowerZoneId("");
      },
    });
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Job Post" : "Create Job Post"}</DialogTitle>
            <DialogDescription>
              Leave zone empty to make this open to all zones.
            </DialogDescription>
          </DialogHeader>

          <div className="max-h-[60vh] space-y-4 overflow-y-auto py-5">
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Textarea
              placeholder="Description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Textarea
              placeholder="Requirements (optional)"
              rows={3}
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
            />

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label htmlFor="deadline" className="text-sm text-muted-foreground">Deadline</label>
                <Input
                  id="deadline"
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="salary" className="text-sm text-muted-foreground">Salary (optional)</label>
                <Input
                  id="salary"
                  type="number"
                  placeholder="e.g. 25000"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                />
              </div>
            </div>

            <Input
              placeholder="Working hours (optional, e.g. 9am - 5pm)"
              value={workingHours}
              onChange={(e) => setWorkingHours(e.target.value)}
            />

            <Select
              value={powerZoneId || "GLOBAL"}
              onValueChange={(v) => setPowerZoneId(!v || v === "GLOBAL" ? "" : v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Zone (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GLOBAL">All Zones</SelectItem>
                {zones.map((zone) => (
                  <SelectItem key={zone.id} value={zone.id}>{zone.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!canSubmit || isPending}>
              {isPending ? "Saving..." : editing ? "Save Changes" : "Create Draft"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}