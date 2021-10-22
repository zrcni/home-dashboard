import { useState } from 'react'
import ms from 'ms'
import { useInterval } from 'renderer/hooks/useInterval'
import { DashboardView } from './DashboardView'
import { useLivingRoomConditions } from '../../conditions/useLivingRoomConditions'
import { addDays } from 'date-fns'
import { useCalendarEvents } from '../../calendar/useCalendarEvents'

export const DashboardViewController: React.FC = () => {
  const [dateNow, setDateNow] = useState(new Date())
  const conditions = useLivingRoomConditions()
  const eventsToday = useCalendarEvents(dateNow)
  const eventsTomorrow = useCalendarEvents(addDays(dateNow, 1))

  useInterval(() => setDateNow(new Date()), ms('1s'))

  return (
    <DashboardView
      date={dateNow}
      eventsToday={eventsToday}
      eventsTomorrow={eventsTomorrow}
      conditions={conditions}
    />
  )
}
