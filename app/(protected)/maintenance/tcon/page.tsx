'use client'

import { useFactoryData } from '@/hooks/useFactoryData'
import { Card } from '@/components/ui/card'
import StatusBadge from '@/components/StatusBadge'
import { AlertTriangle } from 'lucide-react'

export default function TconMonitorPage() {
  const { machines } = useFactoryData()

  const getTconStatus = (temp: number, humidity: number) => {
    if (temp > 48) return 'Malfunction'
    if (temp > 45 || humidity > 75) return 'Warning'
    return 'Automatic mode'
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Giám Sát T-CON</h1>
        <p className="text-slate-400 mt-2">Theo dõi nhiệt độ và độ ẩm trụ cotton</p>
      </div>

      {/* Warning Note */}
      <Card className="bg-amber-900 bg-opacity-30 border-amber-700 p-6 flex gap-4">
        <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="text-amber-300 font-semibold">Cảnh Báo Nhiệt Độ</h3>
          <p className="text-amber-200 text-sm mt-1">Nhiệt độ trụ vượt 48°C sẽ gây hư hại fiber cotton. Giới hạn cảnh báo là 45°C.</p>
        </div>
      </Card>

      {/* Machine Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {machines.map((machine) => {
          const tempSetpoint = 75 + Math.random() * 10
          const tempCurrent = tempSetpoint - 3 + Math.random() * 2
          const humiditySetpoint = 65
          const humidityCurrent = 63 + Math.random() * 4
          const status = getTconStatus(tempCurrent, humidityCurrent)

          return (
            <Card key={machine.id} className="bg-slate-800 border-slate-700 p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h4 className="text-white font-semibold text-lg">{machine.name}</h4>
                  <p className="text-slate-400 text-sm mt-1">ID: {machine.id}</p>
                </div>
                <StatusBadge status={status} size="sm" />
              </div>

              {/* Temperature */}
              <div className="mb-6 pb-6 border-b border-slate-700">
                <h5 className="text-slate-300 text-sm font-medium mb-3">Nhiệt Độ Trụ</h5>
                <div className="space-y-3">
                  {/* Setpoint */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-slate-400 text-xs">Setpoint</span>
                      <span className="text-blue-400 font-semibold text-sm">{tempSetpoint.toFixed(1)}°C</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${(tempSetpoint / 90) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Current */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-slate-400 text-xs">Hiện Tại</span>
                      <span className={`font-semibold text-sm ${
                        tempCurrent > 48 ? 'text-red-400' :
                        tempCurrent > 45 ? 'text-amber-400' :
                        'text-green-400'
                      }`}>
                        {tempCurrent.toFixed(1)}°C
                      </span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          tempCurrent > 48 ? 'bg-red-500' :
                          tempCurrent > 45 ? 'bg-amber-500' :
                          'bg-green-500'
                        }`}
                        style={{ width: `${(tempCurrent / 90) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Deviation */}
                  <div className="text-xs text-slate-500 pt-1">
                    Độ lệch: {(tempCurrent - tempSetpoint).toFixed(1)}°C
                  </div>
                </div>
              </div>

              {/* Humidity */}
              <div>
                <h5 className="text-slate-300 text-sm font-medium mb-3">Độ Ẩm Trụ</h5>
                <div className="space-y-3">
                  {/* Setpoint */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-slate-400 text-xs">Setpoint</span>
                      <span className="text-blue-400 font-semibold text-sm">{humiditySetpoint}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${humiditySetpoint}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Current */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-slate-400 text-xs">Hiện Tại</span>
                      <span className={`font-semibold text-sm ${
                        humidityCurrent > 75 ? 'text-red-400' :
                        humidityCurrent > 70 ? 'text-amber-400' :
                        'text-green-400'
                      }`}>
                        {humidityCurrent.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          humidityCurrent > 75 ? 'bg-red-500' :
                          humidityCurrent > 70 ? 'bg-amber-500' :
                          'bg-green-500'
                        }`}
                        style={{ width: `${humidityCurrent}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Deviation */}
                  <div className="text-xs text-slate-500 pt-1">
                    Độ lệch: {(humidityCurrent - humiditySetpoint).toFixed(1)}%
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="mt-6 pt-6 border-t border-slate-700">
                <p className="text-slate-300 text-xs font-medium mb-2">KHUYẾN NGHỊ</p>
                <div className="text-xs text-slate-400 space-y-1">
                  {tempCurrent > 45 && <p>• Kiểm tra hệ thống sưởi ấm</p>}
                  {humidityCurrent > 70 && <p>• Điều chỉnh độ ẩm không khí</p>}
                  {tempCurrent <= 45 && humidityCurrent <= 70 && <p>• Hoạt động bình thường</p>}
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
