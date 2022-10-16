import { autoUpdater } from 'electron-updater'
import { logger } from './logger'

export default class AppUpdater {
  constructor() {
    autoUpdater.logger = logger
    autoUpdater.checkForUpdatesAndNotify()
  }
}
