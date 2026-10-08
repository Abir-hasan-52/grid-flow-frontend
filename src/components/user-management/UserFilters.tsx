"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { SortOrder, UserRole, UserStatus } from "@/types";

interface UserFiltersProps {
  search: string;
  role?: UserRole;
  status?: UserStatus;
  sortOrder: SortOrder;

  onSearchChange: (value: string) => void;
  onRoleChange: (value?: UserRole) => void;
  onStatusChange: (value?: UserStatus) => void;
  onSortOrderChange: (value: SortOrder) => void;
}

export default function UserFilters({
  search,
  role,
  status,
  sortOrder,
  onSearchChange,
  onRoleChange,
  onStatusChange,
  onSortOrderChange,
}: UserFiltersProps) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
      {/* Search */}
      <Input
        placeholder="Search by name, email or phone..."
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        className="lg:max-w-sm"
      />

      {/* Role */}
      <Select
        value={role ?? "ALL"}
        onValueChange={(value) => {
          onRoleChange(
            value === "ALL"
              ? undefined
              : (value as UserRole)
          );
        }}
      >
        <SelectTrigger className="w-full lg:w-[170px]">
          <SelectValue placeholder="Role" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="ALL">All Roles</SelectItem>
          <SelectItem value="ADMIN">Admin</SelectItem>
          <SelectItem value="ZONE_MANAGER">
            Zone Manager
          </SelectItem>
          <SelectItem value="TECHNICIAN">
            Technician
          </SelectItem>
          <SelectItem value="CUSTOMER">
            Customer
          </SelectItem>
        </SelectContent>
      </Select>

      {/* Status */}
      <Select
        value={status ?? "ALL"}
        onValueChange={(value) => {
          onStatusChange(
            value === "ALL"
              ? undefined
              : (value as UserStatus)
          );
        }}
      >
        <SelectTrigger className="w-full lg:w-[160px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="ALL">All Status</SelectItem>
          <SelectItem value="ACTIVE">Active</SelectItem>
          <SelectItem value="SUSPENDED">
            Suspended
          </SelectItem>
          <SelectItem value="DELETED">
            Deleted
          </SelectItem>
        </SelectContent>
      </Select>

      {/* Sort Order */}
      <Select
        value={sortOrder}
        onValueChange={(value) =>
          onSortOrderChange(value as SortOrder)
        }
      >
        <SelectTrigger className="w-full lg:w-[150px]">
          <SelectValue placeholder="Order" />
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