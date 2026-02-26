'use client'

import { useFactoryData } from '@/hooks/useFactoryData'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function CottonMixingView() {
  const { aiMixingData, setAIMixingData } = useFactoryData()
  const [showNewBatch, setShowNewBatch] = useState(false)
  const [selectedBatchDetail, setSelectedBatchDetail] = useState<any>(null)
  const [showBatchDetail, setShowBatchDetail] = useState(false)
  const [newBatchData, setNewBatchData] = useState({
    cottonType: 'Hạng A',
    mixingRatio: 80,
    temperature: 65,
    spinSpeed: 2400,
  })

  const handleAddBatch = () => {
    const newBatch = {
      id: `BATCH${aiMixingData.length + 1}`,
      batchNo: `BT${String(aiMixingData.length + 1).padStart(3, '0')}`,
      ...newBatchData,
      predictedQuality: Math.min(100, 70 + newBatchData.mixingRatio - 50 + (newBatchData.temperature - 60) * 2),
      status: 'chờ' as const,
    }
    setAIMixingData(prev => [newBatch, ...prev])
    setShowNewBatch(false)
    setNewBatchData({
      cottonType: 'Hạng A',
      mixingRatio: 80,
      temperature: 65,
      spinSpeed: 2400,
    })
  }

  const handleApproveBatch = (batchId: string) => {
    setAIMixingData(prev => prev.map(batch =>
      batch.id === batchId ? { ...batch, status: 'đang xử lý' as const } : batch
    ))
  }

  const getQualityColor = (quality: number) => {
    if (quality >= 95) return 'text-green-400 bg-green-900/30'
    if (quality >= 90) return 'text-blue-400 bg-blue-900/30'
    if (quality >= 80) return 'text-yellow-400 bg-yellow-900/30'
    return 'text-red-400 bg-red-900/30'
  }

  return (
    <div className="space-y-8">
      {/* AI Mixing Optimizer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-900 border-slate-800 p-6">
          <p className="text-slate-400 text-sm">Lô Đang Xử Lý</p>
          <p className="text-3xl font-bold text-white mt-2">{aiMixingData.filter(b => b.status === 'đang xử lý').length}</p>
        </Card>
        <Card className="bg-slate-900 border-slate-800 p-6">
          <p className="text-slate-400 text-sm">Chất Lượng Trung Bình</p>
          <p className="text-3xl font-bold text-white mt-2">
            {(aiMixingData.reduce((sum, b) => sum + b.predictedQuality, 0) / aiMixingData.length).toFixed(1)}%
          </p>
        </Card>
        <Card className="bg-slate-900 border-slate-800 p-6">
          <p className="text-slate-400 text-sm">Tổng Lô Hoàn Thành</p>
          <p className="text-3xl font-bold text-green-400 mt-2">{aiMixingData.filter(b => b.status === 'hoàn thành').length}</p>
        </Card>
        <Card className="bg-slate-900 border-slate-800 p-6">
          <p className="text-slate-400 text-sm">Lô Chờ Duyệt</p>
          <p className="text-3xl font-bold text-yellow-400 mt-2">{aiMixingData.filter(b => b.status === 'chờ').length}</p>
        </Card>
      </div>

      {/* New Batch Creation */}
      {!showNewBatch ? (
        <Button
          onClick={() => setShowNewBatch(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white w-full"
        >
          + Tạo Lô Trộn Mới
        </Button>
      ) : (
        <Card className="bg-slate-900 border-slate-800 p-6">
          <h3 className="text-xl font-bold text-white mb-4">Tạo Lô Trộn Mới</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-slate-400 mb-2">Loại Cotton</label>
              <select
                value={newBatchData.cottonType}
                onChange={(e) => setNewBatchData({ ...newBatchData, cottonType: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-white"
              >
                <option>Hạng A</option>
                <option>Hạng B</option>
                <option>Hạng C</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-2">Tỉ Lệ Trộn (%): {newBatchData.mixingRatio}</label>
              <input
                type="range"
                min="50"
                max="100"
                value={newBatchData.mixingRatio}
                onChange={(e) => setNewBatchData({ ...newBatchData, mixingRatio: Number(e.target.value) })}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-2">Nhiệt Độ (°C): {newBatchData.temperature}</label>
              <input
                type="range"
                min="55"
                max="75"
                value={newBatchData.temperature}
                onChange={(e) => setNewBatchData({ ...newBatchData, temperature: Number(e.target.value) })}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-2">Tốc Độ Xoắn (RPM): {newBatchData.spinSpeed}</label>
              <input
                type="range"
                min="2000"
                max="2500"
                value={newBatchData.spinSpeed}
                onChange={(e) => setNewBatchData({ ...newBatchData, spinSpeed: Number(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleAddBatch} className="bg-green-600 hover:bg-green-700 text-white flex-1">
              Tạo Lô
            </Button>
            <Button
              onClick={() => setShowNewBatch(false)}
              className="bg-slate-700 hover:bg-slate-600 text-white flex-1"
            >
              Hủy
            </Button>
          </div>
        </Card>
      )}

      {/* Batches Table */}
      <Card className="bg-slate-900 border-slate-800 p-6">
        <h3 className="text-xl font-bold text-white mb-4">Danh Sách Lô Trộn</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-4 text-slate-400 font-semibold">Lô</th>
                <th className="text-left py-3 px-4 text-slate-400 font-semibold">Loại Cotton</th>
                <th className="text-left py-3 px-4 text-slate-400 font-semibold">Tỉ Lệ (%)</th>
                <th className="text-left py-3 px-4 text-slate-400 font-semibold">Nhiệt Độ (°C)</th>
                <th className="text-left py-3 px-4 text-slate-400 font-semibold">Tốc Độ (RPM)</th>
                <th className="text-left py-3 px-4 text-slate-400 font-semibold">Chất Lượng Dự Đoán</th>
                <th className="text-left py-3 px-4 text-slate-400 font-semibold">Trạng Thái</th>
                <th className="text-left py-3 px-4 text-slate-400 font-semibold">Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {aiMixingData.map(batch => (
                <tr key={batch.id} className="border-b border-slate-700 hover:bg-slate-800 transition-colors">
                  <td className="py-3 px-4 font-semibold text-white">{batch.batchNo}</td>
                  <td className="py-3 px-4 text-slate-300">{batch.cottonType}</td>
                  <td className="py-3 px-4 text-slate-300">{batch.mixingRatio}%</td>
                  <td className="py-3 px-4 text-slate-300">{batch.temperature}</td>
                  <td className="py-3 px-4 text-slate-300">{batch.spinSpeed}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded font-semibold ${getQualityColor(batch.predictedQuality)}`}>
                      {batch.predictedQuality.toFixed(1)}%
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      batch.status === 'hoàn thành' ? 'bg-green-900 text-green-200' :
                      batch.status === 'đang xử lý' ? 'bg-blue-900 text-blue-200' :
                      'bg-yellow-900 text-yellow-200'
                    }`}>
                      {batch.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 space-x-1">
                    <Button
                      onClick={() => {
                        setSelectedBatchDetail(batch)
                        setShowBatchDetail(true)
                      }}
                      className="bg-slate-700 hover:bg-slate-600 text-white text-xs h-7"
                    >
                      Chi Tiết
                    </Button>
                    {batch.status === 'chờ' && (
                      <Button
                        onClick={() => handleApproveBatch(batch.id)}
                        className="bg-green-600 hover:bg-green-700 text-white text-xs h-7"
                      >
                        Duyệt
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* AI Optimization Tips */}
      <Card className="bg-slate-900 border-slate-800 p-6">
        <h3 className="text-xl font-bold text-white mb-4">Gợi Ý Tối Ưu Từ AI</h3>
        <div className="space-y-3">
          <div className="p-4 bg-blue-900/30 border-l-4 border-blue-500 rounded">
            <p className="text-white font-semibold">Tỉ Lệ Trộn Tối Ưu</p>
            <p className="text-slate-300 text-sm mt-1">Duy trì tỉ lệ trộn cotton từ 80-90% để đạt chất lượng cao nhất</p>
          </div>
          <div className="p-4 bg-blue-900/30 border-l-4 border-blue-500 rounded">
            <p className="text-white font-semibold">Kiểm Soát Nhiệt Độ</p>
            <p className="text-slate-300 text-sm mt-1">Nhiệt độ tối ưu là 64-66°C để tránh cháy hoặc làm mềm sợi cotton</p>
          </div>
          <div className="p-4 bg-blue-900/30 border-l-4 border-blue-500 rounded">
            <p className="text-white font-semibold">Tốc Độ Xoắn</p>
            <p className="text-slate-300 text-sm mt-1">Tốc độ 2400-2430 RPM cung cấp độ bền và mịn tối ưu cho sợi</p>
          </div>
        </div>
      </Card>

      {/* Batch Detail Modal */}
      {showBatchDetail && selectedBatchDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-slate-900 border border-slate-800 rounded-lg shadow-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between p-6 border-b border-slate-800">
              <h2 className="text-2xl font-bold text-white">Chi Tiết Lô Trộn {selectedBatchDetail.batchNo}</h2>
              <button
                onClick={() => setShowBatchDetail(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Batch Parameters */}
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4">Thông Số Lô Trộn</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-slate-400 text-xs">Loại Cotton</p>
                    <p className="text-white font-semibold mt-2">{selectedBatchDetail.cottonType}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs">Tỉ Lệ Trộn</p>
                    <p className="text-white font-semibold mt-2">{selectedBatchDetail.mixingRatio}%</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs">Nhiệt Độ</p>
                    <p className="text-white font-semibold mt-2">{selectedBatchDetail.temperature}°C</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs">Tốc Độ Xoắn</p>
                    <p className="text-white font-semibold mt-2">{selectedBatchDetail.spinSpeed} RPM</p>
                  </div>
                </div>
              </div>

              {/* AI Quality Prediction */}
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4">Dự Đoán Chất Lượng (AI)</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-white font-semibold">Điểm Chất Lượng Dự Đoán</span>
                      <span className={`text-lg font-bold ${getQualityColor(selectedBatchDetail.predictedQuality)}`}>
                        {selectedBatchDetail.predictedQuality.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all ${
                          selectedBatchDetail.predictedQuality >= 95 ? 'bg-green-500' :
                          selectedBatchDetail.predictedQuality >= 90 ? 'bg-blue-500' :
                          selectedBatchDetail.predictedQuality >= 80 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${selectedBatchDetail.predictedQuality}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Insights */}
              <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-400 mb-3">Phân Tích Từ AI</h3>
                <ul className="space-y-2 text-sm text-blue-100">
                  <li>✓ Tỉ lệ {selectedBatchDetail.mixingRatio}% cotton hạng A là lý tưởng cho chất lượng cao</li>
                  <li>✓ Nhiệt độ {selectedBatchDetail.temperature}°C nằm trong phạm vi tối ưu (64-66°C)</li>
                  <li>✓ Tốc độ {selectedBatchDetail.spinSpeed} RPM cung cấp độ bền tuyệt vời</li>
                  <li>✓ Dự đoán độ mịn sợi: 94.2% | Cường độ: 4.4 N/tex</li>
                </ul>
              </div>

              {/* Risk Assessment */}
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4">Đánh Giá Rủi Ro</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-slate-900 rounded">
                    <span className="text-slate-300">Rủi ro quá tải nhiệt</span>
                    <span className="text-green-400 font-semibold">Thấp</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-slate-900 rounded">
                    <span className="text-slate-300">Rủi ro không đồng đều</span>
                    <span className="text-blue-400 font-semibold">Trung Bình</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-slate-900 rounded">
                    <span className="text-slate-300">Rủi ro sợi đứt</span>
                    <span className="text-green-400 font-semibold">Rất Thấp</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4">Hành Động</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold text-sm transition-colors">
                    Xuất Chi Tiết
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
