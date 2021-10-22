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
import { cfg } from './config'
import MenuBuilder from './menu'
import { resolveHtmlPath } from './util'
import AppUpdater from './AppUpdater'
import { PubSubMQTT } from './pub-sub'
import { createMQTTClient } from './mqtt'
import { ConditionsUpdatedSubscription } from './conditions/ConditionsUpdatedSubscription'
import { CalendarDateEventRequestSubscrpition } from './calendar/CalendarDateEventRequestSubscrpition'

process.on('unhandledRejection', (err) => {
  console.error('unhandledRejection: ', err)
})

const pubSub = new PubSubMQTT(createMQTTClient(cfg.mqttBrokerUrl), {
  onError: console.error,
})

let mainWindow: BrowserWindow | null = null

if (cfg.prod) {
  const sourceMapSupport = require('source-map-support')
  sourceMapSupport.install()
}

if (cfg.debug) {
  require('electron-debug')()
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer')
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS
  const extensions = ['REACT_DEVELOPER_TOOLS']

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log)
}

const createWindow = async () => {
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
    width: 800,
    height: 600,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  new ConditionsUpdatedSubscription(pubSub, mainWindow.webContents).create()
  new CalendarDateEventRequestSubscrpition(
    ipcMain,
    mainWindow.webContents
  ).create()

  mainWindow.loadURL(resolveHtmlPath('index.html'))

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined')
    }
    if (cfg.startMinimized) {
      mainWindow.minimize()
    } else {
      mainWindow.show()
      mainWindow.focus()
    }
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  const menuBuilder = new MenuBuilder(mainWindow, cfg.debug)
  menuBuilder.buildMenu()

  // Open urls in the user's browser
  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault()
    shell.openExternal(url)
  })

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater()
}

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app
  .whenReady()
  .then(() => {
    createWindow()
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow()
    })
  })
  .catch(console.log)
