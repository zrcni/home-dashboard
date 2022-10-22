import { SQLite } from '../sqlite'
import { ConditionsMetrics } from './ConditionsMetrics'

export class Metrics {
  sqlite: SQLite

  constructor(sqlite: SQLite) {
    this.sqlite = sqlite
  }

  get conditions() {
    return new ConditionsMetrics(this.sqlite)
  }
}
