import apiClient from "@/lib/apiClient";
import type {
  CreateManualOutagePayload,
  CreateOutageReportPayload,
  GetAllOutagesQuery,
  GetAllOutagesResponse,
  GetMyReportsQuery,
  GetMyReportsResponse,
  Outage,
  OutageWithReports,
} from "@/types";

interface ApiEnvelope<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

const BASE = "/outages";

function buildQuery(params?: object) {
  const searchParams = new URLSearchParams();
  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value !== undefined && value !== "") searchParams.set(key, String(value));
  });
  const query = searchParams.toString();
  return query ? `?${query}` : "";
}

/* ---------- Customer ---------- */

export function reportOutage(payload: CreateOutageReportPayload) {
  return apiClient<ApiEnvelope<{ outage: Outage; merged: boolean }>>(`${BASE}/report`, {
    method: "POST",
    body: payload,
  });
}

export function getMyReports(params?: GetMyReportsQuery) {
  return apiClient<GetMyReportsResponse>(`${BASE}/my-reports${buildQuery(params)}`);
}

/* ---------- Admin / Zone Manager ---------- */

export function getAllOutages(params?: GetAllOutagesQuery) {
  return apiClient<GetAllOutagesResponse>(`${BASE}/all-reports${buildQuery(params)}`);
}

export function getOutageById(id: string) {
  return apiClient<ApiEnvelope<OutageWithReports>>(`${BASE}/single-outage/${id}`);
}

export function createManualOutage(payload: CreateManualOutagePayload) {
  return apiClient<ApiEnvelope<Outage>>(`${BASE}/manual`, {
    method: "POST",
    body: payload,
  });
}

export function verifyOutage(id: string) {
  return apiClient<ApiEnvelope<Outage>>(`${BASE}/reports/${id}/verify`, {
    method: "PATCH",
  });
}

export function closeOutage(id: string) {
  return apiClient<ApiEnvelope<Outage>>(`${BASE}/close/${id}`, {
    method: "PATCH",
  });
}