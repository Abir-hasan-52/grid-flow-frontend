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
  AreaSortBy,
  Feeder,
  SortOrder,
} from "@/types";

interface Props {
  search: string;
  feederId?: string;
  sortBy: AreaSortBy;
  sortOrder: SortOrder;
  feeders: Feeder[];

  onSearchChange: (value: string) => void;
  onFeederChange: (value?: string) => void;
  onSortByChange: (value: AreaSortBy) => void;
  onSortOrderChange: (value: SortOrder) => void;
}

export default function AreaFilters({
  search,
  feederId,
  sortBy,
  sortOrder,
  feeders,
  onSearchChange,
  onFeederChange,
  onSortByChange,
  onSortOrderChange,
}: Props) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row">
      <Input
        placeholder="Search areas..."
        value={search}
        onChange={(event) =>
          onSearchChange(event.target.value)
        }
        className="lg:max-w-sm"
      />

      <Select
        value={feederId ?? "ALL"}
        onValueChange={(value) =>
          onFeederChange(
            value === "ALL" || value == null ? undefined : value,
          )
        }
      >
        <SelectTrigger className="w-full lg:w-[190px]">
          <SelectValue placeholder="Feeder" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="ALL">
            All Feeders
          </SelectItem>

          {feeders.map((feeder) => (
            <SelectItem
              key={feeder.id}
              value={feeder.id}
            >
              {feeder.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={sortBy}
        onValueChange={(value) =>
          onSortByChange(value as AreaSortBy)
        }
      >
        <SelectTrigger className="w-full lg:w-[160px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="createdAt">
            Created Date
          </SelectItem>

          <SelectItem value="name">
            Name
          </SelectItem>

          <SelectItem value="updatedAt">
            Updated Date
          </SelectItem>
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
          <SelectItem value="desc">
            Descending
          </SelectItem>

          <SelectItem value="asc">
            Ascending
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}