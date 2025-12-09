import { readEventsByDate } from '../test-utils'

describe('WebCal events – holiday', () => {
  it('6.11.2021', () => {
    const events = readEventsByDate(new Date(2021, 10, 6), 'holiday.ics')
    expect(events).toEqual(['Pyhäinpäivä'])
  })

  it('6.12.2021', () => {
    const events = readEventsByDate(new Date(2021, 11, 6), 'holiday.ics')
    expect(events).toEqual(['🇫🇮 Itsenäisyyspäivä'])
  })
})
