'use client'

import { useState } from 'react'
import { BarChart3, Zap, Users, Cog, BarChart4, Activity, Truck } from 'lucide-react'
import Dashboard from './views/Dashboard'
import Analytics from './views/Analytics'
import HRKPIView from './views/HRKPIView'
import CottonMixingView from './views/CottonMixingView'
import EnergyManagementView from './views/EnergyManagementView'
import MaintenanceView from './views/MaintenanceView'
import QualityManagementView from './views/QualityManagementView'

type ViewType = 'dashboard' | 'analytics' | 'hr' | 'cotton' | 'energy' | 'maintenance' | 'quality'

const views: Array<{ id: ViewType; name: string; icon: React.ComponentType<any> }> = [
  { id: 'dashboard', name: 'Bảng Điều Khiển', icon: BarChart3 },
  { id: 'analytics', name: 'Phân Tích', icon: BarChart4 },
  { id: 'hr', name: 'Nhân Sự & KPI', icon: Users },
  { id: 'cotton', name: 'Trộn Cotton', icon: Cog },
  { id: 'energy', name: 'Quản Lý Năng Lượng', icon: Zap },
  { id: 'maintenance', name: 'Bảo Trì', icon: Activity },
  { id: 'quality', name: 'Chất Lượng', icon: Truck },
]

export default function MainLayout() {
  const [activeView, setActiveView] = useState<ViewType>('dashboard')

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />
      case 'analytics':
        return <Analytics />
      case 'hr':
        return <HRKPIView />
      case 'cotton':
        return <CottonMixingView />
      case 'energy':
        return <EnergyManagementView />
      case 'maintenance':
        return <MaintenanceView />
      case 'quality':
        return <QualityManagementView />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex h-screen bg-slate-950">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold text-white">Nhà Máy Vải Sợi</h1>
          <p className="text-xs text-slate-400 mt-1">Hệ Thống Quản Lý</p>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {views.map(view => {
            const Icon = view.icon
            return (
              <button
                key={view.id}
                onClick={() => setActiveView(view.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeView === view.id
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Icon size={18} />
                <span>{view.name}</span>
              </button>
            )
          })}
        </nav>

        <div className="p-4 border-t border-slate-800 text-xs text-slate-400">
          <p>© 2024 Hệ Thống Quản Lý</p>
          <p>Phiên bản 1.0</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-slate-900 border-b border-slate-800 px-8 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {views.find(v => v.id === activeView)?.name}
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Cập nhật thời gian thực - {new Date().toLocaleString('vi-VN')}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-slate-300">Trạng Thái Hệ Thống</p>
              <p className="text-green-400 font-semibold">Hoạt Động Bình Thường</p>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-slate-950 p-8">
          {renderView()}
        </main>
      </div>
    </div>
  )
}
