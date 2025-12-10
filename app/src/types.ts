import { TimeoutError } from 'errors'

export type Temperature = number
export type Humidity = number

export interface ConditionData {
  temperature: Temperature
  humidity: Humidity
  lastUpdated: Date
  location?: string
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

export interface CalendarEvent {
  text: string
  startDate: Date
  endDate: Date
  categoryId: string
  isAllDay?: boolean
  personal?: boolean
}

export interface CalendarCategory {
  categoryId: string
  events: CalendarEvent[]
}

export interface GetCalendarEventsParams {
  date: Date
}

export type GetCalendarEventsResult = CalendarCategory[]
