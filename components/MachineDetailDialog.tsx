'use client'

import { useState } from 'react'
import { Machine } from '@/hooks/useFactoryData'
import { X, CheckCircle, AlertCircle, Wrench, Power } from 'lucide-react'

interface Props {
  machine: Machine
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function MachineDetailDialog({ machine, open, onOpenChange }: Props) {
  const [actionLoading, setActionLoading] = useState(false)

  const handleFixError = async () => {
    setActionLoading(true)
    await new Promise(resolve => setTimeout(resolve, 800))
    setActionLoading(false)
  }

  const handleMaintenance = async () => {
    setActionLoading(true)
    await new Promise(resolve => setTimeout(resolve, 800))
    setActionLoading(false)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-slate-900 border border-slate-800 rounded-lg shadow-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-slate-800">
          <div>
            <h2 className="text-2xl font-bold text-white">{machine.name}</h2>
            <p className="text-slate-400 text-sm mt-1">{machine.id}</p>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status Section */}
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Trạng Thái Hiện Tại</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-slate-400 text-sm">Trạng Thái</p>
                <div className="flex items-center gap-2 mt-2">
                  {machine.status === 'hoạt động' ? (
                    <CheckCircle className="text-green-500" size={20} />
                  ) : machine.status === 'lỗi' ? (
                    <AlertCircle className="text-red-500" size={20} />
                  ) : (
                    <Wrench className="text-yellow-500" size={20} />
                  )}
                  <span className="text-white font-semibold capitalize">{machine.status}</span>
                </div>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Sản Lượng</p>
                <p className="text-white font-semibold mt-2">{machine.productionRate.toFixed(1)} kg/h</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Tỉ Lệ Lỗi</p>
                <p className={`font-semibold mt-2 ${machine.errorRate > 5 ? 'text-red-400' : 'text-green-400'}`}>
                  {machine.errorRate.toFixed(2)}%
                </p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Thời Gian Hoạt Động</p>
                <p className="text-white font-semibold mt-2">{(machine.uptime * 100).toFixed(1)}%</p>
              </div>
            </div>
          </div>

          {/* Detailed Metrics */}
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Chỉ Số Kỹ Thuật</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-slate-900 rounded p-3">
                <p className="text-slate-400 text-xs">Nhiệt Độ</p>
                <p className={`text-xl font-bold mt-1 ${machine.temperature > 70 ? 'text-red-400' : 'text-white'}`}>
                  {machine.temperature.toFixed(1)}°C
                </p>
              </div>
              <div className="bg-slate-900 rounded p-3">
                <p className="text-slate-400 text-xs">RPM</p>
                <p className="text-xl font-bold text-white mt-1">{machine.rpm.toFixed(0)}</p>
              </div>
              <div className="bg-slate-900 rounded p-3">
                <p className="text-slate-400 text-xs">Điện Áp</p>
                <p className="text-xl font-bold text-white mt-1">{machine.voltage.toFixed(1)}V</p>
              </div>
              <div className="bg-slate-900 rounded p-3">
                <p className="text-slate-400 text-xs">Dòng Điện</p>
                <p className="text-xl font-bold text-white mt-1">{machine.current.toFixed(1)}A</p>
              </div>
              <div className="bg-slate-900 rounded p-3">
                <p className="text-slate-400 text-xs">Công Suất</p>
                <p className="text-xl font-bold text-white mt-1">{machine.power.toFixed(2)} kW</p>
              </div>
              <div className="bg-slate-900 rounded p-3">
                <p className="text-slate-400 text-xs">Cảm Biến Rung</p>
                <p className={`text-xl font-bold mt-1 ${machine.vibration > 5 ? 'text-orange-400' : 'text-green-400'}`}>
                  {machine.vibration.toFixed(2)} mm/s
                </p>
              </div>
            </div>
          </div>

          {/* Operation History */}
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Lịch Sử Hoạt Động (24h)</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-slate-900 rounded">
                <span className="text-slate-300 text-sm">Thời Gian Chạy</span>
                <span className="text-green-400 font-semibold">{(machine.uptime * 24).toFixed(1)} giờ</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-900 rounded">
                <span className="text-slate-300 text-sm">Thời Gian Dừng</span>
                <span className="text-yellow-400 font-semibold">{((1 - machine.uptime) * 24).toFixed(1)} giờ</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-900 rounded">
                <span className="text-slate-300 text-sm">Sản Lượng 24h</span>
                <span className="text-blue-400 font-semibold">{(machine.productionRate * machine.uptime * 24).toFixed(0)} kg</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-900 rounded">
                <span className="text-slate-300 text-sm">Lỗi Phát Hiện</span>
                <span className="text-red-400 font-semibold">{Math.floor(machine.errorRate * 2.4)} lần</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Hành Động</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleFixError}
                disabled={actionLoading || machine.status !== 'lỗi'}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white px-4 py-2 rounded font-semibold transition-colors"
              >
                <CheckCircle size={18} />
                {actionLoading ? 'Đang Xử Lý...' : 'Sửa Lỗi'}
              </button>
              <button
                onClick={handleMaintenance}
                className="flex items-center justify-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded font-semibold transition-colors"
              >
                <Wrench size={18} />
                {actionLoading ? 'Đang Xử Lý...' : 'Bảo Trì'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
