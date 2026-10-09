import apiClient from "@/lib/apiClient";
import type {
  CreateSubstationPayload,
  GetAllSubstationsQuery,
  GetAllSubstationsResponse,
  UpdateSubstationPayload,
  Substation,
} from "@/types";

function buildQuery(params?: GetAllSubstationsQuery) {
  const searchParams = new URLSearchParams();

  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.limit) searchParams.set("limit", String(params.limit));
  if (params?.search) searchParams.set("search", params.search);
  if (params?.powerZoneId) {
    searchParams.set("powerZoneId", params.powerZoneId);
  }
  if (params?.sortBy) searchParams.set("sortBy", params.sortBy);
  if (params?.sortOrder) searchParams.set("sortOrder", params.sortOrder);

  const query = searchParams.toString();

  return query ? `?${query}` : "";
}

export function getAllSubstations(params?: GetAllSubstationsQuery) {
  return apiClient<GetAllSubstationsResponse>(
    `/substation/all-substations${buildQuery(params)}`,
  );
}

export function getSubstationById(id: string) {
  return apiClient<{
    success: boolean;
    statusCode: number;
    message: string;
    data: Substation;
  }>(`/substation/substation/${id}`);
}

export function createSubstation(payload: CreateSubstationPayload) {
  return apiClient("/substation/create-substation", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateSubstation(
  id: string,
  payload: UpdateSubstationPayload,
) {
  return apiClient(`/substation/update-substation/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export function deleteSubstation(id: string) {
  return apiClient(`/substation/delete-substation/${id}`, {
    method: "DELETE",
  });
}