"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
 

import type {
  SortOrder,
  ZoneSortBy,
} from "@/types";

interface Props {
  search: string;
  sortBy: ZoneSortBy;
  sortOrder: SortOrder;
  onSearchChange: (value: string) => void;
  onSortByChange: (value: ZoneSortBy) => void;
  onSortOrderChange: (value: SortOrder) => void;
}

export default function ZoneFilters({
  search,
  sortBy,
  sortOrder,
  onSearchChange,
  onSortByChange,
  onSortOrderChange,
}: Props) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row">
      <Input
        placeholder="Search zones..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="lg:max-w-sm"
      />

      <Select
        value={sortBy}
        onValueChange={(value) =>
          onSortByChange(value as ZoneSortBy)
        }
      >
        <SelectTrigger className="w-full lg:w-[160px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="createdAt">Created Date</SelectItem>
          <SelectItem value="name">Name</SelectItem>
          <SelectItem value="updatedAt">Updated Date</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={sortOrder}
        onValueChange={(value) =>
          onSortOrderChange(value as SortOrder)
        }
      >
        <SelectTrigger className="w-full lg:w-[150px]">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="desc">Descending</SelectItem>
          <SelectItem value="asc">Ascending</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}