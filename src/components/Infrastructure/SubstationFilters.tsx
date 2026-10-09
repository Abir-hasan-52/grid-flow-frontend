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
  SubstationSortBy,
  Zone,
} from "@/types";

interface Props {
  search: string;
  powerZoneId?: string;
  sortBy: SubstationSortBy;
  sortOrder: SortOrder;
  zones: Zone[];

  onSearchChange: (value: string) => void;
  onPowerZoneChange: (value?: string) => void;
  onSortByChange: (value: SubstationSortBy) => void;
  onSortOrderChange: (value: SortOrder) => void;
}

export default function SubstationFilters({
  search,
  powerZoneId,
  sortBy,
  sortOrder,
  zones,
  onSearchChange,
  onPowerZoneChange,
  onSortByChange,
  onSortOrderChange,
}: Props) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row">
      <Input
        placeholder="Search substations..."
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        className="lg:max-w-sm"
      />

      <Select
        value={powerZoneId ?? "ALL"}
        onValueChange={(value) =>
          onPowerZoneChange(value === "ALL" ? undefined : value ?? undefined)
        }
      >
        <SelectTrigger className="w-full lg:w-[190px]">
          <SelectValue placeholder="Power Zone" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="ALL">All Power Zones</SelectItem>

          {zones.map((zone) => (
            <SelectItem key={zone.id} value={zone.id}>
              {zone.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={sortBy}
        onValueChange={(value) =>
          onSortByChange(value as SubstationSortBy)
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