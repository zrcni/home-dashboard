import { Humidity } from 'types'
import { HeaderCell } from './HeaderCell'

interface Props {
  humidity: Humidity
  useLabel?: boolean
}

export const HumidityDetails: React.FC<Props> = ({ humidity, useLabel }) => {
  return (
    <>
      <p className="dashboard-text dashboard-header-side-text">
        {formatHumidity(humidity)}
      </p>
      {useLabel && <p className="dashboard-text dashboard-label">humidity</p>}
    </>
  )
}

function formatHumidity(humidity: Humidity) {
  const v = humidity.toFixed(1)
  return `${v}%`
}
