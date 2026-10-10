"use client";

import { Eye, MoreHorizontal, Pencil, Send, Trash2, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import type { JobPost } from "@/types";

const statusVariant: Record<JobPost["status"], "default" | "outline" | "secondary"> = {
  PUBLISHED: "default",
  DRAFT: "outline",
  CLOSED: "secondary",
};

interface Props {
  jobPosts: JobPost[];
  isPending: boolean;
  onView: (j: JobPost) => void;
  onEdit: (j: JobPost) => void;
  onPublish: (j: JobPost) => void;
  onClose: (j: JobPost) => void;
  onDelete: (j: JobPost) => void;
}

export default function JobPostTable({
  jobPosts, isPending, onView, onEdit, onPublish, onClose, onDelete,
}: Props) {
  if (isPending) {
    return (
      <div className="flex h-60 items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading job posts...</p>
      </div>
    );
  }

  if (!jobPosts.length) {
    return (
      <div className="flex h-60 items-center justify-center">
        <p className="text-sm text-muted-foreground">No job posts found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Zone</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Deadline</TableHead>
            <TableHead>Applications</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {jobPosts.map((j) => (
            <TableRow key={j.id}>
              <TableCell className="max-w-xs truncate font-medium">{j.title}</TableCell>
              <TableCell>{j.powerZone?.name ?? "All Zones"}</TableCell>
              <TableCell>
                <Badge variant={statusVariant[j.status]}>{j.status}</Badge>
              </TableCell>
              <TableCell>{new Date(j.deadline).toLocaleDateString()}</TableCell>
              <TableCell>{j._count?.applications ?? 0}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger render={<Button variant="ghost" size="icon" />}>
                    <MoreHorizontal />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onView(j)}>
                      <Eye /> View
                    </DropdownMenuItem>

                    {j.status === "DRAFT" ? (
                      <>
                        <DropdownMenuItem onClick={() => onEdit(j)}>
                          <Pencil /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onPublish(j)}>
                          <Send /> Publish
                        </DropdownMenuItem>
                      </>
                    ) : null}

                    {j.status === "PUBLISHED" ? (
                      <DropdownMenuItem onClick={() => onClose(j)}>
                        <XCircle /> Close
                      </DropdownMenuItem>
                    ) : null}

                    <DropdownMenuItem variant="destructive" onClick={() => onDelete(j)}>
                      <Trash2 /> Delete
                    </DropdownMenuItem>
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