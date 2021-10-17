interface Props {
  events: string[]
}

export const HolidayDetails: React.FC<Props> = ({ events }) => {
  return (
    <div className="dashboard-row">
      <p className="dashboard-text">
        Holidays: <span data-testid="holidays">{events.join(', ')}</span>
      </p>
    </div>
  )
}
