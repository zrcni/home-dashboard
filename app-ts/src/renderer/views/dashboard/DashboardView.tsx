import addDays from 'date-fns/addDays'
import { CalendarEvents, ConditionData } from 'types'
import { DashboardClock } from './DashboardClock'
import { TemperatureDetails } from './TemperatureDetails'
import { HumidityDetails } from './HumidityDetails'
import { CalendarEventsColumn } from './CalendarEventsColumn'
import { HeaderCell } from './HeaderCell'
import { formatDate } from '../../utils'
import './DashboardView.global.css'

interface Props {
  date: Date
  insideConditions: ConditionData | null
  outsideConditions: ConditionData | null
  eventsToday: CalendarEvents | null
  eventsTomorrow: CalendarEvents | null
}

/**
 * TODO: move inside and outside condition views' code into a shared view
 *       and show last updated timestamp
 */
export const DashboardView: React.FC<Props> = ({
  date,
  insideConditions,
  outsideConditions,
  eventsToday,
  eventsTomorrow,
}) => {
  const todayDayOfWeek = formatDate(date, 'EEEE')
  const tomorrowDayOfWeek = formatDate(addDays(date, 1), 'EEEE')

  return (
    <div id="dashboard-view">
      <div className="dashboard-row dashboard-view-header">
        <HeaderCell>
          {outsideConditions && (
            <>
              <div className="dashboard-side-container">
                <h4 className="conditions-title">OUT</h4>
              </div>
              <div>
                <TemperatureDetails
                  temperature={outsideConditions.temperature}
                />
                <HumidityDetails humidity={outsideConditions.humidity} />
              </div>
            </>
          )}
        </HeaderCell>

        <HeaderCell>
          <DashboardClock date={date} />
        </HeaderCell>

        <HeaderCell>
          {insideConditions && (
            <>
              <div className="dashboard-side-container">
                <h4 className="conditions-title">IN</h4>
              </div>
              <div>
                <TemperatureDetails
                  temperature={insideConditions.temperature}
                />
                <HumidityDetails humidity={insideConditions.humidity} />
              </div>
            </>
          )}
        </HeaderCell>
      </div>

      <div className="dashboard-row dashboard-content">
        {eventsToday && (
          <CalendarEventsColumn
            labelPrimary={todayDayOfWeek}
            labelSecondary="Today"
            events={eventsToday}
          />
        )}
        {eventsTomorrow && (
          <CalendarEventsColumn
            labelPrimary={tomorrowDayOfWeek}
            labelSecondary="Tomorrow"
            events={eventsTomorrow}
          />
        )}
      </div>
    </div>
  )
}
