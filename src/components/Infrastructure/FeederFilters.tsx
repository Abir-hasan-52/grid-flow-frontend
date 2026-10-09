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
  FeederSortBy,
  SortOrder,
  Substation,
} from "@/types";

interface Props {
  search: string;
  substationId?: string;
  sortBy: FeederSortBy;
  sortOrder: SortOrder;
  substations: Substation[];

  onSearchChange: (value: string) => void;
  onSubstationChange: (value?: string) => void;
  onSortByChange: (value: FeederSortBy) => void;
  onSortOrderChange: (value: SortOrder) => void;
}

export default function FeederFilters({
  search,
  substationId,
  sortBy,
  sortOrder,
  substations,
  onSearchChange,
  onSubstationChange,
  onSortByChange,
  onSortOrderChange,
}: Props) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row">
      <Input
        placeholder="Search feeders..."
        value={search}
        onChange={(event) =>
          onSearchChange(event.target.value)
        }
        className="lg:max-w-sm"
      />

      <Select
        value={substationId ?? "ALL"}
        onValueChange={(value) =>
          onSubstationChange(
            value === "ALL" ? undefined : value ?? undefined,
          )
        }
      >
        <SelectTrigger className="w-full lg:w-[190px]">
          <SelectValue placeholder="Substation" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="ALL">
            All Substations
          </SelectItem>

          {substations.map((substation) => (
            <SelectItem
              key={substation.id}
              value={substation.id}
            >
              {substation.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={sortBy}
        onValueChange={(value) =>
          onSortByChange(value as FeederSortBy)
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