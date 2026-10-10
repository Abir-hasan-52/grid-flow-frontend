import { PaginationMeta } from "./infrastructure.type";
import { JobPostStatus } from "./job-post.type";

export type ApplicationStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface TechnicianApplication {
  id: string;
  jobPostId: string;
  applicantId: string;
  experience: string | null;
  resumeUrl: string;
  status: ApplicationStatus;
  rejectionReason: string | null;
  reviewedById: string | null;
  reviewedAt: string | null;
  createdAt: string;
  jobPost: {
    id: string;
    title: string;
    status: JobPostStatus;
    powerZoneId?: string | null;
    salary?: number | null;
    workingHours?: string | null;
  };
  applicant?: { id: string; name: string; email: string; phone: string | null };
  reviewedBy?: { id: string; name: string } | null;
}

export interface GetMyApplicationsQuery {
  page?: number;
  limit?: number;
}

export interface GetAllApplicationsAdminQuery {
  page?: number;
  limit?: number;
  status?: ApplicationStatus;
  jobPostId?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface GetAllApplicationsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: TechnicianApplication[];
  meta: PaginationMeta;
}