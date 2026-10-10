import { PaginationMeta } from "./infrastructure.type";

export type ScheduleStatus = "PENDING" | "APPROVED" | "ACTIVE" | "CANCELLED" | "COMPLETED";
// ^ PENDING/APPROVED/ACTIVE/CANCELLED backend কোডে দেখা গেছে; COMPLETED অনুমান —
//   তোমার Prisma enum-এ actual values confirm করে এই union ঠিক করে নাও।

export interface LoadSheddingSchedule {
  id: string;
  title: string;
  reason: string | null;
  startTime: string;
  endTime: string;
  status: ScheduleStatus;
  powerZoneId: string;
  createdById: string;
  approvedById: string | null;
  approvedAt: string | null;
  createdAt: string;
  powerZone: { id: string; name: string };
  areas: { id: string; name: string }[];
  createdBy?: { id: string; name: string };
  approvedBy?: { id: string; name: string } | null;
  notifiedCustomers?: number; // present on approve/cancel responses
}

export interface CreateSchedulePayload {
  title: string;
  reason?: string;
  startTime: string;
  endTime: string;
  areaIds: string[];
  powerZoneId?: string; // required for ADMIN, ignored for ZONE_MANAGER
}

export interface UpdateSchedulePayload {
  title?: string;
  reason?: string;
  startTime?: string;
  endTime?: string;
  areaIds?: string[];
}

export interface GetAllSchedulesQuery {
  page?: number;
  limit?: number;
  search?: string;
  status?: ScheduleStatus;
  powerZoneId?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface GetAllSchedulesResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: LoadSheddingSchedule[];
  meta: PaginationMeta;
}