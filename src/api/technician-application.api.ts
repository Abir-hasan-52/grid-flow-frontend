import apiClient from "@/lib/apiClient";
import type {
  GetAllApplicationsAdminQuery,
  GetAllApplicationsResponse,
  GetMyApplicationsQuery,
  TechnicianApplication,
} from "@/types";

interface ApiEnvelope<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

function buildQuery(params?: object) {
  const searchParams = new URLSearchParams();
  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value !== undefined && value !== "") searchParams.set(key, String(value));
  });
  const query = searchParams.toString();
  return query ? `?${query}` : "";
}

/* ---------- Customer ---------- */

export function applyForJob(
  jobPostId: string,
  payload: { experience?: string; resume: File },
) {
  const formData = new FormData();
  formData.append("resume", payload.resume);
  if (payload.experience) formData.append("experience", payload.experience);

  // NOTE: pass FormData directly (don't JSON.stringify) -- ofetch detects
  // FormData and sets the multipart boundary header automatically.
  return apiClient<ApiEnvelope<TechnicianApplication>>(
    `/job-posts/${jobPostId}/applications`,
    { method: "POST", body: formData },
  );
}

export function getMyApplications(params?: GetMyApplicationsQuery) {
  return apiClient<GetAllApplicationsResponse>(
    `/my-applications/me${buildQuery(params)}`,
  );
}

export function getMyApplicationById(id: string) {
  return apiClient<ApiEnvelope<TechnicianApplication>>(`/my-applications/me/${id}`);
}

/* ---------- Admin ---------- */

export function getAllApplicationsAdmin(params?: GetAllApplicationsAdminQuery) {
  return apiClient<GetAllApplicationsResponse>(
    `/admin/technician-applications${buildQuery(params)}`,
  );
}

export function getApplicationByIdAdmin(id: string) {
  return apiClient<ApiEnvelope<TechnicianApplication>>(
    `/admin/technician-applications/${id}`,
  );
}

export function approveApplication(id: string) {
  return apiClient<ApiEnvelope<TechnicianApplication>>(
    `/admin/technician-applications/${id}/approve`,
    { method: "PATCH" },
  );
}

export function rejectApplication(id: string, rejectionReason: string) {
  return apiClient<ApiEnvelope<TechnicianApplication>>(
    `/admin/technician-applications/${id}/reject`,
    { method: "PATCH", body: { rejectionReason } },
  );
}