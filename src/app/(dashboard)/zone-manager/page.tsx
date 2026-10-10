"use client";

 
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useZoneManagerDashboard } from "@/hooks/use-dashboard.hook";
import StatCard from "@/components/dashboard-overview/StatCard";
import StatusBreakdown from "@/components/dashboard-overview/StatusBreakdown";

export default function ZoneManagerDashboardPage() {
  const { data, isPending } = useZoneManagerDashboard();
  const d = data?.data;

  if (isPending) {
    return (
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {["substations", "feeders", "areas", "technicians", "total-outages", "open-outages", "restoration", "announcements"].map((key) => (
          <Skeleton key={key} className="h-28 w-full" />
        ))}
      </div>
    );
  }

  if (!d) return null;

  if ("error" in d) {
    return (
      <div className="rounded-xl border bg-background p-8 text-center text-muted-foreground">
        {d.error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{d.zone.name}</h1>
        <p className="text-muted-foreground">Zone overview</p>
      </div>

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Substations" value={d.infrastructure.substations} />
        <StatCard label="Feeders" value={d.infrastructure.feeders} />
        <StatCard label="Areas" value={d.infrastructure.areas} />
        <StatCard label="Technicians" value={d.infrastructure.technicians} />
      </section>

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total Outages" value={d.outages.total} />
        <StatCard label="Open Outages" value={d.outages.open} />
        <StatCard
          label="Avg. Restoration"
          value={d.outages.avgRestorationMinutes !== null ? `${d.outages.avgRestorationMinutes} min` : "—"}
        />
        <StatCard label="Announcements" value={d.announcementCount} />
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <StatusBreakdown title="Outages by Status" items={d.outages.byStatus} />
        <div className="rounded-xl border bg-background p-5">
          <p className="mb-3 text-sm font-medium">Recent Outages</p>
          {d.outages.recentOutages.length === 0 ? (
            <p className="text-sm text-muted-foreground">No recent outages</p>
          ) : (
            <div className="space-y-2">
              {d.outages.recentOutages.map((outage) => (
                <div key={outage.id} className="flex items-center justify-between text-sm">
                  <span>{outage.feeder.name}</span>
                  <Badge variant="outline">{outage.status}</Badge>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Pending Schedules" value={d.loadShedding.pendingApproval} />
        <StatCard label="Approved Schedules" value={d.loadShedding.approved} />
        <StatCard label="Assignments" value={d.assignments.total} />
        <StatCard label="Zone Revenue" value={`৳${d.priorityRestoration.zoneRevenue}`} />
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <StatusBreakdown title="Assignments by Status" items={d.assignments.byStatus} />
        <div className="rounded-xl border bg-background p-5">
          <p className="mb-3 text-sm font-medium">Technician Workload</p>
          {d.technicianWorkload.length === 0 ? (
            <p className="text-sm text-muted-foreground">No technicians in this zone</p>
          ) : (
            <div className="space-y-2">
              {d.technicianWorkload.map((tech) => (
                <div key={tech.technicianId} className="flex items-center justify-between text-sm">
                  <span>{tech.name}</span>
                  <Badge variant="secondary">{tech.activeAssignments} active</Badge>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}