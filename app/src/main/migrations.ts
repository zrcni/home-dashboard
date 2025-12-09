import { SQLite } from './sqlite'
import { up, down } from './migration-defs'

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

// TODO: don't run migrations if they've already been run! (use a library or something)
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
  return type === 'up' ? up : down
}
