import { CalendarEvents } from '@shared/types'
import { EventDetails } from './EventDetails'

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
          <EventDetails label="Name days" events={events.nameday} />
        )}

        {events.holiday.length > 0 && (
          <EventDetails label="Holidays" events={events.holiday} />
        )}

        {events.goodToKnow.length > 0 && (
          <EventDetails label="Good to know" events={events.goodToKnow} />
        )}

        {events.theme.length > 0 && (
          <EventDetails label="Theme" events={events.theme} />
        )}
      </div>
    )}
  </div>
)
