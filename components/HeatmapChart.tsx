import { addDays } from '@/lib/utils'

interface HeatmapChartProps {
  history: Record<string, number>
}

export const HeatmapChart: React.FC<HeatmapChartProps> = ({ history }) => {
  const today = new Date().toISOString().slice(0, 10)
  const cols = 16
  const rows = 7

  const getColor = (value: number): string => {
    if (value === 0) return 'bg-gray-100'
    if (value < 10) return 'bg-secondary'
    if (value < 25) return 'bg-accent'
    if (value < 50) return 'bg-primary'
    return 'bg-green-700'
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-1 pb-2">
        {Array.from({ length: cols }).map((_, c) => (
          <div key={c} className="flex flex-col gap-1">
            {Array.from({ length: rows }).map((_, r) => {
              const d = addDays(today, -(c * 7 + r))
              const v = history[d] || 0

              return (
                <div
                  key={`${c}-${r}`}
                  className={`w-3 h-3 rounded ${getColor(v)}`}
                  title={`${d}: ${v}%`}
                />
              )
            })}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 text-xs text-gray-500 mt-4">
        <span>Kurang</span>
        <div className="w-3 h-3 bg-gray-100 rounded" />
        <div className="w-3 h-3 bg-secondary rounded" />
        <div className="w-3 h-3 bg-accent rounded" />
        <div className="w-3 h-3 bg-primary rounded" />
        <div className="w-3 h-3 bg-green-700 rounded" />
        <span>Banyak</span>
      </div>
    </div>
  )
}
