import apiClient from "@/lib/apiClient";
import { GetAllUsersQuery, GetAllUsersResponse } from "@/types";
 

export function getAllUsers(params?: GetAllUsersQuery) {
  return apiClient<GetAllUsersResponse>(
    "/admin/users/all-users",
    {
      params,
    }
  );
}