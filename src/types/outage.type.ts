import { PaginationMeta } from "./infrastructure.type";

export type OutageStatus =
  | "REPORTED"
  | "VERIFIED"
  | "ASSIGNED"
  | "IN_PROGRESS"
  | "RESTORED"
  | "CLOSED";

export interface Outage {
  id: string;
  feederId: string;
  status: OutageStatus;
  verifiedById: string | null;
  verifiedAt: string | null;
  closedAt: string | null;
  createdAt: string;
  feeder: {
    id: string;
    name: string;
    substation?: { powerZone: { id: string; name: string } };
  };
  verifiedBy?: { id: string; name: string } | null;
  _count?: { reports: number; assignments: number };
  notifiedCustomers?: number; // present on verify/close/manual-create responses
}

export interface OutageReport {
  id: string;
  customerId: string;
  outageId: string;
  description: string | null;
  createdAt: string;
  outage?: { id: string; status: OutageStatus; createdAt: string; closedAt: string | null };
  customer?: { id: string; name: string; email: string; phone: string | null };
}

export interface OutageWithReports extends Outage {
  reports: OutageReport[];
}

export interface CreateOutageReportPayload {
  description?: string;
}

export interface CreateManualOutagePayload {
  feederId: string;
}

export interface GetAllOutagesQuery {
  page?: number;
  limit?: number;
  search?: string;
  status?: OutageStatus;
  feederId?: string;
  powerZoneId?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface GetMyReportsQuery {
  page?: number;
  limit?: number;
}

export interface GetAllOutagesResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Outage[];
  meta: PaginationMeta;
}

export interface GetMyReportsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: OutageReport[];
  meta: PaginationMeta;
}