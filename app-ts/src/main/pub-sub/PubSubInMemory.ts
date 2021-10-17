import EventEmitter from 'events'
import { PubSub, PubSubMessageHandler } from './types'

export class PubSubInMemory implements PubSub {
  private emitter: EventEmitter

  constructor(emitter: EventEmitter) {
    this.emitter = emitter
  }

  subscribe<P>(topic: string, callback: PubSubMessageHandler<P>) {
    this.emitter.on(topic, callback)

    return () => {
      this.emitter.off(topic, callback)
    }
  }
}
