"use client";

import { useEffect, useState } from "react";
import {
  Dialog, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useCreateSchedule, useGetAllAreas, useGetAllZones, useUpdateSchedule } from "@/hooks";
import type { LoadSheddingSchedule } from "@/types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  schedule: LoadSheddingSchedule | null;
  allowZoneSelect: boolean; // true for ADMIN, false for ZONE_MANAGER
  currentUserZoneId?: string; // zone manager's own zone, used when allowZoneSelect is false
}

function toLocalInputValue(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function ScheduleDialog({
  open, onOpenChange, schedule, allowZoneSelect, currentUserZoneId,
}: Props) {
  const [title, setTitle] = useState("");
  const [reason, setReason] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [powerZoneId, setPowerZoneId] = useState("");
  const [areaIds, setAreaIds] = useState<string[]>([]);

  const editing = !!schedule;

  const createMutation = useCreateSchedule();
  const updateMutation = useUpdateSchedule();

  const { data: zoneData } = useGetAllZones({ page: 1, limit: 100, sortBy: "name", sortOrder: "asc" });
  const zones = zoneData?.data ?? [];

  const effectiveZoneId = allowZoneSelect ? powerZoneId : currentUserZoneId;

  const { data: areaData } = useGetAllAreas(
    { page: 1, limit: 200, sortBy: "name", sortOrder: "asc" },
  );
  const areas = areaData?.data ?? [];

  useEffect(() => {
    setTitle(schedule?.title ?? "");
    setReason(schedule?.reason ?? "");
    setStartTime(toLocalInputValue(schedule?.startTime));
    setEndTime(toLocalInputValue(schedule?.endTime));
    setPowerZoneId(schedule?.powerZoneId ?? "");
    setAreaIds(schedule?.areas.map((a) => a.id) ?? []);
  }, [schedule ]);

  const toggleArea = (id: string) => {
    setAreaIds((prev) => (prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]));
  };

  const canSubmit =
    title.trim().length >= 2 &&
    !!startTime &&
    !!endTime &&
    new Date(startTime) > new Date() &&
    new Date(endTime) > new Date(startTime) &&
    areaIds.length > 0 &&
    (!allowZoneSelect || !!powerZoneId || editing);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) return;

    if (editing) {
      updateMutation.mutate(
        {
          id: schedule.id,
          payload: {
            title: title.trim(),
            reason: reason.trim() || undefined,
            startTime: new Date(startTime).toISOString(),
            endTime: new Date(endTime).toISOString(),
            areaIds,
          },
        },
        { onSuccess: () => onOpenChange(false) },
      );
      return;
    }

    createMutation.mutate(
      {
        title: title.trim(),
        reason: reason.trim() || undefined,
        startTime: new Date(startTime).toISOString(),
        endTime: new Date(endTime).toISOString(),
        areaIds,
        ...(allowZoneSelect ? { powerZoneId } : {}),
      },
      {
        onSuccess: () => {
          onOpenChange(false);
          setTitle(""); setReason(""); setStartTime(""); setEndTime("");
          setPowerZoneId(""); setAreaIds([]);
        },
      },
    );
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Schedule" : "Create Load Shedding Schedule"}</DialogTitle>
            <DialogDescription>
              {editing
                ? "Only PENDING schedules can be edited."
                : "New schedules start as PENDING and need admin approval."}
            </DialogDescription>
          </DialogHeader>

          <div className="max-h-[65vh] space-y-4 overflow-y-auto py-5">
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Textarea
              placeholder="Reason (optional)"
              rows={2}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label htmlFor="schedule-start-time" className="text-sm text-muted-foreground">Start Time</label>
                <Input
                  id="schedule-start-time"
                  type="datetime-local"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="schedule-end-time" className="text-sm text-muted-foreground">End Time</label>
                <Input
                  id="schedule-end-time"
                  type="datetime-local"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
            </div>

            {allowZoneSelect && !editing ? (
              <Select value={powerZoneId} onValueChange={(v) => { setPowerZoneId(v ?? ""); setAreaIds([]); }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select zone" />
                </SelectTrigger>
                <SelectContent>
                  {zones.map((zone) => (
                    <SelectItem key={zone.id} value={zone.id}>{zone.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : null}

            <fieldset className="space-y-1.5">
              <legend className="text-sm text-muted-foreground">Affected Areas</legend>
              <div className="max-h-48 space-y-2 overflow-y-auto rounded-md border p-3">
                {areas.length ? (
                  areas.map((area) => (
                    <label
                      key={area.id}
                      htmlFor={`schedule-area-${area.id}`}
                      className="flex items-center gap-2 text-sm"
                    >
                      <Checkbox
                        id={`schedule-area-${area.id}`}
                        checked={areaIds.includes(area.id)}
                        onCheckedChange={() => toggleArea(area.id)}
                      />
                      {area.name}
                    </label>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {effectiveZoneId ? "No areas found for this zone." : "Select a zone first."}
                  </p>
                )}
              </div>
            </fieldset>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!canSubmit || isPending}>
              {isPending ? "Saving..." : editing ? "Save Changes" : "Create Schedule"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}