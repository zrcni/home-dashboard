import { formatDistance } from "@shared/utils"

interface Props {
  dateNow: Date
  lastUpdated: Date
}

export const LastUpdatedDetails: React.FC<Props> = ({
  lastUpdated,
  dateNow,
}) => {
  const dateString = formatLastUpdated(lastUpdated, dateNow)

  return (
    <div className="dashboard-row">
      {/* By using key prop the animation plays every time the value changes */}
      <p className="dashboard-text last-updated-text" key={dateString}>
        {dateString}
      </p>
    </div>
  )
}

function formatLastUpdated(lastUpdated: Date, date: Date) {
  return `${formatDistance(lastUpdated, date)} ago`
}
