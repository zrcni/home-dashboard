import mqtt from 'mqtt'

export function createMQTTClient(url: string) {
  const mqttClient = mqtt.connect(url)

  mqttClient.on('connect', () => console.log('mqtt client connected'))
  mqttClient.on('disconnect', () => console.log('mqtt client disconnected'))
  mqttClient.on('reconnect', () => console.log('mqtt client reconnected'))

  return mqttClient
}
