"use client";

 
 
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useTechnicianDashboard } from "@/hooks/use-dashboard.hook";
import StatCard from "@/components/dashboard-overview/StatCard";
import StatusBreakdown from "@/components/dashboard-overview/StatusBreakdown";

export default function TechnicianDashboardPage() {
  const { data, isPending } = useTechnicianDashboard();
  const d = data?.data;

  if (isPending) {
    return (
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {["priority", "updates", "completed", "rejection"].map((key) => (
          <Skeleton key={key} className="h-28 w-full" />
        ))}
      </div>
    );
  }

  if (!d) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Dashboard</h1>
        <p className="text-muted-foreground">Your assignment overview</p>
      </div>

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Priority Assignments" value={d.assignments.priorityCount} />
        <StatCard label="Repair Updates Logged" value={d.totalRepairUpdatesLogged} />
        <StatCard label="Completed This Month" value={d.completedThisMonth} />
        <StatCard
          label="Rejection Rate"
          value={d.rejectionRatePercent !== null ? `${d.rejectionRatePercent}%` : "—"}
        />
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <StatusBreakdown title="Assignments by Status" items={d.assignments.byStatus} />
        <div className="rounded-xl border bg-background p-5">
          <p className="mb-3 text-sm font-medium">Recent Assignments</p>
          {d.recentAssignments.length === 0 ? (
            <p className="text-sm text-muted-foreground">No assignments yet</p>
          ) : (
            <div className="space-y-2">
              {d.recentAssignments.map((assignment) => (
                <div key={assignment.id} className="flex items-center justify-between text-sm">
                  <span>{assignment.outage.feeder.name}</span>
                  <Badge variant="outline">{assignment.outage.status}</Badge>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}