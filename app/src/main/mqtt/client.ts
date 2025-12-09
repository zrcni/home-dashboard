import mqtt from 'mqtt'
import { logger } from '../logger'

export function createMQTTClient(url: string) {
  const mqttClient = mqtt.connect(url)

  mqttClient.on('connect', () => logger.info('mqtt client connected'))
  mqttClient.on('disconnect', () => logger.info('mqtt client disconnected'))
  mqttClient.on('error', (error: any) =>
    logger.error(`mqtt client error: ${error.message}`, {
      error: error,
    }),
  )

  return mqttClient
}
