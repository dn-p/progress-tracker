'use client'

import { useState } from 'react'
import { Goal } from '@/store/goalStore'
import { goalProgress, calcStreak, getDayData, getWeekData, getMonthData } from '@/lib/utils'
import { ProgressBar } from './ProgressBar'
import { ProgressChart } from './ProgressChart'
import { HeatmapChart } from './HeatmapChart'
import { StatBox } from './StatBox'

interface ProgressTabProps {
  goal: Goal
}

type ChartRange = 'week' | 'month' | 'all'

export const ProgressTab: React.FC<ProgressTabProps> = ({ goal }) => {
  const [chartRange, setChartRange] = useState<ChartRange>('week')

  const progress = goalProgress(goal.tasks)
  const streak = calcStreak(goal.history)
  const allVals = Object.values(goal.history)
  const best = allVals.length ? Math.max(...allVals) : 0
  const activeDays = allVals.filter((v) => v > 0).length
  const today = new Date().toISOString().slice(0, 10)
  const todayPct = goal.history[today] || 0

  let chartData
  if (chartRange === 'week') {
    chartData = getDayData(goal.history, 7)
  } else if (chartRange === 'month') {
    chartData = getWeekData(goal.history, 4)
  } else {
    chartData = getMonthData(goal.history, 12)
  }

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-medium text-gray-900">{goal.name}</h3>
          <div className="text-2xl font-bold text-gray-900">{progress}%</div>
        </div>

        <ProgressBar progress={progress} />

        <div className="flex mt-4">
          <StatBox number={streak} label="Streak" />
          <StatBox number={`${best}%`} label="Rekor terbaik" />
          <StatBox number={activeDays} label="Hari aktif" />
          <StatBox number={`${todayPct}%`} label="Hari ini" />
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-medium text-gray-900">Progress per periode</h4>
          <div className="flex gap-2">
            {(['week', 'month', 'all'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setChartRange(range)}
                className={`px-2 py-1 text-xs rounded-full transition-colors ${
                  chartRange === range
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {range === 'week' ? '7 Hari' : range === 'month' ? '4 Minggu' : '12 Bulan'}
              </button>
            ))}
          </div>
        </div>

        <ProgressChart
          labels={chartData.labels}
          values={chartData.vals}
          isTodays={chartData.isTodays}
        />
      </div>

      {/* Heatmap Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-4">
          Heatmap aktivitas (16 minggu terakhir)
        </h4>
        <HeatmapChart history={goal.history} />
      </div>
    </div>
  )
}
