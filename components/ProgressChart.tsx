interface ProgressChartProps {
  labels: string[]
  values: number[]
  isTodays: boolean[]
}

export const ProgressChart: React.FC<ProgressChartProps> = ({
  labels,
  values,
  isTodays,
}) => {
  const max = Math.max(...values, 1)

  return (
    <div className="flex items-flex-end gap-1 h-20">
      {labels.map((label, i) => {
        const height = Math.round((values[i] / max) * 80)
        const isToday = isTodays[i]

        return (
          <div key={i} className="flex flex-col items-center gap-1 flex-1">
            {values[i] > 0 && (
              <span className="text-xs text-gray-500">{values[i]}%</span>
            )}
            <div className="flex-1 w-full flex items-flex-end">
              <div
                className={`w-full rounded-t transition-all ${
                  isToday ? 'bg-primary' : 'bg-secondary'
                }`}
                style={{ height: `${height}px` }}
                title={`${label}: ${values[i]}%`}
              />
            </div>
            <span className="text-xs text-gray-400 text-center leading-tight max-w-full">
              {label.length > 5 ? label.slice(-5) : label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
