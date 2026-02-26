'use client'

import { Card } from '@/components/ui/card'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface KPICardProps {
  title: string
  value: string | number
  unit?: string
  trend?: number
  color?: 'green' | 'blue' | 'red' | 'yellow' | 'purple'
  icon?: React.ReactNode
}

const colorStyles = {
  green: {
    bg: 'bg-green-900/20',
    border: 'border-green-800',
    text: 'text-green-400',
    icon: 'text-green-500',
  },
  blue: {
    bg: 'bg-blue-900/20',
    border: 'border-blue-800',
    text: 'text-blue-400',
    icon: 'text-blue-500',
  },
  red: {
    bg: 'bg-red-900/20',
    border: 'border-red-800',
    text: 'text-red-400',
    icon: 'text-red-500',
  },
  yellow: {
    bg: 'bg-yellow-900/20',
    border: 'border-yellow-800',
    text: 'text-yellow-400',
    icon: 'text-yellow-500',
  },
  purple: {
    bg: 'bg-purple-900/20',
    border: 'border-purple-800',
    text: 'text-purple-400',
    icon: 'text-purple-500',
  },
}

export default function KPICard({
  title,
  value,
  unit,
  trend,
  color = 'blue',
  icon,
}: KPICardProps) {
  const styles = colorStyles[color]

  return (
    <Card className={`${styles.bg} border-slate-800 p-6`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-400 text-sm">{title}</p>
          <div className="flex items-baseline gap-1 mt-2">
            <p className="text-3xl font-bold text-white">{value}</p>
            {unit && <p className={`text-xs ${styles.text}`}>{unit}</p>}
          </div>
          {trend !== undefined && (
            <div className="flex items-center gap-1 mt-2">
              {trend > 0 ? (
                <TrendingUp size={16} className={styles.text} />
              ) : (
                <TrendingDown size={16} className={styles.text} />
              )}
              <span className={`text-xs ${styles.text}`}>{Math.abs(trend)}% so với hôm qua</span>
            </div>
          )}
        </div>
        {icon && <div className={styles.icon}>{icon}</div>}
      </div>
    </Card>
  )
}
