import { formatDate } from 'renderer/utils/formatDate'
import { HeaderCell } from './HeaderCell'

interface Props {
  date: Date
}

export const DashboardClock: React.FC<Props> = ({ date }) => {
  return (
    <HeaderCell>
      <p className="dashboard-text calendar-date-text">
        <span>{formatDate(date, 'd')}</span>
        <span className="txt-color-2">.</span>
        <span>{formatDate(date, 'MM')}</span>
        <span className="txt-color-2">.</span>
        <span>{formatDate(date, 'yyyy')}</span>
      </p>

      <p className="dashboard-text clock-text">
        <span>{formatDate(date, 'HH')}</span>
        <span className="txt-color-2">:</span>
        <span>{formatDate(date, 'mm')}</span>
        <span className="txt-color-2">:</span>
        <span>{formatDate(date, 'ss')}</span>
      </p>

      <p className="dashboard-text calendar-date-text-small">
        <span className="txt-color-2">{'W '}</span>
        <span>{formatDate(date, 'I')}</span>
      </p>
    </HeaderCell>
  )
}
