'use client'

import { Machine } from '@/hooks/useFactoryData'
import { Card } from '@/components/ui/card'
import { AlertCircle, CheckCircle, Wrench, ChevronRight } from 'lucide-react'

interface Props {
  machine: Machine
  onClick?: () => void
}

export default function MachineCard({ machine, onClick }: Props) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hoạt động':
        return 'bg-green-900 text-green-200 border-green-700'
      case 'lỗi':
        return 'bg-red-900 text-red-200 border-red-700'
      case 'bảo trì':
        return 'bg-yellow-900 text-yellow-200 border-yellow-700'
      default:
        return 'bg-gray-900 text-gray-200 border-gray-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'hoạt động':
        return <CheckCircle size={16} />
      case 'lỗi':
        return <AlertCircle size={16} />
      case 'bảo trì':
        return <Wrench size={16} />
      default:
        return <AlertCircle size={16} />
    }
  }

  return (
    <Card 
      onClick={onClick}
      className="bg-slate-800 border-slate-700 p-4 cursor-pointer hover:bg-slate-750 hover:border-slate-600 transition-all duration-200 hover:shadow-lg hover:shadow-blue-900/20 group"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="font-semibold text-white text-sm">{machine.name}</p>
          <p className="text-xs text-slate-400">{machine.id}</p>
        </div>
        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold border ${getStatusColor(machine.status)}`}>
          {getStatusIcon(machine.status)}
          {machine.status}
        </span>
      </div>

      <div className="space-y-2 text-xs mb-4">
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Sản Lượng:</span>
          <span className="text-white font-semibold">{machine.productionRate.toFixed(0)} kg/h</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Lỗi:</span>
          <span className={machine.errorRate > 5 ? 'text-red-400 font-semibold' : 'text-green-400'}>
            {machine.errorRate.toFixed(2)}%
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Nhiệt độ:</span>
          <span className={machine.temperature > 70 ? 'text-red-400 font-semibold' : 'text-slate-300'}>
            {machine.temperature.toFixed(1)}°C
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-400">RPM:</span>
          <span className="text-slate-300">{machine.rpm.toFixed(0)}</span>
        </div>
      </div>

      <button className="w-full flex items-center justify-center gap-1 text-blue-400 hover:text-blue-300 text-xs font-semibold py-2 border-t border-slate-700 mt-4 group-hover:bg-slate-700/30 transition-colors">
        Chi Tiết
        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </Card>
  )
}
