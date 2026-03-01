'use client'

import { useState } from 'react'
import { useFactoryData } from '@/hooks/useFactoryData'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import StatusBadge from '@/components/StatusBadge'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts'
import { Download } from 'lucide-react'

export default function ProductionOverviewPage() {
  const { machines } = useFactoryData()
  const [selectedShift, setSelectedShift] = useState('all')

  // Production data by machine
  const productionByMachine = machines.map(m => ({
    name: m.name,
    output: m.productionRate,
    target: 450,
    efficiency: Math.round((m.productionRate / 450) * 100),
  }))

  // OEE data
  const oeeData = machines.map(m => ({
    name: m.name,
    availability: m.status === 'Automatic mode' ? 95 : m.status === 'Maintenance' ? 0 : 60,
    performance: Math.round(100 - m.errorRate * 5),
    quality: Math.round(Math.random() * 30 + 85),
  }))

  const shifts = [
    { id: 'all', label: 'Tất Cả Ca' },
    { id: '1', label: 'Ca 1 (06:00-14:00)' },
    { id: '2', label: 'Ca 2 (14:00-22:00)' },
    { id: '3', label: 'Ca 3 (22:00-06:00)' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Tổng Quan Sản Xuất</h1>
          <p className="text-slate-400 mt-2">Phân tích sản lượng thời gian thực theo máy</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700 gap-2">
          <Download className="w-4 h-4" />
          Xuất Excel
        </Button>
      </div>

      {/* Shift Filter */}
      <div className="flex gap-2 flex-wrap">
        {shifts.map(shift => (
          <Button
            key={shift.id}
            onClick={() => setSelectedShift(shift.id)}
            className={`${
              selectedShift === shift.id
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-slate-700 hover:bg-slate-600'
            } text-white`}
          >
            {shift.label}
          </Button>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Tổng Sản Lượng', value: '4,485 kg', color: 'from-green-600 to-green-700' },
          { label: 'Hiệu Suất TB', value: '94.2%', color: 'from-blue-600 to-blue-700' },
          { label: 'OEE TB', value: '87.5%', color: 'from-purple-600 to-purple-700' },
          { label: 'Máy Hoạt Động', value: '8/10', color: 'from-teal-600 to-teal-700' },
        ].map((stat, idx) => (
          <Card key={idx} className="bg-slate-800 border-slate-700 p-6">
            <p className="text-slate-400 text-sm">{stat.label}</p>
            <p className={`text-2xl font-bold mt-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
              {stat.value}
            </p>
          </Card>
        ))}
      </div>

      {/* Production by Machine Chart */}
      <Card className="bg-slate-800 border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Sản Lượng Theo Máy (kg/h)</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={productionByMachine} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis dataKey="name" stroke="#94a3b8" angle={-45} textAnchor="end" height={100} />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
              labelStyle={{ color: '#f1f5f9' }}
            />
            <Legend />
            <Bar dataKey="output" fill="#2563eb" name="Sản Lượng (kg/h)" />
            <Bar dataKey="target" fill="#059669" name="Mục Tiêu (kg/h)" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Machine Details Table */}
      <Card className="bg-slate-800 border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Chi Tiết Máy</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-700">
              <tr className="text-slate-400">
                <th className="text-left py-3 px-4">Máy</th>
                <th className="text-center py-3 px-4">Trạng Thái</th>
                <th className="text-right py-3 px-4">Sản Lượng</th>
                <th className="text-right py-3 px-4">Lỗi</th>
                <th className="text-right py-3 px-4">Nhiệt Độ</th>
                <th className="text-right py-3 px-4">Hiệu Suất</th>
              </tr>
            </thead>
            <tbody>
              {machines.map((machine) => {
                const production = productionByMachine.find(p => p.name === machine.name)
                return (
                  <tr key={machine.id} className="border-b border-slate-700 hover:bg-slate-700 transition-colors">
                    <td className="py-3 px-4 font-medium text-white">{machine.name}</td>
                    <td className="py-3 px-4 text-center">
                      <StatusBadge status={machine.status} size="sm" />
                    </td>
                    <td className="py-3 px-4 text-right text-green-400 font-semibold">{machine.productionRate} kg/h</td>
                    <td className="py-3 px-4 text-right text-red-400">{machine.errorRate}%</td>
                    <td className="py-3 px-4 text-right text-slate-300">{machine.temperature}°C</td>
                    <td className="py-3 px-4 text-right">
                      <span className={`font-semibold ${production!.efficiency >= 90 ? 'text-green-400' : 'text-amber-400'}`}>
                        {production!.efficiency}%
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* OEE Radar Chart */}
      <Card className="bg-slate-800 border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-6">OEE (Overall Equipment Effectiveness)</h3>
        <p className="text-slate-400 text-sm mb-6">OEE = Availability × Performance × Quality</p>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={oeeData}>
            <PolarGrid stroke="#475569" />
            <PolarAngleAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 12 }} />
            <PolarRadiusAxis stroke="#94a3b8" />
            <Radar name="Availability" dataKey="availability" stroke="#2563eb" fill="#2563eb" fillOpacity={0.1} />
            <Radar name="Performance" dataKey="performance" stroke="#059669" fill="#059669" fillOpacity={0.1} />
            <Radar name="Quality" dataKey="quality" stroke="#d97706" fill="#d97706" fillOpacity={0.1} />
            <Legend />
            <Tooltip
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
              labelStyle={{ color: '#f1f5f9' }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}
