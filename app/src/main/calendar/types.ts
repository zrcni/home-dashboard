import { CalendarEvent } from '../../types'

export interface IEventFinder {
  findByDate(date: Date): Promise<CalendarEvent[]>
}
