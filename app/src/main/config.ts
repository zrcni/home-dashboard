import invariant from 'tiny-invariant'
import { cfg } from '../config'
import path from 'path'
import fs from 'fs'

let googleCredentials = { client_email: '', private_key: '' }

try {
  const credentialsPath = cfg.prod
    ? path.join(
        (process as any).resourcesPath,
        'credentials',
        'home-dashboard-rpi-service-account.json',
      )
    : path.resolve('credentials/home-dashboard-rpi-service-account.json')

  if (fs.existsSync(credentialsPath)) {
    const content = fs.readFileSync(credentialsPath, 'utf-8')
    googleCredentials = JSON.parse(content)
  } else {
    console.warn(`Google credentials file not found at: ${credentialsPath}`)
  }
} catch (error) {
  console.error('Failed to load Google credentials:', error)
}

const mainConfig = {
  ...cfg,
  logLevel: process.env.DEBUG === 'true' ? 'debug' : 'info',
  mqttBrokerUrl: process.env.MQTT_BROKER_URL as string,
  startFullscreen: process.env.START_FULLSCREEN === 'true',
  sqliteDb: process.env.DB_PATH as string,
  googleCalendar: {
    clientEmail: googleCredentials.client_email,
    privateKey: googleCredentials.private_key,
    calendarIds: (process.env.GOOGLE_CALENDAR_IDS || '')
      .split(',')
      .filter(Boolean),
  },
  icals: [
    {
      categoryId: 'nameDays',
      url: 'https://www.webcal.guru/fi-FI/lataa_kalenteri?calendar_instance_id=263',
    },
    {
      categoryId: 'finnishHolidays',
      url: 'https://calendar.google.com/calendar/ical/en.finnish%23holiday%40group.v.calendar.google.com/public/basic.ics',
    },
    {
      categoryId: 'goodToKnow',
      url: 'https://www.webcal.guru/fi-FI/lataa_kalenteri?calendar_instance_id=180',
    },
    {
      categoryId: 'theme',
      url: 'https://www.webcal.guru/fi-FI/lataa_kalenteri?calendar_instance_id=899',
    },
    {
      categoryId: 'moonCycle',
      url: 'https://calendar.google.com/calendar/ical/ht3jlfaac5lfd6263ulfh4tql8%40group.calendar.google.com/public/basic.ics',
    },
  ],
  // take devtools etc. into account
  viewWidth: cfg.dev ? 1170 : 800,
  viewHeight: cfg.dev ? 625 : 600,
}

export { mainConfig as cfg }

export function verifyMainConfig() {
  invariant(mainConfig.mqttBrokerUrl, 'MQTT_BROKER_URL must be configured!')
  invariant(mainConfig.sqliteDb, 'DB_PATH must be configured!')
}
