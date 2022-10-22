interface Props {
  label: string
  events: string[]
}

export const EventDetails: React.FC<Props> = ({ label, events }) => {
  return (
    <div className="event-details-container">
      <div className="event-details-label">{label}</div>
      <div>
        {events.map((event) => (
          <div key={event} className="event-details-text">
            {event}
          </div>
        ))}
      </div>
    </div>
  )
}
