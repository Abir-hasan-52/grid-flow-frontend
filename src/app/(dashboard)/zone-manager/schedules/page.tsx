// app/(dashboard)/zone-manager/schedules/page.tsx
"use client";
import ScheduleSection from "@/components/Schedule/ScheduleSection";
import { useGetMe } from "@/hooks";
 

export default function ZoneManagerSchedulesPage() {
  const { data: currentUser } = useGetMe();
  return (
    <ScheduleSection
      isAdmin={false}
      currentUserZoneId={currentUser?.managedZoneId ?? undefined}
    />
  );
}