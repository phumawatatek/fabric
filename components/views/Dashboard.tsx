'use client'

import { useState } from 'react'
import { useFactoryData } from '@/hooks/useFactoryData'
import { Card } from '@/components/ui/card'
import { AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react'
import MachineCard from '../MachineCard'
import MachineDetailDialog from '../MachineDetailDialog'

export default function Dashboard() {
  const { machines, productionOrders, alarms } = useFactoryData()
  const [selectedMachine, setSelectedMachine] = useState(machines[0])
  const [dialogOpen, setDialogOpen] = useState(false)

  const totalProduction = machines.reduce((sum, m) => sum + m.productionRate, 0)
  const activeCount = machines.filter(m => m.status === 'hoạt động').length
  const errorCount = machines.filter(m => m.status === 'lỗi').length
  const avgErrorRate = (machines.reduce((sum, m) => sum + m.errorRate, 0) / machines.length).toFixed(2)

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-900 border-slate-800 p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-slate-400 text-sm">Sản Lượng Tổng</p>
              <p className="text-3xl font-bold text-white mt-2">{totalProduction.toFixed(0)}</p>
              <p className="text-xs text-green-400 mt-1">kg/giờ</p>
            </div>
            <CheckCircle className="text-green-500" size={24} />
          </div>
        </Card>

        <Card className="bg-slate-900 border-slate-800 p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-slate-400 text-sm">Máy Hoạt Động</p>
              <p className="text-3xl font-bold text-white mt-2">{activeCount}/10</p>
              <p className="text-xs text-blue-400 mt-1">máy xoắn</p>
            </div>
            <CheckCircle className="text-blue-500" size={24} />
          </div>
        </Card>

        <Card className="bg-slate-900 border-slate-800 p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-slate-400 text-sm">Máy Lỗi</p>
              <p className="text-3xl font-bold text-white mt-2">{errorCount}</p>
              <p className="text-xs text-red-400 mt-1">cần sửa</p>
            </div>
            <AlertCircle className="text-red-500" size={24} />
          </div>
        </Card>

        <Card className="bg-slate-900 border-slate-800 p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-slate-400 text-sm">Tỉ Lệ Lỗi Tb</p>
              <p className="text-3xl font-bold text-white mt-2">{avgErrorRate}%</p>
              <p className="text-xs text-yellow-400 mt-1">toàn nhà máy</p>
            </div>
            <AlertTriangle className="text-yellow-500" size={24} />
          </div>
        </Card>
      </div>

      {/* Production Orders Status */}
      <Card className="bg-slate-900 border-slate-800 p-6">
        <h3 className="text-xl font-bold text-white mb-4">Đơn Hàng Hiện Tại</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {productionOrders.slice(0, 5).map(order => (
            <div key={order.id} className="bg-slate-800 rounded-lg p-4 border border-slate-700">
              <p className="text-sm font-semibold text-white">{order.product}</p>
              <p className="text-xs text-slate-400 mt-1">{order.orderNo}</p>
              <div className="mt-3 space-y-2">
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      order.progress === 100 ? 'bg-green-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${order.progress}%` }}
                  />
                </div>
                <p className="text-xs text-slate-400">{order.progress.toFixed(0)}%</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Machines Grid */}
      <Card className="bg-slate-900 border-slate-800 p-6">
        <h3 className="text-xl font-bold text-white mb-4">Trạng Thái Máy Móc</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {machines.map(machine => (
            <MachineCard 
              key={machine.id} 
              machine={machine}
              onClick={() => {
                setSelectedMachine(machine)
                setDialogOpen(true)
              }}
            />
          ))}
        </div>
      </Card>

      {/* Machine Detail Dialog */}
      <MachineDetailDialog 
        machine={selectedMachine} 
        open={dialogOpen} 
        onOpenChange={setDialogOpen} 
      />

      {/* Alarms */}
      <Card className="bg-slate-900 border-slate-800 p-6">
        <h3 className="text-xl font-bold text-white mb-4">Cảnh Báo Gần Đây</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {alarms.slice(0, 5).map(alarm => (
            <div key={alarm.id} className="flex items-center justify-between p-3 bg-slate-800 rounded border-l-4 border-red-500">
              <div>
                <p className="text-sm font-semibold text-white">{alarm.machine}</p>
                <p className="text-xs text-slate-400">{alarm.type}</p>
              </div>
              <p className="text-xs text-slate-500">{alarm.time}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
