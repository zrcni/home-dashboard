export interface PubSubMessageHandler<P = never> {
  (payload: P): void | Promise<void>
}

type Unsubscribe = () => void

export interface PubSub {
  subscribe<P = never>(
    topic: string,
    callback: PubSubMessageHandler<P>
  ): Unsubscribe
}
