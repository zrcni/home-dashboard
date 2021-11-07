import { formatDate } from 'renderer/utils/formatDate'
import { HeaderCell } from './HeaderCell'

interface Props {
  date: Date
}

export const DashboardClock: React.FC<Props> = ({ date }) => {
  return (
    <HeaderCell>
      <p className="dashboard-text calendar-date-text">
        {formatDate(date, 'EEEE, d.MM.yyyy')}
      </p>
      <p className="dashboard-text clock-text">
        {formatDate(date, 'HH:mm:ss')}
      </p>

      <p className="dashboard-text calendar-date-text-small">
        {formatDate(date, "'WEEK' I")}
      </p>
    </HeaderCell>
  )
}
