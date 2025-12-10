import { Temperature } from 'types'

interface Props {
  temperature: Temperature
  icon?: React.ReactNode
}

export const TemperatureDetails: React.FC<Props> = ({ temperature, icon }) => {
  return (
    <>
      <p className="dashboard-text temperature-side-text">
        {icon && <span style={{ marginRight: '8px' }}>{icon}</span>}
        <span>{formatTemperature(temperature)}</span>
        <span className="txt-color-2">°C</span>
      </p>
    </>
  )
}

function formatTemperature(temperature: Temperature): string {
  return temperature.toFixed(1)
}
