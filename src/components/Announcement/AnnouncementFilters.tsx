"use client";

import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import type { AnnouncementStatus, AnnouncementType, Zone } from "@/types";

const ANNOUNCEMENT_TYPES: AnnouncementType[] = ["GENERAL", "MAINTENANCE", "EMERGENCY"];
const ANNOUNCEMENT_STATUSES: AnnouncementStatus[] = ["DRAFT", "PUBLISHED"];

interface Props {
  search: string;
  status?: AnnouncementStatus;
  type?: AnnouncementType;
  powerZoneId?: string;
  zones: Zone[];
  showZoneFilter: boolean;
  onSearchChange: (value: string) => void;
  onStatusChange: (value?: AnnouncementStatus) => void;
  onTypeChange: (value?: AnnouncementType) => void;
  onZoneChange: (value?: string) => void;
}

export default function AnnouncementFilters({
  search,
  status,
  type,
  powerZoneId,
  zones,
  showZoneFilter,
  onSearchChange,
  onStatusChange,
  onTypeChange,
  onZoneChange,
}: Props) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row">
      <Input
        placeholder="Search announcements..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="lg:max-w-sm"
      />

      <Select
        value={status ?? "ALL"}
        onValueChange={(v) => onStatusChange(v === "ALL" ? undefined : (v as AnnouncementStatus))}
      >
        <SelectTrigger className="w-full lg:w-[150px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All Statuses</SelectItem>
          {ANNOUNCEMENT_STATUSES.map((s) => (
            <SelectItem key={s} value={s}>{s}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={type ?? "ALL"}
        onValueChange={(v) => onTypeChange(v === "ALL" ? undefined : (v as AnnouncementType))}
      >
        <SelectTrigger className="w-full lg:w-[150px]">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All Types</SelectItem>
          {ANNOUNCEMENT_TYPES.map((t) => (
            <SelectItem key={t} value={t}>{t}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {showZoneFilter ? (
        <Select
          value={powerZoneId ?? "ALL"}
          onValueChange={(v) => onZoneChange(v === "ALL" || v == null ? undefined : v)}
        >
          <SelectTrigger className="w-full lg:w-[190px]">
            <SelectValue placeholder="Zone" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Zones</SelectItem>
            {zones.map((zone) => (
              <SelectItem key={zone.id} value={zone.id}>{zone.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : null}
    </div>
  );
}