import { COMMANDS } from '../../commands'
import { useEffect } from 'react'
import { RendererCommand } from 'renderer/RendererCommand'
import { useStore } from 'renderer/store'
import {
  GetConditionsError,
  GetConditionsParams,
  GetConditionsSucceededPayload,
} from 'types'

export function useInsideConditionsMetrics(dateRange: [Date, Date]) {
  const setMetrics = useStore((state) => state.setInsideConditionsMetrics)

  useEffect(() => {
    RendererCommand.run<
      GetConditionsParams,
      GetConditionsSucceededPayload,
      GetConditionsError
    >(COMMANDS.GET_CONDITIONS_METRICS, {
      location: 'livingroom',
      dateRange,
    })
      .then((payload) => setMetrics(payload))
      .catch((err: GetConditionsError) => console.error('failed: ', err))
  }, [dateRange[0], dateRange[1]])
}
