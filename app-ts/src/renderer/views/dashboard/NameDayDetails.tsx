interface Props {
  names: string[]
}

export const NameDayDetails: React.FC<Props> = ({ names }) => {
  return (
    <div className="dashboard-row">
      <p className="dashboard-text">
        Name days: <span data-testid="name-day-names">{names.join(', ')}</span>
      </p>
    </div>
  )
}
