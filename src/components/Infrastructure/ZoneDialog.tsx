"use client";

import { useEffect, useState } from "react";
import {
  Dialog, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateZone, useUpdateZone } from "@/hooks";
import { Zone } from "@/types";
import { createZoneSchema, updateZoneSchema } from "@/validation";
// import { createZoneSchema, updateZoneSchema } from "@/lib/validations/infrastructure.validation";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  zone: Zone | null;
}

export default function ZoneDialog({ open, onOpenChange, zone }: Props) {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const createMutation = useCreateZone();
  const updateMutation = useUpdateZone();
  const editing = !!zone;

  useEffect(() => {
    setName(zone?.name ?? "");
    setError(null);
  }, [zone ]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const schema = editing ? updateZoneSchema : createZoneSchema;
    const result = schema.safeParse({ name: name.trim() });

    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Invalid input");
      return;
    }
    setError(null);

    if (editing) {
      updateMutation.mutate(
        { id: zone.id, payload: result.data },
        { onSuccess: () => onOpenChange(false) },
      );
      return;
    }

    createMutation.mutate({ name: result.data.name ?? name.trim() }, {
      onSuccess: () => {
        onOpenChange(false);
        setName("");
      },
    });
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Zone" : "Create Zone"}</DialogTitle>
            <DialogDescription>
              {editing ? "Update the zone information." : "Create a new power distribution zone."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2 py-5">
            <Input
              placeholder="Zone name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : editing ? "Update Zone" : "Create Zone"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}