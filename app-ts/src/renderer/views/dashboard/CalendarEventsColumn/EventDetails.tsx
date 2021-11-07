interface Props {
  label: string
  events: string[]
}

export const EventDetails: React.FC<Props> = ({ label, events }) => {
  return (
    <div className="event-details-container">
      <div>
        <b>{label}</b>
      </div>
      <div>
        {events.map((event) => (
          <div key={event}>{event}</div>
        ))}
      </div>
    </div>
  )
}
