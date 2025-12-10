interface Props {
  label: string
  events: string[]
  icon?: React.ReactNode
}

export const EventDetails: React.FC<Props> = ({ label, events, icon }) => {
  return (
    <div className="event-details-container">
      <div className="event-details-label">
        {icon && <span style={{ marginRight: '8px' }}>{icon}</span>}
        {label}
      </div>
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
