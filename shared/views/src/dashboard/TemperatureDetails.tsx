import { Temperature } from '@shared/types'

interface Props {
  temperature: Temperature
}

export const TemperatureDetails: React.FC<Props> = ({ temperature }) => {
  return (
    <>
      <p className="dashboard-text temperature-side-text">
        <span>{formatTemperature(temperature)}</span>
        <span className="txt-color-2">°C</span>
      </p>
    </>
  )
}

function formatTemperature(temperature: Temperature): string {
  return temperature.toFixed(1)
}
