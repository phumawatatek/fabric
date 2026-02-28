'use client'

import { useState } from 'react'
import { Warehouse, ArrowDownToLine, ArrowUpFromLine, Search, Eye } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useFactoryData } from '@/hooks/useFactoryData'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

export default function WarehouseView() {
  const { warehouseItems, warehouseTransactions } = useFactoryData()
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const totalQuantity = warehouseItems.reduce((sum, item) => sum + item.quantity, 0)
  const gradeA = warehouseItems.filter(w => w.qualityGrade === 'A')
  const totalImport = warehouseTransactions.filter(t => t.type === 'nhập').reduce((sum, t) => sum + t.quantity, 0)
  const totalExport = warehouseTransactions.filter(t => t.type === 'xuất').reduce((sum, t) => sum + t.quantity, 0)

  const categories = ['all', ...Array.from(new Set(warehouseItems.map(w => w.category)))]

  const filteredItems = warehouseItems.filter(item => {
    const matchCategory = filterCategory === 'all' || item.category === filterCategory
    const matchSearch = searchTerm === '' || item.productName.toLowerCase().includes(searchTerm.toLowerCase()) || item.productCode.toLowerCase().includes(searchTerm.toLowerCase())
    return matchCategory && matchSearch
  })

  const categoryData = Array.from(new Set(warehouseItems.map(w => w.category))).map(cat => ({
    name: cat,
    value: warehouseItems.filter(w => w.category === cat).reduce((sum, w) => sum + w.quantity, 0),
  }))

  const locationData = Array.from(new Set(warehouseItems.map(w => w.location))).map(loc => ({
    name: loc,
    'Số lượng': warehouseItems.filter(w => w.location === loc).reduce((sum, w) => sum + w.quantity, 0),
  }))

  const PIE_COLORS = ['#3B82F6', '#22C55E', '#EAB308', '#A855F7']

  const getGradeColor = (grade: string) => {
    const colors: Record<string, string> = {
      'A': 'bg-green-900/50 text-green-200 border-green-700',
      'B': 'bg-yellow-900/50 text-yellow-200 border-yellow-700',
      'C': 'bg-red-900/50 text-red-200 border-red-700',
    }
    return colors[grade] || 'bg-slate-800 text-slate-300'
  }

  const item = selectedItem ? warehouseItems.find(w => w.id === selectedItem) : null

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-900 border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Warehouse className="text-blue-400" size={20} />
            <span className="text-slate-400 text-sm">Tổng Tồn Kho</span>
          </div>
          <p className="text-2xl font-bold text-white">{totalQuantity.toLocaleString()}</p>
          <p className="text-xs text-slate-400 mt-1">mét vải • {warehouseItems.length} mã hàng</p>
        </Card>
        <Card className="bg-slate-900 border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-2">
            <ArrowDownToLine className="text-green-400" size={20} />
            <span className="text-slate-400 text-sm">Nhập Kho</span>
          </div>
          <p className="text-2xl font-bold text-white">{totalImport.toLocaleString()}</p>
          <p className="text-xs text-green-400 mt-1">mét trong kỳ</p>
        </Card>
        <Card className="bg-slate-900 border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-2">
            <ArrowUpFromLine className="text-orange-400" size={20} />
            <span className="text-slate-400 text-sm">Xuất Kho</span>
          </div>
          <p className="text-2xl font-bold text-white">{totalExport.toLocaleString()}</p>
          <p className="text-xs text-orange-400 mt-1">mét trong kỳ</p>
        </Card>
        <Card className="bg-slate-900 border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-green-400 text-xl font-bold">A</span>
            <span className="text-slate-400 text-sm">Chất Lượng Loại A</span>
          </div>
          <p className="text-2xl font-bold text-white">{gradeA.length}/{warehouseItems.length}</p>
          <p className="text-xs text-green-400 mt-1">{((gradeA.length / warehouseItems.length) * 100).toFixed(0)}% sản phẩm</p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bg-slate-900 border-slate-800 p-6">
          <h3 className="text-xl font-bold text-white mb-4">Tồn Kho Theo Vị Trí</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={locationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#9ca3af" tick={{ fontSize: 11 }} />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} />
              <Bar dataKey="Số lượng" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card className="bg-slate-900 border-slate-800 p-6">
          <h3 className="text-xl font-bold text-white mb-4">Phân Bổ Theo Loại Vải</h3>
          <ResponsiveContainer width="100%" height={230}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={5} dataKey="value">
                {categoryData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1 mt-2">
            {categoryData.map((item, i) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PIE_COLORS[i] }} />
                  <span className="text-slate-300">{item.name}</span>
                </div>
                <span className="text-white font-medium">{item.value.toLocaleString()} m</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Inventory Table */}
      <Card className="bg-slate-900 border-slate-800 p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-4">
          <h3 className="text-xl font-bold text-white">Danh Sách Hàng Tồn Kho</h3>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm kiếm..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-600"
              />
            </div>
            <select
              value={filterCategory}
              onChange={e => setFilterCategory(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-600"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat === 'all' ? 'Tất cả loại' : cat}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700 text-slate-400">
                <th className="text-left py-3 px-2">Mã SP</th>
                <th className="text-left py-3 px-2">Tên sản phẩm</th>
                <th className="text-left py-3 px-2">Loại</th>
                <th className="text-right py-3 px-2">Số lượng</th>
                <th className="text-center py-3 px-2">Vị trí</th>
                <th className="text-center py-3 px-2">Lô SX</th>
                <th className="text-center py-3 px-2">Chất lượng</th>
                <th className="text-center py-3 px-2">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map(item => (
                <tr key={item.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                  <td className="py-3 px-2 text-blue-400 font-medium">{item.productCode}</td>
                  <td className="py-3 px-2 text-white">{item.productName}</td>
                  <td className="py-3 px-2 text-slate-300">{item.category}</td>
                  <td className="py-3 px-2 text-right text-white font-medium">{item.quantity.toLocaleString()} {item.unit}</td>
                  <td className="py-3 px-2 text-center text-slate-300">{item.location}</td>
                  <td className="py-3 px-2 text-center text-slate-300">{item.batchNo}</td>
                  <td className="py-3 px-2 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs border ${getGradeColor(item.qualityGrade)}`}>Loại {item.qualityGrade}</span>
                  </td>
                  <td className="py-3 px-2 text-center">
                    <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300 h-7" onClick={() => setSelectedItem(item.id)}>
                      <Eye size={14} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Recent Transactions */}
      <Card className="bg-slate-900 border-slate-800 p-6">
        <h3 className="text-xl font-bold text-white mb-4">Giao Dịch Nhập/Xuất Kho Gần Đây</h3>
        <div className="space-y-3">
          {warehouseTransactions.map(tx => {
            const product = warehouseItems.find(w => w.id === tx.productId)
            return (
              <div key={tx.id} className="flex items-center justify-between bg-slate-800 rounded-lg p-3">
                <div className="flex items-center gap-3">
                  {tx.type === 'nhập' ? (
                    <ArrowDownToLine size={16} className="text-green-400" />
                  ) : (
                    <ArrowUpFromLine size={16} className="text-orange-400" />
                  )}
                  <div>
                    <p className="text-white text-sm font-medium">{product?.productName || tx.productId}</p>
                    <p className="text-slate-400 text-xs">{tx.note}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${tx.type === 'nhập' ? 'text-green-400' : 'text-orange-400'}`}>
                    {tx.type === 'nhập' ? '+' : '-'}{tx.quantity.toLocaleString()} mét
                  </p>
                  <p className="text-slate-400 text-xs">{tx.date}</p>
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Item Detail Modal */}
      {item && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setSelectedItem(null)}>
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 w-full max-w-lg" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">{item.productName}</h3>
              <button className="text-slate-400 hover:text-white text-xl" onClick={() => setSelectedItem(null)}>✕</button>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-800 rounded-lg p-3">
                  <p className="text-slate-400 text-xs">Mã sản phẩm</p>
                  <p className="text-blue-400 font-medium">{item.productCode}</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-3">
                  <p className="text-slate-400 text-xs">Loại vải</p>
                  <p className="text-white font-medium">{item.category}</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-3">
                  <p className="text-slate-400 text-xs">Số lượng</p>
                  <p className="text-white font-bold text-lg">{item.quantity.toLocaleString()} {item.unit}</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-3">
                  <p className="text-slate-400 text-xs">Chất lượng</p>
                  <span className={`px-2 py-1 rounded-full text-xs border ${getGradeColor(item.qualityGrade)}`}>Loại {item.qualityGrade}</span>
                </div>
                <div className="bg-slate-800 rounded-lg p-3">
                  <p className="text-slate-400 text-xs">Vị trí kho</p>
                  <p className="text-white font-medium">{item.location}</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-3">
                  <p className="text-slate-400 text-xs">Lô sản xuất</p>
                  <p className="text-white font-medium">{item.batchNo}</p>
                </div>
              </div>
              <div className="bg-slate-800 rounded-lg p-3">
                <p className="text-slate-400 text-xs">Ngày sản xuất</p>
                <p className="text-white font-medium">{item.productionDate}</p>
              </div>
              <h4 className="text-white font-semibold mt-2">Lịch Sử Giao Dịch</h4>
              {warehouseTransactions.filter(t => t.productId === item.id).map(tx => (
                <div key={tx.id} className="flex items-center justify-between bg-slate-800 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    {tx.type === 'nhập' ? <ArrowDownToLine size={14} className="text-green-400" /> : <ArrowUpFromLine size={14} className="text-orange-400" />}
                    <span className="text-slate-300 text-sm">{tx.note}</span>
                  </div>
                  <span className={`font-medium text-sm ${tx.type === 'nhập' ? 'text-green-400' : 'text-orange-400'}`}>
                    {tx.type === 'nhập' ? '+' : '-'}{tx.quantity} mét
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
