'use client'

import { useState } from 'react'
import { Brain, AlertTriangle, TrendingUp, Calendar, Cpu, ChevronRight } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useFactoryData } from '@/hooks/useFactoryData'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, LineChart, Line } from 'recharts'

export default function AIPredictionView() {
  const { predictiveMaintenance, demandForecasts, productionScheduleAI, machines } = useFactoryData()
  const [selectedMachine, setSelectedMachine] = useState<string | null>(null)

  const highRiskMachines = predictiveMaintenance.filter(p => p.riskLevel === 'rất cao' || p.riskLevel === 'cao')
  const avgConfidence = predictiveMaintenance.length > 0
    ? predictiveMaintenance.reduce((sum, p) => sum + p.confidence, 0) / predictiveMaintenance.length
    : 0
  const avgEfficiency = productionScheduleAI.length > 0
    ? productionScheduleAI.reduce((sum, s) => sum + s.efficiency, 0) / productionScheduleAI.length
    : 0

  const getRiskColor = (risk: string) => {
    const colors: Record<string, string> = {
      'thấp': 'bg-green-900/50 text-green-200 border-green-700',
      'trung bình': 'bg-yellow-900/50 text-yellow-200 border-yellow-700',
      'cao': 'bg-orange-900/50 text-orange-200 border-orange-700',
      'rất cao': 'bg-red-900/50 text-red-200 border-red-700',
    }
    return colors[risk] || 'bg-slate-800 text-slate-300'
  }

  const getRiskBarColor = (risk: string) => {
    const colors: Record<string, string> = {
      'thấp': 'bg-green-500',
      'trung bình': 'bg-yellow-500',
      'cao': 'bg-orange-500',
      'rất cao': 'bg-red-500',
    }
    return colors[risk] || 'bg-slate-500'
  }

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      'cao': 'bg-red-900/50 text-red-200 border-red-700',
      'trung bình': 'bg-yellow-900/50 text-yellow-200 border-yellow-700',
      'thấp': 'bg-green-900/50 text-green-200 border-green-700',
    }
    return colors[priority] || 'bg-slate-800 text-slate-300'
  }

  const getTrendIcon = (trend: string) => {
    if (trend === 'tăng') return <TrendingUp size={14} className="text-green-400" />
    if (trend === 'giảm') return <TrendingUp size={14} className="text-red-400 rotate-180" />
    return <span className="text-yellow-400 text-xs">→</span>
  }

  // Demand forecast chart for March
  const marchForecasts = demandForecasts.filter(d => d.month === '2024-03')
  const demandChartData = marchForecasts.map(d => ({
    name: d.product.replace('Vải ', ''),
    'Dự đoán': d.predictedDemand,
    'Độ tin cậy': d.confidence,
  }))

  // Risk radar data
  const radarData = predictiveMaintenance.map(p => ({
    machine: p.machineName.replace('Máy Xoắn ', 'M'),
    'Xác suất lỗi': p.failureProbability,
    'Độ tin cậy': p.confidence,
  }))

  const selectedPM = selectedMachine ? predictiveMaintenance.find(p => p.machineId === selectedMachine) : null

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-900 border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Brain className="text-purple-400" size={20} />
            <span className="text-slate-400 text-sm">Mô Hình AI</span>
          </div>
          <p className="text-2xl font-bold text-white">3</p>
          <p className="text-xs text-purple-400 mt-1">Đang hoạt động</p>
        </Card>
        <Card className="bg-slate-900 border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="text-red-400" size={20} />
            <span className="text-slate-400 text-sm">Máy Rủi Ro Cao</span>
          </div>
          <p className="text-2xl font-bold text-white">{highRiskMachines.length}</p>
          <p className="text-xs text-red-400 mt-1">Cần can thiệp sớm</p>
        </Card>
        <Card className="bg-slate-900 border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Cpu className="text-blue-400" size={20} />
            <span className="text-slate-400 text-sm">Độ Tin Cậy TB</span>
          </div>
          <p className="text-2xl font-bold text-white">{avgConfidence.toFixed(1)}%</p>
          <p className="text-xs text-blue-400 mt-1">Dự đoán bảo trì</p>
        </Card>
        <Card className="bg-slate-900 border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="text-green-400" size={20} />
            <span className="text-slate-400 text-sm">Hiệu Suất Lịch SX</span>
          </div>
          <p className="text-2xl font-bold text-white">{avgEfficiency.toFixed(1)}%</p>
          <p className="text-xs text-green-400 mt-1">Tối ưu bởi AI</p>
        </Card>
      </div>

      {/* Predictive Maintenance */}
      <Card className="bg-slate-900 border-slate-800 p-6">
        <h3 className="text-xl font-bold text-white mb-2">Dự Đoán Bảo Trì (Predictive Maintenance)</h3>
        <p className="text-slate-400 text-sm mb-4">AI phân tích dữ liệu vận hành để dự đoán thời điểm hỏng hóc</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-3">
            {predictiveMaintenance.map(pm => (
              <div
                key={pm.machineId}
                className="bg-slate-800 border border-slate-700 rounded-lg p-4 hover:border-blue-600 transition-colors cursor-pointer"
                onClick={() => setSelectedMachine(pm.machineId)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-semibold">{pm.machineName}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs border ${getRiskColor(pm.riskLevel)}`}>{pm.riskLevel}</span>
                </div>
                <div className="flex items-center gap-4 text-sm mb-2">
                  <span className="text-slate-400">Xác suất lỗi:</span>
                  <div className="flex-1 bg-slate-700 rounded-full h-2">
                    <div className={`h-2 rounded-full ${getRiskBarColor(pm.riskLevel)}`} style={{ width: `${pm.failureProbability}%` }} />
                  </div>
                  <span className="text-white font-medium w-10 text-right">{pm.failureProbability}%</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Dự kiến lỗi: {pm.predictedFailureDate}</span>
                  <span>Độ tin cậy: {pm.confidence}%</span>
                </div>
              </div>
            ))}
          </div>
          <div>
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="machine" stroke="#9ca3af" tick={{ fontSize: 11 }} />
                <PolarRadiusAxis stroke="#334155" />
                <Radar name="Xác suất lỗi" dataKey="Xác suất lỗi" stroke="#EF4444" fill="#EF4444" fillOpacity={0.3} />
                <Radar name="Độ tin cậy" dataKey="Độ tin cậy" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.2} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>

      {/* Demand Forecast */}
      <Card className="bg-slate-900 border-slate-800 p-6">
        <h3 className="text-xl font-bold text-white mb-2">Dự Báo Nhu Cầu Thị Trường</h3>
        <p className="text-slate-400 text-sm mb-4">AI phân tích xu hướng để dự đoán nhu cầu sản phẩm</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={demandChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#9ca3af" tick={{ fontSize: 11 }} />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} />
              <Bar dataKey="Dự đoán" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="space-y-3">
            <h4 className="text-white font-semibold">Chi Tiết Dự Báo - Tháng 3/2024</h4>
            {marchForecasts.map(forecast => (
              <div key={forecast.product} className="bg-slate-800 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white text-sm font-medium">{forecast.product}</span>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(forecast.trend)}
                    <span className="text-slate-300 text-xs">{forecast.trend}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-purple-400 font-medium">{forecast.predictedDemand.toLocaleString()} mét</span>
                  <span className="text-slate-400">Độ tin cậy: {forecast.confidence}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* AI Production Schedule */}
      <Card className="bg-slate-900 border-slate-800 p-6">
        <h3 className="text-xl font-bold text-white mb-2">Lịch Sản Xuất Tối Ưu (AI)</h3>
        <p className="text-slate-400 text-sm mb-4">AI tối ưu hóa lịch sản xuất dựa trên năng lực máy, đơn hàng và ưu tiên</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700 text-slate-400">
                <th className="text-left py-3 px-2">Đơn hàng</th>
                <th className="text-left py-3 px-2">Sản phẩm</th>
                <th className="text-center py-3 px-2">Bắt đầu</th>
                <th className="text-center py-3 px-2">Kết thúc</th>
                <th className="text-center py-3 px-2">Máy phân bổ</th>
                <th className="text-center py-3 px-2">Hiệu suất</th>
                <th className="text-center py-3 px-2">Ưu tiên</th>
              </tr>
            </thead>
            <tbody>
              {productionScheduleAI.map(sch => (
                <tr key={sch.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                  <td className="py-3 px-2 text-blue-400 font-medium">{sch.orderNo}</td>
                  <td className="py-3 px-2 text-white">{sch.product}</td>
                  <td className="py-3 px-2 text-center text-slate-300">{sch.suggestedStart}</td>
                  <td className="py-3 px-2 text-center text-slate-300">{sch.suggestedEnd}</td>
                  <td className="py-3 px-2 text-center">
                    <div className="flex flex-wrap justify-center gap-1">
                      {sch.assignedMachines.map(m => (
                        <span key={m} className="bg-slate-700 text-slate-300 px-1.5 py-0.5 rounded text-xs">{m}</span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-2 text-center">
                    <span className={`font-medium ${sch.efficiency >= 90 ? 'text-green-400' : sch.efficiency >= 85 ? 'text-yellow-400' : 'text-orange-400'}`}>
                      {sch.efficiency}%
                    </span>
                  </td>
                  <td className="py-3 px-2 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs border ${getPriorityColor(sch.priority)}`}>{sch.priority}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* AI Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-purple-900/30 to-slate-900 border-purple-800 p-6">
          <Brain size={24} className="text-purple-400 mb-3" />
          <h4 className="text-white font-semibold mb-2">Bảo Trì Dự Đoán</h4>
          <p className="text-slate-300 text-sm">AI phân tích rung động, nhiệt độ và dữ liệu lịch sử để dự đoán chính xác thời điểm máy cần bảo trì, giảm 40% thời gian dừng máy.</p>
        </Card>
        <Card className="bg-gradient-to-br from-blue-900/30 to-slate-900 border-blue-800 p-6">
          <TrendingUp size={24} className="text-blue-400 mb-3" />
          <h4 className="text-white font-semibold mb-2">Dự Báo Nhu Cầu</h4>
          <p className="text-slate-300 text-sm">Mô hình ML phân tích dữ liệu thị trường, mùa vụ và xu hướng để dự báo nhu cầu với độ chính xác lên đến 88%.</p>
        </Card>
        <Card className="bg-gradient-to-br from-green-900/30 to-slate-900 border-green-800 p-6">
          <Calendar size={24} className="text-green-400 mb-3" />
          <h4 className="text-white font-semibold mb-2">Tối Ưu Lịch SX</h4>
          <p className="text-slate-300 text-sm">Thuật toán tối ưu phân bổ máy móc và thứ tự sản xuất, nâng cao hiệu suất trung bình lên {avgEfficiency.toFixed(0)}%.</p>
        </Card>
      </div>

      {/* Machine Detail Modal */}
      {selectedPM && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setSelectedMachine(null)}>
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">{selectedPM.machineName}</h3>
              <button className="text-slate-400 hover:text-white text-xl" onClick={() => setSelectedMachine(null)}>✕</button>
            </div>
            <div className="space-y-3">
              <div className="bg-slate-800 rounded-lg p-4 text-center">
                <p className="text-slate-400 text-xs mb-1">Xác Suất Hỏng</p>
                <p className={`text-4xl font-bold ${selectedPM.failureProbability >= 60 ? 'text-red-400' : selectedPM.failureProbability >= 30 ? 'text-yellow-400' : 'text-green-400'}`}>
                  {selectedPM.failureProbability}%
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-800 rounded-lg p-3">
                  <p className="text-slate-400 text-xs">Mức rủi ro</p>
                  <span className={`px-2 py-1 rounded-full text-xs border ${getRiskColor(selectedPM.riskLevel)}`}>{selectedPM.riskLevel}</span>
                </div>
                <div className="bg-slate-800 rounded-lg p-3">
                  <p className="text-slate-400 text-xs">Độ tin cậy AI</p>
                  <p className="text-blue-400 font-bold">{selectedPM.confidence}%</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-3 col-span-2">
                  <p className="text-slate-400 text-xs">Ngày dự kiến hỏng</p>
                  <p className="text-white font-medium">{selectedPM.predictedFailureDate}</p>
                </div>
              </div>
              <div className="bg-blue-900/30 border border-blue-800 rounded-lg p-4">
                <p className="text-blue-300 text-xs font-semibold mb-1">Khuyến Nghị AI</p>
                <p className="text-white text-sm">{selectedPM.recommendedAction}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
