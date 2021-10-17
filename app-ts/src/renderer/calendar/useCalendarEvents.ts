import { nanoid } from 'nanoid'
import { useState, useEffect, useRef } from 'react'
import { useMount } from 'renderer/hooks/useMount'
import { IPC_CHANNELS } from '../../ipc-channels'
import {
  CalendarDateEventUpdateReceivedPayload,
  CalendarEvents,
} from '../../types'

export function useCalendarEvents(date: Date) {
  const idRef = useRef(nanoid())
  const [data, setData] = useState<CalendarEvents | null>(null)

  const ddmm = dayMonth(date)

  useEffect(() => {
    window.electronAPI.ipcRenderer.send(
      IPC_CHANNELS.CALENDAR_EVENTS_REQUEST_UPDATE,
      {
        id: idRef.current,
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
      `${IPC_CHANNELS.CALENDAR_EVENTS_UPDATE_RECEIVED}:${idRef.current}`,
      onMessage
    )

    return () => {
      window.electronAPI.ipcRenderer.off(
        `${IPC_CHANNELS.CALENDAR_EVENTS_REQUEST_UPDATE}:${idRef.current}`,
        onMessage
      )
    }
  })

  return data
}

function dayMonth(date: Date) {
  return `${date.getDate()}.${date.getMonth() + 1}`
}
