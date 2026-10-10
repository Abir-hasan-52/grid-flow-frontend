"use client";

import { useState } from "react";

import {
  useActivateUser,
  useDeleteUser,
  useGetAllUsers,
  useSuspendUser,
} from "@/hooks/user-management.hook";

import type { SortOrder, User, UserRole, UserStatus } from "@/types";
import UserFilters from "@/components/user-management/UserFilters";
import UserTable from "@/components/user-management/UserTable";
import UserPagination from "@/components/user-management/UserPagination";
import UserDetailsDialog from "@/components/user-management/UserDetailsDialog";
import CreateAdminDialog from "@/components/UserManagement/CreateAdminDialog";
import CreateZoneManagerDialog from "@/components/UserManagement/CreateZoneManagerDialog";

export default function UserManagementPage() {
  const [page, setPage] = useState(1);

  const limit = 10;

  const [search, setSearch] = useState("");

  const [role, setRole] = useState<UserRole | undefined>();

  const [status, setStatus] = useState<UserStatus | undefined>();

  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [detailsOpen, setDetailsOpen] = useState(false);

  const { data, isPending, isError } = useGetAllUsers({
    page,
    limit,
    search: search || undefined,
    role,
    status,
    sortOrder,
  });

  const suspendMutation = useSuspendUser();

  const activateMutation = useActivateUser();

  const deleteMutation = useDeleteUser();

  const users = data?.data?.data ?? [];

  const meta = data?.data?.meta;

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleRoleChange = (value?: UserRole) => {
    setRole(value);
    setPage(1);
  };

  const handleStatusChange = (value?: UserStatus) => {
    setStatus(value);
    setPage(1);
  };

  const handleSortOrderChange = (value: SortOrder) => {
    setSortOrder(value);
    setPage(1);
  };

  const handleView = (user: User) => {
    setSelectedUser(user);
    setDetailsOpen(true);
  };

  const handleSuspend = (user: User) => {
    suspendMutation.mutate(user.id);
  };

  const handleActivate = (user: User) => {
    activateMutation.mutate(user.id);
  };

  const handleDelete = (user: User) => {
    deleteMutation.mutate(user.id);
  };

  if (isError) {
    return (
      <div className="flex min-h-60 items-center justify-center">
        <p className="text-sm text-destructive">Failed to load users.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <CreateAdminDialog />
        <CreateZoneManagerDialog />
      </div>

      <div>
        <h1 className="text-2xl font-bold tracking-tight">User Management</h1>

        <p className="text-muted-foreground">
          Manage all users and their account access.
        </p>
      </div>

      {/* 
          Filters
       */}

      <UserFilters
        search={search}
        role={role}
        status={status}
        sortOrder={sortOrder}
        onSearchChange={handleSearchChange}
        onRoleChange={handleRoleChange}
        onStatusChange={handleStatusChange}
        onSortOrderChange={handleSortOrderChange}
      />

      {/*  
          Table + Pagination
      */}

      <div className="overflow-hidden rounded-xl border bg-background">
        <UserTable
          users={users}
          isPending={isPending}
          onView={handleView}
          onSuspend={handleSuspend}
          onActivate={handleActivate}
          onDelete={handleDelete}
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

      {/* 
          User Details Dialog
      */}

      <UserDetailsDialog
        user={selectedUser}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
    </div>
  );
}
