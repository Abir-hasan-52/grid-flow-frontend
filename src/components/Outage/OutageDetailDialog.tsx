"use client";

import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useGetOutageById } from "@/hooks";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  outageId: string | null;
}

export default function OutageDetailDialog({ open, onOpenChange, outageId }: Props) {
  const { data, isPending } = useGetOutageById(outageId ?? "", open && !!outageId);
  const outage = data?.data;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{outage?.feeder.name ?? "Outage Details"}</DialogTitle>
          {outage ? (
            <DialogDescription  >
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <Badge variant="outline">{outage.feeder.substation?.powerZone?.name}</Badge>
                <Badge>{outage.status}</Badge>
                <span className="text-xs text-muted-foreground">
                  Reported {new Date(outage.createdAt).toLocaleString()}
                </span>
              </div>
            </DialogDescription>
          ) : null}
        </DialogHeader>

        {isPending ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : (
          <div className="space-y-3">
            <p className="text-sm font-medium">
              Customer Reports ({outage?.reports.length ?? 0})
            </p>
            {outage?.reports.length ? (
              outage.reports.map((r) => (
                <div key={r.id} className="rounded-md border p-3 text-sm">
                  <p className="font-medium">{r.customer?.name}</p>
                  <p className="text-xs text-muted-foreground">{r.customer?.email}</p>
                  {r.description ? <p className="mt-1">{r.description}</p> : null}
                  <p className="mt-1 text-xs text-muted-foreground">
                    {new Date(r.createdAt).toLocaleString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No customer reports on this outage.</p>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}