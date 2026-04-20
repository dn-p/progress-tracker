'use client'

import { useState } from 'react'
import { Goal, useGoalStore } from '@/store/goalStore'
import { goalProgress } from '@/lib/utils'
import { ProgressBar } from './ProgressBar'
import { TaskCard } from './TaskCard'
import { StatBox } from './StatBox'

interface TasksTabProps {
  goal: Goal
}

export const TasksTab: React.FC<TasksTabProps> = ({ goal }) => {
  const [taskInput, setTaskInput] = useState('')
  const [dragSrc, setDragSrc] = useState<number | null>(null)
  const { addTask, deleteTask, toggleTask, reorderTasks, updateGoalName } =
    useGoalStore()

  const progress = goalProgress(goal.tasks)
  const perTask = goal.tasks.length > 0 ? Math.round(100 / goal.tasks.length) : 0
  const done = goal.tasks.filter((t) => t.done).length

  const handleAddTask = () => {
    if (taskInput.trim()) {
      addTask(goal.id, taskInput)
      setTaskInput('')
    }
  }

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDragSrc(index)
    e.currentTarget.classList.add('opacity-50')
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDragEnter = (e: React.DragEvent) => {
    if (dragSrc !== null) {
      e.currentTarget.classList.add('border-primary', 'border-dashed')
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('border-primary', 'border-dashed')
  }

  const handleDrop = (e: React.DragEvent, toIdx: number) => {
    e.preventDefault()
    e.currentTarget.classList.remove('border-primary', 'border-dashed')

    if (dragSrc !== null && dragSrc !== toIdx) {
      reorderTasks(goal.id, dragSrc, toIdx)
      setDragSrc(null)
    }
  }

  const handleDragEnd = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('opacity-50')
    document.querySelectorAll('.border-dashed').forEach((el) => {
      el.classList.remove('border-primary', 'border-dashed')
    })
    setDragSrc(null)
  }

  return (
    <div className="space-y-6">
      {/* Progress Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-gray-900">{goal.name}</h3>
            <button
              onClick={() => {
                const newName = prompt('Nama goal:', goal.name)
                if (newName?.trim()) {
                  updateGoalName(goal.id, newName.trim())
                }
              }}
              className="text-xs text-gray-400 hover:text-gray-600"
            >
              edit
            </button>
          </div>
          <div className="text-2xl font-bold text-gray-900">{progress}%</div>
        </div>

        <ProgressBar progress={progress} />

        <div className="flex mt-4">
          <StatBox number={`${done}/${goal.tasks.length}`} label="Tugas selesai" />
          <StatBox number={perTask} label="Nilai per tugas" />
        </div>
      </div>

      {/* Input Section */}
      <div className="flex gap-2">
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
          placeholder="Tambah tugas baru..."
          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        />
        <button
          onClick={handleAddTask}
          className="px-3 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
        >
          + Tambah
        </button>
      </div>

      {/* Tasks List */}
      <div className="space-y-2">
        {goal.tasks.length === 0 ? (
          <div className="text-center py-8 text-gray-400 border border-dashed border-gray-300 rounded-lg">
            Belum ada tugas. Tambahkan di atas!
          </div>
        ) : (
          goal.tasks.map((task, idx) => (
            <TaskCard
              key={task.id}
              task={task}
              index={idx}
              total={goal.tasks.length}
              onToggle={() => toggleTask(goal.id, task.id)}
              onDelete={() => deleteTask(goal.id, task.id)}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onDragEnd={handleDragEnd}
            />
          ))
        )}
      </div>

      {/* Celebrate Message */}
      {progress === 100 && goal.tasks.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center text-sm font-medium text-green-800">
          Selamat! Goal "{goal.name}" sudah 100% selesai!
        </div>
      )}
    </div>
  )
}
