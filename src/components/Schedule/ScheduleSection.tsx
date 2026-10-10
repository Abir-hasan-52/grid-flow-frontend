"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  useApproveSchedule, useCancelSchedule, useGetAllSchedules,
} from "@/hooks";
import type { LoadSheddingSchedule, ScheduleStatus } from "@/types";
import ScheduleDialog from "./ScheduleDialog";
import ScheduleTable from "./ScheduleTable";
import ScheduleDetailDialog from "./ScheduleDetailDialog";
import InfrastructurePagination from "../Infrastructure/InfrastructurePagination";

interface Props {
  isAdmin: boolean;
  currentUserZoneId?: string; // zone manager's managedZoneId
}

export default function ScheduleSection({ isAdmin, currentUserZoneId }: Props) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<ScheduleStatus>();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [editing, setEditing] = useState<LoadSheddingSchedule | null>(null);
  const [viewing, setViewing] = useState<LoadSheddingSchedule | null>(null);

  const { data, isPending } = useGetAllSchedules({
    page, limit: 10, search: search || undefined, status,
  });

  const approveMutation = useApproveSchedule();
  const cancelMutation = useCancelSchedule();

  const schedules = data?.data ?? [];
  const meta = data?.meta;

  const handleApprove = (s: LoadSheddingSchedule) => {
    if (!window.confirm(`Approve "${s.title}"? Affected customers will be notified.`)) return;
    approveMutation.mutate(s.id);
  };

  const handleCancel = (s: LoadSheddingSchedule) => {
    if (!window.confirm(`Cancel "${s.title}"?`)) return;
    cancelMutation.mutate(s.id);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Load Shedding Schedules</h2>
          <p className="text-sm text-muted-foreground">
            Plan and manage scheduled power outages by area.
          </p>
        </div>
        <Button onClick={() => { setEditing(null); setDialogOpen(true); }}>
          <Plus /> New Schedule
        </Button>
      </div>

      <div className="flex flex-col gap-3 lg:flex-row">
        <Input
          placeholder="Search schedules..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="lg:max-w-sm"
        />
        <Select
          value={status ?? "ALL"}
          onValueChange={(v) => { setStatus(v === "ALL" ? undefined : (v as ScheduleStatus)); setPage(1); }}
        >
          <SelectTrigger className="w-full lg:w-[160px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Statuses</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="APPROVED">Approved</SelectItem>
            <SelectItem value="ACTIVE">Active</SelectItem>
            <SelectItem value="CANCELLED">Cancelled</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-hidden rounded-xl border bg-background">
        <ScheduleTable
          schedules={schedules}
          isPending={isPending}
          isAdmin={isAdmin}
          onView={(s) => { setViewing(s); setDetailOpen(true); }}
          onEdit={(s) => { setEditing(s); setDialogOpen(true); }}
          onApprove={handleApprove}
          onCancel={handleCancel}
        />
        {meta && meta.totalPages > 0 && (
          <InfrastructurePagination meta={meta} onPageChange={setPage} />
        )}
      </div>

      <ScheduleDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        schedule={editing}
        allowZoneSelect={isAdmin}
        currentUserZoneId={currentUserZoneId}
      />
      <ScheduleDetailDialog open={detailOpen} onOpenChange={setDetailOpen} schedule={viewing} />
    </div>
  );
}