"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { activateUser, deleteUser, getAllUsers, getUserById, suspendUser } from "@/api/user-management.api";
import { GetAllUsersQuery } from "@/types";
 

export function useGetAllUsers(params: GetAllUsersQuery) {
  return useQuery({
    queryKey: ["all-users", params],
    queryFn: () => getAllUsers(params),
  });
}


export function useGetUserById(
  id: string,
  enabled = true
) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id),
    enabled: !!id && enabled,
  });
}

export function useSuspendUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: suspendUser,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["all-users"],
      });
    },
  });
}

export function useActivateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: activateUser,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["all-users"],
      });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["all-users"],
      });
    },
  });
}