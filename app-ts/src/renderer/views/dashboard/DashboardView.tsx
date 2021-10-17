import { DashboardClock } from './DashboardClock'
import { CalendarEvents, ConditionData } from 'types'
import { TemperatureDetails } from './TemperatureDetails'
import { HumidityDetails } from './HumidityDetails'
import { LastUpdatedDetails } from './LastUpdatedDetails'
import { ConditionDataMissing } from './ConditionDataMissing'
import { NameDayDetails } from './NameDayDetails'
import { HolidayDetails } from './HolidayDetails'
import { HolyDayDetails } from './HolyDayDetails'
import './DashboardView.global.css'

interface Props {
  date: Date
  conditions: ConditionData | null
  events: CalendarEvents | null
}

export const DashboardView: React.FC<Props> = ({
  date,
  conditions,
  events,
}) => {
  return (
    <div id="dashboard-view">
      <DashboardClock date={date} />

      {events && (
        <>
          {events.nameDays.official.length > 0 && (
            <NameDayDetails names={events.nameDays.official} />
          )}
          {events.holiday.length > 0 && (
            <HolidayDetails events={events.holiday} />
          )}
          {events.holy.length > 0 && <HolyDayDetails events={events.holy} />}
        </>
      )}

      {conditions && (
        <>
          <TemperatureDetails temperature={conditions.temperature} />
          <HumidityDetails humidity={conditions.humidity} />
          <LastUpdatedDetails
            date={date}
            lastUpdated={conditions.lastUpdated}
          />
        </>
      )}

      {!conditions && <ConditionDataMissing />}
    </div>
  )
}
