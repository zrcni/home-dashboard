import { DashboardClock } from './DashboardClock'
import { CalendarEvents, ConditionData } from 'types'
import { TemperatureDetails } from './TemperatureDetails'
import { HumidityDetails } from './HumidityDetails'
import { CalendarEventsColumn } from './CalendarEventsColumn'
import { HeaderCell } from './HeaderCell'
import './DashboardView.global.css'

interface Props {
  date: Date
  conditions: ConditionData | null
  eventsToday: CalendarEvents | null
  eventsTomorrow: CalendarEvents | null
}

export const DashboardView: React.FC<Props> = ({
  date,
  conditions,
  eventsToday,
  eventsTomorrow,
}) => {
  return (
    <div id="dashboard-view">
      <div className="dashboard-row dashboard-view-header">
        <HeaderCell>
          {conditions && (
            <TemperatureDetails temperature={conditions.temperature} />
          )}
        </HeaderCell>

        <HeaderCell>
          <DashboardClock date={date} />
        </HeaderCell>

        <HeaderCell>
          {conditions && <HumidityDetails humidity={conditions.humidity} />}
        </HeaderCell>
      </div>

      <div className="dashboard-row dashboard-content">
        {eventsToday && (
          <CalendarEventsColumn label="Today" events={eventsToday} />
        )}
        {eventsTomorrow && (
          <CalendarEventsColumn label="Tomorrow" events={eventsTomorrow} />
        )}
      </div>
    </div>
  )
}
