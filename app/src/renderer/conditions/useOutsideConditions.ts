import ms from 'ms'
import { useCallback } from 'react'
import { useInterval } from 'renderer/hooks'
import { useStore } from '../store'
import { IPCCommand } from 'renderer/IPCCommand'
import { COMMANDS } from '../../commands'
import { GetOutsideConditionsResult } from 'types'
import { useMount } from 'renderer/hooks/useMount'
import { logger } from 'renderer/logger'

export function useOutsideConditions() {
  const [conditions, setConditions] = useStore((state) => [
    state.outsideConditions,
    state.setOutsideConditions,
  ])

  const handler = useCallback(() => {
    IPCCommand.run<undefined, GetOutsideConditionsResult>(
      COMMANDS.GET_OUTSIDE_CONDITIONS,
    )
      .then((result) => setConditions(result))
      .catch((err) =>
        logger.error(`${COMMANDS.GET_OUTSIDE_CONDITIONS} query failed: `, err),
      )
  }, [setConditions])

  useInterval(handler, REFRESH_FREQ_MS)

  useMount(() => {
    handler()
  })

  return conditions
}

const REFRESH_FREQ_MS = ms('5min')
