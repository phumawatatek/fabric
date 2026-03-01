'use client'

import { useState } from 'react'
import { useFactoryData } from '@/hooks/useFactoryData'
import { Card } from '@/components/ui/card'
import StatusBadge from '@/components/StatusBadge'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  GaugeChart,
} from 'recharts'

export default function MachineDetailPage() {
  const { machines } = useFactoryData()
  const [selectedMachine, setSelectedMachine] = useState(machines[0])
  const [activeTab, setActiveTab] = useState<'logbook' | 'tcon' | 'parameters' | 'production' | 'maintenance'>('logbook')

  const tabs = [
    { id: 'logbook', label: 'Nhật Ký Sự Kiện' },
    { id: 'tcon', label: 'T-CON' },
    { id: 'parameters', label: 'Thông Số' },
    { id: 'production', label: 'Sản Lượng' },
    { id: 'maintenance', label: 'Bảo Trì' },
  ] as const

  const productionTrend = [
    { time: '06:00', output: 450, target: 450 },
    { time: '08:00', output: 465, target: 450 },
    { time: '10:00', output: 455, target: 450 },
    { time: '12:00', output: 470, target: 450 },
    { time: '14:00', output: 460, target: 450 },
    { time: '16:00', output: 475, target: 450 },
  ]

  const eventLog = [
    { time: '14:35', type: 'Warning', message: 'Nhiệt độ vượt ngưỡng cảnh báo' },
    { time: '14:20', type: 'Information', message: 'Đã điều chỉnh setpoint T-CON' },
    { time: '14:10', type: 'Set value', message: 'Thay đổi tốc độ: 2400 RPM' },
    { time: '13:55', type: 'Automatic mode', message: 'Chế độ tự động được kích hoạt' },
    { time: '13:40', type: 'Information', message: 'Kiểm tra cảm biến hoàn tất' },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'logbook':
        return (
          <div className="space-y-2">
            {eventLog.map((log, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 bg-slate-700 rounded-lg">
                <span className="text-slate-500 text-sm font-mono flex-shrink-0">{log.time}</span>
                <div className="flex-1">
                  <StatusBadge status={log.type} size="sm" />
                  <p className="text-slate-300 text-sm mt-2">{log.message}</p>
                </div>
              </div>
            ))}
          </div>
        )

      case 'tcon':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-slate-700 border-slate-600 p-6">
              <h4 className="text-white font-semibold mb-4">Nhiệt Độ Trụ (°C)</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-300">Setpoint</span>
                    <span className="text-blue-400 font-semibold">75°C</span>
                  </div>
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-300">Hiện Tại</span>
                    <span className="text-amber-400 font-semibold">72°C</span>
                  </div>
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: '72%' }}></div>
                  </div>
                </div>
                <div className="text-xs text-slate-400 pt-2">Độ Lệch: -3°C</div>
              </div>
            </Card>

            <Card className="bg-slate-700 border-slate-600 p-6">
              <h4 className="text-white font-semibold mb-4">Độ Ẩm Trụ (%)</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-300">Setpoint</span>
                    <span className="text-blue-400 font-semibold">65%</span>
                  </div>
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-300">Hiện Tại</span>
                    <span className="text-green-400 font-semibold">63%</span>
                  </div>
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '63%' }}></div>
                  </div>
                </div>
                <div className="text-xs text-slate-400 pt-2">Độ Lệch: -2%</div>
              </div>
            </Card>
          </div>
        )

      case 'parameters':
        return (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'RPM', value: selectedMachine.rpm, unit: 'r/min' },
              { label: 'Nhiệt Độ', value: selectedMachine.temperature, unit: '°C' },
              { label: 'Áp Suất', value: '2.5', unit: 'bar' },
              { label: 'Tốc Độ', value: '45', unit: 'm/min' },
            ].map((param, idx) => (
              <Card key={idx} className="bg-slate-700 border-slate-600 p-4 text-center">
                <p className="text-slate-400 text-sm">{param.label}</p>
                <p className="text-2xl font-bold text-white mt-2">{param.value}</p>
                <p className="text-slate-400 text-xs mt-1">{param.unit}</p>
              </Card>
            ))}
          </div>
        )

      case 'production':
        return (
          <Card className="bg-slate-700 border-slate-600 p-6">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={productionTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="time" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
                  labelStyle={{ color: '#f1f5f9' }}
                />
                <Area
                  type="monotone"
                  dataKey="output"
                  fill="#2563eb"
                  stroke="#2563eb"
                  fillOpacity={0.3}
                  name="Sản Lượng"
                />
                <Area
                  type="monotone"
                  dataKey="target"
                  fill="#059669"
                  stroke="#059669"
                  fillOpacity={0.1}
                  name="Mục Tiêu"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        )

      case 'maintenance':
        return (
          <div className="space-y-4">
            {[
              { task: 'Kiểm tra dây chuyền', status: 'Hoàn thành', date: '2024-02-22' },
              { task: 'Thay dầu bôi trơn', status: 'Lên lịch', date: '2024-02-25' },
              { task: 'Vệ sinh trụ cotton', status: 'Đang thực hiện', date: '2024-02-23' },
            ].map((task, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                <div>
                  <p className="text-white font-medium">{task.task}</p>
                  <p className="text-slate-400 text-sm mt-1">{task.date}</p>
                </div>
                <StatusBadge status={task.status === 'Hoàn thành' ? 'Information' : task.status === 'Đang thực hiện' ? 'Automatic mode' : 'No entry'} size="sm" />
              </div>
            ))}
          </div>
        )
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Chi Tiết Máy</h1>
        <p className="text-slate-400 mt-2">Thông tin chi tiết và giám sát máy sản xuất</p>
      </div>

      {/* Machine Selector */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {machines.map((machine) => (
          <button
            key={machine.id}
            onClick={() => setSelectedMachine(machine)}
            className={`whitespace-nowrap px-4 py-2 rounded-lg transition-colors ${
              selectedMachine.id === machine.id
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            {machine.name}
          </button>
        ))}
      </div>

      {/* Machine Header */}
      <Card className="bg-slate-800 border-slate-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">{selectedMachine.name}</h2>
            <p className="text-slate-400 mt-1">ID: {selectedMachine.id} | Loại: TC19i</p>
          </div>
          <StatusBadge status={selectedMachine.status} size="lg" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Sản Lượng', value: selectedMachine.productionRate, unit: 'kg/h' },
            { label: 'Lỗi', value: selectedMachine.errorRate, unit: '%' },
            { label: 'Nhiệt Độ', value: selectedMachine.temperature, unit: '°C' },
            { label: 'RPM', value: selectedMachine.rpm, unit: 'r/min' },
          ].map((stat, idx) => (
            <div key={idx}>
              <p className="text-slate-400 text-sm">{stat.label}</p>
              <p className="text-xl font-bold text-white mt-1">{stat.value} <span className="text-slate-400 text-sm">{stat.unit}</span></p>
            </div>
          ))}
        </div>
      </Card>

      {/* Tabs */}
      <Card className="bg-slate-800 border-slate-700">
        <div className="border-b border-slate-700 flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-white'
                  : 'border-transparent text-slate-400 hover:text-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {renderTabContent()}
        </div>
      </Card>
    </div>
  )
}
