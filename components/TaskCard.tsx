import { Task } from '@/store/goalStore'

interface TaskCardProps {
  task: Task
  index: number
  total: number
  onToggle: () => void
  onDelete: () => void
  onDragStart: (e: React.DragEvent, index: number) => void
  onDragOver: (e: React.DragEvent) => void
  onDragEnter: (e: React.DragEvent) => void
  onDragLeave: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent, index: number) => void
  onDragEnd: (e: React.DragEvent) => void
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  index,
  total,
  onToggle,
  onDelete,
  onDragStart,
  onDragOver,
  onDragEnter,
  onDragLeave,
  onDrop,
  onDragEnd,
}) => {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={(e) => onDrop(e, index)}
      onDragEnd={onDragEnd}
      className={`flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-all cursor-grab active:cursor-grabbing ${
        task.done ? 'opacity-50' : ''
      }`}
    >
      <div className="text-gray-400 text-sm">⠿</div>

      <button
        onClick={onToggle}
        className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
          task.done
            ? 'bg-primary border-primary'
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        {task.done && (
          <svg
            className="w-3 h-3 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </button>

      <span
        className={`flex-1 text-sm ${
          task.done ? 'line-through text-gray-400' : 'text-gray-800'
        }`}
      >
        {task.text}
      </span>

      <span className="text-xs text-gray-500 flex-shrink-0 min-w-12 text-right">
        {index + 1}/{total}
      </span>

      <button
        onClick={onDelete}
        className="text-gray-300 hover:text-red-600 hover:bg-red-50 p-1 rounded transition-colors flex-shrink-0"
      >
        ×
      </button>
    </div>
  )
}
