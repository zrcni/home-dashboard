import mqtt from 'mqtt'

export function createMQTTClient(url: string) {
  const mqttClient = mqtt.connect(url)

  mqttClient.on('connect', () => console.info('mqtt client connected'))
  mqttClient.on('disconnect', () => console.info('mqtt client disconnected'))
  mqttClient.on('error', (err: any) =>
    console.error('mqtt client error (code %s):', err.errno, err.message)
  )

  return mqttClient
}
