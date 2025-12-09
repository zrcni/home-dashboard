import { Database } from 'sqlite3'

export class SQLite {
  private db: Database

  constructor(filename: string) {
    this.db = new Database(filename)
  }

  exec(sql: string) {
    return new Promise((resolve, reject) => {
      this.db.exec(sql, (err) => (err ? reject(err) : resolve(undefined)))
    })
  }

  run(sql: string, ...params: any[]) {
    return new Promise((resolve, reject) => {
      this.db.run(
        sql,
        ...params.concat((err: Error | null) =>
          err ? reject(err) : resolve(undefined)
        )
      )
    })
  }

  get<T = any>(sql: string, ...params: any[]) {
    return new Promise((resolve, reject) => {
      this.db.get(
        sql,
        ...params.concat((err: Error | null, row: T) =>
          err ? reject(err) : resolve(row)
        )
      )
    })
  }

  all<T = any>(sql: string, ...params: any[]) {
    return new Promise((resolve, reject) => {
      this.db.all(
        sql,
        ...params.concat((err: Error | null, rows: T[]) =>
          err ? reject(err) : resolve(rows)
        )
      )
    })
  }
}
