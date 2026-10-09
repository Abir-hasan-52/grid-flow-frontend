"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

// import {
//   useDeleteSubstation,
//   useGetAllSubstations,
//   useGetAllZones,
// } from "@/hooks/infrastructure";

import type {
  SortOrder,
  Substation,
  SubstationSortBy,
} from "@/types";

import SubstationFilters from "./SubstationFilters";
import SubstationTable from "./SubstationTable";
import SubstationDialog from "./SubstationDialog";
import { useDeleteSubstation, useGetAllSubstations, useGetAllZones } from "@/hooks";
import InfrastructurePagination from "./InfrastructurePagination";
// import InfrastructurePagination from "../InfrastructurePagination";

export default function SubstationSection() {
  const [page, setPage] = useState(1);

  const limit = 10;

  const [search, setSearch] = useState("");
  const [powerZoneId, setPowerZoneId] =
    useState<string>();

  const [sortBy, setSortBy] =
    useState<SubstationSortBy>("createdAt");

  const [sortOrder, setSortOrder] =
    useState<SortOrder>("desc");

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [editingSubstation, setEditingSubstation] =
    useState<Substation | null>(null);

  const { data, isPending } =
    useGetAllSubstations({
      page,
      limit,
      search: search || undefined,
      powerZoneId,
      sortBy,
      sortOrder,
    });

  const { data: zoneData } =
    useGetAllZones({
      page: 1,
      limit: 100,
      sortBy: "name",
      sortOrder: "asc",
    });

  const deleteMutation =
    useDeleteSubstation();

 const substations = data?.data ?? [];
const meta = data?.meta;

  const zones = zoneData?.data ?? [];

  const handleDelete = (
    substation: Substation,
  ) => {
    if (substation._count.feeders > 0) {
      window.alert(
        "Cannot delete a substation that still has active feeders.",
      );
      return;
    }

    if (
      !window.confirm(
        `Delete "${substation.name}"?`,
      )
    ) {
      return;
    }

    deleteMutation.mutate(substation.id);
  };

  const handleEdit = (
    substation: Substation,
  ) => {
    setEditingSubstation(substation);
    setDialogOpen(true);
  };

  const handleCreate = () => {
    setEditingSubstation(null);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">
            Substations
          </h2>

          <p className="text-sm text-muted-foreground">
            Manage substations under power zones.
          </p>
        </div>

        <Button onClick={handleCreate}>
          <Plus />
          Add Substation
        </Button>
      </div>

      <SubstationFilters
        search={search}
        powerZoneId={powerZoneId}
        sortBy={sortBy}
        sortOrder={sortOrder}
        zones={zones}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        onPowerZoneChange={(value) => {
          setPowerZoneId(value);
          setPage(1);
        }}
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
        <SubstationTable
          substations={substations}
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

      <SubstationDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        substation={editingSubstation}
        zones={zones}
      />
    </div>
  );
}