import { DashboardClock } from './DashboardClock'
import { CalendarEvents, ConditionData } from 'types'
import { TemperatureDetails } from './TemperatureDetails'
import { HumidityDetails } from './HumidityDetails'
import { CalendarEventsColumn } from './CalendarEventsColumn'
import { HeaderCell } from './HeaderCell'
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
  return (
    <div id="dashboard-view">
      <div className="dashboard-row dashboard-view-header">
        <HeaderCell>
          {outsideConditions && (
            <>
              <div>
                <h4>🏞️ Outside</h4>
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
              <div>
                <h4>🏠 Inside</h4>
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
          <CalendarEventsColumn label="Today" events={eventsToday} />
        )}
        {eventsTomorrow && (
          <CalendarEventsColumn label="Tomorrow" events={eventsTomorrow} />
        )}
      </div>
    </div>
  )
}
