import { MQTT_TOPICS } from '../../mqtt'
import { PubSub } from '../../pub-sub/types'
import { SQLite } from '../../sqlite'
import { ConditionsUpdatedPayload } from '../types'

export function saveLivingRoomConditionsSubscription(
  pubSub: PubSub,
  sqlite: SQLite
) {
  async function handleMessage(payload: ConditionsUpdatedPayload) {
    await sqlite.run(
      'INSERT INTO conditions (temperature, humidity, timestamp, device_id, client_id, location) VALUES (?, ?, ?, ?, ?, ?)',
      payload.temperature,
      payload.humidity,
      payload.timestamp,
      payload.device_id,
      payload.client_id || null,
      'livingroom'
    )
  }

  return pubSub.subscribe<ConditionsUpdatedPayload>(
    MQTT_TOPICS.LIVING_ROOM_CONDITIONS_UPDATED,
    handleMessage
  )
}
