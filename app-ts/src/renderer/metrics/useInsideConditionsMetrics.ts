import { IPC_CHANNELS } from 'ipc-channels'
import { useMount } from 'renderer/hooks/useMount'
import { useStore } from 'renderer/store'
import { GetConditionsFailed, GetConditionsSucceeded } from 'types'

export function useInsideConditionsMetrics() {
  const setMetrics = useStore((state) => state.setInsideConditionsMetrics)

  useMount(() => {
    window.electronAPI.ipcRenderer.on(
      IPC_CHANNELS.METRICS_GET_CONDITIONS_SUCCEEDED,
      (_, payload: GetConditionsSucceeded) => {
        setMetrics(payload.rows)
      }
    )

    window.electronAPI.ipcRenderer.on(
      IPC_CHANNELS.METRICS_GET_CONDITIONS_FAILED,
      (_, payload: GetConditionsFailed) => {
        console.log('failed: ', payload)
      }
    )

    window.electronAPI.ipcRenderer.send(IPC_CHANNELS.METRICS_GET_CONDITIONS, {
      location: 'livingroom',
    })
  })
}
