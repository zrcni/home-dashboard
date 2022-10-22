import { SQLite } from '../sqlite'

export class ConditionsMetrics {
  sqlite: SQLite

  constructor(sqlite: SQLite) {
    this.sqlite = sqlite
  }

  /**
   * TODO date range
   */
  async getByLocation(location: string) {
    return this.sqlite.all(
      `SELECT temperature, humidity, timestamp * 1000 as timestamp FROM conditions WHERE location = ?`,
      location
    )
  }
}
