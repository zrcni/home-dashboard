import { COMMANDS } from '../../commands'
import { useEffect } from 'react'
import { RendererCommand } from 'renderer/RendererCommand'
import { useStore } from 'renderer/store'
import { GetConditionsMetricsParams, GetConditionsMetricsResult } from 'types'
import { logger } from 'renderer/logger'

export function useInsideConditionsMetrics(dateRange: [Date, Date]) {
  const setMetrics = useStore((state) => state.setInsideConditionsMetrics)

  useEffect(() => {
    RendererCommand.run<GetConditionsMetricsParams, GetConditionsMetricsResult>(
      COMMANDS.GET_CONDITIONS_METRICS,
      {
        location: 'livingroom',
        dateRange,
      }
    )
      .then((result) => setMetrics(result))
      .catch((err) =>
        logger.error(`${COMMANDS.GET_CONDITIONS_METRICS} query failed: `, err)
      )
  }, [dateRange[0], dateRange[1]])
}
