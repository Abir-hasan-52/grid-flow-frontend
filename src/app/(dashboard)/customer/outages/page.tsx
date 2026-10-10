// app/(dashboard)/customer/outages/page.tsx
import ReportOutageDialog from "@/components/Outage/ReportOutageDialog";
import MyOutageReportsList from "@/components/Outage/MyOutageReportsList";

export default function CustomerOutagesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Outage Reports</h1>
          <p className="text-muted-foreground">Report an outage or check your past reports.</p>
        </div>
        <ReportOutageDialog />
      </div>
      <MyOutageReportsList />
    </div>
  );
}