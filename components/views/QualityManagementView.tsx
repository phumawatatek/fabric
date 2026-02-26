'use client'

import { useFactoryData } from '@/hooks/useFactoryData'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'

export default function QualityManagementView() {
  const { productionOrders } = useFactoryData()
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)
  const [showQualityDetail, setShowQualityDetail] = useState(false)

  // Quality standards
  const standards = [
    { name: 'Độ Mịn Sợi', target: 95, actual: 93, unit: '%' },
    { name: 'Cường Độ Kéo', target: 4.5, actual: 4.3, unit: 'N/tex' },
    { name: 'Tỷ Lệ Đứt', target: 2.0, actual: 2.1, unit: '%' },
    { name: 'Độ Đồng Đều', target: 98, actual: 96, unit: '%' },
  ]

  // Historical quality data
  const qualityTrend = [
    { date: '2024-02-20', chất_lượng: 94, mục_tiêu: 95 },
    { date: '2024-02-21', chất_lượng: 93, mục_tiêu: 95 },
    { date: '2024-02-22', chất_lượng: 95, mục_tiêu: 95 },
    { date: '2024-02-23', chất_lượng: 92, mục_tiêu: 95 },
    { date: '2024-02-24', chất_lượng: 94, mục_tiêu: 95 },
    { date: '2024-02-25', chất_lượng: 96, mục_tiêu: 95 },
    { date: '2024-02-26', chất_lượng: 93, mục_tiêu: 95 },
  ]

  // Defect analysis
  const defectData = [
    { name: 'Sợi Mỏng', count: 12, percentage: 35 },
    { name: 'Nút Sợi', count: 8, percentage: 23 },
    { name: 'Sợi Đứt', count: 6, percentage: 18 },
    { name: 'Nhiễu Bụi', count: 5, percentage: 14 },
    { name: 'Khác', count: 3, percentage: 10 },
  ]

  const getStatusColor = (actual: number, target: number) => {
    if (actual >= target * 0.98) return 'bg-green-900 text-green-200'
    if (actual >= target * 0.95) return 'bg-yellow-900 text-yellow-200'
    return 'bg-red-900 text-red-200'
  }

  return (
    <div className="space-y-8">
      {/* Quality KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-900 border-slate-800 p-6">
          <p className="text-slate-400 text-sm">Chất Lượng Tb Hôm Nay</p>
          <p className="text-3xl font-bold text-white mt-2">93.4%</p>
          <p className="text-xs text-green-400 mt-1">Tốt</p>
        </Card>

        <Card className="bg-slate-900 border-slate-800 p-6">
          <p className="text-slate-400 text-sm">Sản Phẩm Đạt Tiêu Chuẩn</p>
          <p className="text-3xl font-bold text-white mt-2">96.2%</p>
          <p className="text-xs text-blue-400 mt-1">Trong 24h</p>
        </Card>

        <Card className="bg-slate-900 border-slate-800 p-6">
          <p className="text-slate-400 text-sm">Lỗi Phát Hiện</p>
          <p className="text-3xl font-bold text-white mt-2">34</p>
          <p className="text-xs text-yellow-400 mt-1">cần sửa</p>
        </Card>

        <Card className="bg-slate-900 border-slate-800 p-6">
          <p className="text-slate-400 text-sm">Chi Phí Lỗi</p>
          <p className="text-3xl font-bold text-white mt-2">2.3M</p>
          <p className="text-xs text-red-400 mt-1">VND/ngày</p>
        </Card>
      </div>

      {/* Quality Standards */}
      <Card className="bg-slate-900 border-slate-800 p-6">
        <h3 className="text-xl font-bold text-white mb-4">Tiêu Chuẩn Chất Lượng</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {standards.map((std, idx) => (
            <div key={idx} className="bg-slate-800 rounded-lg p-4 border border-slate-700">
              <p className="text-sm text-slate-400 mb-3">{std.name}</p>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-xs text-slate-400">Mục tiêu</span>
                    <span className="text-sm font-semibold text-blue-400">{std.target}{std.unit}</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="h-2 bg-blue-500 rounded-full" style={{ width: `${std.target}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-xs text-slate-400">Thực tế</span>
                    <span className={`text-sm font-semibold px-2 py-1 rounded ${getStatusColor(std.actual, std.target)}`}>
                      {std.actual}{std.unit}
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="h-2 bg-green-500 rounded-full" style={{ width: `${std.actual}%` }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quality Trend Chart */}
      <Card className="bg-slate-900 border-slate-800 p-6">
        <h3 className="text-xl font-bold text-white mb-4">Xu Hướng Chất Lượng (7 Ngày)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={qualityTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
              labelStyle={{ color: '#fff' }}
            />
            <Legend />
            <Line type="monotone" dataKey="chất_lượng" stroke="#10b981" strokeWidth={2} />
            <Line type="monotone" dataKey="mục_tiêu" stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Defect Analysis */}
      <Card className="bg-slate-900 border-slate-800 p-6">
        <h3 className="text-xl font-bold text-white mb-4">Phân Tích Lỗi Sản Phẩm</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={defectData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9ca3af" angle={-45} height={80} />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
              labelStyle={{ color: '#fff' }}
            />
            <Bar dataKey="count" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Production Orders with Quality Status */}
      <Card className="bg-slate-900 border-slate-800 p-6">
        <h3 className="text-xl font-bold text-white mb-4">Đơn Hàng và Chất Lượng</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-4 text-slate-400 font-semibold">Đơn Hàng</th>
                <th className="text-left py-3 px-4 text-slate-400 font-semibold">Sản Phẩm</th>
                <th className="text-left py-3 px-4 text-slate-400 font-semibold">Số Lượng (m)</th>
                <th className="text-left py-3 px-4 text-slate-400 font-semibold">Mục Tiêu (m)</th>
                <th className="text-left py-3 px-4 text-slate-400 font-semibold">Tiến Độ</th>
                <th className="text-left py-3 px-4 text-slate-400 font-semibold">Chất Lượng</th>
                <th className="text-left py-3 px-4 text-slate-400 font-semibold">Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {productionOrders.map(order => {
                const qualityScore = Math.random() * 10 + 85 // Random quality between 85-95%
                return (
                  <tr
                    key={order.id}
                    className="border-b border-slate-700 hover:bg-slate-800 transition-colors cursor-pointer"
                    onClick={() => setSelectedOrder(order.id)}
                  >
                    <td className="py-3 px-4 font-semibold text-white">{order.orderNo}</td>
                    <td className="py-3 px-4 text-slate-300 text-xs">{order.product}</td>
                    <td className="py-3 px-4 text-slate-300">{Math.round(order.quantity * order.progress / 100)}</td>
                    <td className="py-3 px-4 text-slate-300">{order.quantity}</td>
                    <td className="py-3 px-4">
                      <div className="w-16 h-2 bg-slate-700 rounded-full">
                        <div
                          className="h-2 bg-blue-500 rounded-full"
                          style={{ width: `${order.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-400">{order.progress.toFixed(0)}%</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        qualityScore >= 90 ? 'bg-green-900 text-green-200' :
                        qualityScore >= 85 ? 'bg-yellow-900 text-yellow-200' :
                        'bg-red-900 text-red-200'
                      }`}>
                        {qualityScore.toFixed(1)}%
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Button
                        className="bg-slate-700 hover:bg-slate-600 text-white text-xs h-7"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedOrder(order.id)
                          setShowQualityDetail(true)
                        }}
                      >
                        Chi Tiết
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Quality Control Checklist */}
      <Card className="bg-slate-900 border-slate-800 p-6">
        <h3 className="text-xl font-bold text-white mb-4">Danh Sách Kiểm Soát Chất Lượng</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
            <p className="text-white font-semibold mb-3">Kiểm Tra Hàng Giờ</p>
            <ul className="space-y-2">
              {[
                'Kiểm tra độ mịn sợi',
                'Đo cường độ kéo',
                'Đếm lỗi sợi',
                'Đo độ đồng đều',
                'Kiểm tra màu sắc'
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                  <input type="checkbox" className="w-4 h-4" defaultChecked />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
            <p className="text-white font-semibold mb-3">Kiểm Tra Hàng Ngày</p>
            <ul className="space-y-2">
              {[
                'Kiểm tra lô đầu ngày',
                'Kiểm tra lô cuối ngày',
                'Lấy mẫu ngẫu nhiên',
                'Ghi chép kết quả',
                'Cập nhật báo cáo'
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                  <input type="checkbox" className="w-4 h-4" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      {/* Quality Improvement Recommendations */}
      <Card className="bg-slate-900 border-slate-800 p-6">
        <h3 className="text-xl font-bold text-white mb-4">Gợi Ý Cải Thiện Chất Lượng</h3>
        <div className="space-y-3">
          <div className="p-4 bg-blue-900/30 border-l-4 border-blue-500 rounded">
            <p className="text-blue-400 font-semibold text-sm">Tăng Tần Suất Kiểm Tra</p>
            <p className="text-slate-300 text-xs mt-1">Kiểm tra chất lượng mỗi 30 phút thay vì 1 giờ để phát hiện sớm lỗi</p>
          </div>
          <div className="p-4 bg-green-900/30 border-l-4 border-green-500 rounded">
            <p className="text-green-400 font-semibold text-sm">Đào Tạo Nhân Viên</p>
            <p className="text-slate-300 text-xs mt-1">Cơ hội đào tạo kỹ năng kiểm soát chất lượng cho các nhân viên mới</p>
          </div>
          <div className="p-4 bg-yellow-900/30 border-l-4 border-yellow-500 rounded">
            <p className="text-yellow-400 font-semibold text-sm">Bảo Trì Máy Móc</p>
            <p className="text-slate-300 text-xs mt-1">Bảo trì máy M3 và M5 để cải thiện tỷ lệ lỗi từ 8% xuống dưới 2%</p>
          </div>
          <div className="p-4 bg-purple-900/30 border-l-4 border-purple-500 rounded">
            <p className="text-purple-400 font-semibold text-sm">Tối Ưu Hóa Quy Trình</p>
            <p className="text-slate-300 text-xs mt-1">Điều chỉnh tốc độ xoắn và nhiệt độ để giảm lỗi sợi mỏng</p>
          </div>
        </div>
      </Card>

      {/* Quality Detail Modal */}
      {showQualityDetail && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-slate-900 border border-slate-800 rounded-lg shadow-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between p-6 border-b border-slate-800">
              <h2 className="text-2xl font-bold text-white">Chi Tiết Chất Lượng Đơn Hàng</h2>
              <button
                onClick={() => setShowQualityDetail(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Order Info */}
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4">Thông Tin Đơn Hàng</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-slate-400 text-xs">Mã Đơn</p>
                    <p className="text-white font-semibold mt-1">{productionOrders[0]?.orderNo}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs">Sản Phẩm</p>
                    <p className="text-white font-semibold mt-1">{productionOrders[0]?.product}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs">Tiến Độ</p>
                    <p className="text-white font-semibold mt-1">{productionOrders[0]?.progress.toFixed(0)}%</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs">Chất Lượng</p>
                    <p className="text-green-400 font-semibold mt-1">92.3%</p>
                  </div>
                </div>
              </div>

              {/* Quality Metrics */}
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4">Chỉ Số Chất Lượng</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Độ Mịn Sợi', score: 93, target: 95 },
                    { name: 'Cường Độ Kéo', score: 91, target: 95 },
                    { name: 'Độ Đồng Đều', score: 94, target: 98 },
                    { name: 'Tỷ Lệ Lỗi', score: 92, target: 95 }
                  ].map((metric, idx) => (
                    <div key={idx} className="bg-slate-900 rounded p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-semibold">{metric.name}</span>
                        <span className={`text-sm font-bold ${metric.score >= metric.target * 0.95 ? 'text-green-400' : 'text-yellow-400'}`}>
                          {metric.score}% / {metric.target}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${metric.score >= metric.target * 0.95 ? 'bg-green-500' : 'bg-yellow-500'}`}
                          style={{ width: `${(metric.score / metric.target) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Defect Details */}
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4">Phân Loại Lỗi Phát Hiện</h3>
                <div className="space-y-2">
                  {[
                    { type: 'Sợi Mỏng', count: 3, severity: 'Cao' },
                    { type: 'Nút Sợi', count: 2, severity: 'Trung Bình' },
                    { type: 'Sợi Đứt', count: 1, severity: 'Thấp' },
                    { type: 'Nhiễu Bụi', count: 0, severity: 'Không' }
                  ].map((defect, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-900 rounded">
                      <span className="text-white font-semibold text-sm">{defect.type}</span>
                      <div className="flex items-center gap-3">
                        <span className={`text-sm font-bold ${
                          defect.severity === 'Cao' ? 'text-red-400' :
                          defect.severity === 'Trung Bình' ? 'text-yellow-400' :
                          defect.severity === 'Thấp' ? 'text-blue-400' :
                          'text-green-400'
                        }`}>
                          {defect.count} cái
                        </span>
                        <span className="text-slate-400 text-xs px-2 py-1 bg-slate-800 rounded">{defect.severity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4">Hành Động</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold text-sm transition-colors">
                    Xuất Báo Cáo
                  </button>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold text-sm transition-colors">
                    Phê Duyệt
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
