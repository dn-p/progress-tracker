// API Types and Interfaces for potential backend integration

export interface ApiGoal {
  id: number
  name: string
  description?: string
  createdAt: string
  updatedAt: string
}

export interface ApiTask {
  id: number
  goalId: number
  text: string
  done: boolean
  createdAt: string
  completedAt?: string
}

export interface ApiProgressRecord {
  id: number
  goalId: number
  date: string
  progress: number
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface ApiError {
  code: string
  message: string
  status: number
}
