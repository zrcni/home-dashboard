export type ConditionsUpdatedPayload = {
  temperature: number
  humidity: number
  // seconds
  timestamp: number
  device_id: string
  client_id: string | null
  location: string | null
}

export type ConditionsRecord = ConditionsUpdatedPayload
