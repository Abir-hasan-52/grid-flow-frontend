import apiClient from "@/lib/apiClient";
import type {
  Announcement,
  CreateAnnouncementPayload,
  GetAllAnnouncementsQuery,
  GetAllAnnouncementsResponse,
  GetAllPublicAnnouncementsRawResponse,
  UpdateAnnouncementPayload,
} from "@/types";

interface ApiEnvelope<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

function buildQuery(params?: GetAllAnnouncementsQuery) {
  const searchParams = new URLSearchParams();

  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.limit) searchParams.set("limit", String(params.limit));
  if (params?.search) searchParams.set("search", params.search);
  if (params?.type) searchParams.set("type", params.type);
  if (params?.status) searchParams.set("status", params.status);
  if (params?.powerZoneId) searchParams.set("powerZoneId", params.powerZoneId);
  if (params?.sortBy) searchParams.set("sortBy", params.sortBy);
  if (params?.sortOrder) searchParams.set("sortOrder", params.sortOrder);

  const query = searchParams.toString();
  return query ? `?${query}` : "";
}

/* ---------- Management (Admin / Zone Manager) ---------- */

export function getAllAnnouncements(params?: GetAllAnnouncementsQuery) {
  return apiClient<GetAllAnnouncementsResponse>(
    `/announcements/drafts${buildQuery(params)}`,
  );
}

export function getAnnouncementById(id: string) {
  return apiClient<ApiEnvelope<Announcement>>(`/announcements/drafts/${id}`);
}

export function createAnnouncement(payload: CreateAnnouncementPayload) {
  return apiClient<ApiEnvelope<Announcement>>("/announcements/create", {
    method: "POST",
    body: payload,
  });
}

export function updateAnnouncement(
  id: string,
  payload: UpdateAnnouncementPayload,
) {
  return apiClient<ApiEnvelope<Announcement>>(
    `/announcements/drafts/${id}/update`,
    { method: "PATCH", body: payload },
  );
}

export function publishAnnouncement(id: string) {
  return apiClient<ApiEnvelope<Announcement & { notifiedCustomers: number }>>(
    `/announcements/drafts/${id}/publish`,
    { method: "PATCH" },
  );
}

export function deleteAnnouncement(id: string) {
  return apiClient(`/announcements/publish/${id}`, { method: "DELETE" });
}

/* ---------- Public viewer (every role) ---------- */

export async function getPublicAnnouncements(
  params?: GetAllAnnouncementsQuery,
): Promise<GetAllAnnouncementsResponse> {
  const res = await apiClient<GetAllPublicAnnouncementsRawResponse>(
    `/announcements/public-announcements${buildQuery(params)}`,
  );

  return {
    success: res.success,
    statusCode: res.statusCode,
    message: res.message,
    data: res.data.data,
    meta: res.data.meta,
  };
}

export function getPublicAnnouncementById(id: string) {
  return apiClient<ApiEnvelope<Announcement>>(
    `/announcements/public-announcements/${id}`,
  );
}