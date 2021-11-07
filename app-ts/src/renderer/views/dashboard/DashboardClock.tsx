import { formatDate } from 'renderer/utils/formatDate'
import { HeaderCell } from './HeaderCell'

interface Props {
  date: Date
}

export const DashboardClock: React.FC<Props> = ({ date }) => {
  return (
    <HeaderCell>
      <p className="dashboard-text clock-text">{formatTimeOfDay(date)}</p>

      <p className="dashboard-text calendar-date-text">
        {formatCalendarDate(date)}
      </p>
    </HeaderCell>
  )
}

function formatTimeOfDay(date: Date) {
  return formatDate(date, 'HH:mm:ss')
}

function formatCalendarDate(date: Date) {
  return formatDate(date, "E, dd/MM – 'week' I")
}
