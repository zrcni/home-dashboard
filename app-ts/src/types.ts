export type Temperature = number
export type Humidity = number

export interface ConditionData {
  temperature: Temperature
  humidity: Humidity
  lastUpdated: Date
}

export interface ConditionMetricRow {
  temperature: number
  humidity: number
  timestamp: number
}

export interface GetConditionsParams {
  location: string
  dateRange: [Date, Date]
}

export type GetConditionsSucceededPayload = ConditionMetricRow[]

export type GetConditionsError = Error

interface RequestUpdatePayload {
  id: string
}

export interface CalendarDateEventRequestPayload extends RequestUpdatePayload {
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

export type OutsideConditionsRequestPayload = RequestUpdatePayload

export interface OutsideConditionsUpdateReceivedPayload {
  conditions: ConditionData
}
