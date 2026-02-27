'use client'

import { useState } from 'react'
import { Shield, AlertTriangle, Leaf, Volume2, CheckCircle, XCircle, Clock } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useFactoryData } from '@/hooks/useFactoryData'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function SafetyEnvironmentView() {
  const { safetyIncidents, setSafetyIncidents, environmentMetrics, safetyChecklists, setSafetyChecklists } = useFactoryData()
  const [selectedIncident, setSelectedIncident] = useState<string | null>(null)

  const openIncidents = safetyIncidents.filter(i => i.status !== 'đã đóng')
  const severeIncidents = safetyIncidents.filter(i => i.severity === 'nặng')
  const envWarnings = environmentMetrics.filter(e => e.status !== 'bình thường')
  const totalCheckItems = safetyChecklists.reduce((sum, sc) => sum + sc.items.length, 0)
  const checkedItems = safetyChecklists.reduce((sum, sc) => sum + sc.items.filter(i => i.checked).length, 0)
  const complianceRate = totalCheckItems > 0 ? (checkedItems / totalCheckItems) * 100 : 0

  const getSeverityColor = (severity: string) => {
    const colors: Record<string, string> = {
      'nhẹ': 'bg-yellow-900/50 text-yellow-200 border-yellow-700',
      'trung bình': 'bg-orange-900/50 text-orange-200 border-orange-700',
      'nặng': 'bg-red-900/50 text-red-200 border-red-700',
    }
    return colors[severity] || 'bg-slate-800 text-slate-300'
  }

  const getIncidentStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'mở': 'bg-red-900/50 text-red-200 border-red-700',
      'đang xử lý': 'bg-yellow-900/50 text-yellow-200 border-yellow-700',
      'đã đóng': 'bg-green-900/50 text-green-200 border-green-700',
    }
    return colors[status] || 'bg-slate-800 text-slate-300'
  }

  const getEnvStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'bình thường': 'text-green-400',
      'cảnh báo': 'text-yellow-400',
      'vượt ngưỡng': 'text-red-400',
    }
    return colors[status] || 'text-slate-400'
  }

  const getEnvIcon = (type: string) => {
    const icons: Record<string, React.ReactNode> = {
      'khí thải': <Leaf size={16} className="text-green-400" />,
      'nước thải': <span className="text-blue-400 text-sm">💧</span>,
      'tiếng ồn': <Volume2 size={16} className="text-yellow-400" />,
      'bụi': <span className="text-orange-400 text-sm">🌫</span>,
    }
    return icons[type] || null
  }

  const incidentTypeData = [
    { name: 'Tai nạn', value: safetyIncidents.filter(i => i.type === 'tai nạn').length },
    { name: 'Suýt xảy ra', value: safetyIncidents.filter(i => i.type === 'suýt xảy ra').length },
    { name: 'Vi phạm', value: safetyIncidents.filter(i => i.type === 'vi phạm').length },
  ]

  const handleCloseIncident = (id: string) => {
    setSafetyIncidents(prev => prev.map(i =>
      i.id === id ? { ...i, status: 'đã đóng' } : i
    ))
  }

  const handleToggleChecklist = (checklistId: string, itemIndex: number) => {
    setSafetyChecklists(prev => prev.map(sc => {
      if (sc.id === checklistId) {
        const newItems = [...sc.items]
        newItems[itemIndex] = { ...newItems[itemIndex], checked: !newItems[itemIndex].checked }
        return { ...sc, items: newItems }
      }
      return sc
    }))
  }

  const incident = selectedIncident ? safetyIncidents.find(i => i.id === selectedIncident) : null

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-900 border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="text-blue-400" size={20} />
            <span className="text-slate-400 text-sm">Sự Cố Mở</span>
          </div>
          <p className="text-2xl font-bold text-white">{openIncidents.length}</p>
          <p className="text-xs text-yellow-400 mt-1">Cần xử lý</p>
        </Card>
        <Card className="bg-slate-900 border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="text-red-400" size={20} />
            <span className="text-slate-400 text-sm">Sự Cố Nghiêm Trọng</span>
          </div>
          <p className="text-2xl font-bold text-white">{severeIncidents.length}</p>
          <p className="text-xs text-red-400 mt-1">Mức nặng</p>
        </Card>
        <Card className="bg-slate-900 border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Leaf className="text-green-400" size={20} />
            <span className="text-slate-400 text-sm">Cảnh Báo Môi Trường</span>
          </div>
          <p className="text-2xl font-bold text-white">{envWarnings.length}</p>
          <p className="text-xs text-orange-400 mt-1">Chỉ số bất thường</p>
        </Card>
        <Card className="bg-slate-900 border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="text-green-400" size={20} />
            <span className="text-slate-400 text-sm">Tỷ Lệ Tuân Thủ</span>
          </div>
          <p className="text-2xl font-bold text-white">{complianceRate.toFixed(0)}%</p>
          <p className="text-xs text-slate-400 mt-1">{checkedItems}/{totalCheckItems} hạng mục</p>
        </Card>
      </div>

      {/* Environment Metrics */}
      <Card className="bg-slate-900 border-slate-800 p-6">
        <h3 className="text-xl font-bold text-white mb-4">Chỉ Số Môi Trường</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {environmentMetrics.map(metric => {
            const pct = (metric.value / metric.limit) * 100
            return (
              <div key={metric.id} className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getEnvIcon(metric.type)}
                    <span className="text-white font-medium capitalize">{metric.type}</span>
                  </div>
                  <span className={`text-sm font-medium ${getEnvStatusColor(metric.status)}`}>{metric.status}</span>
                </div>
                <p className="text-slate-400 text-xs mb-2">{metric.location}</p>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white text-lg font-bold">{metric.value} {metric.unit}</span>
                  <span className="text-slate-400 text-xs">Giới hạn: {metric.limit} {metric.unit}</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${pct >= 100 ? 'bg-red-500' : pct >= 90 ? 'bg-yellow-500' : 'bg-green-500'}`}
                    style={{ width: `${Math.min(100, pct)}%` }}
                  />
                </div>
                <p className="text-slate-400 text-xs mt-1">Đo lúc: {metric.lastMeasured}</p>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Incidents Chart + List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="bg-slate-900 border-slate-800 p-6">
          <h3 className="text-xl font-bold text-white mb-4">Phân Loại Sự Cố</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={incidentTypeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" allowDecimals={false} />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} />
              <Bar dataKey="value" fill="#F97316" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card className="bg-slate-900 border-slate-800 p-6 lg:col-span-2">
          <h3 className="text-xl font-bold text-white mb-4">Danh Sách Sự Cố An Toàn</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700 text-slate-400">
                  <th className="text-left py-3 px-2">Loại</th>
                  <th className="text-left py-3 px-2">Mô tả</th>
                  <th className="text-center py-3 px-2">Mức độ</th>
                  <th className="text-center py-3 px-2">Ngày</th>
                  <th className="text-center py-3 px-2">Trạng thái</th>
                  <th className="text-center py-3 px-2">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {safetyIncidents.map(inc => (
                  <tr key={inc.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                    <td className="py-3 px-2 text-white capitalize">{inc.type}</td>
                    <td className="py-3 px-2 text-slate-300 max-w-xs truncate">{inc.description}</td>
                    <td className="py-3 px-2 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs border ${getSeverityColor(inc.severity)}`}>{inc.severity}</span>
                    </td>
                    <td className="py-3 px-2 text-center text-slate-300">{inc.date}</td>
                    <td className="py-3 px-2 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs border ${getIncidentStatusColor(inc.status)}`}>{inc.status}</span>
                    </td>
                    <td className="py-3 px-2 text-center space-x-1">
                      <Button size="sm" variant="ghost" className="text-blue-400 h-7" onClick={() => setSelectedIncident(inc.id)}>Chi tiết</Button>
                      {inc.status !== 'đã đóng' && (
                        <Button size="sm" className="bg-green-700 hover:bg-green-600 text-xs h-7" onClick={() => handleCloseIncident(inc.id)}>Đóng</Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Safety Checklists */}
      <Card className="bg-slate-900 border-slate-800 p-6">
        <h3 className="text-xl font-bold text-white mb-4">Checklist An Toàn Hàng Ngày</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {safetyChecklists.map(sc => {
            const completed = sc.items.filter(i => i.checked).length
            const total = sc.items.length
            return (
              <div key={sc.id} className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-white font-semibold">{sc.area}</h4>
                    <p className="text-slate-400 text-xs">Kiểm tra: {sc.inspector} • Ca: {sc.shift} • {sc.date}</p>
                  </div>
                  <span className={`text-sm font-medium ${completed === total ? 'text-green-400' : 'text-yellow-400'}`}>
                    {completed}/{total}
                  </span>
                </div>
                <div className="space-y-2">
                  {sc.items.map((item, idx) => (
                    <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => handleToggleChecklist(sc.id, idx)}
                        className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-blue-600 focus:ring-blue-500"
                      />
                      <span className={`text-sm ${item.checked ? 'text-green-300 line-through' : 'text-slate-300'}`}>{item.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Incident Detail Modal */}
      {incident && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setSelectedIncident(null)}>
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Chi Tiết Sự Cố</h3>
              <button className="text-slate-400 hover:text-white text-xl" onClick={() => setSelectedIncident(null)}>✕</button>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-800 rounded-lg p-3">
                  <p className="text-slate-400 text-xs">Loại sự cố</p>
                  <p className="text-white font-medium capitalize">{incident.type}</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-3">
                  <p className="text-slate-400 text-xs">Mức độ</p>
                  <span className={`px-2 py-1 rounded-full text-xs border ${getSeverityColor(incident.severity)}`}>{incident.severity}</span>
                </div>
                <div className="bg-slate-800 rounded-lg p-3">
                  <p className="text-slate-400 text-xs">Vị trí</p>
                  <p className="text-white font-medium">{incident.location}</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-3">
                  <p className="text-slate-400 text-xs">Ngày</p>
                  <p className="text-white font-medium">{incident.date}</p>
                </div>
              </div>
              <div className="bg-slate-800 rounded-lg p-3">
                <p className="text-slate-400 text-xs">Mô tả</p>
                <p className="text-white text-sm mt-1">{incident.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-800 rounded-lg p-3">
                  <p className="text-slate-400 text-xs">Người phụ trách</p>
                  <p className="text-white font-medium">{incident.assignee}</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-3">
                  <p className="text-slate-400 text-xs">Trạng thái</p>
                  <span className={`px-2 py-1 rounded-full text-xs border ${getIncidentStatusColor(incident.status)}`}>{incident.status}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
