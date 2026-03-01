'use client'

import { useFactoryData } from '@/hooks/useFactoryData'
import { useAuth } from '@/lib/auth-context'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import StatusBadge from '@/components/StatusBadge'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

export default function DashboardPage() {
  const { machines } = useFactoryData()
  const { user } = useAuth()

  // KPI Data
  const kpis = [
    {
      title: 'Sản Lượng Ca',
      value: '4,250',
      unit: 'kg',
      change: '+12%',
      color: 'from-green-600 to-green-700',
    },
    {
      title: 'Hiệu Suất',
      value: '94.2',
      unit: '%',
      change: '+2.3%',
      color: 'from-blue-600 to-blue-700',
    },
    {
      title: 'Lỗi/Ca',
      value: '8',
      unit: 'events',
      change: '-30%',
      color: 'from-amber-600 to-amber-700',
    },
    {
      title: 'UKG',
      value: '0.142',
      unit: 'kWh/kg',
      change: '+1.2%',
      color: 'from-purple-600 to-purple-700',
    },
  ]

  // Production trend data
  const productionData = [
    { time: '06:00', output: 180, target: 200 },
    { time: '08:00', output: 420, target: 400 },
    { time: '10:00', output: 680, target: 600 },
    { time: '12:00', output: 920, target: 800 },
    { time: '14:00', output: 1200, target: 1000 },
    { time: '16:00', output: 1450, target: 1200 },
    { time: '18:00', output: 1650, target: 1400 },
    { time: '20:00', output: 1850, target: 1600 },
    { time: '22:00', output: 2050, target: 1800 },
    { time: '00:00', output: 2200, target: 2000 },
  ]

  // Machine status distribution
  const statusDistribution = [
    { name: 'Automatic mode', value: 6 },
    { name: 'Maintenance', value: 1 },
    { name: 'Warning', value: 1 },
    { name: 'Malfunction', value: 1 },
    { name: 'Service mode', value: 1 },
  ]

  const COLORS = {
    'Automatic mode': '#059669',
    'Maintenance': '#06b6d4',
    'Warning': '#d97706',
    'Malfunction': '#dc2626',
    'Service mode': '#0d9488',
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Bảng Điều Khiển Chính</h1>
        <p className="text-slate-400 mt-2">Chào mừng, {user?.name} - Xem tóm tắt hoạt động nhà máy</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => (
          <Card key={idx} className="bg-slate-800 border-slate-700 p-6 overflow-hidden relative">
            <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${kpi.color} opacity-20 rounded-bl-3xl`}></div>
            <p className="text-slate-400 text-sm font-medium">{kpi.title}</p>
            <div className="mt-3 flex items-end gap-2">
              <p className="text-3xl font-bold text-white">{kpi.value}</p>
              <p className="text-slate-400 text-sm mb-1">{kpi.unit}</p>
            </div>
            <div className="mt-4 flex items-center gap-1">
              <span className={`text-sm font-medium ${kpi.change.startsWith('+') ? 'text-red-400' : 'text-green-400'}`}>
                {kpi.change}
              </span>
              <span className="text-slate-500 text-sm">vs hôm qua</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Production Trend */}
        <Card className="col-span-1 lg:col-span-2 bg-slate-800 border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Xu Hướng Sản Lượng (24h)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={productionData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="time" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
                labelStyle={{ color: '#f1f5f9' }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="output"
                stroke="#2563eb"
                strokeWidth={2}
                name="Sản Lượng (kg)"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="target"
                stroke="#059669"
                strokeWidth={2}
                name="Mục Tiêu (kg)"
                strokeDasharray="5 5"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Machine Status Distribution */}
        <Card className="bg-slate-800 border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Trạng Thái Máy</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {statusDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
                labelStyle={{ color: '#f1f5f9' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Machine Grid */}
      <Card className="bg-slate-800 border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Trạng Thái Máy (9 Máy TC19i + 1 TST5)</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {machines.map((machine) => (
            <div
              key={machine.id}
              className="bg-slate-700 border border-slate-600 rounded-lg p-4 hover:border-slate-500 transition-colors cursor-pointer"
            >
              <h4 className="font-semibold text-white mb-2">{machine.name}</h4>
              <StatusBadge status={machine.status} size="sm" />
              <div className="mt-3 space-y-1 text-xs text-slate-400">
                <p>Output: <span className="text-slate-300">{machine.productionRate} kg/h</span></p>
                <p>Error: <span className="text-slate-300">{machine.errorRate}%</span></p>
                <p>Temp: <span className="text-slate-300">{machine.temperature}°C</span></p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Events Feed */}
      <Card className="bg-slate-800 border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Sự Kiện Thời Gian Thực</h3>
        <div className="space-y-3">
          {[
            { time: '14:35', machine: 'TC19i 03', event: 'Malfunction', color: 'text-red-400' },
            { time: '14:20', machine: 'TC19i 07', event: 'Warning', color: 'text-amber-400' },
            { time: '14:10', machine: 'TC19i 01', event: 'Automatic mode', color: 'text-green-400' },
            { time: '13:55', machine: 'TST5 01', event: 'Automatic mode', color: 'text-green-400' },
            { time: '13:40', machine: 'TC19i 09', event: 'Service mode', color: 'text-blue-400' },
          ].map((log, idx) => (
            <div key={idx} className="flex items-center justify-between py-2 border-b border-slate-700 last:border-0">
              <div className="flex items-center gap-4">
                <span className="text-slate-500 text-sm">{log.time}</span>
                <span className="font-medium text-white">{log.machine}</span>
              </div>
              <span className={`text-sm font-medium ${log.color}`}>{log.event}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
