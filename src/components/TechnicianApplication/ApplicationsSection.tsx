"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useApproveApplication, useGetAllApplicationsAdmin } from "@/hooks";
import type { ApplicationStatus, TechnicianApplication } from "@/types";
import ApplicationTable from "./ApplicationTable";
import ApplicationDetailDialog from "./ApplicationDetailDialog";
import RejectApplicationDialog from "./RejectApplicationDialog";
import InfrastructurePagination from "../Infrastructure/InfrastructurePagination";

export default function ApplicationsSection() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<ApplicationStatus>();

  const [detailOpen, setDetailOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [selected, setSelected] = useState<TechnicianApplication | null>(null);

  const { data, isPending } = useGetAllApplicationsAdmin({
    page, limit: 10, search: search || undefined, status,
  });

  const approveMutation = useApproveApplication();

  const applications = data?.data ?? [];
  const meta = data?.meta;

  const handleApprove = (app: TechnicianApplication) => {
    if (!window.confirm(`Approve ${app.applicant?.name}'s application? They will be promoted to Technician.`)) return;
    approveMutation.mutate(app.id);
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">Technician Applications</h2>
        <p className="text-sm text-muted-foreground">
          Review and approve customer applications for job posts.
        </p>
      </div>

      <div className="flex flex-col gap-3 lg:flex-row">
        <Input
          placeholder="Search by applicant name/email..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="lg:max-w-sm"
        />
        <Select
          value={status ?? "ALL"}
          onValueChange={(v) => { setStatus(v === "ALL" ? undefined : (v as ApplicationStatus)); setPage(1); }}
        >
          <SelectTrigger className="w-full lg:w-[160px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Statuses</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="APPROVED">Approved</SelectItem>
            <SelectItem value="REJECTED">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-hidden rounded-xl border bg-background">
        <ApplicationTable
          applications={applications}
          isPending={isPending}
          onView={(a) => { setSelected(a); setDetailOpen(true); }}
          onApprove={handleApprove}
          onReject={(a) => { setSelected(a); setRejectOpen(true); }}
        />
        {meta && meta.totalPages > 0 && (
          <InfrastructurePagination meta={meta} onPageChange={setPage} />
        )}
      </div>

      <ApplicationDetailDialog open={detailOpen} onOpenChange={setDetailOpen} application={selected} />
      <RejectApplicationDialog open={rejectOpen} onOpenChange={setRejectOpen} application={selected} />
    </div>
  );
}