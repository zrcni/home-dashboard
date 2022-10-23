import { TimeoutError } from 'errors'

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

export interface GetConditionsMetricsParams {
  location: string
  dateRange: [Date, Date]
}

export type GetConditionsMetricsResult = ConditionMetricRow[]

export type GetOutsideConditionsResult = ConditionData

export type CommandError = Error | TimeoutError

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
