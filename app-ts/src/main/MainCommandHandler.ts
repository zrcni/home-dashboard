import { IpcMain, IpcMainEvent, WebContents } from 'electron'
import { logger } from './logger'

export class MainCommandHandler {
  private ipcMain: IpcMain

  private webContents: WebContents

  private unsubs: (() => void)[]

  constructor(ipcMain: IpcMain, webContents: WebContents) {
    this.ipcMain = ipcMain
    this.webContents = webContents

    this.unsubs = []
  }

  addHandler<Params = any, Result = any, Err extends Error = Error>(
    commandName: string,
    handler: (params: Params) => Promise<Result>
  ) {
    const eventName = this.requestEventName(commandName)
    const self = this

    function _handler(_: IpcMainEvent, payload: any) {
      handler(payload.payload)
        .then((result: Result) => {
          logger.info(`command succeeded`, {
            requestId: payload.requestId,
            commandName,
          })

          self.webContents.send(
            self.succeededEventName(commandName, payload.requestId),
            { payload: result }
          )
        })
        .catch((err: Err) => {
          logger.info(`command failed`, {
            requestId: payload.requestId,
            commandName,
          })

          self.webContents.send(
            self.failedEventName(commandName, payload.requestId),
            { error: err }
          )
        })
    }

    this.ipcMain.on(eventName, _handler)

    this.unsubs.push(() => this.ipcMain.off(eventName, _handler))
  }

  quit() {
    this.unsubs.forEach((unsub) => unsub())
    this.unsubs = []
  }

  private requestEventName(commandName: string) {
    return `${commandName}_cmd_request`
  }

  private succeededEventName(commandName: string, requestId: string) {
    return `${commandName}_cmd_succeeded:${requestId}`
  }

  private failedEventName(commandName: string, requestId: string) {
    return `${commandName}_cmd_failed:${requestId}`
  }
}
