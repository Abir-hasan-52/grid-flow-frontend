"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "@/api/user-management.api";
import { GetAllUsersQuery } from "@/types";
 

export function useGetAllUsers(params: GetAllUsersQuery) {
  return useQuery({
    queryKey: ["all-users", params],
    queryFn: () => getAllUsers(params),
  });
}