import { useMount } from 'renderer/hooks/useMount'
import { useEffect, useRef } from 'react'
import { RendererSubscriber } from 'renderer/RendererSubscriber'

export function useSubscription<Payload = any, Params = any>(
  subscriptionName: string,
  params: Params,
  onEvent: (payload: Payload) => void
) {
  const onEventRef = useRef(onEvent)

  useEffect(() => {
    onEventRef.current = onEvent
  }, [onEvent])

  useMount(() => {
    const handleEvent: typeof onEvent = (payload) => {
      onEventRef.current(payload)
    }
    const unsubscribe = RendererSubscriber.subscribe(
      subscriptionName,
      params,
      handleEvent
    )
    return unsubscribe
  })
}
