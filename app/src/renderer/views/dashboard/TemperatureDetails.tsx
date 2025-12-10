import { Temperature } from 'types'

interface Props {
  temperature: Temperature
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

export const TemperatureDetails: React.FC<Props> = ({
  temperature,
  icon,
  iconPosition = 'left',
}) => {
  const iconStyle: React.CSSProperties =
    iconPosition === 'left'
      ? {
          right: '100%',
          marginRight: '15px',
        }
      : {
          left: '100%',
          marginLeft: '15px',
        }

  return (
    <p
      className="dashboard-text temperature-side-text"
      style={{ position: 'relative', display: 'inline-block' }}
    >
      {icon && (
        <span
          style={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            ...iconStyle,
          }}
        >
          {icon}
        </span>
      )}
      <span>{formatTemperature(temperature)}</span>
      <span className="txt-color-2">°C</span>
    </p>
  )
}

function formatTemperature(temperature: Temperature): string {
  return temperature.toFixed(1)
}
