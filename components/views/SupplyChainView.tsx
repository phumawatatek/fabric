'use client'

import { useState } from 'react'
import { Package, TrendingUp, AlertTriangle, Truck, Star, Plus, Eye } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useFactoryData } from '@/hooks/useFactoryData'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

export default function SupplyChainView() {
  const { suppliers, materialInventory, purchaseOrders, setPurchaseOrders } = useFactoryData()
  const [selectedSupplier, setSelectedSupplier] = useState<string | null>(null)
  const [showNewPO, setShowNewPO] = useState(false)

  const lowStockItems = materialInventory.filter(m => m.currentStock <= m.minStock)
  const totalPOValue = purchaseOrders.reduce((sum, po) => sum + po.quantity * po.unitCost, 0)
  const pendingPOs = purchaseOrders.filter(po => po.status === 'chờ duyệt' || po.status === 'đã duyệt')
  const activeSuppliers = suppliers.filter(s => s.status === 'đang hợp tác')

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'chờ duyệt': 'bg-yellow-900/50 text-yellow-200 border-yellow-700',
      'đã duyệt': 'bg-blue-900/50 text-blue-200 border-blue-700',
      'đang giao': 'bg-purple-900/50 text-purple-200 border-purple-700',
      'đã nhận': 'bg-green-900/50 text-green-200 border-green-700',
      'hủy': 'bg-red-900/50 text-red-200 border-red-700',
    }
    return colors[status] || 'bg-slate-800 text-slate-300'
  }

  const getSupplierStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'đang hợp tác': 'text-green-400',
      'tạm dừng': 'text-yellow-400',
      'mới': 'text-blue-400',
    }
    return colors[status] || 'text-slate-400'
  }

  const stockChartData = materialInventory.map(m => ({
    name: m.name.length > 15 ? m.name.substring(0, 15) + '...' : m.name,
    'Tồn kho': m.currentStock,
    'Tối thiểu': m.minStock,
    'Tối đa': m.maxStock,
  }))

  const poStatusData = [
    { name: 'Chờ duyệt', value: purchaseOrders.filter(p => p.status === 'chờ duyệt').length },
    { name: 'Đã duyệt', value: purchaseOrders.filter(p => p.status === 'đã duyệt').length },
    { name: 'Đang giao', value: purchaseOrders.filter(p => p.status === 'đang giao').length },
    { name: 'Đã nhận', value: purchaseOrders.filter(p => p.status === 'đã nhận').length },
  ].filter(d => d.value > 0)

  const PIE_COLORS = ['#EAB308', '#3B82F6', '#A855F7', '#22C55E']

  const handleApprovePO = (poId: string) => {
    setPurchaseOrders(prev => prev.map(po =>
      po.id === poId ? { ...po, status: 'đã duyệt' } : po
    ))
  }

  const supplier = selectedSupplier ? suppliers.find(s => s.id === selectedSupplier) : null

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-900 border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Package className="text-blue-400" size={20} />
            <span className="text-slate-400 text-sm">Nhà Cung Cấp</span>
          </div>
          <p className="text-2xl font-bold text-white">{activeSuppliers.length}/{suppliers.length}</p>
          <p className="text-xs text-green-400 mt-1">Đang hợp tác</p>
        </Card>
        <Card className="bg-slate-900 border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="text-yellow-400" size={20} />
            <span className="text-slate-400 text-sm">Nguyên Liệu Sắp Hết</span>
          </div>
          <p className="text-2xl font-bold text-white">{lowStockItems.length}</p>
          <p className="text-xs text-yellow-400 mt-1">Cần đặt hàng bổ sung</p>
        </Card>
        <Card className="bg-slate-900 border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Truck className="text-purple-400" size={20} />
            <span className="text-slate-400 text-sm">Đơn Mua Đang Xử Lý</span>
          </div>
          <p className="text-2xl font-bold text-white">{pendingPOs.length}</p>
          <p className="text-xs text-slate-400 mt-1">Tổng {purchaseOrders.length} đơn</p>
        </Card>
        <Card className="bg-slate-900 border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="text-green-400" size={20} />
            <span className="text-slate-400 text-sm">Tổng Giá Trị PO</span>
          </div>
          <p className="text-2xl font-bold text-white">{(totalPOValue / 1000000).toFixed(0)}M</p>
          <p className="text-xs text-slate-400 mt-1">VNĐ</p>
        </Card>
      </div>

      {/* Inventory Chart + PO Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="bg-slate-900 border-slate-800 p-6 lg:col-span-2">
          <h3 className="text-xl font-bold text-white mb-4">Tồn Kho Nguyên Vật Liệu</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stockChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#9ca3af" tick={{ fontSize: 11 }} />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} />
              <Bar dataKey="Tồn kho" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Tối thiểu" fill="#EF4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card className="bg-slate-900 border-slate-800 p-6">
          <h3 className="text-xl font-bold text-white mb-4">Trạng Thái Đơn Mua</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={poStatusData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={5} dataKey="value">
                {poStatusData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1 mt-2">
            {poStatusData.map((item, i) => (
              <div key={item.name} className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PIE_COLORS[i] }} />
                <span className="text-slate-300">{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Low Stock Alerts */}
      {lowStockItems.length > 0 && (
        <Card className="bg-red-900/20 border-red-800 p-6">
          <h3 className="text-lg font-bold text-red-300 mb-3 flex items-center gap-2">
            <AlertTriangle size={18} /> Cảnh Báo Tồn Kho Thấp
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {lowStockItems.map(item => (
              <div key={item.id} className="bg-red-900/30 border border-red-800 rounded-lg p-3">
                <p className="text-white font-medium">{item.name}</p>
                <p className="text-red-300 text-sm">Tồn kho: {item.currentStock} {item.unit} / Tối thiểu: {item.minStock} {item.unit}</p>
                <div className="w-full bg-red-950 rounded-full h-2 mt-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: `${Math.min(100, (item.currentStock / item.minStock) * 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Suppliers */}
      <Card className="bg-slate-900 border-slate-800 p-6">
        <h3 className="text-xl font-bold text-white mb-4">Danh Sách Nhà Cung Cấp</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700 text-slate-400">
                <th className="text-left py-3 px-2">Tên NCC</th>
                <th className="text-left py-3 px-2">Nguyên liệu</th>
                <th className="text-left py-3 px-2">Liên hệ</th>
                <th className="text-center py-3 px-2">Đánh giá</th>
                <th className="text-center py-3 px-2">Trạng thái</th>
                <th className="text-center py-3 px-2">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map(sup => (
                <tr key={sup.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                  <td className="py-3 px-2 text-white font-medium">{sup.name}</td>
                  <td className="py-3 px-2 text-slate-300">{sup.material}</td>
                  <td className="py-3 px-2 text-slate-300">{sup.contact}</td>
                  <td className="py-3 px-2 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Star size={14} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-yellow-300">{sup.rating}</span>
                    </div>
                  </td>
                  <td className={`py-3 px-2 text-center ${getSupplierStatusColor(sup.status)}`}>{sup.status}</td>
                  <td className="py-3 px-2 text-center">
                    <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300" onClick={() => setSelectedSupplier(sup.id)}>
                      <Eye size={14} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Purchase Orders */}
      <Card className="bg-slate-900 border-slate-800 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">Đơn Đặt Mua Nguyên Liệu</h3>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowNewPO(!showNewPO)}>
            <Plus size={14} className="mr-1" /> Tạo Đơn Mới
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700 text-slate-400">
                <th className="text-left py-3 px-2">Mã PO</th>
                <th className="text-left py-3 px-2">NCC</th>
                <th className="text-left py-3 px-2">Nguyên liệu</th>
                <th className="text-right py-3 px-2">SL</th>
                <th className="text-right py-3 px-2">Giá trị (VNĐ)</th>
                <th className="text-center py-3 px-2">Ngày giao</th>
                <th className="text-center py-3 px-2">Trạng thái</th>
                <th className="text-center py-3 px-2">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {purchaseOrders.map(po => {
                const sup = suppliers.find(s => s.id === po.supplierId)
                return (
                  <tr key={po.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                    <td className="py-3 px-2 text-blue-400 font-medium">{po.poNo}</td>
                    <td className="py-3 px-2 text-slate-300">{sup?.name || po.supplierId}</td>
                    <td className="py-3 px-2 text-white">{po.material}</td>
                    <td className="py-3 px-2 text-right text-slate-300">{po.quantity.toLocaleString()}</td>
                    <td className="py-3 px-2 text-right text-white">{(po.quantity * po.unitCost).toLocaleString()}</td>
                    <td className="py-3 px-2 text-center text-slate-300">{po.expectedDate}</td>
                    <td className="py-3 px-2 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(po.status)}`}>{po.status}</span>
                    </td>
                    <td className="py-3 px-2 text-center">
                      {po.status === 'chờ duyệt' && (
                        <Button size="sm" className="bg-green-700 hover:bg-green-600 text-xs h-7" onClick={() => handleApprovePO(po.id)}>
                          Duyệt
                        </Button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Supplier Detail Modal */}
      {supplier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setSelectedSupplier(null)}>
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 w-full max-w-lg" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">{supplier.name}</h3>
              <button className="text-slate-400 hover:text-white text-xl" onClick={() => setSelectedSupplier(null)}>✕</button>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-800 rounded-lg p-3">
                  <p className="text-slate-400 text-xs">Nguyên liệu</p>
                  <p className="text-white font-medium">{supplier.material}</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-3">
                  <p className="text-slate-400 text-xs">Liên hệ</p>
                  <p className="text-white font-medium">{supplier.contact}</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-3">
                  <p className="text-slate-400 text-xs">Đánh giá</p>
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-white font-medium">{supplier.rating}/5</span>
                  </div>
                </div>
                <div className="bg-slate-800 rounded-lg p-3">
                  <p className="text-slate-400 text-xs">Trạng thái</p>
                  <p className={`font-medium ${getSupplierStatusColor(supplier.status)}`}>{supplier.status}</p>
                </div>
              </div>
              {supplier.lastDelivery && (
                <div className="bg-slate-800 rounded-lg p-3">
                  <p className="text-slate-400 text-xs">Lần giao hàng cuối</p>
                  <p className="text-white font-medium">{supplier.lastDelivery}</p>
                </div>
              )}
              <h4 className="text-white font-semibold mt-4">Đơn Mua Gần Đây</h4>
              {purchaseOrders.filter(po => po.supplierId === supplier.id).map(po => (
                <div key={po.id} className="bg-slate-800 rounded-lg p-3 flex items-center justify-between">
                  <div>
                    <p className="text-blue-400 text-sm font-medium">{po.poNo}</p>
                    <p className="text-slate-300 text-xs">{po.material} - {po.quantity.toLocaleString()} đơn vị</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(po.status)}`}>{po.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
