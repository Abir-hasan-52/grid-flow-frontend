"use client";

import { CheckCircle2, Eye, MoreHorizontal, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import type { Outage, OutageStatus } from "@/types";

const statusVariant: Record<OutageStatus, "default" | "outline" | "secondary" | "destructive"> = {
  REPORTED: "outline",
  VERIFIED: "secondary",
  ASSIGNED: "secondary",
  IN_PROGRESS: "destructive",
  RESTORED: "default",
  CLOSED: "default",
};

interface Props {
  outages: Outage[];
  isPending: boolean;
  onView: (o: Outage) => void;
  onVerify: (o: Outage) => void;
  onClose: (o: Outage) => void;
}

export default function OutageTable({ outages, isPending, onView, onVerify, onClose }: Props) {
  if (isPending) {
    return (
      <div className="flex h-60 items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading outages...</p>
      </div>
    );
  }

  if (!outages.length) {
    return (
      <div className="flex h-60 items-center justify-center">
        <p className="text-sm text-muted-foreground">No outages found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Feeder</TableHead>
            <TableHead>Zone</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Reports</TableHead>
            <TableHead>Reported</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {outages.map((o) => (
            <TableRow key={o.id}>
              <TableCell className="font-medium">{o.feeder.name}</TableCell>
              <TableCell>{o.feeder.substation?.powerZone?.name ?? "—"}</TableCell>
              <TableCell><Badge variant={statusVariant[o.status]}>{o.status}</Badge></TableCell>
              <TableCell>{o._count?.reports ?? 0}</TableCell>
              <TableCell>{new Date(o.createdAt).toLocaleDateString()}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger render={<Button variant="ghost" size="icon" />}>
                    <MoreHorizontal />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onView(o)}>
                      <Eye /> View
                    </DropdownMenuItem>
                    {o.status === "REPORTED" ? (
                      <DropdownMenuItem onClick={() => onVerify(o)}>
                        <CheckCircle2 /> Verify
                      </DropdownMenuItem>
                    ) : null}
                    {o.status === "RESTORED" ? (
                      <DropdownMenuItem onClick={() => onClose(o)}>
                        <XCircle /> Close
                      </DropdownMenuItem>
                    ) : null}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}