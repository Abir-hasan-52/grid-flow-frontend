"use client";

import { Activity, AlertTriangle, DollarSign, Mail, Users, Zap } from "lucide-react";
 
import { Skeleton } from "@/components/ui/skeleton";
import { useAdminDashboard } from "@/hooks/use-dashboard.hook";
import StatCard from "@/components/dashboard-overview/StatCard";
import StatusBreakdown from "@/components/dashboard-overview/StatusBreakdown";

export default function AdminDashboardPage() {
  const { data, isPending } = useAdminDashboard();
  const d = data?.data;

  if (isPending) {
    return (
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {["customers", "technicians", "zone-managers", "admins", "zones", "substations", "feeders", "areas"].map((key) => (
          <Skeleton key={key} className="h-28 w-full" />
        ))}
      </div>
    );
  }

  if (!d) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">System-wide overview</p>
      </div>

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Customers"
          value={d.users.customers}
          hint={`+${d.users.newCustomersThisMonth} this month`}
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          label="Technicians"
          value={d.users.technicians}
          hint={`+${d.users.newTechniciansThisMonth} this month`}
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard label="Zone Managers" value={d.users.zoneManagers} icon={<Users className="h-4 w-4 text-muted-foreground" />} />
        <StatCard label="Admins" value={d.users.admins} icon={<Users className="h-4 w-4 text-muted-foreground" />} />
      </section>

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Zones" value={d.infrastructure.zones} icon={<Zap className="h-4 w-4 text-muted-foreground" />} />
        <StatCard label="Substations" value={d.infrastructure.substations} icon={<Zap className="h-4 w-4 text-muted-foreground" />} />
        <StatCard label="Feeders" value={d.infrastructure.feeders} icon={<Zap className="h-4 w-4 text-muted-foreground" />} />
        <StatCard label="Areas" value={d.infrastructure.areas} icon={<Zap className="h-4 w-4 text-muted-foreground" />} />
      </section>

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total Outages" value={d.outages.total} icon={<Activity className="h-4 w-4 text-muted-foreground" />} />
        <StatCard label="Open Outages" value={d.outages.open} icon={<Activity className="h-4 w-4 text-muted-foreground" />} />
        <StatCard
          label="Avg. Restoration"
          value={d.outages.avgRestorationMinutes !== null ? `${d.outages.avgRestorationMinutes} min` : "—"}
          icon={<Activity className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          label="SLA Breaches (24h+)"
          value={d.outages.slaBreachCount}
          icon={<AlertTriangle className="h-4 w-4 text-destructive" />}
        />
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <StatusBreakdown title="Outages by Status" items={d.outages.byStatus} />
        <div className="rounded-xl border bg-background p-5">
          <p className="mb-3 text-sm font-medium">Top Zones by Outages</p>
          <div className="space-y-2">
            {d.outages.topZonesByOutages.map((zone) => (
              <div key={zone.zoneId} className="flex items-center justify-between text-sm">
                <span>{zone.zoneName}</span>
                <span className="font-medium">{zone.outageCount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Load Shedding Schedules" value={d.loadShedding.total} />
        <StatCard label="Assignments" value={d.assignments.total} />
        <StatCard
          label="Acceptance Rate"
          value={d.assignments.acceptanceRatePercent !== null ? `${d.assignments.acceptanceRatePercent}%` : "—"}
        />
        <StatCard
          label="Priority Revenue"
          value={`৳${d.priorityRestoration.totalRevenue}`}
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
        />
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <StatusBreakdown title="Load Shedding by Status" items={d.loadShedding.byStatus} />
        <StatusBreakdown title="Assignments by Status" items={d.assignments.byStatus} />
      </div>

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Job Posts"
          value={d.jobs.totalJobPosts}
          hint={`${d.jobs.publishedJobPosts} published`}
        />
        <StatCard
          label="Applications"
          value={d.jobs.totalApplications}
          hint={`${d.jobs.pendingApplications} pending`}
        />
        <StatCard
          label="Priority Requests"
          value={d.priorityRestoration.totalRequests}
          hint={`${d.priorityRestoration.approvedRequests} approved`}
        />
        <StatCard
          label="Emails Sent"
          value={d.systemHealth.emailsByStatus.find((e) => e.status === "SENT")?._count ?? 0}
          icon={<Mail className="h-4 w-4 text-muted-foreground" />}
        />
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <StatusBreakdown title="Announcements by Status" items={d.announcements.byStatus} />
        <StatusBreakdown title="Announcements by Type" items={d.announcements.byType} />
      </div>
    </div>
  );
}