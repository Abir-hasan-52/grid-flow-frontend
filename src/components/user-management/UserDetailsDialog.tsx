"use client";

import { useGetUserById } from "@/hooks/user-management.hook";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";
import { User } from "@/types";

 

interface UserDetailsDialogProps {
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function UserDetailsDialog({
  user,
  open,
  onOpenChange,
}: UserDetailsDialogProps) {
  const { data, isPending } = useGetUserById(
    user?.id ?? "",
    open
  );

  const userDetails = data?.data;

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            User Profile
          </DialogTitle>

          <DialogDescription>
            Detailed information about this user.
          </DialogDescription>
        </DialogHeader>

        {isPending ? (
          <div className="flex h-40 items-center justify-center">
            <p className="text-sm text-muted-foreground">
              Loading user details...
            </p>
          </div>
        ) : userDetails ? (
          <div className="space-y-6">
            {/* Profile */}
            <div className="flex items-center gap-4">
              <div className="flex size-16 items-center justify-center overflow-hidden rounded-full bg-muted">
                {userDetails.ImageUrl ? (
                  <img
                    src={userDetails.ImageUrl}
                    alt={userDetails.name}
                    className="size-full object-cover"
                  />
                ) : (
                  <span className="text-xl font-semibold">
                    {userDetails.name
                      .charAt(0)
                      .toUpperCase()}
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold">
                  {userDetails.name}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {userDetails.email}
                </p>
              </div>
            </div>

            {/* Account */}
            <div>
              <h3 className="mb-3 font-semibold">
                Account Information
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <InfoItem
                  label="Name"
                  value={userDetails.name}
                />

                <InfoItem
                  label="Email"
                  value={userDetails.email}
                />

                <InfoItem
                  label="Phone"
                  value={
                    userDetails.phone ?? "Not provided"
                  }
                />

                <InfoItem
                  label="Role"
                  value={userDetails.role.replace(
                    "_",
                    " "
                  )}
                />

                <InfoItem
                  label="Auth Provider"
                  value={userDetails.authProvider}
                />

                <InfoItem
                  label="Status"
                  value={userDetails.status}
                />

                <InfoItem
                  label="Active"
                  value={
                    userDetails.isActive
                      ? "Yes"
                      : "No"
                  }
                />

                <InfoItem
                  label="Email Verified"
                  value={
                    userDetails.emailVerified
                      ? "Yes"
                      : "No"
                  }
                />

                <InfoItem
                  label="Can Change Password"
                  value={
                    userDetails.canChangePassword
                      ? "Yes"
                      : "No"
                  }
                />
              </div>
            </div>

            {/* IDs */}
            <div>
              <h3 className="mb-3 font-semibold">
                Assignment Information
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <InfoItem
                  label="Area ID"
                  value={
                    userDetails.areaId ?? "Not assigned"
                  }
                />

                <InfoItem
                  label="Managed Zone ID"
                  value={
                    userDetails.managedZoneId ??
                    "Not assigned"
                  }
                />

                <InfoItem
                  label="Technician Zone ID"
                  value={
                    userDetails.technicianZoneId ??
                    "Not assigned"
                  }
                />
              </div>
            </div>

            {/* Dates */}
            <div>
              <h3 className="mb-3 font-semibold">
                Activity
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <InfoItem
                  label="Created At"
                  value={new Date(
                    userDetails.createdAt
                  ).toLocaleString()}
                />

                <InfoItem
                  label="Updated At"
                  value={new Date(
                    userDetails.updatedAt
                  ).toLocaleString()}
                />

                <InfoItem
                  label="Email Verified At"
                  value={
                    userDetails.emailVerifiedAt
                      ? new Date(
                          userDetails.emailVerifiedAt
                        ).toLocaleString()
                      : "Not verified"
                  }
                />

                <InfoItem
                  label="Deleted At"
                  value={
                    userDetails.deletedAt
                      ? new Date(
                          userDetails.deletedAt
                        ).toLocaleString()
                      : "Not deleted"
                  }
                />
              </div>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="space-y-1">
      <p className="text-xs text-muted-foreground">
        {label}
      </p>

      <p className="break-all text-sm font-medium">
        {value}
      </p>
    </div>
  );
}