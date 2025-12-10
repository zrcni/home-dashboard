import { COMMANDS } from '../../commands'
import { useState, useEffect } from 'react'
import { IPCCommand } from 'renderer/IPCCommand'
import { GetCalendarEventsParams, GetCalendarEventsResult } from '../../types'
import { logger } from 'renderer/logger'

export function useCalendarEvents(date: Date) {
  const [data, setData] = useState<GetCalendarEventsResult | null>(null)

  const ddmm = dayMonth(date)

  useEffect(() => {
    IPCCommand.run<GetCalendarEventsParams, GetCalendarEventsResult>(
      COMMANDS.GET_CALENDAR_EVENTS,
      { date },
    )
      .then((result) => setData(result))
      .catch((err) =>
        logger.error(`${COMMANDS.GET_CALENDAR_EVENTS} query failed: `, err),
      )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ddmm])

  return data
}

function dayMonth(date: Date) {
  return `${date.getDate()}.${date.getMonth() + 1}`
}
