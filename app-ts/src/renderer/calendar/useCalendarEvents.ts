import { COMMANDS } from '../../commands'
import { useState, useEffect } from 'react'
import { RendererCommand } from 'renderer/RendererCommand'
import {
  GetCalendarEventsParams,
  GetCalendarEventsResult,
  CalendarEvents,
} from '../../types'
import { logger } from 'renderer/logger'

export function useCalendarEvents(date: Date) {
  const [data, setData] = useState<CalendarEvents | null>(null)

  const ddmm = dayMonth(date)

  useEffect(() => {
    RendererCommand.run<GetCalendarEventsParams, GetCalendarEventsResult>(
      COMMANDS.GET_CALENDAR_EVENTS,
      { date }
    )
      .then((result) => setData(result))
      .catch((err) =>
        logger.error(`${COMMANDS.GET_OUTSIDE_CONDITIONS} query failed: `, err)
      )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ddmm])

  return data
}

function dayMonth(date: Date) {
  return `${date.getDate()}.${date.getMonth() + 1}`
}
