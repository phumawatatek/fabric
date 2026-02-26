'use client'

import { useFactoryData } from '@/hooks/useFactoryData'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { CheckCircle, Clock, AlertCircle } from 'lucide-react'

export default function MaintenanceView() {
  const { maintenanceData, setMaintenanceData, machines } = useFactoryData()
  const [showReportForm, setShowReportForm] = useState(false)
  const [selectedMaintenance, setSelectedMaintenance] = useState<string | null>(null)
  const [reportNotes, setReportNotes] = useState('')

  const completedCount = maintenanceData.filter(m => m.status === 'hoàn thành').length
  const inProgressCount = maintenanceData.filter(m => m.status === 'đang thực hiện').length
  const pendingCount = maintenanceData.filter(m => m.status === 'chưa thực hiện').length

  const handleStartMaintenance = (mntId: string) => {
    setMaintenanceData(prev => prev.map(mnt =>
      mnt.id === mntId ? { ...mnt, status: 'đang thực hiện' } : mnt
    ))
  }

  const handleCompleteMaintenance = (mntId: string) => {
    setSelectedMaintenance(mntId)
    setShowReportForm(true)
  }

  const handleViewDetail = (mntId: string) => {
    const maintenance = maintenanceData.find(m => m.id === mntId)
    if (maintenance) {
      const machine = machines.find(m => m.id === maintenance.machineId)
      alert(`Chi tiết bảo trì:\nMáy: ${machine?.name}\nLoại: ${maintenance.type}\nTrạng thái: ${maintenance.status}\nNgày: ${maintenance.scheduledDate}`)
    }
  }

  const handleSubmitReport = () => {
    if (selectedMaintenance) {
      setMaintenanceData(prev => prev.map(mnt =>
        mnt.id === selectedMaintenance
          ? { ...mnt, status: 'hoàn thành', notes: reportNotes }
          : mnt
      ))
      setShowReportForm(false)
      setReportNotes('')
      setSelectedMaintenance(null)
      alert('Báo cáo bảo trì đã được gửi')
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'hoàn thành':
        return <CheckCircle className="text-green-400" size={20} />
      case 'đang thực hiện':
        return <Clock className="text-blue-400" size={20} />
      default:
        return <AlertCircle className="text-yellow-400" size={20} />
    }
  }

  return (
    <div className="space-y-8">
      {/* Maintenance Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-slate-900 border-slate-800 p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-slate-400 text-sm">Hoàn Thành</p>
              <p className="text-3xl font-bold text-green-400 mt-2">{completedCount}</p>
            </div>
            <CheckCircle className="text-green-500" size={24} />
          </div>
        </Card>

        <Card className="bg-slate-900 border-slate-800 p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-slate-400 text-sm">Đang Thực Hiện</p>
              <p className="text-3xl font-bold text-blue-400 mt-2">{inProgressCount}</p>
            </div>
            <Clock className="text-blue-500" size={24} />
          </div>
        </Card>

        <Card className="bg-slate-900 border-slate-800 p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-slate-400 text-sm">Chờ Thực Hiện</p>
              <p className="text-3xl font-bold text-yellow-400 mt-2">{pendingCount}</p>
            </div>
            <AlertCircle className="text-yellow-500" size={24} />
          </div>
        </Card>
      </div>

      {/* Maintenance Schedule */}
      <Card className="bg-slate-900 border-slate-800 p-6">
        <h3 className="text-xl font-bold text-white mb-4">Lịch Bảo Trì Máy Móc</h3>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {maintenanceData.map(mnt => {
            const machine = machines.find(m => m.id === mnt.machineId)
            return (
              <div key={mnt.id} className="bg-slate-800 rounded-lg p-4 border-l-4 border-blue-500">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3 flex-1">
                    {getStatusIcon(mnt.status)}
                    <div className="flex-1">
                      <p className="font-semibold text-white">{machine?.name} - {mnt.type}</p>
                      <p className="text-xs text-slate-400 mt-1">{mnt.notes}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-semibold whitespace-nowrap ml-2 ${
                    mnt.status === 'hoàn thành' ? 'bg-green-900 text-green-200' :
                    mnt.status === 'đang thực hiện' ? 'bg-blue-900 text-blue-200' :
                    'bg-yellow-900 text-yellow-200'
                  }`}>
                    {mnt.status}
                  </span>
                </div>
                <div className="flex items-center justify-between ml-8">
                  <p className="text-sm text-slate-400">Ngày dự kiến: {mnt.scheduledDate}</p>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleViewDetail(mnt.id)}
                      className="bg-slate-700 hover:bg-slate-600 text-white text-xs h-7"
                    >
                      Chi Tiết
                    </Button>
                    {mnt.status === 'chưa thực hiện' && (
                      <Button
                        onClick={() => handleStartMaintenance(mnt.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-7"
                      >
                        Bắt Đầu
                      </Button>
                    )}
                    {mnt.status === 'đang thực hiện' && (
                      <Button
                        onClick={() => handleCompleteMaintenance(mnt.id)}
                        className="bg-green-600 hover:bg-green-700 text-white text-xs h-7"
                      >
                        Hoàn Thành
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Maintenance Report Form Modal */}
      {showReportForm && (
        <Card className="bg-slate-900 border-blue-600 p-6 border-2">
          <h3 className="text-xl font-bold text-white mb-4">Báo Cáo Bảo Trì</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-2">Ghi Chú Kỹ Thuật</label>
              <textarea
                value={reportNotes}
                onChange={(e) => setReportNotes(e.target.value)}
                placeholder="Mô tả công việc bảo trì đã thực hiện, các vật liệu sử dụng, vấn đề phát hiện..."
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-white text-sm"
                rows={6}
              />
            </div>
            <div className="bg-slate-800 p-4 rounded border border-slate-700">
              <p className="text-xs text-slate-400 mb-2">Danh sách kiểm tra bảo trì tiêu chuẩn:</p>
              <ul className="space-y-1 text-xs text-slate-300">
                <li>☑ Kiểm tra các chi tiết hỏng</li>
                <li>☑ Thay dầu và tẩu rửa</li>
                <li>☑ Kiểm tra belt và vòng đai</li>
                <li>☑ Vệ sinh và bôi trơn</li>
                <li>☑ Kiểm tra điều khiển và cảm biến</li>
              </ul>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleSubmitReport}
                className="bg-green-600 hover:bg-green-700 text-white flex-1"
              >
                Gửi Báo Cáo
              </Button>
              <Button
                onClick={() => {
                  setShowReportForm(false)
                  setReportNotes('')
                  setSelectedMaintenance(null)
                }}
                className="bg-slate-700 hover:bg-slate-600 text-white flex-1"
              >
                Hủy
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Mobile App Simulation */}
      <Card className="bg-slate-900 border-slate-800 p-6">
        <h3 className="text-xl font-bold text-white mb-4">Ứng Dụng Di Động Bảo Trì</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-blue-900 to-slate-800 rounded-lg p-6 border border-blue-700">
            <p className="text-white font-semibold mb-4">Báo Cáo Bảo Trì Nhanh</p>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Mã máy (ví dụ: M1)"
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white text-sm"
              />
              <select className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white text-sm">
                <option>Chọn loại bảo trì</option>
                <option>Bảo trì định kỳ</option>
                <option>Sửa chữa</option>
                <option>Thay thế chi tiết</option>
              </select>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Gửi Báo Cáo Nhanh
              </Button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-900 to-slate-800 rounded-lg p-6 border border-green-700">
            <p className="text-white font-semibold mb-4">Lịch Sử Bảo Trì</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-slate-300">M1 - 2024-02-15</span>
                <span className="text-green-400">✓</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300">M3 - 2024-01-20</span>
                <span className="text-green-400">✓</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300">M5 - 2024-02-22</span>
                <span className="text-blue-400">đang xử lý</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Maintenance Tips */}
      <Card className="bg-slate-900 border-slate-800 p-6">
        <h3 className="text-xl font-bold text-white mb-4">Mẹo Bảo Trì</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-800 rounded border-l-4 border-blue-500">
            <p className="text-white font-semibold text-sm">Bảo Trì Định Kỳ</p>
            <p className="text-slate-400 text-xs mt-2">Thực hiện kiểm tra hàng tuần để phát hiện sớm các sự cố</p>
          </div>
          <div className="p-4 bg-slate-800 rounded border-l-4 border-green-500">
            <p className="text-white font-semibold text-sm">Ghi Chép Chi Tiết</p>
            <p className="text-slate-400 text-xs mt-2">Lưu lại tất cả các công việc bảo trì để theo dõi lịch sử máy</p>
          </div>
          <div className="p-4 bg-slate-800 rounded border-l-4 border-yellow-500">
            <p className="text-white font-semibold text-sm">Sử Dụng Vật Liệu Chính Hãng</p>
            <p className="text-slate-400 text-xs mt-2">Luôn sử dụng dầu, bearing và chi tiết chính hãng</p>
          </div>
          <div className="p-4 bg-slate-800 rounded border-l-4 border-red-500">
            <p className="text-white font-semibold text-sm">An Toàn Trước Tiên</p>
            <p className="text-slate-400 text-xs mt-2">Tắt máy hoàn toàn trước khi thực hiện bảo trì</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
