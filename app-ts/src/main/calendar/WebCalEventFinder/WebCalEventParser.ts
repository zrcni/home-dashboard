import ical, { ParamList } from '../../../lib/ical'
import { isSameDay } from 'date-fns'

export class WebCalEventParser {
  private data: string

  constructor(data: string) {
    this.data = data
  }

  getEventsByDayOfMonth(date: Date) {
    const calendar = ical.parseICS(this.data)

    return Object.values(calendar)
      .filter((obj) => obj.type === CALENDAR_COMPONENT_TYPE_VEVENT)
      .filter((event) => isSameDay(new Date(event.start!), date))
      .map((event) => (event.summary as ParamList).val)
  }
}

const CALENDAR_COMPONENT_TYPE_VEVENT = 'VEVENT' as const
