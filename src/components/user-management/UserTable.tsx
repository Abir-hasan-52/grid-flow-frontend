"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { User } from "@/types";

import UserActions from "./UserActions";

interface UserTableProps {
  users: User[];
  isPending: boolean;

  onView: (user: User) => void;
  onSuspend: (user: User) => void;
  onActivate: (user: User) => void;
  onDelete: (user: User) => void;
}

export default function UserTable({
  users,
  isPending,
  onView,
  onSuspend,
  onActivate,
  onDelete,
}: UserTableProps) {
  if (isPending) {
    return (
      <div className="flex h-60 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Loading users...
        </p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="flex h-60 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          No users found.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Auth</TableHead>
            <TableHead>Verified</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead className="text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              {/* User */}
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted">
                    {user.ImageUrl ? (
                      <img
                        src={user.ImageUrl}
                        alt={user.name}
                        className="size-full object-cover"
                      />
                    ) : (
                      <span className="font-medium">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-medium">
                      {user.name}
                    </p>

                    <p className="truncate text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
              </TableCell>

              {/* Role */}
              <TableCell>
                <Badge variant="outline">
                  {user.role.replace("_", " ")}
                </Badge>
              </TableCell>

              {/* Status */}
              <TableCell>
                <Badge
                  variant={
                    user.status === "ACTIVE"
                      ? "default"
                      : user.status === "SUSPENDED"
                        ? "secondary"
                        : "destructive"
                  }
                >
                  {user.status}
                </Badge>
              </TableCell>

              {/* Auth Provider */}
              <TableCell>
                {user.authProvider}
              </TableCell>

              {/* Email Verification */}
              <TableCell>
                {user.emailVerified ? (
                  <Badge variant="outline">
                    Verified
                  </Badge>
                ) : (
                  <Badge variant="secondary">
                    Not Verified
                  </Badge>
                )}
              </TableCell>

              {/* Joined */}
              <TableCell>
                {new Date(
                  user.createdAt
                ).toLocaleDateString()}
              </TableCell>

              {/* Actions */}
              <TableCell className="text-right">
                <UserActions
                  user={user}
                  onView={onView}
                  onSuspend={onSuspend}
                  onActivate={onActivate}
                  onDelete={onDelete}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}