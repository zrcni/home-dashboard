import mqtt from 'mqtt'
import { nanoid } from 'nanoid'
import { PubSub, PubSubMessageHandler } from './types'

export class PubSubMQTT implements PubSub {
  private client: mqtt.Client

  private options: Required<Options>

  private listening = false

  private handlers: {
    [topic: string]: {
      [id: string]: PubSubMessageHandler<never>
    }
  } = {}

  constructor(client: mqtt.Client, options?: Options) {
    this.client = client
    this.options = this.makeOptions(options || {})
  }

  subscribe<P>(topic: string, callback: PubSubMessageHandler<P>) {
    if (!this.listening) this.addMessageListener()

    const id = nanoid(8)
    if (!this.handlers[topic]) {
      this.handlers[topic] = {}
      this.client.subscribe(topic)
    }
    this.handlers[topic][id] = callback

    return () => {
      delete this.handlers[topic][id]

      if (Object.keys(this.handlers[topic]).length === 0) {
        delete this.handlers[topic]
        this.client.unsubscribe(topic)
      }
    }
  }

  private addMessageListener() {
    this.client.on('message', this.handleMessage.bind(this))
    this.listening = true
  }

  // private removeMessageListener() {
  //   this.client.off('message', this.handleMessage.bind(this) as never)
  //   this.listening = false
  // }

  private handleMessage(topic: string, payload: Buffer) {
    if (this.handlers[topic]) {
      for (const id in this.handlers[topic]) {
        const callback = this.handlers[topic][id]
        this.invokeHandler(callback, payload)
      }
    }
  }

  private async invokeHandler(callback: PubSubMessageHandler, payload: Buffer) {
    try {
      await callback.call(null, JSON.parse(payload.toString()) as never)
    } catch (err) {
      this.options.onError(err as Error)
    }
  }

  // eslint-disable-next-line class-methods-use-this
  private makeOptions(options: Options): Required<Options> {
    return {
      ...options,
      onError: options.onError || noop,
    }
  }
}

interface Options {
  onError?: (err: Error) => void
}

const noop = () => {}
