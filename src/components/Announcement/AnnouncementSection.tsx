"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useDeleteAnnouncement,
  useGetAllAnnouncements,
  useGetAllZones,
  usePublishAnnouncement,
} from "@/hooks";
import type {
  Announcement, AnnouncementStatus, AnnouncementType,
} from "@/types";
import AnnouncementFilters from "./AnnouncementFilters";
import AnnouncementTable from "./AnnouncementTable";
import AnnouncementDialog from "./AnnouncementDialog";
import AnnouncementDetailDialog from "./AnnouncementDetailDialog";
import InfrastructurePagination from "../Infrastructure/InfrastructurePagination";

interface Props {
  isAdmin: boolean; // ADMIN -> zone select + delete allowed; ZONE_MANAGER -> neither
}

export default function AnnouncementSection({ isAdmin }: Props) {
  const [page, setPage] = useState(1);
  const limit = 10;

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<AnnouncementStatus>();
  const [type, setType] = useState<AnnouncementType>();
  const [powerZoneId, setPowerZoneId] = useState<string>();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [viewingAnnouncement, setViewingAnnouncement] = useState<Announcement | null>(null);

  const { data, isPending } = useGetAllAnnouncements({
    page,
    limit,
    search: search || undefined,
    status,
    type,
    powerZoneId,
  });

  const { data: zoneData } = useGetAllZones({ page: 1, limit: 100, sortBy: "name", sortOrder: "asc" });

  const publishMutation = usePublishAnnouncement();
  const deleteMutation = useDeleteAnnouncement();

  const announcements = data?.data ?? [];
  const meta = data?.meta;
  const zones = zoneData?.data ?? [];

  const handlePublish = (a: Announcement) => {
    if (!window.confirm(`Publish "${a.title}"? This will email all relevant customers.`)) return;
    publishMutation.mutate(a.id);
  };

  const handleDelete = (a: Announcement) => {
    if (!window.confirm(`Delete "${a.title}"?`)) return;
    deleteMutation.mutate(a.id);
  };

  const handleEdit = (a: Announcement) => {
    setEditingAnnouncement(a);
    setDialogOpen(true);
  };

  const handleView = (a: Announcement) => {
    setViewingAnnouncement(a);
    setDetailOpen(true);
  };

  const handleCreate = () => {
    setEditingAnnouncement(null);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Announcements</h2>
          <p className="text-sm text-muted-foreground">
            Create drafts and publish notices to customers.
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus /> New Announcement
        </Button>
      </div>

      <AnnouncementFilters
        search={search}
        status={status}
        type={type}
        powerZoneId={powerZoneId}
        zones={zones}
        showZoneFilter={isAdmin}
        onSearchChange={(v) => { setSearch(v); setPage(1); }}
        onStatusChange={(v) => { setStatus(v); setPage(1); }}
        onTypeChange={(v) => { setType(v); setPage(1); }}
        onZoneChange={(v) => { setPowerZoneId(v); setPage(1); }}
      />

      <div className="overflow-hidden rounded-xl border bg-background">
        <AnnouncementTable
          announcements={announcements}
          isPending={isPending}
          canDelete={isAdmin}
          onView={handleView}
          onEdit={handleEdit}
          onPublish={handlePublish}
          onDelete={handleDelete}
        />

        {meta && meta.totalPages > 0 && (
          <InfrastructurePagination meta={meta} onPageChange={setPage} />
        )}
      </div>

      <AnnouncementDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        announcement={editingAnnouncement}
        zones={zones}
        allowZoneSelect={isAdmin}
      />

      <AnnouncementDetailDialog
        open={detailOpen}
        onOpenChange={setDetailOpen}
        announcement={viewingAnnouncement}
      />
    </div>
  );
}