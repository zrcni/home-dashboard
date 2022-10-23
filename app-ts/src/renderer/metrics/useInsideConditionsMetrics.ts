import { IPC_CHANNELS } from 'ipc-channels'
import { useEffect } from 'react'
import { useStore } from 'renderer/store'
import { GetConditionsFailed, GetConditionsSucceeded } from 'types'

export function useInsideConditionsMetrics(dateRange: [Date, Date]) {
  const setMetrics = useStore((state) => state.setInsideConditionsMetrics)

  useEffect(() => {
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
      dateRange,
    })
  }, [dateRange[0], dateRange[1]])
}
