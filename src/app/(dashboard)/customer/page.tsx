"use client";

 
 
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useCustomerDashboard } from "@/hooks/use-dashboard.hook";
import StatCard from "@/components/dashboard-overview/StatCard";

export default function CustomerDashboardPage() {
  const { data, isPending } = useCustomerDashboard();
  const d = data?.data;

  if (isPending) {
    return (
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {["reports", "priority-requests", "total-spent", "technician-application"].map((key) => (
          <Skeleton key={key} className="h-28 w-full" />
        ))}
      </div>
    );
  }

  if (!d) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Welcome, {d.accountSummary.name}</h1>
        <p className="text-muted-foreground">
          {d.accountSummary.area ?? "No area set"} &middot; Member since{" "}
          {new Date(d.accountSummary.memberSince).toLocaleDateString()}
        </p>
      </div>

      {d.currentAreaOutage ? (
        <div className="rounded-xl border border-destructive/50 bg-destructive/5 p-5">
          <p className="font-medium text-destructive">An outage is currently active in your area</p>
          <p className="text-sm text-muted-foreground">
            Status: {d.currentAreaOutage.status} &middot; Reported{" "}
            {new Date(d.currentAreaOutage.createdAt).toLocaleString()}
          </p>
        </div>
      ) : null}

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Outage Reports" value={d.reports.total} />
        <StatCard
          label="Priority Requests"
          value={d.priorityRequests.total}
          hint={`${d.priorityRequests.approved} approved`}
        />
        <StatCard label="Total Spent" value={`৳${d.totalSpent}`} />
        <StatCard
          label="Technician Application"
          value={d.technicianApplicationStatus?.status ?? "Not applied"}
        />
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border bg-background p-5">
          <p className="mb-3 text-sm font-medium">Recent Announcements</p>
          {d.recentAnnouncements.length === 0 ? (
            <p className="text-sm text-muted-foreground">No announcements</p>
          ) : (
            <div className="space-y-2">
              {d.recentAnnouncements.map((a) => (
                <div key={a.id} className="flex items-center justify-between text-sm">
                  <span>{a.title}</span>
                  <Badge variant="outline">{a.type}</Badge>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-xl border bg-background p-5">
          <p className="mb-3 text-sm font-medium">Upcoming Load Shedding</p>
          {d.upcomingLoadShedding.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nothing scheduled</p>
          ) : (
            <div className="space-y-2">
              {d.upcomingLoadShedding.map((s) => (
                <div key={s.id} className="flex items-center justify-between text-sm">
                  <span>{s.title}</span>
                  <span className="text-muted-foreground">
                    {new Date(s.startTime).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="rounded-xl border bg-background p-5">
        <p className="mb-3 text-sm font-medium">Payment History</p>
        {d.paymentHistory.length === 0 ? (
          <p className="text-sm text-muted-foreground">No payments yet</p>
        ) : (
          <div className="space-y-2">
            {d.paymentHistory.map((p) => (
              <div key={p.id} className="flex items-center justify-between text-sm">
                <span>{p.transactionId ?? "—"}</span>
                <span>৳{p.amount}</span>
                <Badge variant="outline">{p.status}</Badge>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}