import { Humidity } from 'types'

interface Props {
  humidity: Humidity
}

export const HumidityDetails: React.FC<Props> = ({ humidity }) => {
  return (
    <>
      <p className="dashboard-text humidity-side-text">
        <span>{formatHumidity(humidity)}</span>
        <span className="txt-color-2">%</span>
      </p>
    </>
  )
}

function formatHumidity(humidity: Humidity): string {
  return humidity.toFixed(1)
}
