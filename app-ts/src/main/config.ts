import path from 'path'
import { cfg } from '../config'

const mainConfig = {
  ...cfg,
  debug: cfg.dev || process.env.DEBUG_PROD === 'true',
  mqttBrokerUrl: process.env.MQTT_BROKER_URL || 'tcp://localhost:1884',
  startMinimized: false,
  startFullscreen: cfg.prod,
  sqliteDb: path.join(process.cwd(), 'db/conditions.db'),
  migrationsPath: path.join(process.cwd(), 'migrations'),
}

export { mainConfig as cfg }
