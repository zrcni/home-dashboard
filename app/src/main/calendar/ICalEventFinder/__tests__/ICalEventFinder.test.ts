import { ICalEventFinder } from '../ICalEventFinder'
import fs from 'fs'
import path from 'path'

const readIcsFile = (filename: string) => {
  return fs.readFileSync(path.resolve(__dirname, filename)).toString()
}

const createFinder = (filename: string, categoryId: string) => {
  const finder = new ICalEventFinder('dummy-url', categoryId)
  jest.spyOn(finder as any, 'getText').mockResolvedValue(readIcsFile(filename))
  return finder
}

describe('ICalEventFinder', () => {
  describe('holiday', () => {
    const finder = createFinder('holiday.ics', 'holiday')

    it('6.11.2021', async () => {
      const events = await finder.findByDate(new Date(2021, 10, 6))
      expect(events.map((e) => e.text)).toEqual(['Pyhäinpäivä'])
      expect(events[0].categoryId).toBe('holiday')
    })

    it('6.12.2021', async () => {
      const events = await finder.findByDate(new Date(2021, 11, 6))
      expect(events.map((e) => e.text)).toEqual(['🇫🇮 Itsenäisyyspäivä'])
      expect(events[0].categoryId).toBe('holiday')
    })
  })

  describe('good to know', () => {
    const finder = createFinder('good-to-know.ics', 'goodToKnow')

    it('6.11.2021', async () => {
      const events = await finder.findByDate(new Date(2021, 10, 6))
      expect(events.map((e) => e.text)).toEqual(['Ruotsalaisuuden päivä'])
      expect(events[0].categoryId).toBe('goodToKnow')
    })

    it('3.12.2021', async () => {
      const events = await finder.findByDate(new Date(2021, 11, 3))
      expect(events.map((e) => e.text)).toEqual(['Osta työtä Suomeen -päivä'])
      expect(events[0].categoryId).toBe('goodToKnow')
    })
  })

  describe('nameday', () => {
    const finder = createFinder('nameday.ics', 'nameday')

    it('7.11.2021', async () => {
      const events = await finder.findByDate(new Date(2021, 10, 7))
      expect(events.map((e) => e.text)).toEqual(['Erin, Taisto'])
      expect(events[0].categoryId).toBe('nameday')
    })

    it('12.11.2021', async () => {
      const events = await finder.findByDate(new Date(2021, 10, 12))
      expect(events.map((e) => e.text)).toEqual(['Virpi'])
      expect(events[0].categoryId).toBe('nameday')
    })
  })

  describe('theme', () => {
    const finder = createFinder('theme.ics', 'theme')

    it('8.11.2021', async () => {
      const events = await finder.findByDate(new Date(2021, 10, 8))
      expect(events.map((e) => e.text)).toEqual([
        '🧬 International Week of Science and Peace',
      ])
      expect(events[0].categoryId).toBe('theme')
    })

    it('16.11.2021', async () => {
      const events = await finder.findByDate(new Date(2021, 10, 16))
      expect(events.map((e) => e.text)).toEqual([
        'World Antibiotic Awareness Week',
        'International Day for Tolerance',
      ])
      expect(events[0].categoryId).toBe('theme')
    })
  })
})
