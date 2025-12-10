import { google, calendar_v3 } from 'googleapis'
import { IEventFinder } from '../types'
import { CalendarEvent } from '../../../types'

export class GoogleCalendarEventFinder implements IEventFinder {
  private calendar: calendar_v3.Calendar
  private calendarIds: string[]

  constructor(clientEmail: string, privateKey: string, calendarIds: string[]) {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
    })

    this.calendar = google.calendar({ version: 'v3', auth })
    this.calendarIds = calendarIds
  }

  async findByDate(date: Date): Promise<CalendarEvent[]> {
    const startOfDay = new Date(date)
    startOfDay.setHours(0, 0, 0, 0)

    const endOfDay = new Date(date)
    endOfDay.setHours(23, 59, 59, 999)

    try {
      const allEvents = await Promise.all(
        this.calendarIds.map(async (calendarId) => {
          try {
            const response = await this.calendar.events.list({
              calendarId: calendarId,
              timeMin: startOfDay.toISOString(),
              timeMax: endOfDay.toISOString(),
              singleEvents: true,
              orderBy: 'startTime',
            })
            return response.data.items || []
          } catch (error) {
            console.error(
              `Error fetching Google Calendar events for ${calendarId}:`,
              error,
            )
            return []
          }
        }),
      )

      const flattenedEvents = allEvents.flat()

      return flattenedEvents.map((event) => ({
        text: event.summary || '',
        startDate: new Date(event.start?.dateTime || event.start?.date || ''),
        endDate: new Date(event.end?.dateTime || event.end?.date || ''),
        categoryId: 'personal',
        personal: true,
        isAllDay: !event.start?.dateTime,
      }))
    } catch (error) {
      console.error('Error fetching Google Calendar events:', error)
      return []
    }
  }
}
