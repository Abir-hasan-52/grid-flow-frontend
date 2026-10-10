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
import { useCreateAnnouncement, useUpdateAnnouncement } from "@/hooks";
import type { Announcement, AnnouncementType, Zone } from "@/types";

const ANNOUNCEMENT_TYPES: AnnouncementType[] = ["GENERAL", "MAINTENANCE", "EMERGENCY"];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  announcement: Announcement | null;
  zones: Zone[];
  allowZoneSelect: boolean; // true for ADMIN, false for ZONE_MANAGER
}

export default function AnnouncementDialog({
  open,
  onOpenChange,
  announcement,
  zones,
  allowZoneSelect,
}: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState<AnnouncementType>("GENERAL");
  const [powerZoneId, setPowerZoneId] = useState<string>("");

  const createMutation = useCreateAnnouncement();
  const updateMutation = useUpdateAnnouncement();

  const editing = !!announcement;

  useEffect(() => {
    setTitle(announcement?.title ?? "");
    setContent(announcement?.content ?? "");
    setType(announcement?.type ?? "GENERAL");
    setPowerZoneId(announcement?.powerZoneId ?? "");
  }, [announcement]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (trimmedTitle.length < 2 || trimmedContent.length < 10) return;

    const basePayload = {
      title: trimmedTitle,
      content: trimmedContent,
      type,
      ...(allowZoneSelect && powerZoneId ? { powerZoneId } : {}),
    };

    if (editing) {
      updateMutation.mutate(
        { id: announcement.id, payload: basePayload },
        { onSuccess: () => onOpenChange(false) },
      );
      return;
    }

    createMutation.mutate(basePayload, {
      onSuccess: () => {
        onOpenChange(false);
        setTitle("");
        setContent("");
        setType("GENERAL");
        setPowerZoneId("");
      },
    });
  };

  const isPending = createMutation.isPending || updateMutation.isPending;
  const canSubmit = title.trim().length >= 2 && content.trim().length >= 10;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Announcement" : "Create Announcement"}
            </DialogTitle>
            <DialogDescription>
              {editing
                ? "Update this draft announcement."
                : allowZoneSelect
                  ? "Leave zone empty to broadcast to all customers."
                  : "This will be scoped to your assigned zone."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-5">
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <Textarea
              placeholder="Content"
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <Select value={type} onValueChange={(v) => setType(v as AnnouncementType)}>
              <SelectTrigger>
                <SelectValue placeholder="Announcement type" />
              </SelectTrigger>
              <SelectContent>
                {ANNOUNCEMENT_TYPES.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {allowZoneSelect ? (
              <Select
                value={powerZoneId || "GLOBAL"}
                onValueChange={(v) => setPowerZoneId(v === "GLOBAL" || v == null ? "" : v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Zone (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GLOBAL">All Zones (Global)</SelectItem>
                  {zones.map((zone) => (
                    <SelectItem key={zone.id} value={zone.id}>
                      {zone.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : null}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending || !canSubmit}>
              {isPending ? "Saving..." : editing ? "Save Changes" : "Create Draft"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}