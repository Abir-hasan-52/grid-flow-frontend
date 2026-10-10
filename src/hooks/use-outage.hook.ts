"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/toast";
import {
  closeOutage,
  createManualOutage,
  getAllOutages,
  getMyReports,
  getOutageById,
  reportOutage,
  verifyOutage,
} from "@/api/outage.api";
import { ApiError } from "@/lib/apiClient";
import type {
  CreateManualOutagePayload,
  CreateOutageReportPayload,
  GetAllOutagesQuery,
  GetMyReportsQuery,
} from "@/types";

/* ---------- Customer ---------- */

export function useReportOutage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateOutageReportPayload) => reportOutage(payload),
    onSuccess: (res) => {
      toast.add({ title: res.message, type: "success" });
      queryClient.invalidateQueries({ queryKey: ["my-reports"] });
    },
    onError: (error: ApiError) => toast.add({ title: error.message, type: "error" }),
  });
}

export function useGetMyReports(params: GetMyReportsQuery) {
  return useQuery({
    queryKey: ["my-reports", params],
    queryFn: () => getMyReports(params),
  });
}

/* ---------- Admin / Zone Manager ---------- */

export function useGetAllOutages(params: GetAllOutagesQuery) {
  return useQuery({
    queryKey: ["outages", params],
    queryFn: () => getAllOutages(params),
  });
}

export function useGetOutageById(id: string, enabled = true) {
  return useQuery({
    queryKey: ["outage", id],
    queryFn: () => getOutageById(id),
    enabled: !!id && enabled,
  });
}

export function useCreateManualOutage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateManualOutagePayload) => createManualOutage(payload),
    onSuccess: (res) => {
      toast.add({
        title: `Outage created — ${res.data.notifiedCustomers ?? 0} customer(s) notified`,
        type: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["outages"] });
    },
    onError: (error: ApiError) => toast.add({ title: error.message, type: "error" }),
  });
}

export function useVerifyOutage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => verifyOutage(id),
    onSuccess: (res) => {
      toast.add({
        title: `Outage verified — ${res.data.notifiedCustomers ?? 0} customer(s) notified`,
        type: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["outages"] });
      queryClient.invalidateQueries({ queryKey: ["outage"] });
    },
    onError: (error: ApiError) => toast.add({ title: error.message, type: "error" }),
  });
}

export function useCloseOutage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => closeOutage(id),
    onSuccess: (res) => {
      toast.add({
        title: `Outage closed — ${res.data.notifiedCustomers ?? 0} customer(s) notified`,
        type: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["outages"] });
      queryClient.invalidateQueries({ queryKey: ["outage"] });
    },
    onError: (error: ApiError) => toast.add({ title: error.message, type: "error" }),
  });
}