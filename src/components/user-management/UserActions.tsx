"use client";

import {
  MoreHorizontal,
  Eye,
  UserCheck,
  UserX,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/types";

 

interface UserActionsProps {
  user: User;
  onView: (user: User) => void;
  onSuspend: (user: User) => void;
  onActivate: (user: User) => void;
  onDelete: (user: User) => void;
}

export default function UserActions({
  user,
  onView,
  onSuspend,
  onActivate,
  onDelete,
}: UserActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
          />
        }
      >
        <MoreHorizontal className="size-4" />
        <span className="sr-only">
          Open actions
        </span>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {/* View */}
        <DropdownMenuItem
          onClick={() => onView(user)}
        >
          <Eye className="mr-2 size-4" />
          View Profile
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Suspend */}
        {user.status === "ACTIVE" && (
          <DropdownMenuItem
            onClick={() => onSuspend(user)}
          >
            <UserX className="mr-2 size-4" />
            Suspend
          </DropdownMenuItem>
        )}

        {/* Activate */}
        {user.status === "SUSPENDED" && (
          <DropdownMenuItem
            onClick={() => onActivate(user)}
          >
            <UserCheck className="mr-2 size-4" />
            Activate
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        {/* Delete */}
        {user.status !== "DELETED" && (
          <DropdownMenuItem
            variant="destructive"
            onClick={() => onDelete(user)}
          >
            <Trash2 className="mr-2 size-4" />
            Delete
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}