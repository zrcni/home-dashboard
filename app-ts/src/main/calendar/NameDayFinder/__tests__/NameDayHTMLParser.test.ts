import fs from 'fs'
import path from 'path'
import { NameDayHTMLParser } from '../NameDayHTMLParser'

describe('NameDayHTMLParser', () => {
  it('find name days', () => {
    const html = fs
      .readFileSync(path.resolve(__dirname, 'nimipaivat.html'))
      .toString()

    const nameDays = new NameDayHTMLParser(html).findNameDays()

    expect(nameDays).toEqual({
      official: ['Aarre', 'Aarto'],
      orthodox: ['Antero', 'Kosma', 'Kuisma'],
      sami: ['Lágon'],
      swedish: ['Valfrid'],
      unofficial: ['Aalto', 'Aare', 'Aallotar'],
    })
  })
})
