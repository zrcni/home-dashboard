import { MQTT_TOPICS } from '../../mqtt'
import { PubSub } from '../../pub-sub/types'
import { SQLite } from '../../sqlite'
import { ConditionsUpdatedPayload } from '../types'

export class SaveLivingRoomConditionsSubscription {
  private pubSub: PubSub
  private sqlite: SQLite

  constructor(pubsub: PubSub, sqlite: SQLite) {
    this.pubSub = pubsub
    this.sqlite = sqlite
  }

  create() {
    this.pubSub.subscribe<ConditionsUpdatedPayload>(
      MQTT_TOPICS.LIVING_ROOM_CONDITIONS_UPDATED,
      this.onMessage.bind(this)
    )
  }

  // eslint-disable-next-line class-methods-use-this
  private async onMessage(payload: ConditionsUpdatedPayload) {
    await this.sqlite.run(
      `INSERT INTO conditions (temperature, humidity, timestamp, device_id, client_id, location) VALUES (?, ?, ?, ?, ?, ?)`,
      payload.temperature,
      payload.humidity,
      payload.timestamp,
      payload.device_id,
      payload.client_id || null,
      'living_room'
    )
  }
}
