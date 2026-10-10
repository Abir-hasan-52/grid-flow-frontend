import { PaginationMeta } from "./infrastructure.type";

export type JobPostStatus = "DRAFT" | "PUBLISHED" | "CLOSED";

export interface JobPost {
  id: string;
  title: string;
  description: string;
  requirements: string | null;
  deadline: string;
  status: JobPostStatus;
  powerZoneId: string | null;
  powerZone: { id: string; name: string } | null;
  salary: number | null;
  workingHours: string | null;
  createdAt: string;
  updatedAt?: string;
  createdById?: string;
  createdBy?: { id: string; name: string; email: string };
  _count?: { applications: number };
}

export interface GetAllJobPostsQuery {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface GetAllJobPostsAdminQuery extends GetAllJobPostsQuery {
  status?: JobPostStatus;
}

export interface CreateJobPostPayload {
  title: string;
  description: string;
  requirements?: string;
  deadline: string;
  powerZoneId?: string;
  salary?: number;
  workingHours?: string;
}

export interface UpdateJobPostPayload {
  title?: string;
  description?: string;
  requirements?: string;
  deadline?: string;
  powerZoneId?: string;
  salary?: number;
  workingHours?: string;
}

export interface GetAllJobPostsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: JobPost[];
  meta: PaginationMeta;
}