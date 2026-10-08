import apiClient from "@/lib/apiClient";
import { GetAllUsersQuery, GetAllUsersResponse, GetUserByIdResponse } from "@/types";

// import type {
//   GetAllUsersQuery,
//   GetAllUsersResponse,
//   GetUserByIdResponse,
// } from "@/types/user-management";

export function getAllUsers(params?: GetAllUsersQuery) {
  return apiClient<GetAllUsersResponse>(
    "/admin/users/all-users",
    {
      params,
    }
  );
}

export function getUserById(id: string) {
  return apiClient<GetUserByIdResponse>(
    `/admin/users/${id}`
  );
}

export function suspendUser(id: string) {
  return apiClient(
    `/admin/users/${id}/suspend`,
    {
      method: "PATCH",
    }
  );
}

export function activateUser(id: string) {
  return apiClient(
    `/admin/users/${id}/activate`,
    {
      method: "PATCH",
    }
  );
}

export function deleteUser(id: string) {
  return apiClient(
    `/admin/users/${id}/delete`,
    {
      method: "DELETE",
    }
  );
}