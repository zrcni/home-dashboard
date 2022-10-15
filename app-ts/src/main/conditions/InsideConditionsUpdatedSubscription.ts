import { WebContents } from 'electron'
import { MQTT_TOPICS } from '../mqtt'
import { PubSub } from '../pub-sub/types'
import { IPC_CHANNELS } from '../../ipc-channels'
import { ConditionData } from '../../types'
import { ConditionsUpdatedPayload } from './types'

export class InsideConditionsUpdatedSubscription {
  private pubSub: PubSub

  private webContents: WebContents

  constructor(pubsub: PubSub, webContents: WebContents) {
    this.pubSub = pubsub
    this.webContents = webContents
  }

  create() {
    this.pubSub.subscribe<ConditionsUpdatedPayload>(
      MQTT_TOPICS.LIVING_ROOM_CONDITIONS_UPDATED,
      this.onMessage.bind(this)
    )
  }

  // eslint-disable-next-line class-methods-use-this
  private onMessage(payload: ConditionsUpdatedPayload) {
    const event: ConditionData = {
      temperature: payload.temperature,
      humidity: payload.humidity,
      lastUpdated: new Date(payload.timestamp * 1000),
    }

    this.webContents.send(
      IPC_CHANNELS.LIVING_ROOM_CONDITIONS_UPDATE_RECEIVED,
      event
    )
  }
}
