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
//   useCreateFeeder,
//   useUpdateFeeder,
// } from "@/hooks/infrastructure";

import type {
  Feeder,
  Substation,
} from "@/types";
import { useCreateFeeder, useUpdateFeeder } from "@/hooks";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  feeder: Feeder | null;
  substations: Substation[];
}

export default function FeederDialog({
  open,
  onOpenChange,
  feeder,
  substations,
}: Props) {
  const [name, setName] = useState("");
  const [substationId, setSubstationId] =
    useState("");

  const createMutation = useCreateFeeder();
  const updateMutation = useUpdateFeeder();

  const editing = !!feeder;

  useEffect(() => {
    setName(feeder?.name ?? "");
    setSubstationId(feeder?.substationId ?? "");
  }, [feeder]);

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const trimmedName = name.trim();

    if (trimmedName.length < 2 || !substationId) {
      return;
    }

    if (editing) {
      updateMutation.mutate(
        {
          id: feeder.id,
          payload: {
            name: trimmedName,
            substationId,
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
        substationId,
      },
      {
        onSuccess: () => {
          onOpenChange(false);
          setName("");
          setSubstationId("");
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
                ? "Edit Feeder"
                : "Create Feeder"}
            </DialogTitle>

            <DialogDescription>
              {editing
                ? "Update feeder information."
                : "Create a new feeder under a substation."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-5">
            <Input
              placeholder="Feeder name"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
            />

            <Select
              value={substationId}
              onValueChange={(value) =>
                setSubstationId(value ?? "")
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select substation" />
              </SelectTrigger>

              <SelectContent>
                {substations.map((substation) => (
                  <SelectItem
                    key={substation.id}
                    value={substation.id}
                  >
                    {substation.name}
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
                !substationId
              }
            >
              {isPending
                ? "Saving..."
                : editing
                  ? "Update Feeder"
                  : "Create Feeder"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}