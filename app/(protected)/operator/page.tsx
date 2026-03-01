'use client'

import { useFactoryData } from '@/hooks/useFactoryData'
import { useAuth } from '@/lib/auth-context'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import StatusBadge from '@/components/StatusBadge'
import { AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react'

export default function OperatorDashboardPage() {
  const { machines } = useFactoryData()
  const { user } = useAuth()

  // Get assigned machines for this operator
  const assignedMachines = machines.filter(m => 
    user?.assignedMachines?.includes(m.id)
  ).slice(0, 3)

  const checklist = [
    { item: 'Kiểm tra nhiệt độ', done: true },
    { item: 'Kiểm tra cảm biến', done: true },
    { item: 'Vệ sinh máy', done: false },
    { item: 'Kiểm tra dây chuyền', done: true },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Bảng Điều Khiển Toán Tử</h1>
        <p className="text-slate-400 mt-2">Thiết kế tối ưu cho tablet tại dây chuyền sản xuất</p>
      </div>

      {/* Assigned Machines - Large Touch Targets */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Máy Phụ Trách</h2>
        <div className="grid grid-cols-1 gap-4">
          {assignedMachines.map((machine) => (
            <Card
              key={machine.id}
              className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 p-8 hover:border-blue-600 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-3xl font-bold text-white">{machine.name}</h3>
                  <p className="text-slate-400 mt-1">ID: {machine.id}</p>
                </div>
                <StatusBadge status={machine.status} size="lg" />
              </div>

              {/* Large Metrics Display */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-slate-700 rounded-lg p-6 text-center">
                  <p className="text-slate-400 text-sm font-medium">SẢN LƯỢNG</p>
                  <p className="text-4xl font-bold text-green-400 mt-2">{machine.productionRate}</p>
                  <p className="text-slate-400 text-xs mt-1">kg/h</p>
                </div>
                <div className="bg-slate-700 rounded-lg p-6 text-center">
                  <p className="text-slate-400 text-sm font-medium">NHIỆT ĐỘ</p>
                  <p className="text-4xl font-bold text-orange-400 mt-2">{machine.temperature}</p>
                  <p className="text-slate-400 text-xs mt-1">°C</p>
                </div>
                <div className="bg-slate-700 rounded-lg p-6 text-center">
                  <p className="text-slate-400 text-sm font-medium">LỖI</p>
                  <p className="text-4xl font-bold text-red-400 mt-2">{machine.errorRate}</p>
                  <p className="text-slate-400 text-xs mt-1">%</p>
                </div>
              </div>

              {/* Alert Button - Large */}
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-6 text-xl rounded-lg">
                BÁO LỖI
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Shift Checklist */}
      <Card className="bg-slate-800 border-slate-700 p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Danh Sách Kiểm Tra Đầu Ca</h2>
        <div className="space-y-3">
          {checklist.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 p-4 bg-slate-700 rounded-lg hover:bg-slate-650 transition-colors"
            >
              {item.done ? (
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-6 h-6 text-amber-400 flex-shrink-0" />
              )}
              <span className={`text-lg font-medium ${item.done ? 'text-green-300' : 'text-slate-300'}`}>
                {item.item}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Access */}
      <Card className="bg-slate-800 border-slate-700 p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Truy Cập Nhanh</h2>
        <div className="grid grid-cols-2 gap-4">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4">
            Xem Chi Tiết Máy
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4">
            Nhật Ký Sự Kiện
          </Button>
          <Button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-4">
            Hướng Dẫn An Toàn
          </Button>
          <Button className="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-4">
            Liên Hệ Kỹ Thuật
          </Button>
        </div>
      </Card>

      {/* All Events */}
      <Card className="bg-slate-800 border-slate-700 p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Sự Kiện Gần Đây</h2>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {[
            { time: '14:35', machine: 'TC19i 01', event: 'Warning', type: 'warning' },
            { time: '14:20', machine: 'TC19i 02', event: 'Automatic mode', type: 'info' },
            { time: '14:10', machine: 'TC19i 01', event: 'Set value', type: 'info' },
            { time: '13:55', machine: 'TC19i 02', event: 'Information', type: 'info' },
            { time: '13:40', machine: 'TC19i 01', event: 'Automatic mode', type: 'info' },
          ].map((log, idx) => (
            <div key={idx} className="flex items-center justify-between py-3 px-3 bg-slate-700 rounded hover:bg-slate-600 transition-colors">
              <div className="flex items-center gap-4 flex-1">
                <span className="text-slate-500 text-sm font-mono">{log.time}</span>
                <span className="font-medium text-slate-300">{log.machine}</span>
              </div>
              <span className={`text-sm font-medium ${
                log.type === 'warning' ? 'text-amber-400' : 'text-blue-400'
              }`}>{log.event}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
