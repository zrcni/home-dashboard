import { endOfMinute, subDays } from 'date-fns'
import { useMemo } from 'react'
import { useInsideConditionsMetrics } from 'renderer/metrics/useInsideConditionsMetrics'
import { useStore } from 'renderer/store'
import { MetricsView } from './MetricsView'

export const MetricsViewController: React.FC = () => {
  const date = useStore((state) => state.date)
  const insideConditionsMetrics = useStore(
    (state) => state.insideConditionsMetrics,
  )
  const endDate = endOfMinute(date)
  const endDateNum = endDate.valueOf()

  const dateRange = useMemo(
    () => [subDays(endDate, 1), endDate] as [Date, Date],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [endDateNum],
  )

  useInsideConditionsMetrics(dateRange)

  return (
    <MetricsView
      insideConditionsMetrics={insideConditionsMetrics}
      dateRange={dateRange}
    />
  )
}
