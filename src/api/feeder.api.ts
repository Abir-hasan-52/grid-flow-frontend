import apiClient from "@/lib/apiClient";
import type {
  CreateFeederPayload,
  Feeder,
  GetAllFeedersQuery,
  GetAllFeedersResponse,
  UpdateFeederPayload,
} from "@/types";

function buildQuery(params?: GetAllFeedersQuery) {
  const searchParams = new URLSearchParams();

  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.limit) searchParams.set("limit", String(params.limit));
  if (params?.search) searchParams.set("search", params.search);
  if (params?.substationId) {
    searchParams.set("substationId", params.substationId);
  }
  if (params?.sortBy) searchParams.set("sortBy", params.sortBy);
  if (params?.sortOrder) searchParams.set("sortOrder", params.sortOrder);

  const query = searchParams.toString();

  return query ? `?${query}` : "";
}

export function getAllFeeders(params?: GetAllFeedersQuery) {
  return apiClient<GetAllFeedersResponse>(
    `/feeder/all-feeders${buildQuery(params)}`,
  );
}

export function getFeederById(id: string) {
  return apiClient<{
    success: boolean;
    statusCode: number;
    message: string;
    data: Feeder;
  }>(`/feeder/get-feeder/${id}`);
}

export function createFeeder(payload: CreateFeederPayload) {
  return apiClient("/feeder/create-feeder", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateFeeder(id: string, payload: UpdateFeederPayload) {
  return apiClient(`/feeder/update-feeder/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export function deleteFeeder(id: string) {
  return apiClient(`/feeder/delete-feeder/${id}`, {
    method: "DELETE",
  });
}