import got from 'got'
import { NameDayHTMLParser } from './NameDayHTMLParser'

export class NameDayFinder {
  private static baseUrl = 'https://nimipaivat.fi'

  static async findByDate(date: Date) {
    const url = this.makeRequestURL(this.baseUrl, date)
    const html = await this.getHTML(url)
    const parser = new NameDayHTMLParser(html)
    return parser.findNameDays()
  }

  private static async getHTML(url: string) {
    const res = await got.get(url, { responseType: 'text' })
    return res.body
  }

  private static makeRequestURL(baseUrl: string, date: Date) {
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${baseUrl}/${day}.${month}.`
  }
}
