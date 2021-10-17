import { formatDistance } from 'renderer/utils/formatDistance'

interface Props {
  date: Date
  lastUpdated: Date
}

export const LastUpdatedDetails: React.FC<Props> = ({ lastUpdated, date }) => {
  return (
    <div className="dashboard-row">
      <p className="dashboard-text last-updated-text">
        {formatLastUpdated(lastUpdated, date)}
      </p>
    </div>
  )
}

function formatLastUpdated(lastUpdated: Date, date: Date) {
  return `Updated ${formatDistance(lastUpdated, date)} ago`
}
