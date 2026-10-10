"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getAdminDashboard,
  getCustomerDashboard,
  getTechnicianDashboard,
  getZoneManagerDashboard,
} from "@/api/dashboard.api";

export function useAdminDashboard() {
  return useQuery({
    queryKey: ["dashboard", "admin"],
    queryFn: getAdminDashboard,
  });
}

export function useZoneManagerDashboard() {
  return useQuery({
    queryKey: ["dashboard", "zone-manager"],
    queryFn: getZoneManagerDashboard,
  });
}

export function useTechnicianDashboard() {
  return useQuery({
    queryKey: ["dashboard", "technician"],
    queryFn: getTechnicianDashboard,
  });
}

export function useCustomerDashboard() {
  return useQuery({
    queryKey: ["dashboard", "customer"],
    queryFn: getCustomerDashboard,
  });
}