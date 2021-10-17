import { Temperature } from 'types'

interface Props {
  temperature: Temperature
  useLabel?: boolean
}

export const TemperatureDetails: React.FC<Props> = ({
  temperature,
  useLabel,
}) => {
  return (
    <>
      <p className="dashboard-text dashboard-header-side-text">
        {formatTemperature(temperature)}
      </p>
      {useLabel && (
        <p className="dashboard-text dashboard-label">temperature</p>
      )}
    </>
  )
}

function formatTemperature(temperature: Temperature) {
  const v = temperature.toFixed(1)
  return `${v}°C`
}
