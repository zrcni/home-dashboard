import { GetCalendarEventsResult } from 'types'
import { EventDetails } from './EventDetails'
import {
  FaCalendarCheck,
  FaInfoCircle,
  FaUser,
  FaMoon,
  FaCalendarAlt,
  FaGlobe,
  FaTag,
} from 'react-icons/fa'

interface Props {
  labelPrimary: string
  labelSecondary: string
  events: GetCalendarEventsResult
}

const iconMapping: Record<string, React.ReactNode> = {
  personal: <FaUser />,
  finnishHolidays: <FaCalendarCheck />,
  goodToKnow: <FaInfoCircle />,
  theme: <FaGlobe />,
  nameDays: <FaTag />,
  moonCycle: <FaMoon />,
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
        {events.map((category) => (
          <EventDetails
            key={category.categoryId}
            events={category.events}
            icon={iconMapping[category.categoryId] || <FaCalendarAlt />}
          />
        ))}
      </div>
    )}
  </div>
)
