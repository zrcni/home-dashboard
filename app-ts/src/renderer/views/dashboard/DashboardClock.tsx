import { formatDate } from 'renderer/utils/formatDate'

interface Props {
  date: Date
}

export const DashboardClock: React.FC<Props> = ({ date }) => {
  return (
    <div className="dashboard-row">
      <p className="dashboard-text clock-text">{formatTimeOfDay(date)}</p>

      <p className="dashboard-text calendar-date-text">
        {formatCalendarDate(date)}
      </p>
    </div>
  )
}

function formatTimeOfDay(date: Date) {
  return formatDate(date, 'HH:mm:ss')
}

function formatCalendarDate(date: Date) {
  return formatDate(date, "E, dd/MM – 'week' I")
}
