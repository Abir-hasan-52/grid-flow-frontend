import RoleGuard from '@/components/auth/role-guard';
import DashboardShell from '@/components/dashboard/dashboard-shell';
 
import React from 'react'

export default function layout({children}:{children: React.ReactNode}) {
  return (
    < RoleGuard roles={["TECHNICIAN"]}>
      <DashboardShell {...({ role: 'TECHNICIAN' } as const)}>
        {children}
      </DashboardShell>
    </RoleGuard >
  )
}
