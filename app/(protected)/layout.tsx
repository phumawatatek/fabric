'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { useEffect, useState } from 'react'
import MainLayout from '@/components/MainLayout'

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Force fresh build v4
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // If not loading and no user, redirect to login
    if (!isLoading && !user) {
      router.replace('/login')
    } else if (!isLoading && user) {
      setIsReady(true)
    }
  }, [user, isLoading, router])

  if (isLoading || !isReady) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block">
            <div className="w-12 h-12 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
          <p className="text-slate-400 mt-4">Đang tải...</p>
        </div>
      </div>
    )
  }

  return <MainLayout>{children}</MainLayout>
}
