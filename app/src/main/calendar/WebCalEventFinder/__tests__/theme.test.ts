import { readEventsByDate } from '../test-utils'

describe('WebCal events – theme', () => {
  it('8.11.2021', () => {
    const events = readEventsByDate(new Date(2021, 10, 8), 'theme.ics')
    expect(events).toEqual(['🧬 International Week of Science and Peace'])
  })

  it('16.11.2021', () => {
    const events = readEventsByDate(new Date(2021, 10, 16), 'theme.ics')
    expect(events).toEqual([
      'World Antibiotic Awareness Week',
      'International Day for Tolerance',
    ])
  })
})
