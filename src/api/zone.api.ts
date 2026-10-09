import apiClient from "@/lib/apiClient";
import type {
  CreateZonePayload,
  GetAllZonesQuery,
  GetAllZonesResponse,
  UpdateZonePayload,
  Zone,
} from "@/types";

function buildQuery(params?: GetAllZonesQuery) {
  const searchParams = new URLSearchParams();

  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.limit) searchParams.set("limit", String(params.limit));
  if (params?.search) searchParams.set("search", params.search);
  if (params?.sortBy) searchParams.set("sortBy", params.sortBy);
  if (params?.sortOrder) searchParams.set("sortOrder", params.sortOrder);

  const query = searchParams.toString();

  return query ? `?${query}` : "";
}

export function getAllZones(params?: GetAllZonesQuery) {
  return apiClient<GetAllZonesResponse>(
    `/zone/all-zones${buildQuery(params)}`,
  );
}

export function getZoneById(id: string) {
  return apiClient<{
    success: boolean;
    statusCode: number;
    message: string;
    data: Zone;
  }>(`/zone/get-zone/${id}`);
}

export function createZone(payload: CreateZonePayload) {
  return apiClient("/zone/create-zone", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateZone(id: string, payload: UpdateZonePayload) {
  return apiClient(`/zone/update-zone/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export function deleteZone(id: string) {
  return apiClient(`/zone/delete-zone/${id}`, {
    method: "DELETE",
  });
}