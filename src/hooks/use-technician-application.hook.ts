"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/toast";
import {
  applyForJob,
  approveApplication,
  getAllApplicationsAdmin,
  getApplicationByIdAdmin,
  getMyApplicationById,
  getMyApplications,
  rejectApplication,
} from "@/api/technician-application.api";
import { ApiError } from "@/lib/apiClient";
import type {
  GetAllApplicationsAdminQuery,
  GetMyApplicationsQuery,
} from "@/types";

/* ---------- Customer ---------- */

export function useApplyForJob() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      jobPostId,
      payload,
    }: {
      jobPostId: string;
      payload: { experience?: string; resume: File };
    }) => applyForJob(jobPostId, payload),
    onSuccess: () => {
      toast.add({ title: "Application submitted successfully", type: "success" });
      queryClient.invalidateQueries({ queryKey: ["my-applications"] });
    },
    onError: (error: ApiError) => toast.add({ title: error.message, type: "error" }),
  });
}

export function useGetMyApplications(params: GetMyApplicationsQuery) {
  return useQuery({
    queryKey: ["my-applications", params],
    queryFn: () => getMyApplications(params),
  });
}

export function useGetMyApplicationById(id: string, enabled = true) {
  return useQuery({
    queryKey: ["my-application", id],
    queryFn: () => getMyApplicationById(id),
    enabled: !!id && enabled,
  });
}

/* ---------- Admin ---------- */

export function useGetAllApplicationsAdmin(params: GetAllApplicationsAdminQuery) {
  return useQuery({
    queryKey: ["applications-admin", params],
    queryFn: () => getAllApplicationsAdmin(params),
  });
}

export function useGetApplicationByIdAdmin(id: string, enabled = true) {
  return useQuery({
    queryKey: ["application-admin", id],
    queryFn: () => getApplicationByIdAdmin(id),
    enabled: !!id && enabled,
  });
}

export function useApproveApplication() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => approveApplication(id),
    onSuccess: () => {
      toast.add({ title: "Application approved — applicant promoted to Technician", type: "success" });
      queryClient.invalidateQueries({ queryKey: ["applications-admin"] });
    },
    onError: (error: ApiError) => toast.add({ title: error.message, type: "error" }),
  });
}

export function useRejectApplication() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, rejectionReason }: { id: string; rejectionReason: string }) =>
      rejectApplication(id, rejectionReason),
    onSuccess: () => {
      toast.add({ title: "Application rejected", type: "success" });
      queryClient.invalidateQueries({ queryKey: ["applications-admin"] });
    },
    onError: (error: ApiError) => toast.add({ title: error.message, type: "error" }),
  });
}