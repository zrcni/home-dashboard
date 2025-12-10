import ics, { ParamList, CalendarComponent } from '../../../lib/ical'
import { CalendarEvent } from '../../../types'
import {
  isBefore,
  isEqual,
  isAfter,
  startOfDay,
  endOfDay,
  subDays,
} from 'date-fns'

export class ICalEventParser {
  private data: string
  private categoryId: string

  constructor(data: string, categoryId: string) {
    this.data = data
    this.categoryId = categoryId
  }

  getEventsByDayOfMonth(date: Date): CalendarEvent[] {
    const calendar = ics.parseICS(this.data)

    return Object.values(calendar)
      .filter((obj) => obj.type === CALENDAR_COMPONENT_TYPE_VEVENT)
      .filter((event) => isEventDuring(event, date))
      .map((event) => ({
        text: cleanSummary(getSummary(event.summary)),
        startDate: new Date(event.start!),
        endDate: subDays(new Date(event.end!), 1),
        categoryId: this.categoryId,
        isAllDay: isAllDay(event),
      }))
  }
}

function isAllDay(event: CalendarComponent) {
  const start = event.start as any
  return start && start.dateOnly
}

function getSummary(summary: string | ParamList | undefined): string {
  if (!summary) {
    return ''
  }
  if (typeof summary === 'string') {
    return summary
  }
  return summary.val || ''
}

function cleanSummary(summary: string) {
  /**
   * Remove common emojis from text
   */
  const emojiRegex =
    /^(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])\s+/
  return summary.replace(emojiRegex, '')
}

const CALENDAR_COMPONENT_TYPE_VEVENT = 'VEVENT' as const

/**
 * One day event's start and end dates seems to
 * be the day of and the next day respectively.
 *
 * Using startOfDay and endOfDay might
 * not be necessary, but lets be sure.
 */
function isEventDuring(event: CalendarComponent, date: Date) {
  if (event.rrule) {
    const start = startOfDay(date)
    const end = endOfDay(date)
    const occurrences = event.rrule.between(start, end, true)
    return occurrences.length > 0
  }

  const start = startOfDay(new Date(event.start!))
  // end date seems to be the next day after the event, so one day needs to be subtracted.
  const end = endOfDay(subDays(new Date(event.end!), 1))
  return (
    isEqual(date, start) || isEqual(date, end) || isBetween(start, end, date)
  )
}

function isBetween(start: Date, end: Date, date: Date) {
  return isAfter(date, start) && isBefore(date, end)
}
