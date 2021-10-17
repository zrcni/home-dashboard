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
        {events.nameDays.official.length > 0 && (
          <EventDetails label="Name days" events={events.nameDays.official} />
        )}

        {events.holiday.length > 0 && (
          <EventDetails label="Holidays" events={events.holiday} />
        )}

        {events.holy.length > 0 && (
          <EventDetails label="Holy days" events={events.holy} />
        )}
      </div>
    )}
  </div>
)
