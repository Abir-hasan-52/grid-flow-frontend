"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/toast";
import {
  createFeeder,
  deleteFeeder,
  getAllFeeders,
  getFeederById,
  updateFeeder,
} from "@/api/feeder.api";
import { ApiError } from "@/lib/apiClient";
import type {
  CreateFeederPayload,
  GetAllFeedersQuery,
  UpdateFeederPayload,
} from "@/types";

export function useGetAllFeeders(params: GetAllFeedersQuery) {
  return useQuery({
    queryKey: ["infrastructure-feeders", params],
    queryFn: () => getAllFeeders(params),
  });
}

export function useGetFeederById(id: string, enabled = true) {
  return useQuery({
    queryKey: ["infrastructure-feeder", id],
    queryFn: () => getFeederById(id),
    enabled: !!id && enabled,
  });
}

export function useCreateFeeder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateFeederPayload) => createFeeder(payload),
    onSuccess: () => {
      toast.add({ title: "Feeder created successfully", type: "success" });
      queryClient.invalidateQueries({ queryKey: ["infrastructure-feeders"] });
    },
    onError: (error: ApiError) => {
      toast.add({ title: error.message, type: "error" });
    },
  });
}

export function useUpdateFeeder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateFeederPayload;
    }) => updateFeeder(id, payload),
    onSuccess: () => {
      toast.add({ title: "Feeder updated successfully", type: "success" });
      queryClient.invalidateQueries({ queryKey: ["infrastructure-feeders"] });
    },
    onError: (error: ApiError) => {
      toast.add({ title: error.message, type: "error" });
    },
  });
}

export function useDeleteFeeder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFeeder,
    onSuccess: () => {
      toast.add({ title: "Feeder deleted successfully", type: "success" });
      queryClient.invalidateQueries({ queryKey: ["infrastructure-feeders"] });
    },
    onError: (error: ApiError) => {
      toast.add({ title: error.message, type: "error" });
    },
  });
}