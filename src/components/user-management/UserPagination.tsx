"use client";

import { Button } from "@/components/ui/button";

interface UserPaginationProps {
  page: number;
  totalPage: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
}

export default function UserPagination({
  page,
  totalPage,
  total,
  limit,
  onPageChange,
}: UserPaginationProps) {
  const start =
    total === 0 ? 0 : (page - 1) * limit + 1;

  const end = Math.min(page * limit, total);

  return (
    <div className="flex flex-col gap-3 border-t px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Info */}
      <p className="text-sm text-muted-foreground">
        Showing {start}–{end} of {total} users
      </p>

      {/* Buttons */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </Button>

        <span className="min-w-20 text-center text-sm">
          Page {page} of {totalPage}
        </span>

        <Button
          variant="outline"
          size="sm"
          disabled={page >= totalPage}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}