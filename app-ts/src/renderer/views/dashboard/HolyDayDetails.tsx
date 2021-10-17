interface Props {
  events: string[]
}

export const HolyDayDetails: React.FC<Props> = ({ events }) => {
  return (
    <div className="dashboard-row">
      <p className="dashboard-text">
        Holy days: <span data-testid="holy-days">{events.join(', ')}</span>
      </p>
    </div>
  )
}
