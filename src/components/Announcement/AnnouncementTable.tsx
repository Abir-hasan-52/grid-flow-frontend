"use client";

import { Eye, MoreHorizontal, Pencil, Send, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import type { Announcement } from "@/types";

interface Props {
  announcements: Announcement[];
  isPending: boolean;
  canDelete: boolean;
  onView: (a: Announcement) => void;
  onEdit: (a: Announcement) => void;
  onPublish: (a: Announcement) => void;
  onDelete: (a: Announcement) => void;
}

export default function AnnouncementTable({
  announcements,
  isPending,
  canDelete,
  onView,
  onEdit,
  onPublish,
  onDelete,
}: Props) {
  if (isPending) {
    return (
      <div className="flex h-60 items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading announcements...</p>
      </div>
    );
  }

  if (!announcements.length) {
    return (
      <div className="flex h-60 items-center justify-center">
        <p className="text-sm text-muted-foreground">No announcements found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Zone</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {announcements.map((a) => (
            <TableRow key={a.id}>
              <TableCell className="max-w-xs truncate font-medium">{a.title}</TableCell>
              <TableCell><Badge variant="secondary">{a.type}</Badge></TableCell>
              <TableCell>{a.powerZone?.name ?? "All Zones"}</TableCell>
              <TableCell>
                <Badge variant={a.status === "PUBLISHED" ? "default" : "outline"}>
                  {a.status}
                </Badge>
              </TableCell>
              <TableCell>{new Date(a.createdAt).toLocaleDateString()}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={<Button variant="ghost" size="icon" />}
                  >
                    <MoreHorizontal />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onView(a)}>
                      <Eye /> View
                    </DropdownMenuItem>

                    {a.status === "DRAFT" ? (
                      <>
                        <DropdownMenuItem onClick={() => onEdit(a)}>
                          <Pencil /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onPublish(a)}>
                          <Send /> Publish
                        </DropdownMenuItem>
                      </>
                    ) : null}

                    {canDelete ? (
                      <DropdownMenuItem variant="destructive" onClick={() => onDelete(a)}>
                        <Trash2 /> Delete
                      </DropdownMenuItem>
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