import got from 'got'
import { ICalEventParser } from './ICalEventParser'
import { IEventFinder } from '../types'
import { CalendarEvent } from '../../../types'

export class ICalEventFinder implements IEventFinder {
  private url: string
  private categoryId: string

  constructor(url: string, categoryId: string) {
    this.url = url
    this.categoryId = categoryId
  }

  async findByDate(date: Date): Promise<CalendarEvent[]> {
    try {
      const text = await this.getText(this.url)
      const parser = new ICalEventParser(text, this.categoryId)
      return parser.getEventsByDayOfMonth(date)
    } catch (error) {
      console.error(`Error fetching iCal events from ${this.url}:`, error)
      return []
    }
  }

  private async getText(url: string) {
    const res = await got.get(url, { responseType: 'text' })
    return res.body
  }
}
