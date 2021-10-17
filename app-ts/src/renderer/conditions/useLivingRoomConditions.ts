import { useState } from 'react'
import { useMount } from 'renderer/hooks/useMount'
import { IPC_CHANNELS } from '../../ipc-channels'
import { ConditionData } from '../../types'

export function useLivingRoomConditions() {
  const [conditions, setConditions] = useState<ConditionData | null>(null)

  useMount(() => {
    const onMessage = (_: unknown, payload: ConditionData) =>
      setConditions(payload)

    window.electronAPI.ipcRenderer.on(
      IPC_CHANNELS.LIVING_ROOM_CONDITIONS_UPDATE_RECEIVED,
      onMessage
    )

    return () => {
      window.electronAPI.ipcRenderer.off(
        IPC_CHANNELS.LIVING_ROOM_CONDITIONS_UPDATE_RECEIVED,
        onMessage
      )
    }
  })

  return conditions
}
