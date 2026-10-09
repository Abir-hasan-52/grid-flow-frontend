"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/toast";
import {
  createArea,
  deleteArea,
  getAllAreas,
  getAreaById,
  updateArea,
} from "@/api/area.api";
import { ApiError } from "@/lib/apiClient";
import type {
  CreateAreaPayload,
  GetAllAreasQuery,
  UpdateAreaPayload,
} from "@/types";

export function useGetAllAreas(params: GetAllAreasQuery) {
  return useQuery({
    queryKey: ["infrastructure-areas", params],
    queryFn: () => getAllAreas(params),
  });
}

export function useGetAreaById(id: string, enabled = true) {
  return useQuery({
    queryKey: ["infrastructure-area", id],
    queryFn: () => getAreaById(id),
    enabled: !!id && enabled,
  });
}

export function useCreateArea() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateAreaPayload) => createArea(payload),
    onSuccess: () => {
      toast.add({ title: "Area created successfully", type: "success" });
      queryClient.invalidateQueries({ queryKey: ["infrastructure-areas"] });
    },
    onError: (error: ApiError) => {
      toast.add({ title: error.message, type: "error" });
    },
  });
}

export function useUpdateArea() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateAreaPayload }) =>
      updateArea(id, payload),
    onSuccess: () => {
      toast.add({ title: "Area updated successfully", type: "success" });
      queryClient.invalidateQueries({ queryKey: ["infrastructure-areas"] });
    },
    onError: (error: ApiError) => {
      toast.add({ title: error.message, type: "error" });
    },
  });
}

export function useDeleteArea() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteArea,
    onSuccess: () => {
      toast.add({ title: "Area deleted successfully", type: "success" });
      queryClient.invalidateQueries({ queryKey: ["infrastructure-areas"] });
    },
    onError: (error: ApiError) => {
      toast.add({ title: error.message, type: "error" });
    },
  });
}