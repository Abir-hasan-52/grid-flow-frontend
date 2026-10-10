import PublicAnnouncementList from "@/components/Announcement/PublicAnnouncementList";

export default function CustomerAnnouncementsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Announcements</h1>
        <p className="text-muted-foreground">Updates from your utility provider.</p>
      </div>
      <PublicAnnouncementList />
    </div>
  );
}