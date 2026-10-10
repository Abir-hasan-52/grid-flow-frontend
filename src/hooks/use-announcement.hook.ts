"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/toast";
import {
  createAnnouncement,
  deleteAnnouncement,
  getAllAnnouncements,
  getAnnouncementById,
  getPublicAnnouncementById,
  getPublicAnnouncements,
  publishAnnouncement,
  updateAnnouncement,
} from "@/api/announcement.api";
import { ApiError } from "@/lib/apiClient";
import type {
  CreateAnnouncementPayload,
  GetAllAnnouncementsQuery,
  UpdateAnnouncementPayload,
} from "@/types";

/* ---------- Management ---------- */

export function useGetAllAnnouncements(params: GetAllAnnouncementsQuery) {
  return useQuery({
    queryKey: ["announcements", params],
    queryFn: () => getAllAnnouncements(params),
  });
}

export function useGetAnnouncementById(id: string, enabled = true) {
  return useQuery({
    queryKey: ["announcement", id],
    queryFn: () => getAnnouncementById(id),
    enabled: !!id && enabled,
  });
}

export function useCreateAnnouncement() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateAnnouncementPayload) => createAnnouncement(payload),
    onSuccess: () => {
      toast.add({ title: "Announcement created as draft", type: "success" });
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },
    onError: (error: ApiError) => {
      toast.add({ title: error.message, type: "error" });
    },
  });
}

export function useUpdateAnnouncement() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateAnnouncementPayload;
    }) => updateAnnouncement(id, payload),
    onSuccess: () => {
      toast.add({ title: "Announcement updated", type: "success" });
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },
    onError: (error: ApiError) => {
      toast.add({ title: error.message, type: "error" });
    },
  });
}

export function usePublishAnnouncement() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => publishAnnouncement(id),
    onSuccess: (res) => {
      toast.add({
        title: `Published — ${res.data.notifiedCustomers} customer(s) notified`,
        type: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
      queryClient.invalidateQueries({ queryKey: ["public-announcements"] });
    },
    onError: (error: ApiError) => {
      toast.add({ title: error.message, type: "error" });
    },
  });
}

export function useDeleteAnnouncement() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAnnouncement,
    onSuccess: () => {
      toast.add({ title: "Announcement deleted", type: "success" });
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },
    onError: (error: ApiError) => {
      toast.add({ title: error.message, type: "error" });
    },
  });
}

/* ---------- Public viewer ---------- */

export function useGetPublicAnnouncements(params: GetAllAnnouncementsQuery) {
  return useQuery({
    queryKey: ["public-announcements", params],
    queryFn: () => getPublicAnnouncements(params),
  });
}

export function useGetPublicAnnouncementById(id: string, enabled = true) {
  return useQuery({
    queryKey: ["public-announcement", id],
    queryFn: () => getPublicAnnouncementById(id),
    enabled: !!id && enabled,
  });
}