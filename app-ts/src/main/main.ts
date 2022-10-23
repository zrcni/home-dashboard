/* eslint global-require: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import path from 'path'
import { app, BrowserWindow, ipcMain, shell } from 'electron'
import { cfg, verifyMainConfig } from './config'
import MenuBuilder from './menu'
import { resolveHtmlPath } from './util'
import { PubSubMQTT } from './pub-sub'
import { createMQTTClient, MQTT_TOPICS } from './mqtt'
import { SaveLivingRoomConditionsSubscription } from './conditions/SaveLivingRoomConditionsSubscription'
import { SQLite } from './sqlite'
import { migrateUp } from './migrations'
import { logger } from './logger'
import { Metrics } from './metrics'
import { MainCommandHandler } from './MainCommandHandler'
import { COMMANDS } from '../commands'
import { OutsideConditionsFinder } from './conditions/OutsideConditionsFinder'
import * as webCalEventFinders from './calendar/WebCalEventFinder'
import {
  ConditionData,
  GetCalendarEventsParams,
  GetCalendarEventsResult,
  GetConditionsMetricsParams,
  GetConditionsMetricsResult,
  GetOutsideConditionsResult,
} from 'types'
import { MainSubscriptionHandler } from './MainSubscriptionHandler'
import { SUBSCRIPTIONS } from '../subscriptions'
import { ConditionsUpdatedPayload } from './conditions/types'

process.on('unhandledRejection', (err) => {
  logger.error('unhandledRejection: ', err)
})

let mainWindow: BrowserWindow | null = null

if (cfg.prod) {
  const sourceMapSupport = require('source-map-support')
  sourceMapSupport.install()
}

if (cfg.dev) {
  require('electron-debug')()
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer')
  const forceDownload = Boolean(process.env.UPGRADE_EXTENSIONS)
  const extensions = ['REACT_DEVELOPER_TOOLS']

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(logger.error)
}

const createMainWindow = async () => {
  if (cfg.dev) {
    await installExtensions()
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets')

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths)
  }

  mainWindow = new BrowserWindow({
    show: false,
    fullscreen: cfg.startFullscreen,
    width: cfg.viewWidth,
    height: cfg.viewHeight,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  mainWindow.loadURL(resolveHtmlPath('index.html'))

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined')
    }
    mainWindow.show()
    mainWindow.focus()
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  const menuBuilder = new MenuBuilder(mainWindow, cfg.dev)
  menuBuilder.buildMenu()

  // Open urls in the user's browser
  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault()
    shell.openExternal(url)
  })

  return mainWindow
}

async function main() {
  verifyMainConfig()

  await app.whenReady()

  app.on('window-all-closed', () => {
    // Respect the OSX convention of having the application in memory even
    // after all windows have been closed
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  const mainWindow = await createMainWindow()
  logger.info('main window created')

  const sqlite = new SQLite(cfg.sqliteDb)

  await migrateUp(sqlite)
  logger.info('migrate up finished successfully')

  const pubSub = new PubSubMQTT(createMQTTClient(cfg.mqttBrokerUrl), {
    onError: (err) => logger.error(err),
  })

  new SaveLivingRoomConditionsSubscription(pubSub, sqlite).create()

  const metrics = new Metrics(sqlite)

  const commandHandler = new MainCommandHandler(
    ipcMain,
    mainWindow.webContents,
    true
  )

  commandHandler.addHandler<
    GetConditionsMetricsParams,
    GetConditionsMetricsResult
  >(COMMANDS.GET_CONDITIONS_METRICS, (params) =>
    metrics.conditions.getByLocation(params.location, params.dateRange)
  )

  commandHandler.addHandler<undefined, GetOutsideConditionsResult>(
    COMMANDS.GET_OUTSIDE_CONDITIONS,
    () => OutsideConditionsFinder.getLatest()
  )

  commandHandler.addHandler<GetCalendarEventsParams, GetCalendarEventsResult>(
    COMMANDS.GET_CALENDAR_EVENTS,
    async (params) => {
      const [holiday, goodToKnow, nameday, theme] = await Promise.all([
        webCalEventFinders.holiday.findByDate(params.date),
        webCalEventFinders.goodToKnow.findByDate(params.date),
        webCalEventFinders.nameday.findByDate(params.date),
        webCalEventFinders.theme.findByDate(params.date),
      ])

      return {
        holiday,
        goodToKnow,
        nameday,
        theme,
      }
    }
  )

  const subscriptionHandler = new MainSubscriptionHandler(
    ipcMain,
    mainWindow.webContents
  )

  subscriptionHandler.add<undefined, ConditionData>(
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

main().catch((err) => {
  logger.error(err)
  process.exit(1)
})
