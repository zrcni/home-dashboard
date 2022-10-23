import { IpcMain, IpcMainEvent, WebContents } from 'electron'
import { CommandError } from 'types'
import { logger } from './logger'

/**
 * TODO: update error handling to be {ok,error} instead of promise .then/.catch
 * (send one event with either {ok} or {error} payload)
 */
export class MainCommandHandler {
  private ipcMain: IpcMain

  private webContents: WebContents

  private unsubs: (() => void)[]

  constructor(ipcMain: IpcMain, webContents: WebContents) {
    this.ipcMain = ipcMain
    this.webContents = webContents

    this.unsubs = []
  }

  addHandler<Params = any, Result = any, Err extends Error = CommandError>(
    commandName: string,
    handler: (params: Params) => Result | Promise<Result>
  ) {
    const eventName = this.requestEventName(commandName)
    const self = this

    async function _handler(_: IpcMainEvent, payload: any) {
      logger.info(`command received`, {
        requestId: payload.requestId,
        commandName,
      })

      try {
        const result = await handler(payload.payload)

        logger.info(`command succeeded`, {
          requestId: payload.requestId,
          commandName,
        })

        self.webContents.send(
          self.succeededEventName(commandName, payload.requestId),
          { payload: result }
        )
      } catch (err) {
        logger.info(`command failed`, {
          requestId: payload.requestId,
          commandName,
        })

        self.webContents.send(
          self.failedEventName(commandName, payload.requestId),
          { error: err as Err }
        )
      }
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
