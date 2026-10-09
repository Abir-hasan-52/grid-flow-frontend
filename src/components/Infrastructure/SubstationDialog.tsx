"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// import {
//   useCreateSubstation,
//   useUpdateSubstation,
// } from "@/hooks/infrastructure";

import type {
  Substation,
  Zone,
} from "@/types";
import { useCreateSubstation, useUpdateSubstation } from "@/hooks";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  substation: Substation | null;
  zones: Zone[];
}

export default function SubstationDialog({
  open,
  onOpenChange,
  substation,
  zones,
}: Props) {
  const [name, setName] = useState("");
  const [powerZoneId, setPowerZoneId] = useState("");

  const createMutation = useCreateSubstation();
  const updateMutation = useUpdateSubstation();

  const editing = !!substation;

  useEffect(() => {
    setName(substation?.name ?? "");
    setPowerZoneId(substation?.powerZoneId ?? "");
  }, [substation]);

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const trimmedName = name.trim();

    if (trimmedName.length < 2 || !powerZoneId) {
      return;
    }

    if (editing) {
      updateMutation.mutate(
        {
          id: substation.id,
          payload: {
            name: trimmedName,
            powerZoneId,
          },
        },
        {
          onSuccess: () => onOpenChange(false),
        },
      );

      return;
    }

    createMutation.mutate(
      {
        name: trimmedName,
        powerZoneId,
      },
      {
        onSuccess: () => {
          onOpenChange(false);
          setName("");
          setPowerZoneId("");
        },
      },
    );
  };

  const isPending =
    createMutation.isPending ||
    updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {editing
                ? "Edit Substation"
                : "Create Substation"}
            </DialogTitle>

            <DialogDescription>
              {editing
                ? "Update substation information."
                : "Create a new substation under a power zone."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-5">
            <Input
              placeholder="Substation name"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
            />

            <Select
              value={powerZoneId}
              onValueChange={(value) =>
                setPowerZoneId(value ?? "")
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select power zone" />
              </SelectTrigger>

              <SelectContent>
                {zones.map((zone) => (
                  <SelectItem
                    key={zone.id}
                    value={zone.id}
                  >
                    {zone.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={
                isPending ||
                name.trim().length < 2 ||
                !powerZoneId
              }
            >
              {isPending
                ? "Saving..."
                : editing
                  ? "Update Substation"
                  : "Create Substation"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}