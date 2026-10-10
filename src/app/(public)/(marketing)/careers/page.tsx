import PublicJobPostList from "@/components/JobPost/PublicJobPostList";

export default function CareersPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-10">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Open Positions</h1>
        <p className="text-muted-foreground">Join our technician team.</p>
      </div>
      <PublicJobPostList />
    </div>
  );
}