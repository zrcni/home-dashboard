import { IPCCommandHandler } from '../IPCCommandHandler'
import type {
  GetCalendarEventsParams,
  GetCalendarEventsResult,
  CalendarEvent,
} from '../../types'
import { COMMANDS } from '../../commands'
import { googleCalendarEventFinder } from '../calendar/GoogleCalendarEventFinder'
import { iCalEventFinders } from '../calendar/ICalEventFinder'

export function getCalendarEvents(commandHandler: IPCCommandHandler) {
  commandHandler.addHandler<GetCalendarEventsParams, GetCalendarEventsResult>(
    COMMANDS.GET_CALENDAR_EVENTS,
    async (params) => {
      const googleEventsPromise = googleCalendarEventFinder.findByDate(
        params.date,
      )
      const iCalEventsPromises = iCalEventFinders.map((finder) =>
        finder.findByDate(params.date),
      )

      const [googleEvents, ...iCalEventsResults] = await Promise.all([
        googleEventsPromise,
        ...iCalEventsPromises,
      ])

      const allEvents = [googleEvents, ...iCalEventsResults].flat()

      const eventsByCategory: Record<string, CalendarEvent[]> = {}

      allEvents.forEach((event) => {
        if (!eventsByCategory[event.categoryId]) {
          eventsByCategory[event.categoryId] = []
        }
        eventsByCategory[event.categoryId].push(event)
      })

      return Object.keys(eventsByCategory).map((categoryId) => ({
        categoryId,
        events: eventsByCategory[categoryId],
      }))
    },
  )
}
