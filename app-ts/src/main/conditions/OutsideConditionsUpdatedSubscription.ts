import { IpcMain, WebContents } from 'electron'
import { IPC_CHANNELS } from '../../ipc-channels'
import {
  OutsideConditionsUpdateReceivedPayload,
  OutsideConditionsRequestPayload,
} from '../../types'
import { OutsideConditionsFinder } from './OutsideConditionsFinder'

export class OutsideConditionsUpdatedSubscription {
  private ipcMain: IpcMain

  private webContents: WebContents

  constructor(ipcMain: IpcMain, webContents: WebContents) {
    this.ipcMain = ipcMain
    this.webContents = webContents
  }

  create() {
    this.ipcMain.on(
      IPC_CHANNELS.OUTSIDE_CONDITIONS_REQUEST_UPDATE,
      this.onMessage.bind(this)
    )
  }

  // eslint-disable-next-line class-methods-use-this
  private async onMessage(
    _: unknown,
    inPayload: OutsideConditionsRequestPayload
  ) {
    try {
      const conditions = await OutsideConditionsFinder.getLatest()

      const outPayload: OutsideConditionsUpdateReceivedPayload = {
        conditions,
      }

      this.webContents.send(
        `${IPC_CHANNELS.OUTSIDE_CONDITIONS_UPDATE_RECEIVED}:${inPayload.id}`,
        outPayload
      )
    } catch (err) {
      console.error('OutsideConditionsUpdatedSubscription error: ', err)
    }
  }
}
