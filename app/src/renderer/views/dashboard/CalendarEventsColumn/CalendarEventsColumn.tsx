import { CalendarEvents } from 'types'
import { EventDetails } from './EventDetails'
import {
  FaBirthdayCake,
  FaCalendarCheck,
  FaInfoCircle,
  FaPalette,
} from 'react-icons/fa'

interface Props {
  labelPrimary: string
  labelSecondary: string
  events: CalendarEvents
}

export const CalendarEventsColumn: React.FC<Props> = ({
  labelPrimary,
  labelSecondary,
  events,
}) => (
  <div>
    <h4 className="date-events-title-secondary">{labelSecondary}</h4>
    <h2 className="date-events-title-primary">{labelPrimary}</h2>

    <div className="calender-events-divider" />

    {events && (
      <div className="event-details-container">
        {events.nameday.length > 0 && (
          <EventDetails events={events.nameday} icon={<FaBirthdayCake />} />
        )}

        {events.holiday.length > 0 && (
          <EventDetails events={events.holiday} icon={<FaCalendarCheck />} />
        )}

        {events.goodToKnow.length > 0 && (
          <EventDetails events={events.goodToKnow} icon={<FaInfoCircle />} />
        )}

        {events.theme.length > 0 && (
          <EventDetails events={events.theme} icon={<FaPalette />} />
        )}
      </div>
    )}
  </div>
)
