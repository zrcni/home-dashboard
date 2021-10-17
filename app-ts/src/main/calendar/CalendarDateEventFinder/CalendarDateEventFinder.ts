import got from 'got'
import { startOfMonth } from 'date-fns'
import { CalendarHTMLParser } from './CalendarHTMLParser'

export class CalendarDateEventFinder {
  private static baseUrl = 'https://www.paivyri.fi/index.php'

  static async findByDate(date: Date) {
    const url = this.makeRequestURL(CalendarDateEventFinder.baseUrl, date)
    const html = await this.getHTML(url)
    const dayOfMonth = date.getDate()
    const parser = new CalendarHTMLParser(html)
    return parser.getEventsByDayOfMonth(dayOfMonth)
  }

  private static async getHTML(url: string) {
    const res = await got.get(url, { responseType: 'text' })
    return res.body
  }

  private static makeRequestURL(baseUrl: string, date: Date) {
    const timestamp = startOfMonth(date).valueOf().toString()
    const url = new URL(baseUrl)
    url.searchParams.append('dt', timestamp.toString())
    return url.toString()
  }
}
