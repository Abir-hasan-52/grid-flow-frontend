"use client";

import { useState } from "react";
import {
  Dialog, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useApplyForJob } from "@/hooks";

const MAX_RESUME_SIZE_MB = 5;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobPostId: string;
  jobTitle: string;
}

export default function ApplyJobDialog({ open, onOpenChange, jobPostId, jobTitle }: Props) {
  const [experience, setExperience] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");

  const mutation = useApplyForJob();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    if (file && file.size > MAX_RESUME_SIZE_MB * 1024 * 1024) {
      setFileError(`Resume must be under ${MAX_RESUME_SIZE_MB}MB`);
      setResume(null);
      return;
    }
    setFileError("");
    setResume(file);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!resume) {
      setFileError("Resume is required");
      return;
    }

    mutation.mutate(
      { jobPostId, payload: { experience: experience.trim() || undefined, resume } },
      {
        onSuccess: () => {
          onOpenChange(false);
          setExperience("");
          setResume(null);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Apply for &ldquo;{jobTitle}&rdquo;</DialogTitle>
            <DialogDescription>
              Upload your resume (PDF/DOC) and tell us about your experience.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-5">
            <div className="space-y-1.5">
              <label htmlFor="resume" className="text-sm font-medium">Resume</label>
              <input
                id="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="block w-full text-sm file:mr-3 file:rounded-md file:border file:bg-background file:px-3 file:py-1.5 file:text-sm"
              />
              {fileError ? <p className="text-xs text-destructive">{fileError}</p> : null}
            </div>

            <Textarea
              placeholder="Relevant experience (optional)"
              rows={4}
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!resume || mutation.isPending}>
              {mutation.isPending ? "Submitting..." : "Submit Application"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}