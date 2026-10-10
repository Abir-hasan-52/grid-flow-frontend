"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useCloseOutage, useGetAllOutages, useVerifyOutage } from "@/hooks";
import type { Outage, OutageStatus } from "@/types";
import OutageTable from "./OutageTable";
import OutageDetailDialog from "./OutageDetailDialog";
// import ManualOutageDialog from "./ManualOutageDialog";
import InfrastructurePagination from "../Infrastructure/InfrastructurePagination";
import ManualOutageDialog from "./ManualOutageDialog";

export default function OutageSection() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<OutageStatus>();

  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { data, isPending } = useGetAllOutages({
    page, limit: 10, search: search || undefined, status,
  });

  const verifyMutation = useVerifyOutage();
  const closeMutation = useCloseOutage();

  const outages = data?.data ?? [];
  const meta = data?.meta;

  const handleVerify = (o: Outage) => {
    if (!window.confirm(`Verify outage on "${o.feeder.name}"? Affected customers will be notified.`)) return;
    verifyMutation.mutate(o.id);
  };

  const handleClose = (o: Outage) => {
    if (!window.confirm(`Close outage on "${o.feeder.name}"?`)) return;
    closeMutation.mutate(o.id);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Outages</h2>
          <p className="text-sm text-muted-foreground">
            Verify customer-reported outages and track restoration.
          </p>
        </div>
        <ManualOutageDialog />
      </div>

      <div className="flex flex-col gap-3 lg:flex-row">
        <Input
          placeholder="Search by feeder name..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="lg:max-w-sm"
        />
        <Select
          value={status ?? "ALL"}
          onValueChange={(v) => { setStatus(v === "ALL" ? undefined : (v as OutageStatus)); setPage(1); }}
        >
          <SelectTrigger className="w-full lg:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Statuses</SelectItem>
            <SelectItem value="REPORTED">Reported</SelectItem>
            <SelectItem value="VERIFIED">Verified</SelectItem>
            <SelectItem value="ASSIGNED">Assigned</SelectItem>
            <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
            <SelectItem value="RESTORED">Restored</SelectItem>
            <SelectItem value="CLOSED">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-hidden rounded-xl border bg-background">
        <OutageTable
          outages={outages}
          isPending={isPending}
          onView={(o) => { setSelectedId(o.id); setDetailOpen(true); }}
          onVerify={handleVerify}
          onClose={handleClose}
        />
        {meta && meta.totalPages > 0 && (
          <InfrastructurePagination meta={meta} onPageChange={setPage} />
        )}
      </div>

      <OutageDetailDialog open={detailOpen} onOpenChange={setDetailOpen} outageId={selectedId} />
    </div>
  );
}