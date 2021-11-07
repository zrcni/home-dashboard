import fs from 'fs'
import path from 'path'
import { WebCalEventParser } from '../WebCalEventParser'

export function readEventsByDate(date: Date, filename: string) {
  const buffer = fs.readFileSync(path.resolve(__dirname, filename))
  const parser = new WebCalEventParser(buffer.toString())
  return parser.getEventsByDayOfMonth(date)
}
