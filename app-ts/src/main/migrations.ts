import path from 'path'
import fs from 'fs/promises'
import { cfg } from './config'
import { SQLite } from './sqlite'

export function migrateUp(sqlite: SQLite) {
  return runMigrations(sqlite, 'up')
}

export function migrateDown(sqlite: SQLite) {
  return runMigrations(sqlite, 'down')
}

export async function resetDb(sqlite: SQLite) {
  await migrateDown(sqlite)
  await migrateUp(sqlite)
}

async function runMigrations(sqlite: SQLite, type: 'up' | 'down') {
  const migrations = await getMigrations(type)

  const sql = `
BEGIN TRANSACTION;
${migrations.join('\n')}
COMMIT;
`

  await sqlite.exec(sql)
}

async function getMigrations(type: 'up' | 'down') {
  const filePaths = await fs.readdir(cfg.migrationsPath)
  const promises = filePaths
    .filter((filename) => filename.endsWith(`.${type}.sql`))
    .map((filename) =>
      fs
        .readFile(path.join(cfg.migrationsPath, filename))
        .then((buffer) => buffer.toString())
    )
  return Promise.all(promises)
}
