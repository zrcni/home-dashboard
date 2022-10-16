import invariant from 'tiny-invariant'
import { cfg } from '../config'

const mainConfig = {
  ...cfg,
  logLevel: process.env.DEBUG === 'true' ? 'debug' : 'info',
  mqttBrokerUrl: process.env.MQTT_BROKER_URL as string,
  startFullscreen: process.env.START_FULLSCREEN === 'true',
  sqliteDb: process.env.DB_PATH as string,
}

export { mainConfig as cfg }

export function verifyMainConfig() {
  invariant(mainConfig.mqttBrokerUrl, 'MQTT_BROKER_URL must be configured!')
  invariant(mainConfig.sqliteDb, 'DB_PATH must be configured!')
}
