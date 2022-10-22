import { nanoid } from 'nanoid'
import ms from 'ms'
import { useRef, useCallback } from 'react'
import { useMount } from 'renderer/hooks/useMount'
import { useInterval } from 'renderer/hooks'
import { IPC_CHANNELS } from '../../ipc-channels'
import { OutsideConditionsUpdateReceivedPayload } from '../../types'
import { useStore } from '../store'

export function useOutsideConditions() {
  const idRef = useRef(nanoid())
  const [conditions, setConditions] = useStore((state) => [
    state.outsideConditions,
    state.setOutsideConditions,
  ])

  const handleRequestUpdate = useCallback(() => {
    window.electronAPI.ipcRenderer.send(
      IPC_CHANNELS.OUTSIDE_CONDITIONS_REQUEST_UPDATE,
      {
        id: idRef.current,
      }
    )
  }, [])

  useInterval(handleRequestUpdate, REFRESH_FREQ_MS)

  useMount(() => {
    const onMessage = (
      _: unknown,
      payload: OutsideConditionsUpdateReceivedPayload
    ) => setConditions(payload.conditions)

    window.electronAPI.ipcRenderer.on(
      `${IPC_CHANNELS.OUTSIDE_CONDITIONS_UPDATE_RECEIVED}:${idRef.current}`,
      onMessage
    )

    handleRequestUpdate()

    return () => {
      window.electronAPI.ipcRenderer.off(
        `${IPC_CHANNELS.OUTSIDE_CONDITIONS_UPDATE_RECEIVED}:${idRef.current}`,
        onMessage
      )
    }
  })

  return conditions
}

const REFRESH_FREQ_MS = ms('5min')
