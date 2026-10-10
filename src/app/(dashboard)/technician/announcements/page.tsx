import PublicAnnouncementList from "@/components/Announcement/PublicAnnouncementList";

export default function TechnicianAnnouncementsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Announcements</h1>
        <p className="text-muted-foreground">Updates for your assigned zone.</p>
      </div>
      <PublicAnnouncementList />
    </div>
  );
}