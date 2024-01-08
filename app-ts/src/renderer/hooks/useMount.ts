import { EffectCallback, useEffect, useReducer, useRef } from "react"

/**
 * Mount & unmount
 *
 * Works with React Strict Mode
 */
export const useMount = (effect: EffectCallback) => {
  const effectRef = useRef<EffectCallback>(effect)
  const destroyRef = useRef<ReturnType<EffectCallback>>()
  const effectCalled = useRef(false)
  const renderedRef = useRef(false)
  const [, forceUpdate] = useReducer((n) => n + 1, 0)

  if (effectCalled.current) {
    renderedRef.current = true
  }

  useEffect(() => {
    if (!effectCalled.current) {
      destroyRef.current = effectRef.current()
      effectCalled.current = true
    }

    forceUpdate()

    return () => {
      if (!renderedRef.current) {
        return
      }

      if (destroyRef.current) {
        destroyRef.current()
      }
    }
  }, [])
}
