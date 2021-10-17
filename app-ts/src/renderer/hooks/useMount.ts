import { useEffect } from 'react'

export function useMount(effect: React.EffectCallback) {
  useEffect(effect, [])
}
