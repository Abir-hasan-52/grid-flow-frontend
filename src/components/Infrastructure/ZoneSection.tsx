"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

// import {
//   useDeleteZone,
//   useGetAllZones,
// } from "@/hooks/infrastructure";

// import type {
//   SortOrder,
//   Zone,
//   ZoneSortBy,
// } from "@/types/infrastructure";

import ZoneFilters from "./ZoneFilters";
import ZoneTable from "./ZoneTable";
import ZoneDialog from "./ZoneDialog";
import { SortOrder, Zone, ZoneSortBy } from "@/types";
import { useDeleteZone, useGetAllZones } from "@/hooks";
import InfrastructurePagination from "./InfrastructurePagination";
// import InfrastructurePagination from "../InfrastructurePagination";

export default function ZoneSection() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] =
    useState<ZoneSortBy>("createdAt");
  const [sortOrder, setSortOrder] =
    useState<SortOrder>("desc");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingZone, setEditingZone] =
    useState<Zone | null>(null);

  const { data, isPending } = useGetAllZones({
    page,
    limit,
    search: search || undefined,
    sortBy,
    sortOrder,
  });

  const deleteMutation = useDeleteZone();

  const zones = data?.data ?? [];
  const meta = data?.meta;

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleDelete = (zone: Zone) => {
    if (zone._count.substations > 0) {
      return;
    }

    if (!window.confirm(`Delete "${zone.name}"?`)) {
      return;
    }

    deleteMutation.mutate(zone.id);
  };

  const handleEdit = (zone: Zone) => {
    setEditingZone(zone);
    setDialogOpen(true);
  };

  const handleCreate = () => {
    setEditingZone(null);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">
            Zones
          </h2>

          <p className="text-sm text-muted-foreground">
            Manage power distribution zones.
          </p>
        </div>

        <Button onClick={handleCreate}>
          <Plus />
          Add Zone
        </Button>
      </div>

      <ZoneFilters
        search={search}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSearchChange={handleSearch}
        onSortByChange={(value) => {
          setSortBy(value);
          setPage(1);
        }}
        onSortOrderChange={(value) => {
          setSortOrder(value);
          setPage(1);
        }}
      />

      <div className="overflow-hidden rounded-xl border bg-background">
        <ZoneTable
          zones={zones}
          isPending={isPending}
          onView={() => {}}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {meta && meta.totalPages > 0 && (
          <InfrastructurePagination
            meta={meta}
            onPageChange={setPage}
          />
        )}
      </div>

      <ZoneDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        zone={editingZone}
      />
    </div>
  );
}