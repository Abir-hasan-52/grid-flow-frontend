"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  useDeleteJobPost, useGetAllJobPostsAdmin, usePublishJobPost, useCloseJobPost,
} from "@/hooks";
import type { JobPost, JobPostStatus } from "@/types";
import JobPostDialog from "./JobPostDialog";
import JobPostTable from "./JobPostTable";
import JobPostDetailDialog from "./JobPostDetailDialog";
import InfrastructurePagination from "../Infrastructure/InfrastructurePagination";

export default function JobPostSection() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<JobPostStatus>();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [editing, setEditing] = useState<JobPost | null>(null);
  const [viewing, setViewing] = useState<JobPost | null>(null);

  const { data, isPending } = useGetAllJobPostsAdmin({
    page, limit: 10, search: search || undefined, status,
  });

  const publishMutation = usePublishJobPost();
  const closeMutation = useCloseJobPost();
  const deleteMutation = useDeleteJobPost();

  const jobPosts = data?.data ?? [];
  const meta = data?.meta;

  const handlePublish = (j: JobPost) => {
    if (!window.confirm(`Publish "${j.title}"?`)) return;
    publishMutation.mutate(j.id);
  };

  const handleClose = (j: JobPost) => {
    if (!window.confirm(`Close "${j.title}"? No more applications will be accepted.`)) return;
    closeMutation.mutate(j.id);
  };

  const handleDelete = (j: JobPost) => {
    if (!window.confirm(`Delete "${j.title}"?`)) return;
    deleteMutation.mutate(j.id);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Job Posts</h2>
          <p className="text-sm text-muted-foreground">
            Post technician openings and manage applications.
          </p>
        </div>
        <Button onClick={() => { setEditing(null); setDialogOpen(true); }}>
          <Plus /> New Job Post
        </Button>
      </div>

      <div className="flex flex-col gap-3 lg:flex-row">
        <Input
          placeholder="Search job posts..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="lg:max-w-sm"
        />
        <Select
          value={status ?? "ALL"}
          onValueChange={(v) => { setStatus(v === "ALL" ? undefined : (v as JobPostStatus)); setPage(1); }}
        >
          <SelectTrigger className="w-full lg:w-[160px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Statuses</SelectItem>
            <SelectItem value="DRAFT">Draft</SelectItem>
            <SelectItem value="PUBLISHED">Published</SelectItem>
            <SelectItem value="CLOSED">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-hidden rounded-xl border bg-background">
        <JobPostTable
          jobPosts={jobPosts}
          isPending={isPending}
          onView={(j) => { setViewing(j); setDetailOpen(true); }}
          onEdit={(j) => { setEditing(j); setDialogOpen(true); }}
          onPublish={handlePublish}
          onClose={handleClose}
          onDelete={handleDelete}
        />
        {meta && meta.totalPages > 0 && (
          <InfrastructurePagination meta={meta} onPageChange={setPage} />
        )}
      </div>

      <JobPostDialog open={dialogOpen} onOpenChange={setDialogOpen} jobPost={editing} />
      <JobPostDetailDialog open={detailOpen} onOpenChange={setDetailOpen} jobPost={viewing} />
    </div>
  );
}