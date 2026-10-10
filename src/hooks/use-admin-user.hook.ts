"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/toast";
import { createAdmin, createZoneManager } from "@/api/admin-user.api";
import { ApiError } from "@/lib/apiClient";
 

export function useCreateAdmin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAdmin,
    onSuccess: (res) => {
      toast.add({ title: res.message, type: "success" });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: ApiError) => {
      toast.add({ title: error.message, type: "error" });
    },
  });
}

export function useCreateZoneManager() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createZoneManager,
    onSuccess: (res) => {
      toast.add({ title: res.message, type: "success" });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: ApiError) => {
      toast.add({ title: error.message, type: "error" });
    },
  });
}