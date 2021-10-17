export type Temperature = number
export type Humidity = number

export interface ConditionData {
  temperature: Temperature
  humidity: Humidity
  lastUpdated: Date
}

export interface NameDaysData {
  official: string[]
  swedish: string[]
  sami: string[]
  orthodox: string[]
  unofficial: string[]
}

export interface CalendarDateEventRequestPayload {
  date: Date
}

export interface CalendarEventData {
  holiday: string[]
  holy: string[]
}

export type CalendarEvents = CalendarEventData & { nameDays: NameDaysData }

export interface CalendarDateEventUpdateReceivedPayload {
  events: CalendarEvents
}
