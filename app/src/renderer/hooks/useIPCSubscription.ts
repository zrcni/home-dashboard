import { useMount } from 'renderer/hooks/useMount'
import { useEffect, useRef } from 'react'
import { IPCSubscriber } from 'renderer/IPCSubscriber'

export function useIPCSubscription<Payload = any, Params = any>(
  subscriptionName: string,
  params: Params,
  onEvent: (payload: Payload) => void,
) {
  const onEventRef = useRef(onEvent)

  useEffect(() => {
    onEventRef.current = onEvent
  }, [onEvent])

  useMount(() => {
    const handleEvent: typeof onEvent = (payload) => {
      onEventRef.current(payload)
    }
    const unsubscribe = IPCSubscriber.subscribe(
      subscriptionName,
      params,
      handleEvent,
    )
    return unsubscribe
  })
}
