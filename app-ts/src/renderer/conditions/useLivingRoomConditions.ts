import { useMount } from 'renderer/hooks/useMount'
import { useStore } from '../store'
import { IPC_CHANNELS } from '../../ipc-channels'
import { ConditionData } from '../../types'

export function useLivingRoomConditions() {
  const [conditions, setConditions] = useStore((state) => [
    state.insideConditions,
    state.setInsideConditions,
  ])

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
