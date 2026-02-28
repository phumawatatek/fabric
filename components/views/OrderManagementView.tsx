'use client'

import { useState } from 'react'
import { ShoppingCart, Users, TrendingUp, Clock, Star, Eye, Package } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useFactoryData } from '@/hooks/useFactoryData'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

export default function OrderManagementView() {
  const { customers, salesOrders, setSalesOrders } = useFactoryData()
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null)
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)

  const totalRevenue = salesOrders.reduce((sum, so) => sum + so.quantity * so.unitPrice, 0)
  const completedOrders = salesOrders.filter(so => so.status === 'hoàn thành')
  const activeOrders = salesOrders.filter(so => !['hoàn thành', 'hủy'].includes(so.status))
  const avgProgress = activeOrders.length > 0 ? activeOrders.reduce((sum, o) => sum + o.progress, 0) / activeOrders.length : 0

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'mới': 'bg-blue-900/50 text-blue-200 border-blue-700',
      'xác nhận': 'bg-cyan-900/50 text-cyan-200 border-cyan-700',
      'sản xuất': 'bg-purple-900/50 text-purple-200 border-purple-700',
      'đóng gói': 'bg-yellow-900/50 text-yellow-200 border-yellow-700',
      'giao hàng': 'bg-orange-900/50 text-orange-200 border-orange-700',
      'hoàn thành': 'bg-green-900/50 text-green-200 border-green-700',
      'hủy': 'bg-red-900/50 text-red-200 border-red-700',
    }
    return colors[status] || 'bg-slate-800 text-slate-300'
  }

  const revenueByCustomer = customers.map(c => ({
    name: c.company.length > 18 ? c.company.substring(0, 18) + '...' : c.company,
    'Doanh thu': c.totalRevenue / 1000000,
    'Số đơn': c.totalOrders,
  })).sort((a, b) => b['Doanh thu'] - a['Doanh thu'])

  const orderProgressData = salesOrders.filter(so => so.status !== 'hủy').map(so => ({
    name: so.soNo,
    'Tiến độ': so.progress,
  }))

  const handleAdvanceStatus = (orderId: string) => {
    const statusFlow: Record<string, string> = {
      'mới': 'xác nhận',
      'xác nhận': 'sản xuất',
      'sản xuất': 'đóng gói',
      'đóng gói': 'giao hàng',
      'giao hàng': 'hoàn thành',
    }
    setSalesOrders(prev => prev.map(so => {
      if (so.id === orderId && statusFlow[so.status]) {
        const newStatus = statusFlow[so.status] as typeof so.status
        return { ...so, status: newStatus, progress: newStatus === 'hoàn thành' ? 100 : Math.min(so.progress + 15, 95) }
      }
      return so
    }))
  }

  const customer = selectedCustomer ? customers.find(c => c.id === selectedCustomer) : null
  const order = selectedOrder ? salesOrders.find(o => o.id === selectedOrder) : null

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-900 border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-2">
            <ShoppingCart className="text-blue-400" size={20} />
            <span className="text-slate-400 text-sm">Tổng Đơn Hàng</span>
          </div>
          <p className="text-2xl font-bold text-white">{salesOrders.length}</p>
          <p className="text-xs text-green-400 mt-1">{completedOrders.length} hoàn thành</p>
        </Card>
        <Card className="bg-slate-900 border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Users className="text-purple-400" size={20} />
            <span className="text-slate-400 text-sm">Khách Hàng</span>
          </div>
          <p className="text-2xl font-bold text-white">{customers.length}</p>
          <p className="text-xs text-slate-400 mt-1">Đang hoạt động</p>
        </Card>
        <Card className="bg-slate-900 border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="text-green-400" size={20} />
            <span className="text-slate-400 text-sm">Tổng Doanh Thu</span>
          </div>
          <p className="text-2xl font-bold text-white">{(totalRevenue / 1000000000).toFixed(1)}B</p>
          <p className="text-xs text-slate-400 mt-1">VNĐ</p>
        </Card>
        <Card className="bg-slate-900 border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="text-yellow-400" size={20} />
            <span className="text-slate-400 text-sm">Tiến Độ TB</span>
          </div>
          <p className="text-2xl font-bold text-white">{avgProgress.toFixed(0)}%</p>
          <p className="text-xs text-slate-400 mt-1">{activeOrders.length} đơn đang xử lý</p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bg-slate-900 border-slate-800 p-6">
          <h3 className="text-xl font-bold text-white mb-4">Doanh Thu Theo Khách Hàng (Triệu VNĐ)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueByCustomer} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis type="number" stroke="#9ca3af" />
              <YAxis type="category" dataKey="name" stroke="#9ca3af" width={150} tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} />
              <Bar dataKey="Doanh thu" fill="#3B82F6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card className="bg-slate-900 border-slate-800 p-6">
          <h3 className="text-xl font-bold text-white mb-4">Tiến Độ Đơn Hàng</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={orderProgressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#9ca3af" tick={{ fontSize: 11 }} />
              <YAxis stroke="#9ca3af" domain={[0, 100]} />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} />
              <Bar dataKey="Tiến độ" fill="#22C55E" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Customers */}
      <Card className="bg-slate-900 border-slate-800 p-6">
        <h3 className="text-xl font-bold text-white mb-4">Danh Sách Khách Hàng</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {customers.map(cus => (
            <div key={cus.id} className="bg-slate-800 border border-slate-700 rounded-lg p-4 hover:border-blue-600 transition-colors cursor-pointer" onClick={() => setSelectedCustomer(cus.id)}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold">{cus.name}</h4>
                <div className="flex items-center gap-1">
                  <Star size={12} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-yellow-300 text-xs">{cus.rating}</span>
                </div>
              </div>
              <p className="text-slate-400 text-sm">{cus.company}</p>
              <div className="flex items-center justify-between mt-3 text-xs">
                <span className="text-slate-400">{cus.totalOrders} đơn hàng</span>
                <span className="text-green-400">{(cus.totalRevenue / 1000000).toFixed(0)}M VNĐ</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Sales Orders Table */}
      <Card className="bg-slate-900 border-slate-800 p-6">
        <h3 className="text-xl font-bold text-white mb-4">Đơn Hàng Bán</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700 text-slate-400">
                <th className="text-left py-3 px-2">Mã ĐH</th>
                <th className="text-left py-3 px-2">Khách hàng</th>
                <th className="text-left py-3 px-2">Sản phẩm</th>
                <th className="text-right py-3 px-2">SL</th>
                <th className="text-right py-3 px-2">Giá trị</th>
                <th className="text-center py-3 px-2">Giao hàng</th>
                <th className="text-center py-3 px-2">Tiến độ</th>
                <th className="text-center py-3 px-2">Trạng thái</th>
                <th className="text-center py-3 px-2">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {salesOrders.map(so => {
                const cus = customers.find(c => c.id === so.customerId)
                return (
                  <tr key={so.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                    <td className="py-3 px-2 text-blue-400 font-medium">{so.soNo}</td>
                    <td className="py-3 px-2 text-slate-300">{cus?.company || so.customerId}</td>
                    <td className="py-3 px-2 text-white">{so.product}</td>
                    <td className="py-3 px-2 text-right text-slate-300">{so.quantity.toLocaleString()}</td>
                    <td className="py-3 px-2 text-right text-white">{((so.quantity * so.unitPrice) / 1000000).toFixed(0)}M</td>
                    <td className="py-3 px-2 text-center text-slate-300">{so.deliveryDate}</td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-700 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${so.progress}%` }} />
                        </div>
                        <span className="text-slate-300 text-xs w-8">{so.progress}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(so.status)}`}>{so.status}</span>
                    </td>
                    <td className="py-3 px-2 text-center space-x-1">
                      <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300 h-7" onClick={() => setSelectedOrder(so.id)}>
                        <Eye size={14} />
                      </Button>
                      {so.status !== 'hoàn thành' && so.status !== 'hủy' && (
                        <Button size="sm" className="bg-green-700 hover:bg-green-600 text-xs h-7" onClick={() => handleAdvanceStatus(so.id)}>
                          Tiến
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

      {/* Customer Detail Modal */}
      {customer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setSelectedCustomer(null)}>
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 w-full max-w-lg" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">{customer.name}</h3>
              <button className="text-slate-400 hover:text-white text-xl" onClick={() => setSelectedCustomer(null)}>✕</button>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-800 rounded-lg p-3">
                  <p className="text-slate-400 text-xs">Công ty</p>
                  <p className="text-white font-medium">{customer.company}</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-3">
                  <p className="text-slate-400 text-xs">Điện thoại</p>
                  <p className="text-white font-medium">{customer.phone}</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-3">
                  <p className="text-slate-400 text-xs">Email</p>
                  <p className="text-white font-medium text-sm">{customer.email}</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-3">
                  <p className="text-slate-400 text-xs">Đánh giá</p>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={14} className={i < customer.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'} />
                    ))}
                  </div>
                </div>
                <div className="bg-slate-800 rounded-lg p-3">
                  <p className="text-slate-400 text-xs">Tổng đơn hàng</p>
                  <p className="text-white font-bold text-lg">{customer.totalOrders}</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-3">
                  <p className="text-slate-400 text-xs">Tổng doanh thu</p>
                  <p className="text-green-400 font-bold">{(customer.totalRevenue / 1000000).toFixed(0)}M VNĐ</p>
                </div>
              </div>
              <h4 className="text-white font-semibold mt-4">Đơn Hàng</h4>
              {salesOrders.filter(so => so.customerId === customer.id).map(so => (
                <div key={so.id} className="bg-slate-800 rounded-lg p-3 flex items-center justify-between">
                  <div>
                    <p className="text-blue-400 text-sm font-medium">{so.soNo} - {so.product}</p>
                    <p className="text-slate-300 text-xs">{so.quantity.toLocaleString()} đơn vị • Giao: {so.deliveryDate}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(so.status)}`}>{so.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Order Detail Modal */}
      {order && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setSelectedOrder(null)}>
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">{order.soNo}</h3>
              <button className="text-slate-400 hover:text-white text-xl" onClick={() => setSelectedOrder(null)}>✕</button>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-800 rounded-lg p-3">
                  <p className="text-slate-400 text-xs">Sản phẩm</p>
                  <p className="text-white font-medium">{order.product}</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-3">
                  <p className="text-slate-400 text-xs">Số lượng</p>
                  <p className="text-white font-medium">{order.quantity.toLocaleString()}</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-3">
                  <p className="text-slate-400 text-xs">Đơn giá</p>
                  <p className="text-white font-medium">{order.unitPrice.toLocaleString()} VNĐ</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-3">
                  <p className="text-slate-400 text-xs">Giá trị</p>
                  <p className="text-green-400 font-bold">{((order.quantity * order.unitPrice) / 1000000).toFixed(0)}M</p>
                </div>
              </div>
              <div className="bg-slate-800 rounded-lg p-3">
                <p className="text-slate-400 text-xs mb-2">Tiến độ</p>
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <div className="bg-blue-500 h-3 rounded-full transition-all" style={{ width: `${order.progress}%` }} />
                </div>
                <p className="text-white text-right text-sm mt-1">{order.progress}%</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-800 rounded-lg p-3">
                  <p className="text-slate-400 text-xs">Ngày đặt</p>
                  <p className="text-white font-medium">{order.orderDate}</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-3">
                  <p className="text-slate-400 text-xs">Ngày giao</p>
                  <p className="text-white font-medium">{order.deliveryDate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
