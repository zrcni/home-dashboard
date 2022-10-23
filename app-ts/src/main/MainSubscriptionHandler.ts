import invariant from 'tiny-invariant'
import { IpcMain, WebContents } from 'electron'
import { logger } from './logger'

export class MainSubscriptionHandler {
  private ipcMain: IpcMain

  private webContents: WebContents

  private subscriptions: Record<
    string,
    {
      subscriptionId: string
      subscriptionName: string
      params: any
      unsubscribe: Unsubscribe
    }
  >

  private handlers: Record<string, Subscribe>

  private debug: boolean

  constructor(
    ipcMain: IpcMain,
    webContents: WebContents,
    debug: boolean = false
  ) {
    this.ipcMain = ipcMain
    this.webContents = webContents
    this.subscriptions = {}
    this.handlers = {}
    this.debug = debug

    this.setup()
  }

  setup() {
    this.ipcMain.on(
      'subscribe-request',
      (_, payload: SubscribeRequestPayload) => {
        if (payload.subscriptionName in this.handlers) {
          const subscribe = this.handlers[payload.subscriptionName]

          invariant(
            subscribe,
            `Subscription "${payload.subscriptionName}" does not exist!`
          )

          const unsubscribe = subscribe(payload.params, (result) => {
            this.webContents.send(payload.subscriptionName, result)
          })

          this.subscriptions[payload.subscriptionId] = {
            subscriptionName: payload.subscriptionName,
            subscriptionId: payload.subscriptionId,
            params: payload.params,
            unsubscribe,
          }

          if (this.debug) {
            logger.info('subscription added', {
              subscriptionName: payload.subscriptionName,
              subscriptionId: payload.subscriptionId,
              params: payload.params,
            })
          }
        }
      }
    )

    this.ipcMain.on(
      'unsubscribe-request',
      (_, payload: UnsubscribeRequestPayload) => {
        if (!this.subscriptions[payload.subscriptionId]) {
          logger.warn(`Subscription ${payload.subscriptionId} does not exist!`)
          return
        }

        const { subscriptionId, subscriptionName, params, unsubscribe } =
          this.subscriptions[payload.subscriptionId]

        unsubscribe()

        if (this.debug) {
          logger.info('subscription removed', {
            subscriptionName,
            subscriptionId,
            params,
          })
        }
      }
    )
  }

  quit() {
    for (const key in this.subscriptions) {
      const { unsubscribe } = this.subscriptions[key]
      unsubscribe()
      delete this.subscriptions[key]
    }
  }

  add<Params = any, Payload = any>(
    subscriptionName: string,
    subscribe: Subscribe<Params, Payload>
  ) {
    invariant(
      !this.handlers[subscriptionName],
      'Handler already has a subscription!'
    )
    this.handlers[subscriptionName] = subscribe
  }
}

type SubscribeRequestPayload<Params = any> = {
  subscriptionName: string
  subscriptionId: string
  params: Params
}

type UnsubscribeRequestPayload = {
  subscriptionId: string
}

type Unsubscribe = () => void

type Handler<Payload> = (payload: Payload) => void | Promise<void>

type Subscribe<Params = any, Payload = any> = (
  params: Params,
  handler: Handler<Payload>
) => Unsubscribe
