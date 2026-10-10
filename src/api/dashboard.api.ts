import apiClient from "@/lib/apiClient";
import type {
  AdminDashboardData,
  CustomerDashboardData,
  TechnicianDashboardData,
  ZoneManagerDashboardResponse,
} from "@/types/dashboard.types";

interface ApiEnvelope<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export function getAdminDashboard() {
  return apiClient<ApiEnvelope<AdminDashboardData>>("/dashboard");
}

export function getZoneManagerDashboard() {
  return apiClient<ApiEnvelope<ZoneManagerDashboardResponse>>("/dashboard");
}

export function getTechnicianDashboard() {
  return apiClient<ApiEnvelope<TechnicianDashboardData>>("/dashboard");
}

export function getCustomerDashboard() {
  return apiClient<ApiEnvelope<CustomerDashboardData>>("/dashboard");
}