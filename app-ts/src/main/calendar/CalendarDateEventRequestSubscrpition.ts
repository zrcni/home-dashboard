import { IpcMain, WebContents } from 'electron'
import { IPC_CHANNELS } from '../../ipc-channels'
import * as webCalEventFinders from './WebCalEventFinder'
import {
  CalendarDateEventUpdateReceivedPayload,
  CalendarDateEventRequestPayload,
} from '../../types'
import { logger } from '../../logger'

export class CalendarDateEventRequestSubscrpition {
  private ipcMain: IpcMain

  private webContents: WebContents

  constructor(ipcMain: IpcMain, webContents: WebContents) {
    this.ipcMain = ipcMain
    this.webContents = webContents
  }

  create() {
    this.ipcMain.on(
      IPC_CHANNELS.CALENDAR_EVENTS_REQUEST_UPDATE,
      this.onMessage.bind(this)
    )
  }

  // eslint-disable-next-line class-methods-use-this
  private async onMessage(
    _: unknown,
    inPayload: CalendarDateEventRequestPayload
  ) {
    try {
      const [holiday, goodToKnow, nameday, theme] = await Promise.all([
        webCalEventFinders.holiday.findByDate(inPayload.date),
        webCalEventFinders.goodToKnow.findByDate(inPayload.date),
        webCalEventFinders.nameday.findByDate(inPayload.date),
        webCalEventFinders.theme.findByDate(inPayload.date),
      ])

      const outPayload: CalendarDateEventUpdateReceivedPayload = {
        events: {
          holiday,
          goodToKnow,
          nameday,
          theme,
        },
      }

      this.webContents.send(
        `${IPC_CHANNELS.CALENDAR_EVENTS_UPDATE_RECEIVED}:${inPayload.id}`,
        outPayload
      )
    } catch (err) {
      logger.error('NameDayRequestSubscription error: ', err)
    }
  }
}
