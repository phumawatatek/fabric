'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import StatusBadge from '@/components/StatusBadge'
import { Plus, Search } from 'lucide-react'

interface Employee {
  id: string
  code: string
  name: string
  position: string
  grade: 'A' | 'B' | 'C' | 'D'
  shift: 'Shift 1' | 'Shift 2' | 'Shift 3'
  status: 'active' | 'inactive'
  salary: number
  machines?: string[]
}

export default function EmployeeListPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const employees: Employee[] = [
    {
      id: '1',
      code: 'EMP001',
      name: 'Nguyễn Văn A',
      position: 'Supervisor',
      grade: 'A',
      shift: 'Shift 1',
      status: 'active',
      salary: 15000000,
    },
    {
      id: '2',
      code: 'EMP002',
      name: 'Trần Thị B',
      position: 'Operator',
      grade: 'A',
      shift: 'Shift 2',
      status: 'active',
      salary: 8000000,
      machines: ['M1', 'M2'],
    },
    {
      id: '3',
      code: 'EMP003',
      name: 'Lê Văn C',
      position: 'Technician',
      grade: 'B',
      shift: 'Shift 3',
      status: 'active',
      salary: 12000000,
    },
    {
      id: '4',
      code: 'EMP004',
      name: 'Phạm Thị D',
      position: 'Operator',
      grade: 'C',
      shift: 'Shift 1',
      status: 'active',
      salary: 7500000,
      machines: ['M3', 'M4'],
    },
    {
      id: '5',
      code: 'EMP005',
      name: 'Võ Văn E',
      position: 'Operator',
      grade: 'B',
      shift: 'Shift 2',
      status: 'inactive',
      salary: 8200000,
    },
  ]

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.code.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const gradeColors = {
    A: 'bg-green-900 text-green-200 border-green-700',
    B: 'bg-blue-900 text-blue-200 border-blue-700',
    C: 'bg-amber-900 text-amber-200 border-amber-700',
    D: 'bg-red-900 text-red-200 border-red-700',
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Danh Sách Nhân Viên</h1>
          <p className="text-slate-400 mt-2">Quản lý nhân sự và phân công máy</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
          <Plus className="w-4 h-4" />
          Thêm Nhân Viên
        </Button>
      </div>

      {/* Search */}
      <Card className="bg-slate-800 border-slate-700 p-4">
        <div className="flex gap-2">
          <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên hoặc mã nhân viên..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent text-white placeholder-slate-500 outline-none"
          />
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Tổng NV', value: employees.length, color: 'from-blue-600 to-blue-700' },
          { label: 'Đang Làm', value: employees.filter(e => e.status === 'active').length, color: 'from-green-600 to-green-700' },
          { label: 'Tạm Dừng', value: employees.filter(e => e.status === 'inactive').length, color: 'from-amber-600 to-amber-700' },
          { label: 'Hạng A', value: employees.filter(e => e.grade === 'A').length, color: 'from-purple-600 to-purple-700' },
        ].map((stat, idx) => (
          <Card key={idx} className="bg-slate-800 border-slate-700 p-4">
            <p className="text-slate-400 text-sm">{stat.label}</p>
            <p className={`text-2xl font-bold mt-1 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
              {stat.value}
            </p>
          </Card>
        ))}
      </div>

      {/* Employee Table */}
      <Card className="bg-slate-800 border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-700 bg-slate-900">
              <tr className="text-slate-400">
                <th className="text-left py-3 px-4">Mã NV</th>
                <th className="text-left py-3 px-4">Tên</th>
                <th className="text-left py-3 px-4">Chức Danh</th>
                <th className="text-center py-3 px-4">Hạng</th>
                <th className="text-center py-3 px-4">Ca</th>
                <th className="text-right py-3 px-4">Lương Cơ Bản</th>
                <th className="text-center py-3 px-4">Trạng Thái</th>
                <th className="text-center py-3 px-4">Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((emp) => (
                <tr key={emp.id} className="border-b border-slate-700 hover:bg-slate-700 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">{emp.code}</td>
                  <td className="py-3 px-4 text-slate-300">{emp.name}</td>
                  <td className="py-3 px-4 text-slate-300">{emp.position}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-block px-2 py-1 rounded border ${gradeColors[emp.grade]}`}>
                      {emp.grade}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center text-slate-300">{emp.shift}</td>
                  <td className="py-3 px-4 text-right text-green-400 font-semibold">
                    {(emp.salary / 1000000).toFixed(1)}M
                  </td>
                  <td className="py-3 px-4 text-center">
                    <StatusBadge
                      status={emp.status === 'active' ? 'Automatic mode' : 'Manual stop'}
                      size="sm"
                    />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-xs py-1 px-2" >
                      Xem
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
