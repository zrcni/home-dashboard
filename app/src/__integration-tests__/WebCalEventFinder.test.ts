import { holiday, goodToKnow, theme, nameday } from '../main/calendar/WebCalEventFinder/index'

describe('WebCalEventFinder Integration', () => {
  it('should find holiday events', async () => {
    const date = new Date('2025-12-25T12:00:00')
    const events = await holiday.findByDate(date)
    expect(Array.isArray(events)).toBe(true)
    expect(events.length).toBeGreaterThan(0)
  })

  it('should find goodToKnow events', async () => {
    const date = new Date('2025-12-24T12:00:00')
    const events = await goodToKnow.findByDate(date)
    expect(Array.isArray(events)).toBe(true)
    expect(events.length).toBeGreaterThan(0)
  })

  it('should find theme events', async () => {
    const date = new Date('2025-12-10T12:00:00')
    const events = await theme.findByDate(date)
    expect(Array.isArray(events)).toBe(true)
    expect(events.length).toBeGreaterThan(0)
  })

  it('should find nameday events', async () => {
    const date = new Date('2025-12-12T12:00:00')
    const events = await nameday.findByDate(date)
    expect(Array.isArray(events)).toBe(true)
    expect(events.length).toBeGreaterThan(0)
  })
})
