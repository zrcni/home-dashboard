import { EventEmitter } from 'events'
import { PubSubInMemory } from '../../../pub-sub/PubSubInMemory'
import { saveLivingRoomConditionsSubscription } from '../saveLivingRoomConditionsSubscription'
import { migrateUp, resetDb } from '../../../migrations'
import { SQLite } from '../../../sqlite'
import { MQTT_TOPICS } from '../../../mqtt'
import { ConditionsRecord, ConditionsUpdatedPayload } from '../../types'
import { flushPromises } from '../../../../test-utils'

describe('saveLivingRoomConditionsSubscription', () => {
  let sqlite: SQLite

  beforeAll(async () => {
    sqlite = new SQLite(':memory:')
    await migrateUp(sqlite)
  })

  beforeEach(() => resetDb(sqlite))

  it('add record to _conditions_ table', async () => {
    const emitter = new EventEmitter()
    const pubsub = new PubSubInMemory(emitter)

    saveLivingRoomConditionsSubscription(pubsub, sqlite)

    jest.spyOn(Date, 'now').mockReturnValue(1665779082868)

    const payload = {
      humidity: 20.1,
      temperature: 23.2,
      device_id: 'mock_device',
      timestamp: 1665779082868,
      client_id: 'mock_client',
    } as ConditionsUpdatedPayload

    emitter.emit(MQTT_TOPICS.LIVING_ROOM_CONDITIONS_UPDATED, payload)

    await flushPromises()

    const records = (await sqlite.all(
      `SELECT * FROM conditions;`
    )) as ConditionsRecord[]

    expect(records).toHaveLength(1)

    const record = records[0]
    expect(record).toEqual({
      client_id: 'mock_client',
      device_id: 'mock_device',
      humidity: 20.1,
      location: 'livingroom',
      temperature: 23.2,
      timestamp: 1665779082868,
    })
  })
})
