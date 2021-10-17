import { useEffect } from 'react'

export function useInterval(callback: () => void, ms: number) {
  useEffect(() => {
    const id = setInterval(callback, ms)
    return () => clearInterval(id)
  }, [callback, ms])
}
