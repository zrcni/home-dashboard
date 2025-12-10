import got from 'got'
import { WebCalEventParser } from './WebCalEventParser'
import { IEventFinder } from '../types'
import { CalendarEvent } from '../../../types'

export class WebCalEventFinder implements IEventFinder {
  private url: string

  constructor(calendarId: string | number) {
    const url = new URL(BASE_URL)
    url.searchParams.append('calendar_instance_id', calendarId.toString())
    this.url = url.toString()
  }

  async findByDate(date: Date): Promise<CalendarEvent[]> {
    const text = await this.getText(this.url)
    const parser = new WebCalEventParser(text)
    return parser.getEventsByDayOfMonth(date)
  }

  private async getText(url: string) {
    const res = await got.get(url, { responseType: 'text' })
    return res.body
  }
}

const BASE_URL = 'https://www.webcal.guru/fi-FI/lataa_kalenteri'
