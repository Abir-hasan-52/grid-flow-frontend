import { PaginationMeta } from "./infrastructure.type";

export type AnnouncementType = "GENERAL" | "MAINTENANCE" | "EMERGENCY"|"LOAD_SHEDDING";
 
 

export type AnnouncementStatus = "DRAFT" | "PUBLISHED";

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: AnnouncementType;
  status: AnnouncementStatus;
  powerZoneId: string | null;
  createdById: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  powerZone: { id: string; name: string } | null;
  createdBy?: { id: string; name: string };
}

export interface GetAllAnnouncementsQuery {
  page?: number;
  limit?: number;
  search?: string;
  type?: AnnouncementType;
  status?: AnnouncementStatus;
  powerZoneId?: string;
  sortBy?: "createdAt" | "updatedAt" | "title";
  sortOrder?: "asc" | "desc";
}

export interface CreateAnnouncementPayload {
  title: string;
  content: string;
  type?: AnnouncementType;
  powerZoneId?: string;
}

export interface UpdateAnnouncementPayload {
  title?: string;
  content?: string;
  type?: AnnouncementType;
  powerZoneId?: string;
}

export interface GetAllAnnouncementsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Announcement[];
  meta: PaginationMeta;
}

 
export interface GetAllPublicAnnouncementsRawResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    meta: PaginationMeta;
    data: Announcement[];
  };
}