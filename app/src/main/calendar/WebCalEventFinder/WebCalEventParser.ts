import ics, { ParamList, CalendarComponent } from '../../../lib/ical'
import {
  isBefore,
  isEqual,
  isAfter,
  startOfDay,
  endOfDay,
  subDays,
} from 'date-fns'

export class WebCalEventParser {
  private data: string

  constructor(data: string) {
    this.data = data
  }

  getEventsByDayOfMonth(date: Date) {
    const calendar = ics.parseICS(this.data)

    return Object.values(calendar)
      .filter((obj) => obj.type === CALENDAR_COMPONENT_TYPE_VEVENT)
      .filter((event) => isEventDuring(event, date))
      .map((event) => (event.summary as ParamList).val)
  }
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
