/**
 * Periodically publishes mocked condition updates
 */
import random from 'random'
import { ConditionsUpdatedPayload } from '../src/main/conditions/types'
import { cfg } from '../src/main/config'
import { createMQTTClient, MQTT_TOPICS } from '../src/main/mqtt'
import { MqttClient } from 'mqtt'
import ms from 'ms'

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })

async function main() {
  const client = createMQTTClient(cfg.mqttBrokerUrl)

  while (!client.connected) {
    await wait(10)
  }

  console.info(`connected to ${cfg.mqttBrokerUrl}`)

  while (true) {
    const payload = generatePayload()
    await publish(client, MQTT_TOPICS.LIVING_ROOM_CONDITIONS_UPDATED, payload)

    console.info(`Published to ${MQTT_TOPICS.LIVING_ROOM_CONDITIONS_UPDATED}`)
    console.info(JSON.stringify(payload))

    await wait(ms('30s'))
  }
}

function publish(client: MqttClient, topic: string, payload: object) {
  return new Promise((resolve, reject) => {
    client.publish(topic, JSON.stringify(payload), (err) =>
      err ? reject(err) : resolve(undefined)
    )
  })
}

function generatePayload(): ConditionsUpdatedPayload {
  return {
    timestamp: Math.floor(Date.now() / 1000),
    client_id: 'mock_client_id',
    device_id: 'mock_device_id',
    location: 'mock_location',
    temperature: oneDigit(random.float(20, 26)),
    humidity: oneDigit(random.float(32, 58)),
  }
}

function oneDigit(n: number) {
  return Number(n.toFixed(1))
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(() => resolve(undefined), ms))
}
