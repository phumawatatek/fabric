'use client'

import { useFactoryData } from '@/hooks/useFactoryData'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function EnergyManagementView() {
  const { machines } = useFactoryData()
  const [hvacTemp, setHvacTemp] = useState(24)
  const [hvacMode, setHvacMode] = useState('auto')
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [powerLimit, setPowerLimit] = useState(500)
  const [showDetailModal, setShowDetailModal] = useState(false)

  // Energy consumption data
  const energyData = [
    { time: '06:00', tiêu_thụ: 450, mục_tiêu: 400 },
    { time: '08:00', tiêu_thụ: 520, mục_tiêu: 400 },
    { time: '10:00', tiêu_thụ: 580, mục_tiêu: 400 },
    { time: '12:00', tiêu_thụ: 620, mục_tiêu: 400 },
    { time: '14:00', tiêu_thụ: 600, mục_tiêu: 400 },
    { time: '16:00', tiêu_thụ: 540, mục_tiêu: 400 },
    { time: '18:00', tiêu_thụ: 480, mục_tiêu: 400 },
  ]

  // Machine energy consumption
  const machineEnergy = machines.slice(0, 8).map(m => ({
    name: m.id,
    tiêu_thụ: m.productionRate * 0.8 + Math.random() * 50,
  }))

  const totalEnergy = machineEnergy.reduce((sum, m) => sum + m.tiêu_thụ, 0)
  const hvacEnergy = 150
  const otherEnergy = 100
  const totalDaily = totalEnergy * 24 + hvacEnergy * 24 + otherEnergy * 24

  return (
    <div className="space-y-8">
      {/* Date & Period Selection */}
      <Card className="bg-slate-900 border-slate-800 p-6">
        <h3 className="text-lg font-bold text-white mb-4">Chọn Thời Gian Xem Dữ Liệu</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-slate-400 mb-2">Ngày (Hôm Nay: {new Date(selectedDate).toLocaleDateString('vi-VN')})</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded text-white text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-2">Giới Hạn Công Suất</label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="300"
                max="800"
                value={powerLimit}
                onChange={(e) => setPowerLimit(Number(e.target.value))}
                className="flex-1"
              />
              <span className="text-white font-bold text-sm">{powerLimit} kW</span>
            </div>
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-2">Hành Động</label>
            <div className="flex gap-2">
              <button
                onClick={() => setShowDetailModal(true)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold text-sm transition-colors"
              >
                Xem Chi Tiết
              </button>
              <button className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold text-sm transition-colors">
                Xuất Báo Cáo
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Energy KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-900 border-slate-800 p-6">
          <p className="text-slate-400 text-sm">Tiêu Thụ Hiện Tại</p>
          <p className="text-3xl font-bold text-white mt-2">{totalEnergy.toFixed(0)}</p>
          <p className="text-xs text-yellow-400 mt-1">kW</p>
        </Card>

        <Card className="bg-slate-900 border-slate-800 p-6">
          <p className="text-slate-400 text-sm">HVAC</p>
          <p className="text-3xl font-bold text-white mt-2">{hvacEnergy}</p>
          <p className="text-xs text-blue-400 mt-1">kW</p>
        </Card>

        <Card className="bg-slate-900 border-slate-800 p-6">
          <p className="text-slate-400 text-sm">Khác</p>
          <p className="text-3xl font-bold text-white mt-2">{otherEnergy}</p>
          <p className="text-xs text-purple-400 mt-1">kW</p>
        </Card>

        <Card className="bg-slate-900 border-slate-800 p-6">
          <p className="text-slate-400 text-sm">Tiêu Thụ Ngày</p>
          <p className="text-3xl font-bold text-white mt-2">{(totalDaily / 1000).toFixed(1)}</p>
          <p className="text-xs text-green-400 mt-1">MWh</p>
        </Card>
      </div>

      {/* Energy Consumption Trend */}
      <Card className="bg-slate-900 border-slate-800 p-6">
        <h3 className="text-xl font-bold text-white mb-4">Xu Hướng Tiêu Thụ Năng Lượng</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={energyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="time" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
              labelStyle={{ color: '#fff' }}
            />
            <Legend />
            <Line type="monotone" dataKey="tiêu_thụ" stroke="#f59e0b" strokeWidth={2} />
            <Line type="monotone" dataKey="mục_tiêu" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Machine Energy Breakdown */}
      <Card className="bg-slate-900 border-slate-800 p-6">
        <h3 className="text-xl font-bold text-white mb-4">Tiêu Thụ Năng Lượng Theo Máy</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={machineEnergy}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
              labelStyle={{ color: '#fff' }}
            />
            <Bar dataKey="tiêu_thụ" fill="#8b5cf6" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* HVAC Control */}
      <Card className="bg-slate-900 border-slate-800 p-6">
        <h3 className="text-xl font-bold text-white mb-4">Điều Khiển HVAC</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-slate-400 mb-3">Nhiệt Độ (°C): <span className="text-white font-bold">{hvacTemp}°C</span></label>
            <input
              type="range"
              min="16"
              max="32"
              value={hvacTemp}
              onChange={(e) => setHvacTemp(Number(e.target.value))}
              className="w-full"
            />
            <p className="text-xs text-slate-400 mt-2">Điều chỉnh nhiệt độ phòng sản xuất</p>
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-3">Chế Độ HVAC</label>
            <div className="space-y-2">
              {['auto', 'cooling', 'heating', 'eco'].map(mode => (
                <label key={mode} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={hvacMode === mode}
                    onChange={() => setHvacMode(mode)}
                    className="w-4 h-4"
                  />
                  <span className="text-white text-sm capitalize">
                    {mode === 'auto' ? 'Tự Động' : mode === 'cooling' ? 'Làm Mát' : mode === 'heating' ? 'Sưởi' : 'Tiết Kiệm'}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Energy Saving Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-green-900/20 border-green-800 p-6">
          <h3 className="text-lg font-bold text-green-400 mb-3">Gợi Ý Tiết Kiệm Năng Lượng</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2">
              <span className="text-green-400">✓</span>
              <span className="text-slate-300">Sử dụng chế độ Eco vào cuối ca làm việc</span>
            </li>
            <li className="flex gap-2">
              <span className="text-green-400">✓</span>
              <span className="text-slate-300">Duy trì nhiệt độ 24°C trong giờ làm việc</span>
            </li>
            <li className="flex gap-2">
              <span className="text-green-400">✓</span>
              <span className="text-slate-300">Kiểm tra và bảo trì định kỳ các máy xoắn</span>
            </li>
            <li className="flex gap-2">
              <span className="text-green-400">✓</span>
              <span className="text-slate-300">Tắt máy không sử dụng để tiết kiệm năng lượng</span>
            </li>
          </ul>
        </Card>

        <Card className="bg-blue-900/20 border-blue-800 p-6">
          <h3 className="text-lg font-bold text-blue-400 mb-3">Mục Tiêu Hiệu Quả Năng Lượng</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-slate-400">Giảm Tiêu Thụ</span>
                <span className="text-sm text-white font-semibold">75%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="h-2 bg-blue-500 rounded-full" style={{ width: '75%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-slate-400">Năng Lượng Tái Tạo</span>
                <span className="text-sm text-white font-semibold">40%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="h-2 bg-green-500 rounded-full" style={{ width: '40%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-slate-400">Tiết Kiệm Chi Phí</span>
                <span className="text-sm text-white font-semibold">60%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="h-2 bg-yellow-500 rounded-full" style={{ width: '60%' }} />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Detail Modal */}
      {showDetailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-slate-900 border border-slate-800 rounded-lg shadow-lg w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-start justify-between p-6 border-b border-slate-800">
              <h2 className="text-2xl font-bold text-white">Chi Tiết Tiêu Thụ Năng Lượng</h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <p className="text-slate-400 text-sm mb-2">Ngày: {new Date(selectedDate).toLocaleDateString('vi-VN')}</p>
                <p className="text-slate-400 text-sm mb-4">Giới Hạn Công Suất: {powerLimit} kW</p>
              </div>

              {/* Hourly breakdown */}
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4">Tiêu Thụ Theo Giờ</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {[6, 8, 10, 12, 14, 16, 18, 20].map(hour => {
                    const consumption = 400 + (Math.sin(hour / 24 * Math.PI * 2) * 100 + 100);
                    const isOverLimit = consumption > powerLimit;
                    return (
                      <div key={hour} className="flex items-center justify-between p-3 bg-slate-900 rounded">
                        <span className="text-white font-semibold">{hour.toString().padStart(2, '0')}:00</span>
                        <div className="flex-1 mx-4 bg-slate-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all ${isOverLimit ? 'bg-red-500' : 'bg-blue-500'}`}
                            style={{ width: `${Math.min(consumption / powerLimit * 100, 100)}%` }}
                          />
                        </div>
                        <span className={`text-sm font-semibold ${isOverLimit ? 'text-red-400' : 'text-white'}`}>
                          {consumption.toFixed(0)} kW
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
                  <p className="text-blue-400 text-sm">Tiêu Thụ Trung Bình</p>
                  <p className="text-2xl font-bold text-white mt-1">450 kW</p>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-4">
                  <p className="text-yellow-400 text-sm">Tiêu Thụ Cao Nhất</p>
                  <p className="text-2xl font-bold text-white mt-1">580 kW</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
