import { Goal } from '@/store/goalStore'
import { goalProgress } from '@/lib/utils'

interface GoalCardProps {
  goal: Goal
  isActive: boolean
  onClick: () => void
  onDelete: (e: React.MouseEvent) => void
}

export const GoalCard: React.FC<GoalCardProps> = ({
  goal,
  isActive,
  onClick,
  onDelete,
}) => {
  const progress = goalProgress(goal.tasks)

  return (
    <div
      onClick={onClick}
      className={`relative p-3 bg-white rounded-lg border-2 cursor-pointer transition-all hover:border-gray-300 ${
        isActive ? 'border-primary' : 'border-gray-200'
      }`}
    >
      <button
        onClick={onDelete}
        className="absolute top-2 right-2 text-gray-300 hover:text-red-600 hover:bg-red-50 w-5 h-5 flex items-center justify-center rounded text-sm transition-colors"
      >
        ×
      </button>

      <p className="text-sm font-medium text-gray-800 mb-2 pr-6 truncate">
        {goal.name}
      </p>

      <div className="w-full bg-gray-200 rounded-full h-1 mb-2 overflow-hidden">
        <div
          className="bg-primary h-full rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-xs text-gray-500">{progress}% selesai</p>
    </div>
  )
}
