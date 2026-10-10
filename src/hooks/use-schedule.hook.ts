"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/toast";
import {
  approveSchedule,
  cancelSchedule,
  createSchedule,
  getAllSchedules,
  getScheduleById,
  updateSchedule,
} from "@/api/schedule.api";
import { ApiError } from "@/lib/apiClient";
import type {
  CreateSchedulePayload,
  GetAllSchedulesQuery,
  UpdateSchedulePayload,
} from "@/types";

export function useGetAllSchedules(params: GetAllSchedulesQuery) {
  return useQuery({
    queryKey: ["schedules", params],
    queryFn: () => getAllSchedules(params),
  });
}

export function useGetScheduleById(id: string, enabled = true) {
  return useQuery({
    queryKey: ["schedule", id],
    queryFn: () => getScheduleById(id),
    enabled: !!id && enabled,
  });
}

export function useCreateSchedule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateSchedulePayload) => createSchedule(payload),
    onSuccess: () => {
      toast.add({ title: "Schedule created — pending admin approval", type: "success" });
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
    onError: (error: ApiError) => toast.add({ title: error.message, type: "error" }),
  });
}

export function useUpdateSchedule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateSchedulePayload }) =>
      updateSchedule(id, payload),
    onSuccess: () => {
      toast.add({ title: "Schedule updated", type: "success" });
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
    onError: (error: ApiError) => toast.add({ title: error.message, type: "error" }),
  });
}

export function useApproveSchedule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => approveSchedule(id),
    onSuccess: (res) => {
      toast.add({
        title: `Schedule approved — ${res.data.notifiedCustomers ?? 0} customer(s) notified`,
        type: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
    onError: (error: ApiError) => toast.add({ title: error.message, type: "error" }),
  });
}

export function useCancelSchedule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => cancelSchedule(id),
    onSuccess: () => {
      toast.add({ title: "Schedule cancelled", type: "success" });
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
    onError: (error: ApiError) => toast.add({ title: error.message, type: "error" }),
  });
}