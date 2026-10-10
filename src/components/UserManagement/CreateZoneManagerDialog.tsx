"use client";

import { useState } from "react";
import {
  Dialog, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { UserPlus } from "lucide-react";
import { useCreateZoneManager, useGetAllZones } from "@/hooks";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function CreateZoneManagerDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [managedZoneId, setManagedZoneId] = useState("");

  const mutation = useCreateZoneManager();
  const { data: zoneData } = useGetAllZones({ page: 1, limit: 100, sortBy: "name", sortOrder: "asc" });
  const zones = zoneData?.data ?? [];

  const canSubmit =
    name.trim().length >= 2 && emailPattern.test(email.trim()) && !!managedZoneId;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) return;

    mutation.mutate(
      { name: name.trim(), email: email.trim().toLowerCase(), managedZoneId },
      {
        onSuccess: () => {
          setOpen(false);
          setName("");
          setEmail("");
          setManagedZoneId("");
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button />}>
        <UserPlus /> New Zone Manager
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create Zone Manager Account</DialogTitle>
            <DialogDescription>
              Login credentials will be emailed to this address.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-5">
            <Input
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Select value={managedZoneId} onValueChange={(value) => setManagedZoneId(value ?? "")}>
              <SelectTrigger>
                <SelectValue placeholder="Managed zone" />
              </SelectTrigger>
              <SelectContent>
                {zones.map((zone) => (
                  <SelectItem key={zone.id} value={zone.id}>
                    {zone.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!canSubmit || mutation.isPending}>
              {mutation.isPending ? "Creating..." : "Create Zone Manager"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}