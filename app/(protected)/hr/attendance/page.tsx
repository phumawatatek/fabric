'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import StatusBadge from '@/components/StatusBadge'
import { Download, Check, X } from 'lucide-react'

interface AttendanceRecord {
  id: string
  employeeCode: string
  employeeName: string
  date: string
  shift: string
  checkIn?: string
  checkOut?: string
  status: 'present' | 'late' | 'absent' | 'on-leave'
  workingHours: number
  overtimeHours: number
}

export default function AttendancePage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

  const records: AttendanceRecord[] = [
    {
      id: '1',
      employeeCode: 'EMP001',
      employeeName: 'Nguyễn Văn A',
      date: selectedDate,
      shift: 'Shift 1',
      checkIn: '05:58',
      checkOut: '14:05',
      status: 'present',
      workingHours: 8.1,
      overtimeHours: 0.1,
    },
    {
      id: '2',
      employeeCode: 'EMP002',
      employeeName: 'Trần Thị B',
      date: selectedDate,
      shift: 'Shift 2',
      checkIn: '14:05',
      checkOut: '22:02',
      status: 'late',
      workingHours: 8,
      overtimeHours: 0,
    },
    {
      id: '3',
      employeeCode: 'EMP003',
      employeeName: 'Lê Văn C',
      date: selectedDate,
      shift: 'Shift 3',
      status: 'on-leave',
      workingHours: 0,
      overtimeHours: 0,
    },
    {
      id: '4',
      employeeCode: 'EMP004',
      employeeName: 'Phạm Thị D',
      date: selectedDate,
      shift: 'Shift 1',
      checkIn: '06:00',
      checkOut: '14:00',
      status: 'present',
      workingHours: 8,
      overtimeHours: 0,
    },
    {
      id: '5',
      employeeCode: 'EMP005',
      employeeName: 'Võ Văn E',
      date: selectedDate,
      shift: 'Shift 2',
      status: 'absent',
      workingHours: 0,
      overtimeHours: 0,
    },
  ]

  const statusColors = {
    present: 'bg-green-900 text-green-200 border-green-700',
    late: 'bg-amber-900 text-amber-200 border-amber-700',
    absent: 'bg-red-900 text-red-200 border-red-700',
    'on-leave': 'bg-blue-900 text-blue-200 border-blue-700',
  }

  const statusLabels = {
    present: 'Đủ',
    late: 'Trễ',
    absent: 'Vắng',
    'on-leave': 'Phép',
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Chấm Công & Giờ Công</h1>
          <p className="text-slate-400 mt-2">Quản lý đăng nhập/đăng xuất và tính giờ làm việc</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700 gap-2">
          <Download className="w-4 h-4" />
          Xuất Excel
        </Button>
      </div>

      {/* Date & Shift Filter */}
      <Card className="bg-slate-800 border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Bộ Lọc</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Ngày</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 text-white px-3 py-2 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Ca</label>
            <select className="w-full bg-slate-700 border border-slate-600 text-white px-3 py-2 rounded-lg">
              <option>Tất Cả Ca</option>
              <option>Shift 1</option>
              <option>Shift 2</option>
              <option>Shift 3</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Trạng Thái</label>
            <select className="w-full bg-slate-700 border border-slate-600 text-white px-3 py-2 rounded-lg">
              <option>Tất Cả</option>
              <option>Đủ</option>
              <option>Trễ</option>
              <option>Vắng</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Tổng NV', value: records.length, color: 'from-blue-600 to-blue-700' },
          { label: 'Đủ Giờ', value: records.filter(r => r.status === 'present').length, color: 'from-green-600 to-green-700' },
          { label: 'Trễ', value: records.filter(r => r.status === 'late').length, color: 'from-amber-600 to-amber-700' },
          { label: 'Vắng', value: records.filter(r => r.status === 'absent').length, color: 'from-red-600 to-red-700' },
        ].map((stat, idx) => (
          <Card key={idx} className="bg-slate-800 border-slate-700 p-4">
            <p className="text-slate-400 text-sm">{stat.label}</p>
            <p className={`text-2xl font-bold mt-1 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
              {stat.value}
            </p>
          </Card>
        ))}
      </div>

      {/* Attendance Table */}
      <Card className="bg-slate-800 border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-700 bg-slate-900">
              <tr className="text-slate-400">
                <th className="text-left py-3 px-4">Mã NV</th>
                <th className="text-left py-3 px-4">Tên</th>
                <th className="text-center py-3 px-4">Ca</th>
                <th className="text-center py-3 px-4">Đăng Nhập</th>
                <th className="text-center py-3 px-4">Đăng Xuất</th>
                <th className="text-right py-3 px-4">Giờ Làm</th>
                <th className="text-right py-3 px-4">OT</th>
                <th className="text-center py-3 px-4">Trạng Thái</th>
                <th className="text-center py-3 px-4">Xác Nhận</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.id} className="border-b border-slate-700 hover:bg-slate-700 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">{record.employeeCode}</td>
                  <td className="py-3 px-4 text-slate-300">{record.employeeName}</td>
                  <td className="py-3 px-4 text-center text-slate-300 text-xs">{record.shift}</td>
                  <td className="py-3 px-4 text-center text-slate-300">
                    {record.checkIn || '—'}
                  </td>
                  <td className="py-3 px-4 text-center text-slate-300">
                    {record.checkOut || '—'}
                  </td>
                  <td className="py-3 px-4 text-right text-green-400 font-semibold">
                    {record.workingHours}h
                  </td>
                  <td className="py-3 px-4 text-right text-amber-400">
                    {record.overtimeHours}h
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-block px-2 py-1 rounded border text-xs font-medium ${statusColors[record.status]}`}>
                      {statusLabels[record.status]}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Button className="bg-green-600 hover:bg-green-700 text-white p-1" size="sm">
                      <Check className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Bulk Actions */}
      <Card className="bg-slate-800 border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Hành Động Hàng Loạt</h3>
        <div className="flex gap-2 flex-wrap">
          <Button className="bg-blue-600 hover:bg-blue-700">Phê Duyệt Hôm Nay</Button>
          <Button className="bg-slate-700 hover:bg-slate-600">Gửi Thông Báo</Button>
          <Button className="bg-slate-700 hover:bg-slate-600">Xuất Báo Cáo</Button>
        </div>
      </Card>
    </div>
  )
}
