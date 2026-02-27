'use client'

import { useState } from 'react'
import { DollarSign, TrendingUp, TrendingDown, PieChart as PieChartIcon, Eye } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useFactoryData } from '@/hooks/useFactoryData'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'

export default function FinanceView() {
  const { financeRecords, costByOrders } = useFactoryData()
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)
  const [filterType, setFilterType] = useState<'all' | 'thu' | 'chi'>('all')

  const totalIncome = financeRecords.filter(f => f.type === 'thu').reduce((sum, f) => sum + f.amount, 0)
  const totalExpense = financeRecords.filter(f => f.type === 'chi').reduce((sum, f) => sum + f.amount, 0)
  const profit = totalIncome - totalExpense
  const profitMargin = totalIncome > 0 ? (profit / totalIncome) * 100 : 0

  const filteredRecords = filterType === 'all' ? financeRecords : financeRecords.filter(f => f.type === filterType)

  // Expense breakdown by category
  const expenseByCategory = financeRecords
    .filter(f => f.type === 'chi')
    .reduce((acc, f) => {
      acc[f.category] = (acc[f.category] || 0) + f.amount
      return acc
    }, {} as Record<string, number>)

  const expensePieData = Object.entries(expenseByCategory).map(([name, value]) => ({ name, value }))
  const PIE_COLORS = ['#3B82F6', '#EAB308', '#EF4444', '#22C55E', '#A855F7', '#F97316']

  // Cost by order chart
  const costOrderChartData = costByOrders.map(co => ({
    name: co.orderNo,
    'Nguyên liệu': co.materialCost / 1000000,
    'Nhân công': co.laborCost / 1000000,
    'Năng lượng': co.energyCost / 1000000,
    'Khác': co.otherCost / 1000000,
    'Doanh thu': co.revenue / 1000000,
  }))

  // Profit by order
  const profitByOrder = costByOrders.map(co => {
    const totalCost = co.materialCost + co.laborCost + co.energyCost + co.otherCost
    const orderProfit = co.revenue - totalCost
    return {
      name: co.orderNo,
      'Lợi nhuận': orderProfit / 1000000,
    }
  })

  const order = selectedOrder ? costByOrders.find(co => co.orderId === selectedOrder) : null

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-900 border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="text-green-400" size={20} />
            <span className="text-slate-400 text-sm">Tổng Thu</span>
          </div>
          <p className="text-2xl font-bold text-green-400">{(totalIncome / 1000000).toFixed(0)}M</p>
          <p className="text-xs text-slate-400 mt-1">VNĐ trong kỳ</p>
        </Card>
        <Card className="bg-slate-900 border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-2">
            <TrendingDown className="text-red-400" size={20} />
            <span className="text-slate-400 text-sm">Tổng Chi</span>
          </div>
          <p className="text-2xl font-bold text-red-400">{(totalExpense / 1000000).toFixed(0)}M</p>
          <p className="text-xs text-slate-400 mt-1">VNĐ trong kỳ</p>
        </Card>
        <Card className="bg-slate-900 border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="text-blue-400" size={20} />
            <span className="text-slate-400 text-sm">Lợi Nhuận</span>
          </div>
          <p className={`text-2xl font-bold ${profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>{(profit / 1000000).toFixed(0)}M</p>
          <p className="text-xs text-slate-400 mt-1">VNĐ</p>
        </Card>
        <Card className="bg-slate-900 border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-2">
            <PieChartIcon className="text-purple-400" size={20} />
            <span className="text-slate-400 text-sm">Biên Lợi Nhuận</span>
          </div>
          <p className={`text-2xl font-bold ${profitMargin >= 0 ? 'text-green-400' : 'text-red-400'}`}>{profitMargin.toFixed(1)}%</p>
          <p className="text-xs text-slate-400 mt-1">Tỷ suất lợi nhuận</p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="bg-slate-900 border-slate-800 p-6 lg:col-span-2">
          <h3 className="text-xl font-bold text-white mb-4">Chi Phí Theo Đơn Hàng (Triệu VNĐ)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={costOrderChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#9ca3af" tick={{ fontSize: 11 }} />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} />
              <Bar dataKey="Nguyên liệu" stackId="cost" fill="#3B82F6" />
              <Bar dataKey="Nhân công" stackId="cost" fill="#EAB308" />
              <Bar dataKey="Năng lượng" stackId="cost" fill="#F97316" />
              <Bar dataKey="Khác" stackId="cost" fill="#A855F7" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card className="bg-slate-900 border-slate-800 p-6">
          <h3 className="text-xl font-bold text-white mb-4">Cơ Cấu Chi Phí</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={expensePieData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={5} dataKey="value">
                {expensePieData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} formatter={(value: number) => `${(value / 1000000).toFixed(0)}M VNĐ`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1 mt-2">
            {expensePieData.map((item, i) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: PIE_COLORS[i] }} />
                  <span className="text-slate-300">{item.name}</span>
                </div>
                <span className="text-white">{(item.value / 1000000).toFixed(0)}M</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Profit by Order */}
      <Card className="bg-slate-900 border-slate-800 p-6">
        <h3 className="text-xl font-bold text-white mb-4">Lợi Nhuận Theo Đơn Hàng (Triệu VNĐ)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={profitByOrder}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="name" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} />
            <Bar dataKey="Lợi nhuận" fill="#22C55E" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Cost Detail by Order */}
      <Card className="bg-slate-900 border-slate-800 p-6">
        <h3 className="text-xl font-bold text-white mb-4">Chi Tiết Chi Phí Theo Đơn Hàng</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700 text-slate-400">
                <th className="text-left py-3 px-2">Mã ĐH</th>
                <th className="text-right py-3 px-2">Nguyên liệu</th>
                <th className="text-right py-3 px-2">Nhân công</th>
                <th className="text-right py-3 px-2">Năng lượng</th>
                <th className="text-right py-3 px-2">Khác</th>
                <th className="text-right py-3 px-2">Tổng CP</th>
                <th className="text-right py-3 px-2">Doanh thu</th>
                <th className="text-right py-3 px-2">Lợi nhuận</th>
                <th className="text-center py-3 px-2">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {costByOrders.map(co => {
                const totalCost = co.materialCost + co.laborCost + co.energyCost + co.otherCost
                const orderProfit = co.revenue - totalCost
                return (
                  <tr key={co.orderId} className="border-b border-slate-800 hover:bg-slate-800/50">
                    <td className="py-3 px-2 text-blue-400 font-medium">{co.orderNo}</td>
                    <td className="py-3 px-2 text-right text-slate-300">{(co.materialCost / 1000000).toFixed(0)}M</td>
                    <td className="py-3 px-2 text-right text-slate-300">{(co.laborCost / 1000000).toFixed(0)}M</td>
                    <td className="py-3 px-2 text-right text-slate-300">{(co.energyCost / 1000000).toFixed(0)}M</td>
                    <td className="py-3 px-2 text-right text-slate-300">{(co.otherCost / 1000000).toFixed(0)}M</td>
                    <td className="py-3 px-2 text-right text-white font-medium">{(totalCost / 1000000).toFixed(0)}M</td>
                    <td className="py-3 px-2 text-right text-blue-300">{(co.revenue / 1000000).toFixed(0)}M</td>
                    <td className={`py-3 px-2 text-right font-bold ${orderProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>{(orderProfit / 1000000).toFixed(0)}M</td>
                    <td className="py-3 px-2 text-center">
                      <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300 h-7" onClick={() => setSelectedOrder(co.orderId)}>
                        <Eye size={14} />
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Finance Records */}
      <Card className="bg-slate-900 border-slate-800 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">Sổ Thu Chi</h3>
          <div className="flex gap-2">
            {(['all', 'thu', 'chi'] as const).map(type => (
              <Button
                key={type}
                size="sm"
                className={`text-xs ${filterType === type ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}`}
                onClick={() => setFilterType(type)}
              >
                {type === 'all' ? 'Tất cả' : type === 'thu' ? 'Thu' : 'Chi'}
              </Button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          {filteredRecords.map(record => (
            <div key={record.id} className="flex items-center justify-between bg-slate-800 rounded-lg p-3">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-8 rounded-full ${record.type === 'thu' ? 'bg-green-500' : 'bg-red-500'}`} />
                <div>
                  <p className="text-white text-sm font-medium">{record.description}</p>
                  <p className="text-slate-400 text-xs">{record.category} • {record.date} • Ref: {record.reference}</p>
                </div>
              </div>
              <p className={`font-bold ${record.type === 'thu' ? 'text-green-400' : 'text-red-400'}`}>
                {record.type === 'thu' ? '+' : '-'}{(record.amount / 1000000).toFixed(0)}M VNĐ
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Order Cost Detail Modal */}
      {order && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setSelectedOrder(null)}>
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">{order.orderNo} - Chi Tiết</h3>
              <button className="text-slate-400 hover:text-white text-xl" onClick={() => setSelectedOrder(null)}>✕</button>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Nguyên vật liệu', value: order.materialCost, color: 'text-blue-400' },
                { label: 'Nhân công', value: order.laborCost, color: 'text-yellow-400' },
                { label: 'Năng lượng', value: order.energyCost, color: 'text-orange-400' },
                { label: 'Chi phí khác', value: order.otherCost, color: 'text-purple-400' },
              ].map(item => {
                const totalCost = order.materialCost + order.laborCost + order.energyCost + order.otherCost
                const pct = totalCost > 0 ? (item.value / totalCost) * 100 : 0
                return (
                  <div key={item.label} className="bg-slate-800 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-slate-300 text-sm">{item.label}</span>
                      <span className={`font-medium ${item.color}`}>{(item.value / 1000000).toFixed(0)}M VNĐ</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <p className="text-slate-400 text-xs text-right mt-1">{pct.toFixed(1)}%</p>
                  </div>
                )
              })}
              <div className="border-t border-slate-700 pt-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Tổng chi phí</span>
                  <span className="text-red-400 font-bold">{((order.materialCost + order.laborCost + order.energyCost + order.otherCost) / 1000000).toFixed(0)}M VNĐ</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Doanh thu</span>
                  <span className="text-blue-400 font-bold">{(order.revenue / 1000000).toFixed(0)}M VNĐ</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white font-semibold">Lợi nhuận</span>
                  <span className={`font-bold text-lg ${(order.revenue - order.materialCost - order.laborCost - order.energyCost - order.otherCost) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {((order.revenue - order.materialCost - order.laborCost - order.energyCost - order.otherCost) / 1000000).toFixed(0)}M VNĐ
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
