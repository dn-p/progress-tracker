'use client'

import { useState, useEffect } from 'react'
import { useGoalStore } from '@/store/goalStore'
import { GoalCard } from './GoalCard'
import { TasksTab } from './TasksTab'
import { ProgressTab } from './ProgressTab'

export const LearningGoalsApp: React.FC = () => {
  const [mounted, setMounted] = useState(false)
  const [goalInput, setGoalInput] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [currentTab, setCurrentTab] = useState<'tasks' | 'progress'>('tasks')

  const {
    goals,
    activeGoalId,
    switchGoal,
    deleteGoal,
    addGoal,
  } = useGoalStore()

  const activeGoal = goals.find((g) => g.id === activeGoalId)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const handleCreateGoal = () => {
    if (goalInput.trim()) {
      addGoal(goalInput)
      setGoalInput('')
      setShowModal(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Learning Goals</h1>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
          >
            + Goal baru
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Goals Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mb-6">
          {goals.length === 0 ? (
            <p className="text-sm text-gray-500 col-span-full">
              Belum ada goal. Klik "+ Goal baru" untuk memulai.
            </p>
          ) : (
            goals.map((goal) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                isActive={activeGoalId === goal.id}
                onClick={() => switchGoal(goal.id)}
                onDelete={(e) => {
                  e.stopPropagation()
                  if (confirm('Hapus goal ini?')) {
                    deleteGoal(goal.id)
                  }
                }}
              />
            ))
          )}
        </div>

        {activeGoal && (
          <>
            {/* Divider */}
            <hr className="my-6 border-gray-200" />

            {/* Tabs */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setCurrentTab('tasks')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  currentTab === 'tasks'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Tugas
              </button>
              <button
                onClick={() => setCurrentTab('progress')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  currentTab === 'progress'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Progress
              </button>
            </div>

            {/* Tab Content */}
            {currentTab === 'tasks' ? (
              <TasksTab goal={activeGoal} />
            ) : (
              <ProgressTab goal={activeGoal} />
            )}
          </>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Tambah Goal Baru</h2>
            <input
              type="text"
              value={goalInput}
              onChange={(e) => setGoalInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreateGoal()}
              placeholder="Misal: Belajar After Effects..."
              autoFocus
              className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleCreateGoal}
                className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Buat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
