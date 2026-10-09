"use client";

import type { PaginationMeta } from "@/types";
import { Button } from "../ui/button";

 
interface Props {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
}

export default function InfrastructurePagination({
  meta,
  onPageChange,
}: Props) {
  const start =
    meta.total === 0 ? 0 : (meta.page - 1) * meta.limit + 1;

  const end = Math.min(meta.page * meta.limit, meta.total);

  return (
    <div className="flex flex-col gap-3 border-t px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">
        Showing {start}–{end} of {meta.total}
      </p>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={meta.page <= 1}
          onClick={() => onPageChange(meta.page - 1)}
        >
          Previous
        </Button>

        <span className="min-w-24 text-center text-sm">
          Page {meta.page} of {meta.totalPages}
        </span>

        <Button
          variant="outline"
          size="sm"
          disabled={meta.page >= meta.totalPages}
          onClick={() => onPageChange(meta.page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}