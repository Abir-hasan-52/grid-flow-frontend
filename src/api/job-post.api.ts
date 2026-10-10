import apiClient from "@/lib/apiClient";
import type {
  CreateJobPostPayload,
  GetAllJobPostsAdminQuery,
  GetAllJobPostsQuery,
  GetAllJobPostsResponse,
  JobPost,
  UpdateJobPostPayload,
} from "@/types";

interface ApiEnvelope<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

const BASE = "/job-post";

function buildQuery(params?: object) {
  const searchParams = new URLSearchParams();
  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value !== undefined && value !== "") searchParams.set(key, String(value));
  });
  const query = searchParams.toString();
  return query ? `?${query}` : "";
}

/* ---------- Admin ---------- */

export function getAllJobPostsAdmin(params?: GetAllJobPostsAdminQuery) {
  return apiClient<GetAllJobPostsResponse>(`${BASE}/all-posts${buildQuery(params)}`);
}

export function createJobPost(payload: CreateJobPostPayload) {
  return apiClient<ApiEnvelope<JobPost>>(`${BASE}/create-post`, {
    method: "POST",
    body: payload,
  });
}

export function updateJobPost(id: string, payload: UpdateJobPostPayload) {
  return apiClient<ApiEnvelope<JobPost>>(`${BASE}/update-post/${id}`, {
    method: "PATCH",
    body: payload,
  });
}

export function deleteJobPost(id: string) {
  return apiClient<ApiEnvelope<JobPost>>(`${BASE}/single-post/${id}`, {
    method: "DELETE",
  });
}

export function publishJobPost(id: string) {
  return apiClient<ApiEnvelope<JobPost>>(`${BASE}/single-post/${id}/publish`, {
    method: "PATCH",
  });
}

export function closeJobPost(id: string) {
  return apiClient<ApiEnvelope<JobPost>>(`${BASE}/single-post/${id}/close`, {
    method: "PATCH",
  });
}

/* ---------- Public ---------- */

export function getAllPublishedJobPosts(params?: GetAllJobPostsQuery) {
  return apiClient<GetAllJobPostsResponse>(`${BASE}/public-posts${buildQuery(params)}`);
}

export function getPublishedJobPostById(id: string) {
  return apiClient<ApiEnvelope<JobPost>>(`${BASE}/public-posts/${id}`);
}