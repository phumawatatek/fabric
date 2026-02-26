'use client'

import { useState } from 'react'
import { X, AlertTriangle, Wrench, Clock } from 'lucide-react'

interface WorstMachine {
  id: string
  name: string
  errorRate: number
  downtime: number
  lastFixed: string
}

interface Props {
  machine: WorstMachine
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function WorstMachineDetailDialog({ machine, open, onOpenChange }: Props) {
  const [actionLoading, setActionLoading] = useState(false)

  const handleScheduleMaintenance = async () => {
    setActionLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    alert(`Đã lên lịch bảo trì cho ${machine.name}`)
    setActionLoading(false)
  }

  const handleAnalyzeErrors = async () => {
    setActionLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    alert(`Đang phân tích lỗi chi tiết của ${machine.name}...`)
    setActionLoading(false)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-slate-900 border border-slate-800 rounded-lg shadow-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-red-500" size={28} />
            <div>
              <h2 className="text-2xl font-bold text-white">{machine.name}</h2>
              <p className="text-slate-400 text-sm mt-1">{machine.id}</p>
            </div>
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
          {/* Error Statistics */}
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Thống Kê Lỗi</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-slate-900 rounded p-3">
                <p className="text-slate-400 text-xs">Tỉ Lệ Lỗi</p>
                <p className="text-3xl font-bold text-red-400 mt-2">{machine.errorRate}%</p>
              </div>
              <div className="bg-slate-900 rounded p-3">
                <p className="text-slate-400 text-xs">Thời Gian Dừng</p>
                <p className="text-2xl font-bold text-yellow-400 mt-2">{machine.downtime} phút</p>
              </div>
              <div className="bg-slate-900 rounded p-3">
                <p className="text-slate-400 text-xs">Sửa Lần Cuối</p>
                <p className="text-sm font-bold text-blue-400 mt-2">{machine.lastFixed}</p>
              </div>
            </div>
          </div>

          {/* Error Breakdown */}
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Phân Loại Lỗi Chi Tiết</h3>
            <div className="space-y-3">
              <div className="bg-slate-900 rounded p-4">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-white font-semibold">Lỗi Cơ Học (40%)</span>
                  <span className="text-red-400 text-sm">Cao</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="h-2 rounded-full bg-red-500" style={{ width: '40%' }} />
                </div>
              </div>
              <div className="bg-slate-900 rounded p-4">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-white font-semibold">Lỗi Điện (35%)</span>
                  <span className="text-yellow-400 text-sm">Cao</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="h-2 rounded-full bg-yellow-500" style={{ width: '35%' }} />
                </div>
              </div>
              <div className="bg-slate-900 rounded p-4">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-white font-semibold">Lỗi Phần Mềm (15%)</span>
                  <span className="text-blue-400 text-sm">Trung Bình</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="h-2 rounded-full bg-blue-500" style={{ width: '15%' }} />
                </div>
              </div>
              <div className="bg-slate-900 rounded p-4">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-white font-semibold">Lỗi Khác (10%)</span>
                  <span className="text-green-400 text-sm">Thấp</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="h-2 rounded-full bg-green-500" style={{ width: '10%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Error Timeline */}
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Lịch Sử Lỗi (7 Ngày Gần Nhất)</h3>
            <div className="space-y-2">
              {[
                { date: 'Hôm Nay 14:30', type: 'Lỗi Cơ Học', severity: 'Cao' },
                { date: 'Hôm Nay 10:15', type: 'Lỗi Điện', severity: 'Cao' },
                { date: 'Hôm Qua 16:45', type: 'Lỗi Phần Mềm', severity: 'Trung Bình' },
                { date: '3 Ngày Trước 09:20', type: 'Lỗi Cơ Học', severity: 'Cao' },
                { date: '5 Ngày Trước 13:00', type: 'Lỗi Điện', severity: 'Cao' },
              ].map((record, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-900 rounded border-l-4 border-red-500">
                  <div className="flex items-center gap-3">
                    <Clock size={16} className="text-slate-400" />
                    <div>
                      <p className="text-white font-semibold text-sm">{record.type}</p>
                      <p className="text-xs text-slate-400">{record.date}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${
                    record.severity === 'Cao' ? 'bg-red-900 text-red-200' :
                    record.severity === 'Trung Bình' ? 'bg-yellow-900 text-yellow-200' :
                    'bg-green-900 text-green-200'
                  }`}>
                    {record.severity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-blue-900 border border-blue-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-100 mb-2">Đề Xuất</h3>
            <ul className="space-y-1 text-sm text-blue-100">
              <li>• Thực hiện bảo trì định kỳ ngay để kiểm tra các bộ phận cơ học</li>
              <li>• Kiểm tra hệ thống điện và các ổ cắm liên kết</li>
              <li>• Cập nhật phần mềm điều khiển lên phiên bản mới nhất</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Hành Động</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleScheduleMaintenance}
                disabled={actionLoading}
                className="flex items-center justify-center gap-2 bg-yellow-600 hover:bg-yellow-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white px-4 py-3 rounded font-semibold transition-colors"
              >
                <Wrench size={18} />
                {actionLoading ? 'Đang Xử Lý...' : 'Lên Lịch Bảo Trì'}
              </button>
              <button
                onClick={handleAnalyzeErrors}
                disabled={actionLoading}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white px-4 py-3 rounded font-semibold transition-colors"
              >
                <AlertTriangle size={18} />
                {actionLoading ? 'Đang Phân Tích...' : 'Phân Tích Chi Tiết'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
