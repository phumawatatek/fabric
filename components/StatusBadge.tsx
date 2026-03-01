'use client'

interface StatusBadgeProps {
  status: string
  size?: 'sm' | 'md' | 'lg'
}

const statusConfig: {
  [key: string]: { bg: string; text: string; border: string }
} = {
  // 10 Machine Statuses
  'Malfunction': { bg: 'bg-red-900', text: 'text-red-200', border: 'border-red-700' },
  'Warning': { bg: 'bg-amber-900', text: 'text-amber-200', border: 'border-amber-700' },
  'No entry': { bg: 'bg-gray-700', text: 'text-gray-200', border: 'border-gray-600' },
  'Information': { bg: 'bg-blue-900', text: 'text-blue-200', border: 'border-blue-700' },
  'Set value': { bg: 'bg-purple-900', text: 'text-purple-200', border: 'border-purple-700' },
  'Automatic mode': { bg: 'bg-green-900', text: 'text-green-200', border: 'border-green-700' },
  'Service mode': { bg: 'bg-teal-900', text: 'text-teal-200', border: 'border-teal-700' },
  'Shift change': { bg: 'bg-orange-900', text: 'text-orange-200', border: 'border-orange-700' },
  'Manual stop': { bg: 'bg-slate-800', text: 'text-slate-100', border: 'border-slate-600' },
  'Maintenance': { bg: 'bg-cyan-900', text: 'text-cyan-200', border: 'border-cyan-700' },
  
  // Legacy statuses for backward compatibility
  'hoạt động': { bg: 'bg-green-900', text: 'text-green-200', border: 'border-green-700' },
  'lỗi': { bg: 'bg-red-900', text: 'text-red-200', border: 'border-red-700' },
  'bảo trì': { bg: 'bg-yellow-900', text: 'text-yellow-200', border: 'border-yellow-700' },
  'dừng': { bg: 'bg-gray-900', text: 'text-gray-200', border: 'border-gray-700' },
  'hoàn thành': { bg: 'bg-green-900', text: 'text-green-200', border: 'border-green-700' },
  'đang thực hiện': { bg: 'bg-blue-900', text: 'text-blue-200', border: 'border-blue-700' },
  'chờ': { bg: 'bg-yellow-900', text: 'text-yellow-200', border: 'border-yellow-700' },
  'chưa thực hiện': { bg: 'bg-gray-900', text: 'text-gray-200', border: 'border-gray-700' },
  'chưa bắt đầu': { bg: 'bg-gray-900', text: 'text-gray-200', border: 'border-gray-700' },
  'đang xử lý': { bg: 'bg-blue-900', text: 'text-blue-200', border: 'border-blue-700' },
}

export default function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig['dừng']
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  }

  return (
    <span
      className={`inline-flex items-center rounded border font-semibold ${config.bg} ${config.text} ${config.border} ${sizeClasses[size]}`}
    >
      {status}
    </span>
  )
}
