import { useEffect, useRef } from 'react'

type Callback = () => void

export function useInterval(callback: Callback, ms: number) {
  const callbackRef = useRef<Callback>(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    if (ms === 0) return
    const cb = () => {
      callbackRef.current()
    }

    const id = setInterval(cb, ms)
    return () => clearInterval(id)
  }, [callback, ms])
}
