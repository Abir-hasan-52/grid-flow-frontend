"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/toast";
import {
  createZone,
  deleteZone,
  getAllZones,
  getZoneById,
  updateZone,
} from "@/api/zone.api";
import { ApiError } from "@/lib/apiClient";
import type { CreateZonePayload, GetAllZonesQuery, UpdateZonePayload } from "@/types";

export function useGetAllZones(params: GetAllZonesQuery) {
  return useQuery({
    queryKey: ["infrastructure-zones", params],
    queryFn: () => getAllZones(params),
  });
}

export function useGetZoneById(id: string, enabled = true) {
  return useQuery({
    queryKey: ["infrastructure-zone", id],
    queryFn: () => getZoneById(id),
    enabled: !!id && enabled,
  });
}

export function useCreateZone() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateZonePayload) => createZone(payload),
    onSuccess: () => {
      toast.add({ title: "Zone created successfully", type: "success" });
      queryClient.invalidateQueries({ queryKey: ["infrastructure-zones"] });
    },
    onError: (error: ApiError) => {
      toast.add({ title: error.message, type: "error" });
    },
  });
}

export function useUpdateZone() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateZonePayload }) =>
      updateZone(id, payload),
    onSuccess: () => {
      toast.add({ title: "Zone updated successfully", type: "success" });
      queryClient.invalidateQueries({ queryKey: ["infrastructure-zones"] });
    },
    onError: (error: ApiError) => {
      toast.add({ title: error.message, type: "error" });
    },
  });
}

export function useDeleteZone() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteZone,
    onSuccess: () => {
      toast.add({ title: "Zone deleted successfully", type: "success" });
      queryClient.invalidateQueries({ queryKey: ["infrastructure-zones"] });
    },
    onError: (error: ApiError) => {
      toast.add({ title: error.message, type: "error" });
    },
  });
}