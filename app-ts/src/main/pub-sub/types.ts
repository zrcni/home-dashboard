export interface PubSubMessageHandler<P = never> {
  (payload: P): void | Promise<void>
}

export interface PubSub {
  subscribe<P = never>(topic: string, callback: PubSubMessageHandler<P>): void
}
