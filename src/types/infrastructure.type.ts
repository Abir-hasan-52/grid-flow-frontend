export type SortOrder = "asc" | "desc";

export type ZoneSortBy = "name" | "createdAt" | "updatedAt";
export type SubstationSortBy = "name" | "createdAt" | "updatedAt";
export type FeederSortBy = "name" | "createdAt" | "updatedAt";
export type AreaSortBy = "name" | "createdAt" | "updatedAt";

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/* =========================
   ZONE
========================= */

export interface Zone {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  _count: {
    substations: number;
    managers: number;
  };
}

export interface GetAllZonesQuery {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: ZoneSortBy;
  sortOrder?: SortOrder;
}

export interface GetAllZonesResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Zone[];
  meta: PaginationMeta;
}

/* =========================
   SUBSTATION
========================= */

export interface Substation {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  powerZoneId: string;
  powerZone: {
    id: string;
    name: string;
  };
  _count: {
    feeders: number;
  };
}

export interface GetAllSubstationsQuery {
  page?: number;
  limit?: number;
  search?: string;
  powerZoneId?: string;
  sortBy?: SubstationSortBy;
  sortOrder?: SortOrder;
}

export interface GetAllSubstationsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Substation[];
  meta: PaginationMeta;
}

/* =========================
   FEEDER
========================= */

export interface Feeder {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  substationId: string;
  substation: {
    id: string;
    name: string;
  };
  _count: {
    areas: number;
    outages: number;
  };
}

export interface GetAllFeedersQuery {
  page?: number;
  limit?: number;
  search?: string;
  substationId?: string;
  sortBy?: FeederSortBy;
  sortOrder?: SortOrder;
}

export interface GetAllFeedersResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Feeder[];
  meta: PaginationMeta;
}

/* =========================
   AREA
========================= */

export interface Area {
  id: string;
  name: string;
  feederId: string;
  createdAt: string;
  updatedAt: string;
  feeder: {
    id: string;
    name: string;
  };
  _count: {
    customers: number;
  };
}

export interface GetAllAreasQuery {
  page?: number;
  limit?: number;
  search?: string;
  feederId?: string;
  sortBy?: AreaSortBy;
  sortOrder?: SortOrder;
}

export interface GetAllAreasResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Area[];
  meta: PaginationMeta;
}

/* =========================
   CREATE / UPDATE
========================= */

export interface CreateZonePayload {
  name: string;
}

export interface UpdateZonePayload {
  name?: string;
}

export interface CreateSubstationPayload {
  name: string;
  powerZoneId: string;
}

export interface UpdateSubstationPayload {
  name?: string;
  powerZoneId?: string;
}

export interface CreateFeederPayload {
  name: string;
  substationId: string;
}

export interface UpdateFeederPayload {
  name?: string;
  substationId?: string;
}

export interface CreateAreaPayload {
  name: string;
  feederId: string;
}

export interface UpdateAreaPayload {
  name?: string;
  feederId?: string;
}