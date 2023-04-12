import addDays from 'date-fns/addDays'
import { CalendarEvents, ConditionData } from '@shared/types'
import { DashboardClock } from './DashboardClock'
import { TemperatureDetails } from './TemperatureDetails'
import { HumidityDetails } from './HumidityDetails'
import { CalendarEventsColumn } from './CalendarEventsColumn'
import { HeaderCell } from './HeaderCell'
import { formatDate } from '@shared/utils'
import { LastUpdatedDetails } from './LastUpdatedDetails'
import './DashboardView.global.css'

interface Props {
  dateNow: Date
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
  dateNow,
  insideConditions,
  outsideConditions,
  eventsToday,
  eventsTomorrow,
}) => {
  const todayDayOfWeek = formatDate(dateNow, 'EEEE')
  const tomorrowDayOfWeek = formatDate(addDays(dateNow, 1), 'EEEE')

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
                <LastUpdatedDetails
                  dateNow={dateNow}
                  lastUpdated={outsideConditions.lastUpdated}
                />
              </div>
            </>
          )}
        </HeaderCell>

        <HeaderCell>
          <DashboardClock date={dateNow} />
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
                <LastUpdatedDetails
                  dateNow={dateNow}
                  lastUpdated={insideConditions.lastUpdated}
                />
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
