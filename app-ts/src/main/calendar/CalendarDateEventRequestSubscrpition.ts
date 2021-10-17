import { IpcMain, WebContents } from 'electron'
import { IPC_CHANNELS } from '../../ipc-channels'
import { NameDayFinder } from './NameDayFinder/NameDayFinder'
import { CalendarDateEventFinder } from './CalendarDateEventFinder'
import {
  CalendarDateEventUpdateReceivedPayload,
  CalendarDateEventRequestPayload,
} from '../../types'

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
      const [calendarEvents, nameDays] = await Promise.all([
        CalendarDateEventFinder.findByDate(inPayload.date),
        NameDayFinder.findByDate(inPayload.date),
      ])

      const outPayload: CalendarDateEventUpdateReceivedPayload = {
        events: {
          ...calendarEvents,
          nameDays,
        },
      }

      this.webContents.send(
        `${IPC_CHANNELS.CALENDAR_EVENTS_UPDATE_RECEIVED}:${inPayload.id}`,
        outPayload
      )
    } catch (err) {
      console.error('NameDayRequestSubscription error: ', err)
    }
  }
}
