export type Temperature = number
export type Humidity = number

export interface ConditionData {
  temperature: Temperature
  humidity: Humidity
  lastUpdated: Date
}

export interface CalendarDateEventRequestPayload {
  id: string
  date: Date
}

export type CalendarEvent = string

export type CalendarEvents = {
  holiday: CalendarEvent[]
  goodToKnow: CalendarEvent[]
  nameday: CalendarEvent[]
  theme: CalendarEvent[]
}

export interface CalendarDateEventUpdateReceivedPayload {
  events: CalendarEvents
}
