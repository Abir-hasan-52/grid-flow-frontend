"use client";

import {
  Eye,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { Feeder } from "@/types";

interface Props {
  feeders: Feeder[];
  isPending: boolean;

  onView: (feeder: Feeder) => void;
  onEdit: (feeder: Feeder) => void;
  onDelete: (feeder: Feeder) => void;
}

export default function FeederTable({
  feeders,
  isPending,
  onView,
  onEdit,
  onDelete,
}: Props) {
  if (isPending) {
    return (
      <div className="flex h-60 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Loading feeders...
        </p>
      </div>
    );
  }

  if (!feeders.length) {
    return (
      <div className="flex h-60 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          No feeders found.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Feeder</TableHead>
            <TableHead>Substation</TableHead>
            <TableHead>Areas</TableHead>
            <TableHead>Outages</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {feeders.map((feeder) => (
            <TableRow key={feeder.id}>
              <TableCell className="font-medium">
                {feeder.name}
              </TableCell>

              <TableCell>
                <Badge variant="outline">
                  {feeder.substation.name}
                </Badge>
              </TableCell>

              <TableCell>
                {feeder._count.areas}
              </TableCell>

              <TableCell>
                {feeder._count.outages}
              </TableCell>

              <TableCell>
                {new Date(
                  feeder.createdAt,
                ).toLocaleDateString()}
              </TableCell>

              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button
                        variant="ghost"
                        size="icon"
                      />
                    }
                  >
                    <MoreHorizontal />
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => onView(feeder)}
                    >
                      <Eye />
                      View
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => onEdit(feeder)}
                    >
                      <Pencil />
                      Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => onDelete(feeder)}
                    >
                      <Trash2 />
                      Delete
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