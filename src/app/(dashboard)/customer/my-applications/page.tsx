import MyApplicationsList from "@/components/TechnicianApplication/MyApplicationsList";

export default function MyApplicationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Applications</h1>
        <p className="text-muted-foreground">Track your technician job applications.</p>
      </div>
      <MyApplicationsList />
    </div>
  );
}