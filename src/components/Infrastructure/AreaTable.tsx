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

import type { Area } from "@/types";

interface Props {
  areas: Area[];
  isPending: boolean;

  onView: (area: Area) => void;
  onEdit: (area: Area) => void;
  onDelete: (area: Area) => void;
}

export default function AreaTable({
  areas,
  isPending,
  onView,
  onEdit,
  onDelete,
}: Props) {
  if (isPending) {
    return (
      <div className="flex h-60 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Loading areas...
        </p>
      </div>
    );
  }

  if (!areas.length) {
    return (
      <div className="flex h-60 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          No areas found.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Area</TableHead>
            <TableHead>Feeder</TableHead>
            <TableHead>Customers</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {areas.map((area) => (
            <TableRow key={area.id}>
              <TableCell className="font-medium">
                {area.name}
              </TableCell>

              <TableCell>
                <Badge variant="outline">
                  {area.feeder.name}
                </Badge>
              </TableCell>

              <TableCell>
                {area._count.customers}
              </TableCell>

              <TableCell>
                {new Date(
                  area.createdAt,
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
                      onClick={() => onView(area)}
                    >
                      <Eye />
                      View
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => onEdit(area)}
                    >
                      <Pencil />
                      Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => onDelete(area)}
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