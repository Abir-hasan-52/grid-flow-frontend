"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/toast";
import {
  closeJobPost,
  createJobPost,
  deleteJobPost,
  getAllJobPostsAdmin,
  getAllPublishedJobPosts,
  getPublishedJobPostById,
  publishJobPost,
  updateJobPost,
} from "@/api/job-post.api";
import { ApiError } from "@/lib/apiClient";
import type {
  CreateJobPostPayload,
  GetAllJobPostsAdminQuery,
  GetAllJobPostsQuery,
  UpdateJobPostPayload,
} from "@/types";

/* ---------- Admin ---------- */

export function useGetAllJobPostsAdmin(params: GetAllJobPostsAdminQuery) {
  return useQuery({
    queryKey: ["job-posts-admin", params],
    queryFn: () => getAllJobPostsAdmin(params),
  });
}

export function useCreateJobPost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateJobPostPayload) => createJobPost(payload),
    onSuccess: () => {
      toast.add({ title: "Job post created as draft", type: "success" });
      queryClient.invalidateQueries({ queryKey: ["job-posts-admin"] });
    },
    onError: (error: ApiError) => toast.add({ title: error.message, type: "error" }),
  });
}

export function useUpdateJobPost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateJobPostPayload }) =>
      updateJobPost(id, payload),
    onSuccess: () => {
      toast.add({ title: "Job post updated", type: "success" });
      queryClient.invalidateQueries({ queryKey: ["job-posts-admin"] });
    },
    onError: (error: ApiError) => toast.add({ title: error.message, type: "error" }),
  });
}

export function useDeleteJobPost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteJobPost,
    onSuccess: () => {
      toast.add({ title: "Job post deleted", type: "success" });
      queryClient.invalidateQueries({ queryKey: ["job-posts-admin"] });
    },
    onError: (error: ApiError) => toast.add({ title: error.message, type: "error" }),
  });
}

export function usePublishJobPost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: publishJobPost,
    onSuccess: () => {
      toast.add({ title: "Job post published", type: "success" });
      queryClient.invalidateQueries({ queryKey: ["job-posts-admin"] });
      queryClient.invalidateQueries({ queryKey: ["public-job-posts"] });
    },
    onError: (error: ApiError) => toast.add({ title: error.message, type: "error" }),
  });
}

export function useCloseJobPost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: closeJobPost,
    onSuccess: () => {
      toast.add({ title: "Job post closed", type: "success" });
      queryClient.invalidateQueries({ queryKey: ["job-posts-admin"] });
      queryClient.invalidateQueries({ queryKey: ["public-job-posts"] });
    },
    onError: (error: ApiError) => toast.add({ title: error.message, type: "error" }),
  });
}

/* ---------- Public ---------- */

export function useGetAllPublishedJobPosts(params: GetAllJobPostsQuery) {
  return useQuery({
    queryKey: ["public-job-posts", params],
    queryFn: () => getAllPublishedJobPosts(params),
  });
}

export function useGetPublishedJobPostById(id: string, enabled = true) {
  return useQuery({
    queryKey: ["public-job-post", id],
    queryFn: () => getPublishedJobPostById(id),
    enabled: !!id && enabled,
  });
}