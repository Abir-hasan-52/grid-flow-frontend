"use client";

import { useState } from "react";

import { useGetAllUsers } from "@/hooks/user-management.hook";
import { SortOrder, UserRole, UserSortBy, UserStatus } from "@/types";
import UserFilters from "@/components/user-management/UserFilters";
import UserTable from "@/components/user-management/UserTable";
import UserPagination from "@/components/user-management/UserPagination";

 

export default function UserManagementPage() {
  // Pagination
  const [page, setPage] = useState(1);

  const limit = 10;

  // Filters
  const [search, setSearch] = useState("");

  const [role, setRole] =
    useState<UserRole | undefined>();

  const [status, setStatus] =
    useState<UserStatus | undefined>();

  // Sorting
  const [sortBy, setSortBy] =
    useState<UserSortBy>("createdAt");

  const [sortOrder, setSortOrder] =
    useState<SortOrder>("desc");

  const { data, isPending, isError } =
    useGetAllUsers({
      page,
      limit,
      search: search || undefined,
      role,
      status,
      sortBy,
      sortOrder,
    });

  const users = data?.data?.data ?? [];
  const meta = data?.data?.meta;

  // Reset page when filter changes
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleRoleChange = (
    value?: UserRole
  ) => {
    setRole(value);
    setPage(1);
  };

  const handleStatusChange = (
    value?: UserStatus
  ) => {
    setStatus(value);
    setPage(1);
  };

  const handleSortByChange = (
    value: UserSortBy
  ) => {
    setSortBy(value);
    setPage(1);
  };

  const handleSortOrderChange = (
    value: SortOrder
  ) => {
    setSortOrder(value);
    setPage(1);
  };

  if (isError) {
    return (
      <div className="flex min-h-60 items-center justify-center">
        <p className="text-sm text-destructive">
          Failed to load users.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          User Management
        </h1>

        <p className="text-muted-foreground">
          Manage all users and their account access.
        </p>
      </div>

      {/* Filters */}
      <UserFilters
        search={search}
        role={role}
        status={status}
       
        sortOrder={sortOrder}
        onSearchChange={handleSearchChange}
        onRoleChange={handleRoleChange}
        onStatusChange={handleStatusChange}
         
        onSortOrderChange={
          handleSortOrderChange
        }
      />

      {/* Table */}
      <div className="overflow-hidden rounded-xl border">
        <UserTable
          users={users}
          isPending={isPending}
        />

        {/* Pagination */}
        {meta && meta.totalPage > 0 && (
          <UserPagination
            page={meta.page}
            totalPage={meta.totalPage}
            total={meta.total}
            limit={meta.limit}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  );
}