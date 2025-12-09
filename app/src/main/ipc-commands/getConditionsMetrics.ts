import { Metrics } from '../metrics'
import { IPCCommandHandler } from '../IPCCommandHandler'
import { COMMANDS } from '../../commands'
import type {
  GetConditionsMetricsParams,
  GetConditionsMetricsResult,
} from '../../types'

export function getConditionsMetrics(
  commandHandler: IPCCommandHandler,
  metrics: Metrics,
) {
  commandHandler.addHandler<
    GetConditionsMetricsParams,
    GetConditionsMetricsResult
  >(COMMANDS.GET_CONDITIONS_METRICS, (params) =>
    metrics.conditions.getByLocation(params.location, params.dateRange),
  )
}
