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

import type { Substation } from "@/types";

interface Props {
  substations: Substation[];
  isPending: boolean;

  onView: (substation: Substation) => void;
  onEdit: (substation: Substation) => void;
  onDelete: (substation: Substation) => void;
}

export default function SubstationTable({
  substations,
  isPending,
  onView,
  onEdit,
  onDelete,
}: Props) {
  if (isPending) {
    return (
      <div className="flex h-60 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Loading substations...
        </p>
      </div>
    );
  }

  if (substations.length === 0) {
    return (
      <div className="flex h-60 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          No substations found.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Substation</TableHead>
            <TableHead>Power Zone</TableHead>
            <TableHead>Feeders</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {substations.map((substation) => (
            <TableRow key={substation.id}>
              <TableCell className="font-medium">
                {substation.name}
              </TableCell>

              <TableCell>
                <Badge variant="outline">
                  {substation.powerZone.name}
                </Badge>
              </TableCell>

              <TableCell>
                {substation._count.feeders}
              </TableCell>

              <TableCell>
                {new Date(
                  substation.createdAt,
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
                      onClick={() => onView(substation)}
                    >
                      <Eye />
                      View
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => onEdit(substation)}
                    >
                      <Pencil />
                      Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => onDelete(substation)}
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