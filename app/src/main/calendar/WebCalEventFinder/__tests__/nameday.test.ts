import { readEventsByDate } from './utils'

describe('WebCal events – nameday', () => {
  it('7.11.2021', () => {
    const events = readEventsByDate(new Date(2021, 10, 7), 'nameday.ics')
    expect(events).toEqual(['Erin, Taisto'])
  })

  it('12.11.2021', () => {
    const events = readEventsByDate(new Date(2021, 10, 12), 'nameday.ics')
    expect(events).toEqual(['Virpi'])
  })
})
