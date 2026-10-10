"use client";

import { CheckCircle2, Eye, MoreHorizontal, Pencil, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import type { LoadSheddingSchedule, ScheduleStatus } from "@/types";

const statusVariant: Record<ScheduleStatus, "default" | "outline" | "secondary" | "destructive"> = {
  PENDING: "outline",
  APPROVED: "secondary",
  ACTIVE: "default",
  CANCELLED: "destructive",
  COMPLETED: "default",
};

interface Props {
  schedules: LoadSheddingSchedule[];
  isPending: boolean;
  isAdmin: boolean;
  onView: (s: LoadSheddingSchedule) => void;
  onEdit: (s: LoadSheddingSchedule) => void;
  onApprove: (s: LoadSheddingSchedule) => void;
  onCancel: (s: LoadSheddingSchedule) => void;
}

export default function ScheduleTable({
  schedules, isPending, isAdmin, onView, onEdit, onApprove, onCancel,
}: Props) {
  if (isPending) {
    return (
      <div className="flex h-60 items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading schedules...</p>
      </div>
    );
  }

  if (!schedules.length) {
    return (
      <div className="flex h-60 items-center justify-center">
        <p className="text-sm text-muted-foreground">No schedules found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Zone</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Start</TableHead>
            <TableHead>End</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {schedules.map((s) => (
            <TableRow key={s.id}>
              <TableCell className="max-w-xs truncate font-medium">{s.title}</TableCell>
              <TableCell>{s.powerZone.name}</TableCell>
              <TableCell><Badge variant={statusVariant[s.status]}>{s.status}</Badge></TableCell>
              <TableCell>{new Date(s.startTime).toLocaleString()}</TableCell>
              <TableCell>{new Date(s.endTime).toLocaleString()}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger render={<Button variant="ghost" size="icon" />}>
                    <MoreHorizontal />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onView(s)}>
                      <Eye /> View
                    </DropdownMenuItem>

                    {s.status === "PENDING" ? (
                      <>
                        <DropdownMenuItem onClick={() => onEdit(s)}>
                          <Pencil /> Edit
                        </DropdownMenuItem>
                        {isAdmin ? (
                          <DropdownMenuItem onClick={() => onApprove(s)}>
                            <CheckCircle2 /> Approve
                          </DropdownMenuItem>
                        ) : null}
                      </>
                    ) : null}

                    {s.status === "PENDING" || s.status === "APPROVED" ? (
                      <DropdownMenuItem variant="destructive" onClick={() => onCancel(s)}>
                        <XCircle /> Cancel
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