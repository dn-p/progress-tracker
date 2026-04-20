import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Task {
  id: number
  text: string
  done: boolean
}

export interface Goal {
  id: number
  name: string
  tasks: Task[]
  history: Record<string, number>
}

interface GoalStore {
  goals: Goal[]
  activeGoalId: number | null
  nextGId: number
  nextTId: number

  // Goal actions
  addGoal: (name: string) => void
  deleteGoal: (id: number) => void
  switchGoal: (id: number) => void
  updateGoalName: (id: number, name: string) => void
  getActiveGoal: () => Goal | undefined

  // Task actions
  addTask: (goalId: number, text: string) => void
  deleteTask: (goalId: number, taskId: number) => void
  toggleTask: (goalId: number, taskId: number) => void
  reorderTasks: (goalId: number, fromIdx: number, toIdx: number) => void

  // History actions
  recordProgress: (goalId: number, progress: number) => void
}

const today = new Date().toISOString().slice(0, 10)

export const useGoalStore = create<GoalStore>()(
  persist(
    (set, get) => ({
      goals: [
        {
          id: 1,
          name: 'Belajar React',
          history: { [today]: 0 },
          tasks: [
            { id: 1, text: 'Pahami JSX & komponen', done: false },
            { id: 2, text: 'useState & useEffect', done: false },
            { id: 3, text: 'Props & event handling', done: false },
            { id: 4, text: 'Buat project pertama', done: false },
            { id: 5, text: 'React Router', done: false },
            { id: 6, text: 'Deploy ke Vercel', done: false },
          ],
        },
      ],
      activeGoalId: 1,
      nextGId: 2,
      nextTId: 7,

      addGoal: (name) =>
        set((state) => ({
          goals: [
            ...state.goals,
            {
              id: state.nextGId,
              name,
              tasks: [],
              history: { [today]: 0 },
            },
          ],
          activeGoalId: state.nextGId,
          nextGId: state.nextGId + 1,
        })),

      deleteGoal: (id) =>
        set((state) => {
          const newGoals = state.goals.filter((g) => g.id !== id)
          return {
            goals: newGoals,
            activeGoalId:
              state.activeGoalId === id
                ? newGoals[0]?.id || null
                : state.activeGoalId,
          }
        }),

      switchGoal: (id) => set({ activeGoalId: id }),

      updateGoalName: (id, name) =>
        set((state) => ({
          goals: state.goals.map((g) =>
            g.id === id ? { ...g, name } : g
          ),
        })),

      getActiveGoal: () => {
        const state = get()
        return state.goals.find((g) => g.id === state.activeGoalId)
      },

      addTask: (goalId, text) =>
        set((state) => ({
          goals: state.goals.map((g) =>
            g.id === goalId
              ? {
                  ...g,
                  tasks: [...g.tasks, { id: state.nextTId, text, done: false }],
                }
              : g
          ),
          nextTId: state.nextTId + 1,
        })),

      deleteTask: (goalId, taskId) =>
        set((state) => ({
          goals: state.goals.map((g) =>
            g.id === goalId
              ? { ...g, tasks: g.tasks.filter((t) => t.id !== taskId) }
              : g
          ),
        })),

      toggleTask: (goalId, taskId) =>
        set((state) => {
          const updatedGoals = state.goals.map((g) => {
            if (g.id === goalId) {
              const tasks = g.tasks.map((t) =>
                t.id === taskId ? { ...t, done: !t.done } : t
              )
              const progress = Math.round(
                (tasks.filter((t) => t.done).length / tasks.length) * 100
              )
              return {
                ...g,
                tasks,
                history: { ...g.history, [today]: progress },
              }
            }
            return g
          })
          return { goals: updatedGoals }
        }),

      reorderTasks: (goalId, fromIdx, toIdx) =>
        set((state) => ({
          goals: state.goals.map((g) => {
            if (g.id === goalId) {
              const tasks = [...g.tasks]
              const [moved] = tasks.splice(fromIdx, 1)
              tasks.splice(toIdx, 0, moved)
              return { ...g, tasks }
            }
            return g
          }),
        })),

      recordProgress: (goalId, progress) =>
        set((state) => ({
          goals: state.goals.map((g) =>
            g.id === goalId
              ? { ...g, history: { ...g.history, [today]: progress } }
              : g
          ),
        })),
    }),
    {
      name: 'goal-store',
    }
  )
)
