"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/toast";
import {
  createSubstation,
  deleteSubstation,
  getAllSubstations,
  getSubstationById,
  updateSubstation,
} from "@/api/substation.api";
import { ApiError } from "@/lib/apiClient";
import type {
  CreateSubstationPayload,
  GetAllSubstationsQuery,
  UpdateSubstationPayload,
} from "@/types";

export function useGetAllSubstations(params: GetAllSubstationsQuery) {
  return useQuery({
    queryKey: ["infrastructure-substations", params],
    queryFn: () => getAllSubstations(params),
  });
}

export function useGetSubstationById(id: string, enabled = true) {
  return useQuery({
    queryKey: ["infrastructure-substation", id],
    queryFn: () => getSubstationById(id),
    enabled: !!id && enabled,
  });
}

export function useCreateSubstation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateSubstationPayload) => createSubstation(payload),
    onSuccess: () => {
      toast.add({ title: "Substation created successfully", type: "success" });
      queryClient.invalidateQueries({ queryKey: ["infrastructure-substations"] });
    },
    onError: (error: ApiError) => {
      toast.add({ title: error.message, type: "error" });
    },
  });
}

export function useUpdateSubstation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateSubstationPayload;
    }) => updateSubstation(id, payload),
    onSuccess: () => {
      toast.add({ title: "Substation updated successfully", type: "success" });
      queryClient.invalidateQueries({ queryKey: ["infrastructure-substations"] });
    },
    onError: (error: ApiError) => {
      toast.add({ title: error.message, type: "error" });
    },
  });
}

export function useDeleteSubstation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSubstation,
    onSuccess: () => {
      toast.add({ title: "Substation deleted successfully", type: "success" });
      queryClient.invalidateQueries({ queryKey: ["infrastructure-substations"] });
    },
    onError: (error: ApiError) => {
      toast.add({ title: error.message, type: "error" });
    },
  });
}