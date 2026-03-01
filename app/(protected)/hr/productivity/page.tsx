'use client'

import { Card } from '@/components/ui/card'
import {
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Heatmap,
} from 'recharts'

interface EmployeeProductivity {
  rank: number
  code: string
  name: string
  output: number
  quality: number
  responseTime: number
  safety: number
  overall: number
  grade: 'A' | 'B' | 'C' | 'D'
}

export default function ProductivityDashboardPage() {
  const employees: EmployeeProductivity[] = [
    { rank: 1, code: 'EMP001', name: 'Nguyễn Văn A', output: 95, quality: 92, responseTime: 88, safety: 95, overall: 92.5, grade: 'A' },
    { rank: 2, code: 'EMP002', name: 'Trần Thị B', output: 88, quality: 90, responseTime: 85, safety: 92, overall: 88.75, grade: 'A' },
    { rank: 3, code: 'EMP004', name: 'Phạm Thị D', output: 82, quality: 85, responseTime: 80, safety: 88, overall: 83.75, grade: 'B' },
    { rank: 4, code: 'EMP003', name: 'Lê Văn C', output: 78, quality: 81, responseTime: 75, safety: 85, overall: 79.75, grade: 'B' },
    { rank: 5, code: 'EMP005', name: 'Võ Văn E', output: 72, quality: 75, responseTime: 70, safety: 80, overall: 74.25, grade: 'C' },
  ]

  const gradeColors = {
    A: 'text-green-400',
    B: 'text-blue-400',
    C: 'text-amber-400',
    D: 'text-red-400',
  }

  const topEmployee = employees[0]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Bảng Điểm Năng Suất</h1>
        <p className="text-slate-400 mt-2">Đánh giá năng suất nhân viên: 40% Output + 25% Quality + 20% Response + 15% Safety</p>
      </div>

      {/* Top Performer */}
      <Card className="bg-gradient-to-r from-green-900 to-green-800 border-green-700 p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="text-green-200 text-sm font-medium mb-2">HẠNG 1</p>
            <h3 className="text-3xl font-bold text-white">{topEmployee.name}</h3>
            <p className="text-green-300 mt-1">{topEmployee.code} • {topEmployee.rank > 2 ? 'Nhóm ' : 'Hạng ' + topEmployee.grade}</p>
          </div>
          <div className="text-center">
            <p className="text-green-200 text-sm font-medium mb-2">ĐIỂM TỔNG HỢP</p>
            <p className="text-5xl font-bold text-white">{topEmployee.overall}</p>
            <p className="text-green-300 text-sm mt-2">điểm (0-100)</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Output', value: topEmployee.output },
              { label: 'Quality', value: topEmployee.quality },
              { label: 'Response', value: topEmployee.responseTime },
              { label: 'Safety', value: topEmployee.safety },
            ].map((metric, idx) => (
              <div key={idx} className="text-center">
                <p className="text-green-300 text-xs">{metric.label}</p>
                <p className="text-2xl font-bold text-white mt-1">{metric.value}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Ranking Table */}
      <Card className="bg-slate-800 border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-700">
          <h3 className="text-lg font-semibold text-white">Top 5 Nhân Viên</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-700 bg-slate-900">
              <tr className="text-slate-400">
                <th className="text-center py-3 px-4">Hạng</th>
                <th className="text-left py-3 px-4">Mã NV</th>
                <th className="text-left py-3 px-4">Tên</th>
                <th className="text-right py-3 px-4">Output (40%)</th>
                <th className="text-right py-3 px-4">Quality (25%)</th>
                <th className="text-right py-3 px-4">Response (20%)</th>
                <th className="text-right py-3 px-4">Safety (15%)</th>
                <th className="text-right py-3 px-4">Tổng Cộng</th>
                <th className="text-center py-3 px-4">Hạng</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.code} className="border-b border-slate-700 hover:bg-slate-700 transition-colors">
                  <td className="text-center py-3 px-4">
                    <span className={`inline-block w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      emp.rank === 1 ? 'bg-yellow-600 text-yellow-100' :
                      emp.rank === 2 ? 'bg-slate-400 text-slate-900' :
                      emp.rank === 3 ? 'bg-amber-700 text-amber-100' :
                      'bg-slate-600 text-slate-300'
                    }`}>
                      {emp.rank}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium text-white">{emp.code}</td>
                  <td className="py-3 px-4 text-slate-300">{emp.name}</td>
                  <td className="text-right py-3 px-4 text-green-400">{emp.output}</td>
                  <td className="text-right py-3 px-4 text-blue-400">{emp.quality}</td>
                  <td className="text-right py-3 px-4 text-purple-400">{emp.responseTime}</td>
                  <td className="text-right py-3 px-4 text-teal-400">{emp.safety}</td>
                  <td className="text-right py-3 px-4 font-bold text-white">{emp.overall}</td>
                  <td className="text-center py-3 px-4">
                    <span className={`font-bold ${gradeColors[emp.grade]}`}>{emp.grade}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Chart */}
        <Card className="bg-slate-800 border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-6">So Sánh Top 3</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={employees.slice(0, 3)}>
              <PolarGrid stroke="#475569" />
              <PolarAngleAxis dataKey="name" stroke="#94a3b8" />
              <PolarRadiusAxis stroke="#94a3b8" />
              <Radar name={employees[0].name} dataKey="output" stroke="#2563eb" fill="#2563eb" fillOpacity={0.1} />
              <Radar name={employees[1].name} dataKey="quality" stroke="#059669" fill="#059669" fillOpacity={0.1} />
              <Radar name={employees[2].name} dataKey="responseTime" stroke="#d97706" fill="#d97706" fillOpacity={0.1} />
              <Legend />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
                labelStyle={{ color: '#f1f5f9' }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </Card>

        {/* Bar Chart */}
        <Card className="bg-slate-800 border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Điểm Tổng Hợp</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={employees} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="code" stroke="#94a3b8" angle={-45} textAnchor="end" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
                labelStyle={{ color: '#f1f5f9' }}
              />
              <Bar dataKey="overall" fill="#2563eb" name="Điểm Tổng Hợp" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Scorecard Legend */}
      <Card className="bg-slate-800 border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Tiêu Chí Đánh Giá</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { name: 'Output', percent: '40%', desc: 'Sản lượng, tốc độ làm việc' },
            { name: 'Quality', percent: '25%', desc: 'Chất lượng sản phẩm, độ chính xác' },
            { name: 'Response Time', percent: '20%', desc: 'Thời gian phản ứng với vấn đề' },
            { name: 'Safety', percent: '15%', desc: 'Tuân thủ an toàn, không sự cố' },
          ].map((criterion, idx) => (
            <div key={idx} className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-slate-700 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">{criterion.percent}</span>
              </div>
              <div>
                <p className="text-white font-medium">{criterion.name}</p>
                <p className="text-slate-400 text-sm mt-1">{criterion.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
