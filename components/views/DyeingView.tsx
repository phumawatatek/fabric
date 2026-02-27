'use client'

import { useState } from 'react'
import { Palette, Droplets, Thermometer, Clock, Eye, FlaskConical } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useFactoryData } from '@/hooks/useFactoryData'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function DyeingView() {
  const { dyeingBatches, setDyeingBatches, dyeingRecipes } = useFactoryData()
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null)
  const [selectedRecipe, setSelectedRecipe] = useState<string | null>(null)

  const activeBatches = dyeingBatches.filter(b => !['hoàn thành', 'chuẩn bị'].includes(b.status))
  const completedBatches = dyeingBatches.filter(b => b.status === 'hoàn thành')
  const avgColorMatch = completedBatches.length > 0
    ? completedBatches.reduce((sum, b) => sum + b.colorMatchScore, 0) / completedBatches.length
    : 0
  const totalWeight = dyeingBatches.reduce((sum, b) => sum + b.weight, 0)

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'chuẩn bị': 'bg-slate-700 text-slate-200 border-slate-600',
      'đang nhuộm': 'bg-purple-900/50 text-purple-200 border-purple-700',
      'xả nước': 'bg-blue-900/50 text-blue-200 border-blue-700',
      'sấy': 'bg-orange-900/50 text-orange-200 border-orange-700',
      'kiểm tra': 'bg-yellow-900/50 text-yellow-200 border-yellow-700',
      'hoàn thành': 'bg-green-900/50 text-green-200 border-green-700',
    }
    return colors[status] || 'bg-slate-800 text-slate-300'
  }

  const getColorMatchColor = (score: number) => {
    if (score >= 95) return 'text-green-400'
    if (score >= 90) return 'text-yellow-400'
    if (score >= 85) return 'text-orange-400'
    return 'text-red-400'
  }

  const statusFlow: Record<string, string> = {
    'chuẩn bị': 'đang nhuộm',
    'đang nhuộm': 'xả nước',
    'xả nước': 'sấy',
    'sấy': 'kiểm tra',
    'kiểm tra': 'hoàn thành',
  }

  const handleAdvanceStatus = (batchId: string) => {
    setDyeingBatches(prev => prev.map(b => {
      if (b.id === batchId && statusFlow[b.status]) {
        const newStatus = statusFlow[b.status] as typeof b.status
        return {
          ...b,
          status: newStatus,
          colorMatchScore: newStatus === 'hoàn thành' ? (b.colorMatchScore || Math.floor(88 + Math.random() * 10)) : b.colorMatchScore,
        }
      }
      return b
    }))
  }

  const batchChartData = dyeingBatches.map(b => ({
    name: b.batchNo,
    'Khối lượng (kg)': b.weight,
    'Thời gian (phút)': b.duration,
  }))

  const batch = selectedBatch ? dyeingBatches.find(b => b.id === selectedBatch) : null
  const recipe = selectedRecipe ? dyeingRecipes.find(r => r.id === selectedRecipe) : null

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-900 border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Palette className="text-purple-400" size={20} />
            <span className="text-slate-400 text-sm">Lô Đang Nhuộm</span>
          </div>
          <p className="text-2xl font-bold text-white">{activeBatches.length}</p>
          <p className="text-xs text-purple-400 mt-1">Tổng {dyeingBatches.length} lô</p>
        </Card>
        <Card className="bg-slate-900 border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Droplets className="text-blue-400" size={20} />
            <span className="text-slate-400 text-sm">Tổng Khối Lượng</span>
          </div>
          <p className="text-2xl font-bold text-white">{totalWeight.toLocaleString()} kg</p>
          <p className="text-xs text-slate-400 mt-1">Tất cả lô</p>
        </Card>
        <Card className="bg-slate-900 border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">🎯</span>
            <span className="text-slate-400 text-sm">Điểm So Màu TB</span>
          </div>
          <p className={`text-2xl font-bold ${getColorMatchColor(avgColorMatch)}`}>{avgColorMatch.toFixed(1)}%</p>
          <p className="text-xs text-slate-400 mt-1">Lô hoàn thành</p>
        </Card>
        <Card className="bg-slate-900 border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-2">
            <FlaskConical className="text-green-400" size={20} />
            <span className="text-slate-400 text-sm">Công Thức Nhuộm</span>
          </div>
          <p className="text-2xl font-bold text-white">{dyeingRecipes.length}</p>
          <p className="text-xs text-green-400 mt-1">Đã lưu trữ</p>
        </Card>
      </div>

      {/* Active Batches Pipeline */}
      <Card className="bg-slate-900 border-slate-800 p-6">
        <h3 className="text-xl font-bold text-white mb-4">Quy Trình Nhuộm</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          {['chuẩn bị', 'đang nhuộm', 'xả nước', 'sấy', 'kiểm tra', 'hoàn thành'].map(status => {
            const count = dyeingBatches.filter(b => b.status === status).length
            return (
              <div key={status} className="text-center">
                <div className={`rounded-lg p-3 border ${getStatusColor(status)}`}>
                  <p className="text-2xl font-bold">{count}</p>
                  <p className="text-xs capitalize mt-1">{status}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Batches Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700 text-slate-400">
                <th className="text-left py-3 px-2">Lô</th>
                <th className="text-left py-3 px-2">Loại vải</th>
                <th className="text-center py-3 px-2">Màu</th>
                <th className="text-right py-3 px-2">Khối lượng</th>
                <th className="text-center py-3 px-2">Nhiệt độ</th>
                <th className="text-center py-3 px-2">Thời gian</th>
                <th className="text-center py-3 px-2">So màu</th>
                <th className="text-center py-3 px-2">Trạng thái</th>
                <th className="text-center py-3 px-2">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {dyeingBatches.map(b => (
                <tr key={b.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                  <td className="py-3 px-2 text-blue-400 font-medium">{b.batchNo}</td>
                  <td className="py-3 px-2 text-white">{b.fabricType}</td>
                  <td className="py-3 px-2 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 rounded-full border border-slate-600" style={{ backgroundColor: b.colorCode }} />
                      <span className="text-slate-300 text-xs">{b.colorName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-right text-slate-300">{b.weight} kg</td>
                  <td className="py-3 px-2 text-center text-slate-300">{b.temperature}°C</td>
                  <td className="py-3 px-2 text-center text-slate-300">{b.duration} phút</td>
                  <td className="py-3 px-2 text-center">
                    {b.colorMatchScore > 0 ? (
                      <span className={`font-medium ${getColorMatchColor(b.colorMatchScore)}`}>{b.colorMatchScore}%</span>
                    ) : (
                      <span className="text-slate-500">—</span>
                    )}
                  </td>
                  <td className="py-3 px-2 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(b.status)}`}>{b.status}</span>
                  </td>
                  <td className="py-3 px-2 text-center space-x-1">
                    <Button size="sm" variant="ghost" className="text-blue-400 h-7" onClick={() => setSelectedBatch(b.id)}>
                      <Eye size={14} />
                    </Button>
                    {statusFlow[b.status] && (
                      <Button size="sm" className="bg-purple-700 hover:bg-purple-600 text-xs h-7" onClick={() => handleAdvanceStatus(b.id)}>
                        Tiến
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Chart + Recipes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bg-slate-900 border-slate-800 p-6">
          <h3 className="text-xl font-bold text-white mb-4">Thông Số Lô Nhuộm</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={batchChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#9ca3af" tick={{ fontSize: 11 }} />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} />
              <Bar dataKey="Khối lượng (kg)" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Thời gian (phút)" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="bg-slate-900 border-slate-800 p-6">
          <h3 className="text-xl font-bold text-white mb-4">Công Thức Nhuộm</h3>
          <div className="space-y-3">
            {dyeingRecipes.map(rec => (
              <div
                key={rec.id}
                className="bg-slate-800 border border-slate-700 rounded-lg p-3 hover:border-purple-600 transition-colors cursor-pointer"
                onClick={() => setSelectedRecipe(rec.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full border border-slate-600" style={{ backgroundColor: rec.colorCode }} />
                  <div className="flex-1">
                    <p className="text-white font-medium">{rec.colorName}</p>
                    <p className="text-slate-400 text-xs">{rec.colorCode} • {rec.temperature}°C • {rec.duration} phút • pH {rec.phLevel}</p>
                  </div>
                  <span className="text-slate-400 text-xs">{rec.chemicals.length} hóa chất</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Batch Detail Modal */}
      {batch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setSelectedBatch(null)}>
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Lô {batch.batchNo}</h3>
              <button className="text-slate-400 hover:text-white text-xl" onClick={() => setSelectedBatch(null)}>✕</button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 bg-slate-800 rounded-lg p-3">
                <div className="w-10 h-10 rounded-full border-2 border-slate-600" style={{ backgroundColor: batch.colorCode }} />
                <div>
                  <p className="text-white font-semibold">{batch.colorName}</p>
                  <p className="text-slate-400 text-xs">{batch.colorCode}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-800 rounded-lg p-3">
                  <p className="text-slate-400 text-xs">Loại vải</p>
                  <p className="text-white font-medium">{batch.fabricType}</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-3">
                  <p className="text-slate-400 text-xs">Khối lượng</p>
                  <p className="text-white font-medium">{batch.weight} kg</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-3">
                  <p className="text-slate-400 text-xs">Nhiệt độ</p>
                  <p className="text-white font-medium">{batch.temperature}°C</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-3">
                  <p className="text-slate-400 text-xs">Thời gian</p>
                  <p className="text-white font-medium">{batch.duration} phút</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-3">
                  <p className="text-slate-400 text-xs">Người vận hành</p>
                  <p className="text-white font-medium">{batch.operator}</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-3">
                  <p className="text-slate-400 text-xs">Bắt đầu</p>
                  <p className="text-white font-medium">{batch.startTime || '—'}</p>
                </div>
              </div>
              {batch.colorMatchScore > 0 && (
                <div className="bg-slate-800 rounded-lg p-4 text-center">
                  <p className="text-slate-400 text-xs mb-1">Điểm So Màu</p>
                  <p className={`text-3xl font-bold ${getColorMatchColor(batch.colorMatchScore)}`}>{batch.colorMatchScore}%</p>
                </div>
              )}
              <div>
                <h4 className="text-white font-semibold mb-2">Công Thức Hóa Chất</h4>
                <div className="space-y-2">
                  {batch.recipe.map((r, i) => (
                    <div key={i} className="flex items-center justify-between bg-slate-800 rounded-lg p-2">
                      <span className="text-slate-300 text-sm">{r.chemical}</span>
                      <span className="text-white font-medium text-sm">{r.amount} {r.unit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recipe Detail Modal */}
      {recipe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setSelectedRecipe(null)}>
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border-2 border-slate-600" style={{ backgroundColor: recipe.colorCode }} />
                <h3 className="text-xl font-bold text-white">{recipe.colorName}</h3>
              </div>
              <button className="text-slate-400 hover:text-white text-xl" onClick={() => setSelectedRecipe(null)}>✕</button>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-slate-800 rounded-lg p-3 text-center">
                  <Thermometer size={16} className="text-red-400 mx-auto mb-1" />
                  <p className="text-white font-bold">{recipe.temperature}°C</p>
                  <p className="text-slate-400 text-xs">Nhiệt độ</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-3 text-center">
                  <Clock size={16} className="text-blue-400 mx-auto mb-1" />
                  <p className="text-white font-bold">{recipe.duration} phút</p>
                  <p className="text-slate-400 text-xs">Thời gian</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-3 text-center">
                  <Droplets size={16} className="text-green-400 mx-auto mb-1" />
                  <p className="text-white font-bold">{recipe.phLevel}</p>
                  <p className="text-slate-400 text-xs">pH</p>
                </div>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">Thành Phần Hóa Chất</h4>
                <div className="space-y-2">
                  {recipe.chemicals.map((c, i) => (
                    <div key={i} className="flex items-center justify-between bg-slate-800 rounded-lg p-3">
                      <span className="text-slate-300">{c.name}</span>
                      <span className="text-white font-medium">{c.ratio} {c.unit}</span>
                    </div>
                  ))}
                </div>
              </div>
              {recipe.notes && (
                <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-3">
                  <p className="text-blue-300 text-xs font-semibold mb-1">Ghi Chú</p>
                  <p className="text-white text-sm">{recipe.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
