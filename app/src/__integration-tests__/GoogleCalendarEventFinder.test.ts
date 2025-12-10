// Set the environment variable before importing the module
process.env.GOOGLE_CALENDAR_IDS =
  process.env.GOOGLE_CALENDAR_IDS || 'zrcni9@gmail.com'

import { googleCalendarEventFinder } from '../main/calendar/GoogleCalendarEventFinder'

describe('GoogleCalendarEventFinder Integration', () => {
  it('should be instantiated', () => {
    expect(googleCalendarEventFinder).not.toBeNull()
  })

  it('should find events', async () => {
    const date = new Date('2025-12-10T12:00:00')
    console.log('Using Calendar IDs:', process.env.GOOGLE_CALENDAR_IDS)
    const events = await googleCalendarEventFinder.findByDate(date)

    console.log(`Found ${events.length} events for 2025-12-24`)
    if (events.length > 0) {
      console.log('First event:', events[0])
    }

    expect(Array.isArray(events)).toBe(true)
    console.log(events)
    if (events.length > 0) {
      expect(events[0]).toHaveProperty('text')
      expect(events[0]).toHaveProperty('startDate')
      expect(events[0]).toHaveProperty('endDate')
    }
  })
})
