import { IEventFinder } from './types'
import { CalendarEvent } from '../../types'

export class EmptyEventFinder implements IEventFinder {
  async findByDate(_date: Date): Promise<CalendarEvent[]> {
    return []
  }
}
