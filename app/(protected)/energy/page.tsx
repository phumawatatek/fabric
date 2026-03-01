'use client'

import { Card } from '@/components/ui/card'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Area,
  AreaChart,
} from 'recharts'
import { Zap } from 'lucide-react'

export default function EnergyMonitorPage() {
  const energyData = [
    { shift: 'Ca 1 (06:00-14:00)', kWh: 320, cost: 640000, ukg: 0.141 },
    { shift: 'Ca 2 (14:00-22:00)', kWh: 315, cost: 630000, ukg: 0.138 },
    { shift: 'Ca 3 (22:00-06:00)', kWh: 295, cost: 590000, ukg: 0.130 },
  ]

  const hourlyData = [
    { hour: '06:00', consumption: 45, target: 40 },
    { hour: '08:00', consumption: 52, target: 42 },
    { hour: '10:00', consumption: 48, target: 43 },
    { hour: '12:00', consumption: 55, target: 44 },
    { hour: '14:00', consumption: 50, target: 44 },
    { hour: '16:00', consumption: 51, target: 45 },
    { hour: '18:00', consumption: 49, target: 45 },
    { hour: '20:00', consumption: 46, target: 46 },
    { hour: '22:00', consumption: 43, target: 44 },
    { hour: '00:00', consumption: 41, target: 43 },
  ]

  const costBreakdown = [
    { source: 'Máy Chính', value: 520 },
    { source: 'Hệ Thống Điều Hòa', value: 180 },
    { source: 'Chiếu Sáng', value: 95 },
    { source: 'Khác', value: 105 },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Giám Sát Năng Lượng</h1>
        <p className="text-slate-400 mt-2">Theo dõi tiêu thụ điện năng và tối ưu hóa chi phí</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'UKG Hiện Tại', value: '0.142', unit: 'kWh/kg', icon: '⚡', color: 'from-yellow-600 to-yellow-700' },
          { label: 'Tổng Tiêu Thụ Hôm Nay', value: '930', unit: 'kWh', icon: '📊', color: 'from-blue-600 to-blue-700' },
          { label: 'Chi Phí Hôm Nay', value: '1,860', unit: 'K VND', icon: '💰', color: 'from-green-600 to-green-700' },
          { label: 'Mục Tiêu UKG', value: '0.125', unit: 'kWh/kg', icon: '🎯', color: 'from-purple-600 to-purple-700' },
        ].map((kpi, idx) => (
          <Card key={idx} className="bg-slate-800 border-slate-700 p-6">
            <p className="text-slate-400 text-sm">{kpi.label}</p>
            <p className={`text-2xl font-bold mt-2 bg-gradient-to-r ${kpi.color} bg-clip-text text-transparent`}>
              {kpi.value}
            </p>
            <p className="text-slate-400 text-xs mt-1">{kpi.unit}</p>
          </Card>
        ))}
      </div>

      {/* Energy by Shift */}
      <Card className="bg-slate-800 border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-700">
          <h3 className="text-lg font-semibold text-white">Tiêu Thụ Điện Theo Ca</h3>
        </div>
        <div className="p-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={energyData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="shift" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
                labelStyle={{ color: '#f1f5f9' }}
              />
              <Legend />
              <Bar dataKey="kWh" fill="#2563eb" name="Tiêu Thụ (kWh)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Hourly Trend */}
      <Card className="bg-slate-800 border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Xu Hướng Tiêu Thụ Theo Giờ</h3>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={hourlyData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis dataKey="hour" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
              labelStyle={{ color: '#f1f5f9' }}
            />
            <Legend />
            <Area type="monotone" dataKey="consumption" fill="#2563eb" stroke="#2563eb" fillOpacity={0.3} name="Tiêu Thụ" />
            <Line type="monotone" dataKey="target" stroke="#059669" strokeWidth={2} strokeDasharray="5 5" name="Mục Tiêu" />
          </ComposedChart>
        </ResponsiveContainer>
      </Card>

      {/* Shift Details Table */}
      <Card className="bg-slate-800 border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-700 bg-slate-900">
              <tr className="text-slate-400">
                <th className="text-left py-3 px-4">Ca</th>
                <th className="text-right py-3 px-4">Tiêu Thụ (kWh)</th>
                <th className="text-right py-3 px-4">Chi Phí</th>
                <th className="text-right py-3 px-4">UKG</th>
                <th className="text-right py-3 px-4">Mục Tiêu vs Thực Tế</th>
              </tr>
            </thead>
            <tbody>
              {energyData.map((row, idx) => (
                <tr key={idx} className="border-b border-slate-700 hover:bg-slate-700 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">{row.shift}</td>
                  <td className="text-right py-3 px-4 text-blue-400 font-semibold">{row.kWh} kWh</td>
                  <td className="text-right py-3 px-4 text-green-400 font-semibold">{(row.cost / 1000).toFixed(0)}K VND</td>
                  <td className="text-right py-3 px-4 text-yellow-400 font-semibold">{row.ukg}</td>
                  <td className="text-right py-3 px-4">
                    {row.ukg > 0.135 ? (
                      <span className="text-red-400">Vượt {(row.ukg - 0.135).toFixed(3)}</span>
                    ) : (
                      <span className="text-green-400">Đạt</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Energy Cost Breakdown */}
      <Card className="bg-slate-800 border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Chi Phí Điện Hôm Nay (1,860K VND)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            {costBreakdown.map((item, idx) => {
              const percent = (item.value / 900) * 100
              return (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-300">{item.source}</span>
                    <span className="text-white font-semibold">{item.value}K ({percent.toFixed(0)}%)</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>

          <Card className="bg-slate-700 border-slate-600 p-4">
            <h4 className="text-white font-semibold mb-4">Khuyến Nghị Tiết Kiệm</h4>
            <ul className="text-slate-300 text-sm space-y-2">
              <li>• Giảm tải máy không sử dụng 30 phút/ca</li>
              <li>• Điều chỉnh lịch bảo trì tối ưu năng lượng</li>
              <li>• Kiểm tra rò rỉ nén khí</li>
              <li>• Nâng cấp hệ thống điều hòa hiệu quả</li>
            </ul>
            <p className="text-amber-400 text-sm mt-4 font-medium">Mục tiêu: 150K VND/ngày</p>
          </Card>
        </div>
      </Card>
    </div>
  )
}
