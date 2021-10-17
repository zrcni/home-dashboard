import fs from 'fs'
import path from 'path'
import { CalendarHTMLParser } from '../CalendarHTMLParser'

describe('CalendarHTMLParser', () => {
  it('find holiday event', () => {
    const html = fs
      .readFileSync(path.resolve(__dirname, 'calendar.html'))
      .toString()
    const events = new CalendarHTMLParser(html).getEventsByDayOfMonth(24)
    expect(events.holiday).toContain('YK:n päivä')
  })

  it('find holy day event', () => {
    const html = fs
      .readFileSync(path.resolve(__dirname, 'calendar.html'))
      .toString()
    const events = new CalendarHTMLParser(html).getEventsByDayOfMonth(3)
    expect(events.holy).toContain('Mikkelinp.')
  })
})
