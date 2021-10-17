import { Humidity } from 'types'

interface Props {
  humidity: Humidity
}

export const HumidityDetails: React.FC<Props> = ({ humidity }) => {
  return (
    <div className="dashboard-row">
      <p className="dashboard-text dashboard-humidity-text">
        {formatHumidity(humidity)}
      </p>
      <p className="dashboard-text dashboard-label">humidity</p>
    </div>
  )
}

function formatHumidity(humidity: Humidity) {
  const v = humidity.toFixed(1)
  return `${v}%`
}
