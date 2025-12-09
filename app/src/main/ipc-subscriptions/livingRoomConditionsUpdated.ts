import { ConditionsUpdatedPayload } from '../conditions/types'
import { IPCSubscriptionHandler } from '../IPCSubscriptionHandler'
import { SUBSCRIPTIONS } from '../../subscriptions'
import { MQTT_TOPICS } from '../mqtt'
import type { PubSub } from '../pub-sub/types'
import type { ConditionData } from '../../types'

export function livingRoomConditionsUpdated(
  subscriptionHandler: IPCSubscriptionHandler,
  pubSub: PubSub
) {
  subscriptionHandler.addHandler<undefined, ConditionData>(
    SUBSCRIPTIONS.LIVING_ROOM_CONDITIONS,
    (_params, handler) =>
      pubSub.subscribe<ConditionsUpdatedPayload>(
        MQTT_TOPICS.LIVING_ROOM_CONDITIONS_UPDATED,
        (payload) =>
          handler({
            temperature: payload.temperature,
            humidity: payload.humidity,
            lastUpdated: new Date(payload.timestamp * 1000),
          })
      )
  )
}
