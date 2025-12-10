import { GoogleCalendarEventFinder } from './GoogleCalendarEventFinder'
import { cfg } from '../../config'
import { logger } from '../../logger'
import { IEventFinder } from '../types'
import { EmptyEventFinder } from '../EmptyEventFinder'

const isValidConfig =
  cfg.googleCalendar.clientEmail &&
  cfg.googleCalendar.privateKey &&
  cfg.googleCalendar.calendarIds.length > 0

if (!isValidConfig) {
  logger.warn('Google Calendar is not configured!')
}

export const googleCalendarEventFinder: IEventFinder = isValidConfig
  ? new GoogleCalendarEventFinder(
      cfg.googleCalendar.clientEmail,
      cfg.googleCalendar.privateKey,
      cfg.googleCalendar.calendarIds,
    )
  : new EmptyEventFinder()

export * from './GoogleCalendarEventFinder'
