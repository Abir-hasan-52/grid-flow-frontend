import apiClient from "@/lib/apiClient";
import type {
  CreateAdminPayload,
  CreatedUser,
  CreateZoneManagerPayload,
} from "@/types";

interface ApiEnvelope<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

// NOTE: adjust the base path below to match wherever AdminUserRoutes is
// mounted in your main router (e.g. "/admin-users" or "/users").
const BASE = "admin/users";

export function createAdmin(payload: CreateAdminPayload) {
  return apiClient<ApiEnvelope<CreatedUser>>(`${BASE}/admin`, {
    method: "POST",
    body: payload,
  });
}

export function createZoneManager(payload: CreateZoneManagerPayload) {
  return apiClient<ApiEnvelope<CreatedUser>>(`${BASE}/zone-manager`, {
    method: "POST",
    body: payload,
  });
}