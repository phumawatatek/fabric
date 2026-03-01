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
  ScatterChart,
  Scatter,
} from 'recharts'
import { AlertTriangle, CheckCircle } from 'lucide-react'

export default function QualityControlPage() {
  const qualityMetrics = [
    { date: '2024-02-18', neps: 45, impurities: 12, tensile: 28.5, elongation: 8.2 },
    { date: '2024-02-19', neps: 42, impurities: 11, tensile: 28.8, elongation: 8.3 },
    { date: '2024-02-20', neps: 48, impurities: 13, tensile: 28.2, elongation: 8.0 },
    { date: '2024-02-21', neps: 41, impurities: 10, tensile: 29.0, elongation: 8.4 },
    { date: '2024-02-22', neps: 44, impurities: 12, tensile: 28.6, elongation: 8.2 },
  ]

  const defectRate = [
    { machine: 'TC19i 01', okRate: 98.2, defectRate: 1.8, minorDefects: 0.8, majorDefects: 1.0 },
    { machine: 'TC19i 02', okRate: 99.1, defectRate: 0.9, minorDefects: 0.5, majorDefects: 0.4 },
    { machine: 'TC19i 03', okRate: 97.5, defectRate: 2.5, minorDefects: 1.5, majorDefects: 1.0 },
    { machine: 'TC19i 04', okRate: 98.8, defectRate: 1.2, minorDefects: 0.7, majorDefects: 0.5 },
    { machine: 'TC19i 05', okRate: 99.3, defectRate: 0.7, minorDefects: 0.4, majorDefects: 0.3 },
  ]

  const qualityIssues = [
    { id: 1, machine: 'TC19i 03', type: 'Neps Cao', severity: 'warning', description: '48 neps/1g vượt mục tiêu 40', time: '14:35' },
    { id: 2, machine: 'TC19i 01', type: 'Tạp Chất', severity: 'info', description: '12 tạp chất/g đúng tiêu chuẩn', time: '14:20' },
    { id: 3, machine: 'TST5 01', type: 'Độ Bền Kéo', severity: 'warning', description: '27.8 cN/tex dưới mục tiêu 28.5', time: '13:45' },
    { id: 4, machine: 'TC19i 05', type: 'Đạt QC', severity: 'success', description: 'Sản phẩm đạt tất cả tiêu chuẩn', time: '13:30' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Quản Lý Chất Lượng</h1>
        <p className="text-slate-400 mt-2">Kiểm soát chất lượng sợi cotton theo các tiêu chuẩn quốc tế</p>
      </div>

      {/* Quality Standards */}
      <Card className="bg-blue-900 bg-opacity-30 border-blue-700 p-6">
        <h3 className="text-blue-300 font-semibold mb-4">Tiêu Chuẩn Chất Lượng</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { name: 'Neps', target: '≤ 40', unit: 'neps/g', desc: 'Hạt nhỏ trong sợi' },
            { name: 'Tạp Chất', target: '≤ 12', unit: 'tạp/g', desc: 'Tạp chất ngoại lai' },
            { name: 'Độ Bền Kéo', target: '≥ 28.5', unit: 'cN/tex', desc: 'Khả năng chịu lực' },
            { name: 'Độ Dãn', target: '≥ 8.0', unit: '%', desc: 'Độ co giãn sợi' },
          ].map((metric, idx) => (
            <div key={idx} className="text-center">
              <p className="text-blue-300 text-sm font-medium">{metric.name}</p>
              <p className="text-2xl font-bold text-white mt-1">{metric.target}</p>
              <p className="text-slate-400 text-xs mt-1">{metric.unit}</p>
              <p className="text-blue-300 text-xs mt-2">{metric.desc}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Tỷ Lệ OK Trung Bình', value: '98.6%', color: 'from-green-600 to-green-700' },
          { label: 'Defect Rate TB', value: '1.4%', color: 'from-red-600 to-red-700' },
          { label: 'Máy Đạt Tiêu Chuẩn', value: '5/5', color: 'from-blue-600 to-blue-700' },
          { label: 'Trạng Thái Neps', value: 'OK', color: 'from-purple-600 to-purple-700' },
        ].map((kpi, idx) => (
          <Card key={idx} className="bg-slate-800 border-slate-700 p-6">
            <p className="text-slate-400 text-sm">{kpi.label}</p>
            <p className={`text-2xl font-bold mt-2 bg-gradient-to-r ${kpi.color} bg-clip-text text-transparent`}>
              {kpi.value}
            </p>
          </Card>
        ))}
      </div>

      {/* Quality Trend */}
      <Card className="bg-slate-800 border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Xu Hướng Chất Lượng (5 Ngày Gần Nhất)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={qualityMetrics} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis dataKey="date" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
              labelStyle={{ color: '#f1f5f9' }}
            />
            <Legend />
            <Line type="monotone" dataKey="neps" stroke="#2563eb" strokeWidth={2} name="Neps" dot={false} />
            <Line type="monotone" dataKey="impurities" stroke="#dc2626" strokeWidth={2} name="Tạp Chất" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Defect Rate by Machine */}
      <Card className="bg-slate-800 border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-700">
          <h3 className="text-lg font-semibold text-white">Tỷ Lệ Lỗi Theo Máy</h3>
        </div>
        <div className="p-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={defectRate} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="machine" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
                labelStyle={{ color: '#f1f5f9' }}
              />
              <Legend />
              <Bar dataKey="okRate" stackId="a" fill="#059669" name="Đạt %" />
              <Bar dataKey="defectRate" stackId="a" fill="#dc2626" name="Lỗi %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Machine Quality Details */}
      <Card className="bg-slate-800 border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-700 bg-slate-900">
              <tr className="text-slate-400">
                <th className="text-left py-3 px-4">Máy</th>
                <th className="text-right py-3 px-4">Tỷ Lệ OK</th>
                <th className="text-right py-3 px-4">Lỗi Nhỏ</th>
                <th className="text-right py-3 px-4">Lỗi Lớn</th>
                <th className="text-center py-3 px-4">Trạng Thái</th>
                <th className="text-center py-3 px-4">Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {defectRate.map((row, idx) => (
                <tr key={idx} className="border-b border-slate-700 hover:bg-slate-700 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">{row.machine}</td>
                  <td className="text-right py-3 px-4">
                    <span className={`font-semibold ${row.okRate >= 98 ? 'text-green-400' : 'text-amber-400'}`}>
                      {row.okRate}%
                    </span>
                  </td>
                  <td className="text-right py-3 px-4 text-amber-400">{row.minorDefects}%</td>
                  <td className="text-right py-3 px-4 text-red-400">{row.majorDefects}%</td>
                  <td className="text-center py-3 px-4">
                    {row.okRate >= 98 ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-900 bg-opacity-30 border border-green-700">
                        <CheckCircle className="w-3 h-3 text-green-400" />
                        <span className="text-xs text-green-300 font-medium">Đạt</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-900 bg-opacity-30 border border-amber-700">
                        <AlertTriangle className="w-3 h-3 text-amber-400" />
                        <span className="text-xs text-amber-300 font-medium">Cảnh Báo</span>
                      </span>
                    )}
                  </td>
                  <td className="text-center py-3 px-4">
                    <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                      Chi Tiết
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Recent Quality Issues */}
      <Card className="bg-slate-800 border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Sự Kiện Chất Lượng Gần Đây</h3>
        <div className="space-y-3">
          {qualityIssues.map((issue) => {
            const bgColor = issue.severity === 'warning' ? 'border-l-4 border-amber-600 bg-amber-900 bg-opacity-20' :
                           issue.severity === 'success' ? 'border-l-4 border-green-600 bg-green-900 bg-opacity-20' :
                           'border-l-4 border-blue-600 bg-blue-900 bg-opacity-20'
            const textColor = issue.severity === 'warning' ? 'text-amber-400' :
                             issue.severity === 'success' ? 'text-green-400' :
                             'text-blue-400'

            return (
              <Card key={issue.id} className={`border-slate-700 p-4 ${bgColor}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-white font-semibold">{issue.machine} • {issue.type}</h4>
                    <p className="text-slate-300 text-sm mt-1">{issue.description}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-semibold ${textColor}`}>
                      {issue.severity === 'warning' ? '⚠️' : issue.severity === 'success' ? '✓' : 'ℹ️'} {issue.type}
                    </p>
                    <p className="text-slate-400 text-xs mt-2">{issue.time}</p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
