import { formatDistance } from 'renderer/utils/formatDistance'

interface Props {
  dateNow: Date
  lastUpdated: Date
}

export const LastUpdatedDetails: React.FC<Props> = ({
  lastUpdated,
  dateNow,
}) => {
  return (
    <div className="dashboard-row">
      <p className="dashboard-text last-updated-text">
        {formatLastUpdated(lastUpdated, dateNow)}
      </p>
    </div>
  )
}

function formatLastUpdated(lastUpdated: Date, date: Date) {
  return `${formatDistance(lastUpdated, date, { includeSeconds: true })} ago`
}
