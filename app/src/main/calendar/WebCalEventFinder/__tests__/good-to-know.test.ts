import { readEventsByDate } from '../test-utils'

describe('WebCal events – good to know', () => {
  it('6.11.2021', () => {
    const events = readEventsByDate(new Date(2021, 10, 6), 'good-to-know.ics')
    expect(events).toEqual(['Ruotsalaisuuden päivä'])
  })

  it('3.12.2021', () => {
    const events = readEventsByDate(new Date(2021, 11, 3), 'good-to-know.ics')
    expect(events).toEqual(['Osta työtä Suomeen -päivä'])
  })
})
