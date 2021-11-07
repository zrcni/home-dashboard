import { CalendarEvents } from 'types'
import { EventDetails } from './EventDetails'

interface Props {
  label: string
  events: CalendarEvents
}

export const CalendarEventsColumn: React.FC<Props> = ({ label, events }) => (
  <div>
    <h1 style={{ textDecoration: 'underline' }}>{label}</h1>

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
