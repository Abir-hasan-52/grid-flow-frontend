import apiClient from "@/lib/apiClient";
import type {
  CreateSchedulePayload,
  GetAllSchedulesQuery,
  GetAllSchedulesResponse,
  LoadSheddingSchedule,
  UpdateSchedulePayload,
} from "@/types";

interface ApiEnvelope<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

const BASE = "/load-shedding-schedules";

function buildQuery(params?: object) {
  const searchParams = new URLSearchParams();
  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value !== undefined && value !== "") searchParams.set(key, String(value));
  });
  const query = searchParams.toString();
  return query ? `?${query}` : "";
}

export function getAllSchedules(params?: GetAllSchedulesQuery) {
  return apiClient<GetAllSchedulesResponse>(`${BASE}/get-all${buildQuery(params)}`);
}

export function getScheduleById(id: string) {
  return apiClient<ApiEnvelope<LoadSheddingSchedule>>(`${BASE}/single/${id}`);
}

export function createSchedule(payload: CreateSchedulePayload) {
  return apiClient<ApiEnvelope<LoadSheddingSchedule>>(`${BASE}/create`, {
    method: "POST",
    body: payload,
  });
}

export function updateSchedule(id: string, payload: UpdateSchedulePayload) {
  return apiClient<ApiEnvelope<LoadSheddingSchedule>>(`${BASE}/update/${id}`, {
    method: "PATCH",
    body: payload,
  });
}

export function approveSchedule(id: string) {
  return apiClient<ApiEnvelope<LoadSheddingSchedule>>(`${BASE}/${id}/approve`, {
    method: "PATCH",
  });
}

export function cancelSchedule(id: string) {
  return apiClient<ApiEnvelope<LoadSheddingSchedule>>(`${BASE}/${id}/cancel`, {
    method: "PATCH",
  });
}