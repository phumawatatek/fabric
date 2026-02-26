'use client'

import { useFactoryData } from '@/hooks/useFactoryData'
import { Card } from '@/components/ui/card'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import WorstMachineDetailDialog from '../WorstMachineDetailDialog'

export default function Analytics() {
  const { machines, worstMachines, alarms } = useFactoryData()
  const [expandedMachine, setExpandedMachine] = useState<string | null>(null)
  const [selectedWorstMachine, setSelectedWorstMachine] = useState(worstMachines[0])
  const [worstMachineDialogOpen, setWorstMachineDialogOpen] = useState(false)

  // Chart data for production trend
  const productionData = [
    { time: '06:00', sản_lượng: 420, mục_tiêu: 450 },
    { time: '08:00', sản_lượng: 445, mục_tiêu: 450 },
    { time: '10:00', sản_lượng: 460, mục_tiêu: 450 },
    { time: '12:00', sản_lượng: 470, mục_tiêu: 450 },
    { time: '14:00', sản_lượng: 465, mục_tiêu: 450 },
    { time: '16:00', sản_lượng: 455, mục_tiêu: 450 },
    { time: '18:00', sản_lượng: 440, mục_tiêu: 450 },
  ]

  // Machine status distribution
  const statusData = machines.reduce((acc, m) => {
    const existing = acc.find(x => x.name === m.status)
    if (existing) {
      existing.value += 1
    } else {
      acc.push({ name: m.status, value: 1 })
    }
    return acc
  }, [] as Array<{ name: string; value: number }>)

  const statusColors: { [key: string]: string } = {
    'hoạt động': '#22c55e',
    'lỗi': '#ef4444',
    'bảo trì': '#eab308',
    'dừng': '#6b7280',
  }



  return (
    <div className="space-y-8">
      {/* Production Trend Chart */}
      <Card className="bg-slate-900 border-slate-800 p-6">
        <h3 className="text-xl font-bold text-white mb-4">Xu Hướng Sản Lượng (24 Giờ Qua)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={productionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="time" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
              labelStyle={{ color: '#fff' }}
            />
            <Legend />
            <Line type="monotone" dataKey="sản_lượng" stroke="#3b82f6" strokeWidth={2} />
            <Line type="monotone" dataKey="mục_tiêu" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Machine Status Distribution */}
        <Card className="bg-slate-900 border-slate-800 p-6">
          <h3 className="text-xl font-bold text-white mb-4">Phân Bố Trạng Thái Máy</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={statusColors[entry.name] || '#6b7280'} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
                labelStyle={{ color: '#fff' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Error Rate Chart */}
        <Card className="bg-slate-900 border-slate-800 p-6">
          <h3 className="text-xl font-bold text-white mb-4">Tỉ Lệ Lỗi Theo Máy</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={machines.slice(0, 6)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9ca3af" angle={-45} height={80} />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
                labelStyle={{ color: '#fff' }}
              />
              <Bar dataKey="errorRate" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Worst Machines */}
      <Card className="bg-slate-900 border-slate-800 p-6">
        <h3 className="text-xl font-bold text-white mb-4">10 Máy Có Tỉ Lệ Lỗi Cao Nhất</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-4 text-slate-400 font-semibold">Máy</th>
                <th className="text-left py-3 px-4 text-slate-400 font-semibold">Tỉ Lệ Lỗi</th>
                <th className="text-left py-3 px-4 text-slate-400 font-semibold">Thời Gian Dừng (phút)</th>
                <th className="text-left py-3 px-4 text-slate-400 font-semibold">Lần Sửa Gần Nhất</th>
                <th className="text-left py-3 px-4 text-slate-400 font-semibold">Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {worstMachines.map(machine => (
                <tr key={machine.id} className="border-b border-slate-700 hover:bg-slate-800 transition-colors cursor-pointer">
                  <td className="py-3 px-4 font-semibold text-white">{machine.name}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      machine.errorRate > 5 ? 'bg-red-900 text-red-200' :
                      machine.errorRate > 2 ? 'bg-yellow-900 text-yellow-200' :
                      'bg-green-900 text-green-200'
                    }`}>
                      {machine.errorRate}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-300">{machine.downtime}</td>
                  <td className="py-3 px-4 text-slate-400 text-xs">{machine.lastFixed}</td>
                  <td className="py-3 px-4">
                    <Button
                      onClick={() => {
                        setSelectedWorstMachine(machine)
                        setWorstMachineDialogOpen(true)
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-7"
                    >
                      Chi Tiết
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Recent Alarms */}
      <Card className="bg-slate-900 border-slate-800 p-6">
        <h3 className="text-xl font-bold text-white mb-4">Danh Sách Cảnh Báo</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
          {alarms.map(alarm => (
            <div key={alarm.id} className="bg-slate-800 border-l-4 border-red-500 p-4 rounded">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-white">{alarm.machine}</p>
                  <p className="text-sm text-slate-400 mt-1">{alarm.type}</p>
                </div>
                <span className="text-xs text-slate-500">{alarm.time}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Worst Machine Detail Dialog */}
      <WorstMachineDetailDialog 
        machine={selectedWorstMachine} 
        open={worstMachineDialogOpen} 
        onOpenChange={setWorstMachineDialogOpen} 
      />
    </div>
  )
}
