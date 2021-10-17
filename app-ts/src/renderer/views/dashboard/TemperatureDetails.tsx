import { Temperature } from 'types'

interface Props {
  temperature: Temperature
}

export const TemperatureDetails: React.FC<Props> = ({ temperature }) => {
  return (
    <div className="dashboard-row">
      <p className="dashboard-text dashboard-temperature-text">
        {formatTemperature(temperature)}
      </p>
      <p className="dashboard-text dashboard-label">temperature</p>
    </div>
  )
}

function formatTemperature(temperature: Temperature) {
  const v = temperature.toFixed(1)
  return `${v}°C`
}
