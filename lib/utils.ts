export const dateStr = (d: Date): string => d.toISOString().slice(0, 10)

export const addDays = (str: string, n: number): string => {
  const d = new Date(str)
  d.setDate(d.getDate() + n)
  return dateStr(d)
}

export const weekStart = (str: string): string => {
  const d = new Date(str)
  d.setDate(d.getDate() - d.getDay())
  return dateStr(d)
}

export const goalProgress = (tasks: any[]): number => {
  if (!tasks.length) return 0
  const done = tasks.filter((t) => t.done).length
  return Math.round((done / tasks.length) * 100)
}

export const calcStreak = (history: Record<string, number>): number => {
  const today = dateStr(new Date())
  let streak = 0
  let d = today

  while (true) {
    if ((history[d] || 0) > 0) {
      streak++
      d = addDays(d, -1)
    } else {
      break
    }
    if (streak > 365) break
  }

  return streak
}

export const getDayData = (history: Record<string, number>, n: number) => {
  const today = dateStr(new Date())
  const labels: string[] = []
  const vals: number[] = []
  const isTodays: boolean[] = []

  for (let i = n - 1; i >= 0; i--) {
    const d = addDays(today, -i)
    labels.push(d.slice(5))
    vals.push(history[d] || 0)
    isTodays.push(d === today)
  }

  return { labels, vals, isTodays }
}

export const getWeekData = (history: Record<string, number>, n: number) => {
  const today = dateStr(new Date())
  const todayWS = weekStart(today)
  const labels: string[] = []
  const vals: number[] = []
  const isTodays: boolean[] = []

  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(todayWS)
    d.setDate(d.getDate() - i * 7)
    const ws = dateStr(d)
    const we = addDays(ws, 6)

    let sum = 0
    let cnt = 0
    let cur = ws

    while (cur <= we) {
      if (history[cur]) {
        sum += history[cur]
        cnt++
      }
      cur = addDays(cur, 1)
    }

    const avg = cnt > 0 ? Math.round(sum / cnt) : 0
    const label = ws === todayWS ? 'Minggu ini' : ws.slice(5)
    labels.push(label)
    vals.push(avg)
    isTodays.push(ws === todayWS)
  }

  return { labels, vals, isTodays }
}

export const getMonthData = (history: Record<string, number>, n: number) => {
  const today = new Date(dateStr(new Date()))
  const labels: string[] = []
  const vals: number[] = []
  const isTodays: boolean[] = []

  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(today.getFullYear(), today.getMonth() - i, 1)
    const ms = dateStr(d)
    const me = new Date(d.getFullYear(), d.getMonth() + 1, 0)
    const msLabel = ms.slice(0, 7)

    let sum = 0
    let cnt = 0
    let cur = ms

    while (cur <= dateStr(me)) {
      if (history[cur]) {
        sum += history[cur]
        cnt++
      }
      cur = addDays(cur, 1)
    }

    const avg = cnt > 0 ? Math.round(sum / cnt) : 0
    labels.push(i === 0 ? 'Bulan ini' : msLabel)
    vals.push(avg)
    isTodays.push(i === 0)
  }

  return { labels, vals, isTodays }
}
