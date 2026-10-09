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

import {
  useCreateArea,
  useUpdateArea,
} from "@/hooks";
import { Area, Feeder } from "@/types";

 
interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  area: Area | null;
  feeders: Feeder[];
}

export default function AreaDialog({
  open,
  onOpenChange,
  area,
  feeders,
}: Props) {
  const [name, setName] = useState("");
  const [feederId, setFeederId] = useState("");

  const createMutation = useCreateArea();
  const updateMutation = useUpdateArea();

  const editing = !!area;

  useEffect(() => {
    setName(area?.name ?? "");
    setFeederId(area?.feederId ?? "");
  }, [area]);

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const trimmedName = name.trim();

    if (trimmedName.length < 2 || !feederId) {
      return;
    }

    if (editing) {
      updateMutation.mutate(
        {
          id: area.id,
          payload: {
            name: trimmedName,
            feederId,
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
        feederId,
      },
      {
        onSuccess: () => {
          onOpenChange(false);
          setName("");
          setFeederId("");
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
                ? "Edit Area"
                : "Create Area"}
            </DialogTitle>

            <DialogDescription>
              {editing
                ? "Update area information."
                : "Create a new area under a feeder."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-5">
            <Input
              placeholder="Area name"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
            />

            <Select
              value={feederId}
              onValueChange={(value) => setFeederId(value ?? "")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select feeder" />
              </SelectTrigger>

              <SelectContent>
                {feeders.map((feeder) => (
                  <SelectItem
                    key={feeder.id}
                    value={feeder.id}
                  >
                    {feeder.name}
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
                !feederId
              }
            >
              {isPending
                ? "Saving..."
                : editing
                  ? "Update Area"
                  : "Create Area"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}