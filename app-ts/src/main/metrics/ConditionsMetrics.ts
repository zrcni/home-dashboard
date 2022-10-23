import { ConditionMetricRow } from 'types'
import { SQLite } from '../sqlite'

export class ConditionsMetrics {
  sqlite: SQLite

  constructor(sqlite: SQLite) {
    this.sqlite = sqlite
  }

  async getByLocation(location: string, dateRange: [Date, Date]) {
    const rows = await this.sqlite.all(
      `SELECT strftime('%Y-%m-%dT%H:%M:00Z', timestamp, 'unixepoch') AS timestamp, avg(temperature) AS temperature, avg(humidity) as humidity
      FROM conditions WHERE location = ? AND timestamp BETWEEN ? AND ?
      GROUP BY timestamp
      ORDER BY timestamp ASC`,
      location,
      Math.floor(dateRange[0].valueOf() / 1000),
      Math.ceil(dateRange[1].valueOf() / 1000)
    )
    return rows as ConditionMetricRow[]
  }
}
