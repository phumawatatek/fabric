'use client'

import MainLayout from '@/components/MainLayout'

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Demo mode - no auth required
  return <MainLayout>{children}</MainLayout>
}
