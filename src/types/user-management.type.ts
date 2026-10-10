 
import { SortOrder } from "./infrastructure.type";
import { UserRole } from "./user.type";


export type UserStatus =
  | "ACTIVE"
  | "SUSPENDED"
  | "DELETED";

export type UserSortBy =
  | "name"
  | "email"
  | "createdAt"
  | "updatedAt"
  | "role"
  | "status";

 
// export type SortOrder = "asc" | "desc";

export interface GetAllUsersQuery {
  page?: number;
  limit?: number;
  search?: string;
  role?: UserRole;
  status?: UserStatus;
  sortBy?: UserSortBy;
  sortOrder?: SortOrder;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: UserRole;
  status: UserStatus;
  isActive: boolean;
  authProvider: "CREDENTIAL" | "GOOGLE";
  emailVerified: boolean;
  emailVerifiedAt: string | null;
  managedZoneId: string | null;
  areaId: string | null;
  technicianZoneId: string | null;
  ImageUrl: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  canChangePassword: boolean;
}

export interface GetAllUsersResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    data: User[];
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPage: number;
    };
  };
}


export interface GetUserByIdResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: User;
}

export interface CreateAdminPayload {
  name: string;
  email: string;
}

export interface CreateZoneManagerPayload {
  name: string;
  email: string;
  managedZoneId: string;
}

export interface CreatedUser {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "ZONE_MANAGER" | "TECHNICIAN" | "CUSTOMER";
  status: "ACTIVE" | "SUSPENDED" | "DELETED";
  managedZoneId?: string | null;
  emailVerified: boolean;
  createdAt: string;
}