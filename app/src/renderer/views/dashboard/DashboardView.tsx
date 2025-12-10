import addDays from 'date-fns/addDays'
import { GetCalendarEventsResult, ConditionData } from 'types'
import { DashboardClock } from './DashboardClock'
import { TemperatureDetails } from './TemperatureDetails'
import { HumidityDetails } from './HumidityDetails'
import { CalendarEventsColumn } from './CalendarEventsColumn'
import { HeaderCell } from './HeaderCell'
import { formatDate } from '../../utils'
import './DashboardView.global.css'
import { LastUpdatedDetails } from './LastUpdatedDetails'
import { FaHome, FaTree } from 'react-icons/fa'

interface Props {
  dateNow: Date
  insideConditions: ConditionData | null
  outsideConditions: ConditionData | null
  eventsToday: GetCalendarEventsResult | null
  eventsTomorrow: GetCalendarEventsResult | null
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
                  icon={<FaTree />}
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
                  icon={<FaHome />}
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
