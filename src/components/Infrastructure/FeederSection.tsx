"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

 

import type {
  Feeder,
  FeederSortBy,
  SortOrder,
} from "@/types";

import FeederFilters from "./FeederFilters";
import FeederTable from "./FeederTable";
import FeederDialog from "./FeederDialog";
import { useDeleteFeeder, useGetAllFeeders, useGetAllSubstations } from "@/hooks";
import InfrastructurePagination from "./InfrastructurePagination";
 

export default function FeederSection() {
  const [page, setPage] = useState(1);

  const limit = 10;

  const [search, setSearch] = useState("");
  const [substationId, setSubstationId] =
    useState<string>();

  const [sortBy, setSortBy] =
    useState<FeederSortBy>("createdAt");

  const [sortOrder, setSortOrder] =
    useState<SortOrder>("desc");

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [editingFeeder, setEditingFeeder] =
    useState<Feeder | null>(null);

  const { data, isPending } =
    useGetAllFeeders({
      page,
      limit,
      search: search || undefined,
      substationId,
      sortBy,
      sortOrder,
    });

  const { data: substationData } =
    useGetAllSubstations({
      page: 1,
      limit: 100,
      sortBy: "name",
      sortOrder: "asc",
    });

  const deleteMutation =
    useDeleteFeeder();

  const feeders = data?.data ?? [];
  const meta = data?.meta;

  const substations = substationData?.data ?? [];

  const handleDelete = (feeder: Feeder) => {
    if (feeder._count.areas > 0) {
      window.alert(
        "Cannot delete a feeder that still has active areas.",
      );
      return;
    }

    if (
      !window.confirm(
        `Delete "${feeder.name}"?`,
      )
    ) {
      return;
    }

    deleteMutation.mutate(feeder.id);
  };

  const handleEdit = (feeder: Feeder) => {
    setEditingFeeder(feeder);
    setDialogOpen(true);
  };

  const handleCreate = () => {
    setEditingFeeder(null);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">
            Feeders
          </h2>

          <p className="text-sm text-muted-foreground">
            Manage feeders under substations.
          </p>
        </div>

        <Button onClick={handleCreate}>
          <Plus />
          Add Feeder
        </Button>
      </div>

      <FeederFilters
        search={search}
        substationId={substationId}
        sortBy={sortBy}
        sortOrder={sortOrder}
        substations={substations}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        onSubstationChange={(value) => {
          setSubstationId(value);
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
        <FeederTable
          feeders={feeders}
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

      <FeederDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        feeder={editingFeeder}
        substations={substations}
      />
    </div>
  );
}