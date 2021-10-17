import { cfg } from '../config'

const mainConfig = {
  ...cfg,
  debug: cfg.dev || process.env.DEBUG_PROD === 'true',
  mqttBrokerUrl: process.env.MQTT_BROKER_URL || 'tcp://localhost:1884',
  startMinimized: false,
  startFullscreen: cfg.prod,
}

export { mainConfig as cfg }
