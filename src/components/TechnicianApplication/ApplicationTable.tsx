"use client";

import { Check, Eye, MoreHorizontal, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import type { ApplicationStatus, TechnicianApplication } from "@/types";

const statusVariant: Record<ApplicationStatus, "default" | "outline" | "destructive"> = {
  PENDING: "outline",
  APPROVED: "default",
  REJECTED: "destructive",
};

interface Props {
  applications: TechnicianApplication[];
  isPending: boolean;
  onView: (a: TechnicianApplication) => void;
  onApprove: (a: TechnicianApplication) => void;
  onReject: (a: TechnicianApplication) => void;
}

export default function ApplicationTable({
  applications, isPending, onView, onApprove, onReject,
}: Props) {
  if (isPending) {
    return (
      <div className="flex h-60 items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading applications...</p>
      </div>
    );
  }

  if (!applications.length) {
    return (
      <div className="flex h-60 items-center justify-center">
        <p className="text-sm text-muted-foreground">No applications found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Applicant</TableHead>
            <TableHead>Job Post</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Applied</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {applications.map((app) => (
            <TableRow key={app.id}>
              <TableCell>
                <p className="font-medium">{app.applicant?.name}</p>
                <p className="text-xs text-muted-foreground">{app.applicant?.email}</p>
              </TableCell>
              <TableCell>{app.jobPost.title}</TableCell>
              <TableCell>
                <Badge variant={statusVariant[app.status]}>{app.status}</Badge>
              </TableCell>
              <TableCell>{new Date(app.createdAt).toLocaleDateString()}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger render={<Button variant="ghost" size="icon" />}>
                    <MoreHorizontal />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onView(app)}>
                      <Eye /> View
                    </DropdownMenuItem>
                    {app.status === "PENDING" ? (
                      <>
                        <DropdownMenuItem onClick={() => onApprove(app)}>
                          <Check /> Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem variant="destructive" onClick={() => onReject(app)}>
                          <X /> Reject
                        </DropdownMenuItem>
                      </>
                    ) : null}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}