"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

 

import type {
  Area,
  AreaSortBy,
  SortOrder,
} from "@/types";

import AreaFilters from "./AreaFilters";
import AreaTable from "./AreaTable";
import AreaDialog from "./AreaDialog";
import { useDeleteArea, useGetAllAreas, useGetAllFeeders } from "@/hooks";
import InfrastructurePagination from "./InfrastructurePagination";
 

export default function AreaSection() {
  const [page, setPage] = useState(1);

  const limit = 10;

  const [search, setSearch] = useState("");
  const [feederId, setFeederId] =
    useState<string>();

  const [sortBy, setSortBy] =
    useState<AreaSortBy>("createdAt");

  const [sortOrder, setSortOrder] =
    useState<SortOrder>("desc");

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [editingArea, setEditingArea] =
    useState<Area | null>(null);

  const { data, isPending } =
    useGetAllAreas({
      page,
      limit,
      search: search || undefined,
      feederId,
      sortBy,
      sortOrder,
    });

  const { data: feederData } =
    useGetAllFeeders({
      page: 1,
      limit: 100,
      sortBy: "name",
      sortOrder: "asc",
    });

  const deleteMutation =
    useDeleteArea();

  const areas = data?.data ?? [];
  const meta = data?.meta;

  const feeders =
    feederData?.data ?? [];

  const handleDelete = (area: Area) => {
    if (area._count.customers > 0) {
      window.alert(
        "Cannot delete an area that still has customers living in it.",
      );
      return;
    }

    if (
      !window.confirm(
        `Delete "${area.name}"?`,
      )
    ) {
      return;
    }

    deleteMutation.mutate(area.id);
  };

  const handleEdit = (area: Area) => {
    setEditingArea(area);
    setDialogOpen(true);
  };

  const handleCreate = () => {
    setEditingArea(null);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">
            Areas
          </h2>

          <p className="text-sm text-muted-foreground">
            Manage service areas under feeders.
          </p>
        </div>

        <Button onClick={handleCreate}>
          <Plus />
          Add Area
        </Button>
      </div>

      <AreaFilters
        search={search}
        feederId={feederId}
        sortBy={sortBy}
        sortOrder={sortOrder}
        feeders={feeders}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        onFeederChange={(value) => {
          setFeederId(value);
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
        <AreaTable
          areas={areas}
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

      <AreaDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        area={editingArea}
        feeders={feeders}
      />
    </div>
  );
}