import { CalendarEvent } from 'types'
import { format } from 'date-fns'

interface Props {
  events: CalendarEvent[]
  icon?: React.ReactNode
}

export const EventDetails: React.FC<Props> = ({ events, icon }) => {
  return (
    <>
      {events.map((event, index) => (
        <div key={`${event.text}-${index}`} className="event-details-item">
          {icon && <span className="event-details-icon">{icon}</span>}
          <span className="event-details-text">
            {event.text}
            {!event.isAllDay && event.personal && (
              <span className="event-time">
                {' '}
                {format(event.startDate, 'HH:mm')} -{' '}
                {format(event.endDate, 'HH:mm')}{' '}
              </span>
            )}
          </span>
        </div>
      ))}
    </>
  )
}
