import ms from 'ms'
import { addDays } from 'date-fns'
import { useLivingRoomConditions } from 'renderer/conditions/useLivingRoomConditions'
import { useOutsideConditions } from 'renderer/conditions/useOutsideConditions'
import { useCalendarEvents } from 'renderer/calendar/useCalendarEvents'
import { DashboardView } from './DashboardView'
import { useStore } from 'renderer/store'

export const DashboardViewController: React.FC = () => {
  const date = useStore((state) => state.date)
  const insideConditions = useLivingRoomConditions()
  const outsideConditions = useOutsideConditions()
  const eventsToday = useCalendarEvents(date)
  const eventsTomorrow = useCalendarEvents(addDays(date, 1))

  return (
    <DashboardView
      dateNow={date}
      eventsToday={eventsToday}
      eventsTomorrow={eventsTomorrow}
      insideConditions={insideConditions}
      outsideConditions={outsideConditions}
    />
  )
}
