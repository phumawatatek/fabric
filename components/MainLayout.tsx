'use client'

import { useState, ReactNode } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import {
  Menu,
  X,
  LogOut,
  User,
  Settings,
  BarChart3,
  Zap,
  Users,
  Wrench,
  Package,
  AlertTriangle,
  DollarSign,
  BookOpen,
  Shield,
  Clock,
  Home,
  Gauge,
  TrendingUp,
  AlertCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface NavItem {
  label: string
  href: string
  icon: ReactNode
  badge?: string
  requiredRoles?: string[]
  submenu?: NavItem[]
}

export default function MainLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const canAccess = (requiredRoles?: string[]) => {
    if (!requiredRoles || requiredRoles.length === 0) return true
    return user?.role && requiredRoles.includes(user.role)
  }

  // Navigation structure with all 22 screens organized by module
  const navigationItems: NavItem[] = [
    {
      label: 'Dashboard',
      href: '/',
      icon: <Home className="w-5 h-5" />,
      requiredRoles: ['supervisor', 'manager', 'admin'],
    },
    {
      label: 'Operator',
      href: '/operator',
      icon: <Gauge className="w-5 h-5" />,
      requiredRoles: ['operator', 'supervisor', 'manager', 'admin'],
    },
    {
      label: 'Production',
      href: '#',
      icon: <Package className="w-5 h-5" />,
      requiredRoles: ['operator', 'supervisor', 'manager', 'admin'],
      submenu: [
        {
          label: 'Overview',
          href: '/production',
          icon: <BarChart3 className="w-4 h-4" />,
          requiredRoles: ['supervisor', 'manager', 'admin'],
        },
        {
          label: 'Machine Detail',
          href: '/production/machine',
          icon: <Gauge className="w-4 h-4" />,
          requiredRoles: ['operator', 'supervisor', 'manager', 'admin'],
        },
        {
          label: 'Shift Report',
          href: '/production/shift',
          icon: <Clock className="w-4 h-4" />,
          requiredRoles: ['supervisor', 'manager', 'admin'],
        },
      ],
    },
    {
      label: 'Maintenance',
      href: '#',
      icon: <Wrench className="w-5 h-5" />,
      requiredRoles: ['technician', 'supervisor', 'manager', 'admin'],
      submenu: [
        {
          label: 'Alerts',
          href: '/maintenance/alerts',
          icon: <AlertCircle className="w-4 h-4" />,
          requiredRoles: ['technician', 'supervisor', 'manager', 'admin'],
        },
        {
          label: 'T-CON Monitor',
          href: '/maintenance/tcon',
          icon: <Gauge className="w-4 h-4" />,
          requiredRoles: ['technician', 'supervisor', 'manager', 'admin'],
        },
        {
          label: 'Maintenance Plans',
          href: '/maintenance/plans',
          icon: <Clock className="w-4 h-4" />,
          requiredRoles: ['technician', 'manager', 'admin'],
        },
      ],
    },
    {
      label: 'HR & Payroll',
      href: '#',
      icon: <Users className="w-5 h-5" />,
      requiredRoles: ['manager', 'admin'],
      submenu: [
        {
          label: 'Employees',
          href: '/hr/employees',
          icon: <Users className="w-4 h-4" />,
          requiredRoles: ['manager', 'admin'],
        },
        {
          label: 'Attendance',
          href: '/hr/attendance',
          icon: <Clock className="w-4 h-4" />,
          requiredRoles: ['supervisor', 'manager', 'admin'],
        },
        {
          label: 'Productivity',
          href: '/hr/productivity',
          icon: <TrendingUp className="w-4 h-4" />,
          requiredRoles: ['manager', 'admin'],
        },
        {
          label: 'Payroll',
          href: '/hr/payroll',
          icon: <DollarSign className="w-4 h-4" />,
          requiredRoles: ['manager', 'admin'],
        },
      ],
    },
    {
      label: 'Finance',
      href: '/finance/costs',
      icon: <DollarSign className="w-5 h-5" />,
      requiredRoles: ['manager', 'admin'],
    },
    {
      label: 'Monitoring',
      href: '#',
      icon: <BarChart3 className="w-5 h-5" />,
      requiredRoles: ['supervisor', 'manager', 'admin'],
      submenu: [
        {
          label: 'Energy',
          href: '/energy',
          icon: <Zap className="w-4 h-4" />,
          requiredRoles: ['supervisor', 'manager', 'admin'],
        },
        {
          label: 'Quality',
          href: '/quality',
          icon: <AlertTriangle className="w-4 h-4" />,
          requiredRoles: ['supervisor', 'manager', 'admin'],
        },
      ],
    },
    {
      label: 'Reports',
      href: '#',
      icon: <BookOpen className="w-5 h-5" />,
      requiredRoles: ['operator', 'supervisor', 'manager', 'admin'],
      submenu: [
        {
          label: 'Report Builder',
          href: '/reports',
          icon: <BarChart3 className="w-4 h-4" />,
          requiredRoles: ['supervisor', 'manager', 'admin'],
        },
        {
          label: 'Logbook',
          href: '/reports/logbook',
          icon: <BookOpen className="w-4 h-4" />,
          requiredRoles: ['operator', 'supervisor', 'manager', 'admin'],
        },
      ],
    },
    {
      label: 'Admin',
      href: '#',
      icon: <Shield className="w-5 h-5" />,
      requiredRoles: ['admin', 'manager'],
      submenu: [
        {
          label: 'Settings',
          href: '/admin/settings',
          icon: <Settings className="w-4 h-4" />,
          requiredRoles: ['admin'],
        },
        {
          label: 'Scheduler',
          href: '/admin/scheduler',
          icon: <Clock className="w-4 h-4" />,
          requiredRoles: ['manager', 'admin'],
        },
      ],
    },
  ]

  // Filter navigation by user role
  const filteredNav = navigationItems.filter(canAccess).map(item => ({
    ...item,
    submenu: item.submenu?.filter(canAccess),
  }))

  const isActive = (href: string) => {
    if (href === '#') return false
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <div className="flex h-screen bg-slate-950">
      {/* Mobile menu backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-slate-900 border-r border-slate-800 transform transition-transform duration-300 z-30 lg:relative lg:transform-none overflow-y-auto ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">T</span>
            </div>
            <span className="font-bold text-white hidden sm:inline">TCMS</span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {filteredNav.map((item) => (
            <div key={item.href}>
              {item.submenu ? (
                <details className="group">
                  <summary className="flex items-center justify-between w-full px-3 py-2 text-slate-300 hover:text-white cursor-pointer hover:bg-slate-800 rounded-lg transition-colors">
                    <span className="flex items-center gap-3">
                      {item.icon}
                      <span className="text-sm font-medium">{item.label}</span>
                    </span>
                    <svg
                      className="w-4 h-4 transform transition-transform group-open:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </summary>
                  <div className="ml-3 mt-1 space-y-1 border-l border-slate-700 pl-3">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.href}
                        href={subitem.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
                          isActive(subitem.href)
                            ? 'bg-blue-600 text-white'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800'
                        }`}
                      >
                        {subitem.icon}
                        <span>{subitem.label}</span>
                      </Link>
                    ))}
                  </div>
                </details>
              ) : (
                <Link
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive(item.href)
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {item.icon}
                  <span className="text-sm font-medium">{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* User section */}
        <div className="absolute bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 p-4 space-y-2">
          <Link
            href="/profile"
            className="flex items-center gap-3 w-full px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors text-sm"
          >
            <User className="w-4 h-4" />
            <div className="flex-1">
              <p className="font-medium">{user?.name}</p>
              <p className="text-xs text-slate-500">{user?.position}</p>
            </div>
          </Link>
          <Button
            onClick={handleLogout}
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-3 text-slate-300 hover:text-white h-auto py-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Đăng Xuất</span>
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between h-16">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-slate-400 hover:text-white"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex-1"></div>

          <div className="flex items-center gap-4">
            <div className="text-right text-sm text-slate-400">
              <span className="text-green-400 font-semibold">● Hệ thống hoạt động</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto bg-slate-950">
          <div className="p-4 md:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
