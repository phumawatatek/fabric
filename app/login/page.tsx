'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AlertCircle } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const { login, isLoading } = useAuth()
  
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  // Static values - don't use new Date() to avoid hydration issues
  const currentShift = 'Shift 1'
  const currentTime = '09:30:00'
  const currentDate = '01/03/2026'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    try {
      await login(code, password)
      if (rememberMe) {
        localStorage.setItem('tcms_remember_code', code)
      }
      router.push('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 70px)`
        }}></div>
      </div>

      {/* Shift info banner */}
      <div className="absolute top-0 left-0 right-0 bg-blue-600 bg-opacity-20 border-b border-blue-500 py-2 px-4">
        <div className="max-w-md mx-auto flex justify-between text-sm text-blue-100">
          <span>Shift: <strong>{currentShift}</strong></span>
          <span>{currentTime}</span>
          <span>{currentDate}</span>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo area */}
        <div className="text-center mb-8 pt-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg mb-4">
            <div className="text-2xl font-bold text-white">T</div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">TCMS</h1>
          <p className="text-slate-400">Trutzschler Carding Management System</p>
        </div>

        {/* Login form card */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg shadow-2xl p-8 space-y-6">
          <h2 className="text-2xl font-bold text-white">Đăng Nhập</h2>

          {error && (
            <div className="flex items-center gap-3 bg-red-500 bg-opacity-20 border border-red-500 text-red-200 px-4 py-3 rounded-lg">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-slate-300 mb-2">
                Mã Nhân Viên
              </label>
              <Input
                id="code"
                type="text"
                placeholder="VD: EMP001"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                disabled={isLoading}
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                autoFocus
              />
              <p className="text-xs text-slate-400 mt-1">Demo: EMP001, EMP002, EMP003, ADMIN001, MGR001</p>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                Mật Khẩu
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
              />
              <p className="text-xs text-slate-400 mt-1">Demo: password123</p>
            </div>

            <div className="flex items-center gap-2">
              <input
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-blue-600 cursor-pointer"
              />
              <label htmlFor="remember" className="text-sm text-slate-300 cursor-pointer">
                Nhớ đăng nhập
              </label>
            </div>

            <Button
              type="submit"
              disabled={isLoading || !code || !password}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2"
            >
              {isLoading ? 'Đang xử lý...' : 'Đăng Nhập'}
            </Button>
          </form>

          <div className="text-center pt-4 border-t border-slate-700">
            <a href="#" className="text-sm text-blue-400 hover:text-blue-300">
              Quên mật khẩu?
            </a>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center mt-8 text-slate-400 text-xs space-y-1">
          <p>Hệ Thống Quản Lý Dây Chuyền Trutzschler</p>
          <p>Version 1.0.0 | © 2024 Factory Management</p>
        </div>
      </div>
    </div>
  )
}
