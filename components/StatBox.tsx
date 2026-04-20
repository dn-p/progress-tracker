interface StatBoxProps {
  number: string | number
  label: string
}

export const StatBox: React.FC<StatBoxProps> = ({ number, label }) => {
  return (
    <div className="flex-1 text-center py-2 px-1 border-r border-gray-200 last:border-r-0">
      <div className="text-lg font-semibold text-gray-900">{number}</div>
      <div className="text-xs text-gray-500 mt-1">{label}</div>
    </div>
  )
}
