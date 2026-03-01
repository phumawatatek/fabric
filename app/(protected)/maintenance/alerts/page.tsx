'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import StatusBadge from '@/components/StatusBadge'
import { AlertCircle, CheckCircle, Clock } from 'lucide-react'

interface Alert {
  id: string
  machine: string
  type: string
  severity: 'critical' | 'warning' | 'info'
  title: string
  time: string
  acknowledged: boolean
  minutesSinceAlert?: number
}

export default function AlertCenterPage() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      machine: 'TC19i 03',
      type: 'Malfunction',
      severity: 'critical',
      title: 'Quá nhiệt độ trụ',
      time: '14:35',
      acknowledged: false,
      minutesSinceAlert: 8,
    },
    {
      id: '2',
      machine: 'TC19i 07',
      type: 'Warning',
      severity: 'warning',
      title: 'Độ lệch T-CON vượt ngưỡng',
      time: '14:20',
      acknowledged: false,
      minutesSinceAlert: 23,
    },
    {
      id: '3',
      machine: 'TC19i 05',
      type: 'Information',
      severity: 'info',
      title: 'Bảo trì định kỳ đến hạn',
      time: '13:45',
      acknowledged: true,
      minutesSinceAlert: 58,
    },
    {
      id: '4',
      machine: 'TST5 01',
      type: 'Warning',
      severity: 'warning',
      title: 'Áp suất hệ thống thấp',
      time: '13:30',
      acknowledged: false,
      minutesSinceAlert: 73,
    },
    {
      id: '5',
      machine: 'TC19i 02',
      type: 'Information',
      severity: 'info',
      title: 'Kiểm tra định kỳ hoàn tất',
      time: '13:10',
      acknowledged: true,
      minutesSinceAlert: 93,
    },
  ])

  const [filterType, setFilterType] = useState<string>('all')
  const [filterAcknowledged, setFilterAcknowledged] = useState<boolean | null>(null)

  const handleAcknowledge = (id: string) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, acknowledged: true } : a))
  }

  const filteredAlerts = alerts.filter(alert => {
    if (filterType !== 'all' && alert.type !== filterType) return false
    if (filterAcknowledged !== null && alert.acknowledged !== filterAcknowledged) return false
    return true
  })

  const severityColors = {
    critical: 'border-l-4 border-red-600 bg-red-900 bg-opacity-20',
    warning: 'border-l-4 border-amber-600 bg-amber-900 bg-opacity-20',
    info: 'border-l-4 border-blue-600 bg-blue-900 bg-opacity-20',
  }

  const severityIcons = {
    critical: <AlertCircle className="w-5 h-5 text-red-400" />,
    warning: <AlertCircle className="w-5 h-5 text-amber-400" />,
    info: <AlertCircle className="w-5 h-5 text-blue-400" />,
  }

  const typeOptions = ['Malfunction', 'Warning', 'Information', 'Maintenance', 'No entry']

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Trung Tâm Cảnh Báo</h1>
        <p className="text-slate-400 mt-2">Quản lý các sự kiện và cảnh báo hệ thống</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800 border-slate-700 p-4">
          <p className="text-slate-400 text-sm">Tổng Cảnh Báo</p>
          <p className="text-2xl font-bold text-white mt-1">{alerts.length}</p>
        </Card>
        <Card className="bg-red-900 bg-opacity-30 border-red-700 p-4">
          <p className="text-red-300 text-sm">Nguy Hiểm</p>
          <p className="text-2xl font-bold text-red-400 mt-1">{alerts.filter(a => a.severity === 'critical').length}</p>
        </Card>
        <Card className="bg-amber-900 bg-opacity-30 border-amber-700 p-4">
          <p className="text-amber-300 text-sm">Cảnh Báo</p>
          <p className="text-2xl font-bold text-amber-400 mt-1">{alerts.filter(a => a.severity === 'warning').length}</p>
        </Card>
        <Card className="bg-blue-900 bg-opacity-30 border-blue-700 p-4">
          <p className="text-blue-300 text-sm">Chưa Xác Nhận</p>
          <p className="text-2xl font-bold text-blue-400 mt-1">{alerts.filter(a => !a.acknowledged).length}</p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-slate-800 border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Bộ Lọc</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Loại Sự Kiện</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 text-white px-3 py-2 rounded-lg"
            >
              <option value="all">Tất Cả</option>
              {typeOptions.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Trạng Thái</label>
            <select
              value={filterAcknowledged === null ? 'all' : filterAcknowledged ? 'acknowledged' : 'unacknowledged'}
              onChange={(e) => {
                if (e.target.value === 'all') setFilterAcknowledged(null)
                else if (e.target.value === 'acknowledged') setFilterAcknowledged(true)
                else setFilterAcknowledged(false)
              }}
              className="w-full bg-slate-700 border border-slate-600 text-white px-3 py-2 rounded-lg"
            >
              <option value="all">Tất Cả</option>
              <option value="unacknowledged">Chưa Xác Nhận</option>
              <option value="acknowledged">Đã Xác Nhận</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Tìm Kiếm</label>
            <input
              type="text"
              placeholder="Tên máy..."
              className="w-full bg-slate-700 border border-slate-600 text-white px-3 py-2 rounded-lg placeholder-slate-500"
            />
          </div>
        </div>
      </Card>

      {/* Alerts List */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <Card className="bg-slate-800 border-slate-700 p-8 text-center">
            <p className="text-slate-400">Không có cảnh báo phù hợp</p>
          </Card>
        ) : (
          filteredAlerts.map((alert) => (
            <Card
              key={alert.id}
              className={`border-slate-700 p-6 ${severityColors[alert.severity]}`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  {alert.acknowledged ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    severityIcons[alert.severity]
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-white font-semibold">{alert.machine}</h4>
                      <p className="text-slate-300 mt-1">{alert.title}</p>
                    </div>
                    <div className="text-right">
                      <StatusBadge status={alert.type} size="sm" />
                      <p className="text-xs text-slate-400 mt-2">{alert.time}</p>
                      {alert.minutesSinceAlert && alert.minutesSinceAlert > 15 && !alert.acknowledged && (
                        <div className="mt-1 flex items-center gap-1 text-red-400">
                          <Clock className="w-3 h-3" />
                          <span className="text-xs">Quá {alert.minutesSinceAlert} phút</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {!alert.acknowledged && (
                    <div className="flex gap-2 mt-4">
                      <Button
                        onClick={() => handleAcknowledge(alert.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-3"
                      >
                        Xác Nhận & Ghi Chú
                      </Button>
                      <Button
                        variant="ghost"
                        className="text-slate-400 hover:text-white text-sm py-1 px-3"
                      >
                        Bỏ Qua
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
