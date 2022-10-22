import { useInsideConditionsMetrics } from 'renderer/metrics/useInsideConditionsMetrics'
import { useStore } from 'renderer/store'
import { MetricsView } from './MetricsView'

export const MetricsViewController: React.FC = () => {
  const insideConditionsMetrics = useStore(
    (state) => state.insideConditionsMetrics
  )
  useInsideConditionsMetrics()

  return <MetricsView insideConditionsMetrics={insideConditionsMetrics} />
}
