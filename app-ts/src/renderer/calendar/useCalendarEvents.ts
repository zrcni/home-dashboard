import { useState, useEffect } from 'react'
import { useMount } from 'renderer/hooks/useMount'
import { IPC_CHANNELS } from '../../ipc-channels'
import {
  CalendarDateEventUpdateReceivedPayload,
  CalendarEvents,
} from '../../types'

export function useCalendarEvents(date: Date) {
  const [data, setData] = useState<CalendarEvents | null>(null)

  const ddmm = dayMonth(date)

  useEffect(() => {
    window.electronAPI.ipcRenderer.send(
      IPC_CHANNELS.CALENDAR_EVENTS_REQUEST_UPDATE,
      {
        date,
      }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ddmm])

  useMount(() => {
    const onMessage = (
      _: unknown,
      payload: CalendarDateEventUpdateReceivedPayload
    ) => setData(payload.events)

    window.electronAPI.ipcRenderer.on(
      IPC_CHANNELS.CALENDAR_EVENTS_UPDATE_RECEIVED,
      onMessage
    )

    return () => {
      window.electronAPI.ipcRenderer.off(
        IPC_CHANNELS.CALENDAR_EVENTS_REQUEST_UPDATE,
        onMessage
      )
    }
  })

  return data
}

function dayMonth(date: Date) {
  return `${date.getDate()}.${date.getMonth() + 1}`
}
