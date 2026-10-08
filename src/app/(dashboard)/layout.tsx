import AuthGuard from '@/components/auth/auth-guard';
import React, { ReactNode } from 'react'

export default function layout({children}:{children: ReactNode}) {
  return (
    <AuthGuard>
      {children}
    </AuthGuard>
  )
}
