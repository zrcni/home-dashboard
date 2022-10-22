import { useState } from 'react'
import ms from 'ms'
import { useInterval } from 'renderer/hooks/useInterval'
import { DashboardView } from './DashboardView'
import { useLivingRoomConditions } from '../../conditions/useLivingRoomConditions'
import { addDays } from 'date-fns'
import { useCalendarEvents } from '../../calendar/useCalendarEvents'
import { useOutsideConditions } from 'renderer/conditions/useOutsideConditions'

export const DashboardViewController: React.FC = () => {
  const [dateNow, setDateNow] = useState(new Date())
  const insideConditions = useLivingRoomConditions()
  const outsideConditions = useOutsideConditions()
  const eventsToday = useCalendarEvents(dateNow)
  const eventsTomorrow = useCalendarEvents(addDays(dateNow, 1))

  useInterval(() => setDateNow(new Date()), ms('1s'))

  return (
    <DashboardView
      dateNow={dateNow}
      eventsToday={eventsToday}
      eventsTomorrow={eventsTomorrow}
      insideConditions={insideConditions}
      outsideConditions={outsideConditions}
    />
  )
}
