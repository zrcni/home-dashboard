interface Props {
  events: string[]
  icon?: React.ReactNode
}

export const EventDetails: React.FC<Props> = ({ events, icon }) => {
  return (
    <>
      {events.map((event, index) => (
        <div key={`${event}-${index}`} className="event-details-item">
          {icon && <span className="event-details-icon">{icon}</span>}
          <span className="event-details-text">{event}</span>
        </div>
      ))}
    </>
  )
}
