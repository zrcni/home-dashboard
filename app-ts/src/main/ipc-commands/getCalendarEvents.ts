import { IPCCommandHandler } from '../IPCCommandHandler'
import type {
  GetCalendarEventsParams,
  GetCalendarEventsResult,
} from '../../types'
import { COMMANDS } from '../../commands'
import type { WebCalEventFinders } from '../calendar/WebCalEventFinder'

export function getCalendarEvents(
  commandHandler: IPCCommandHandler,
  webCalEventFinders: WebCalEventFinders
) {
  commandHandler.addHandler<GetCalendarEventsParams, GetCalendarEventsResult>(
    COMMANDS.GET_CALENDAR_EVENTS,
    async (params) => {
      const [holiday, goodToKnow, nameday, theme] = await Promise.all([
        webCalEventFinders.holiday.findByDate(params.date),
        webCalEventFinders.goodToKnow.findByDate(params.date),
        webCalEventFinders.nameday.findByDate(params.date),
        webCalEventFinders.theme.findByDate(params.date),
      ])

      return {
        holiday,
        goodToKnow,
        nameday,
        theme,
      }
    }
  )
}
