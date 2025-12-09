import fs from 'fs'
import path from 'path'
import { OutsideConditionsFinder } from '..'

describe('OutsideConditionsFinder', () => {
  it('get outside conditions', async () => {
    jest
      .spyOn(OutsideConditionsFinder as any, 'getJSON')
      .mockImplementation(() =>
        JSON.parse(
          fs
            .readFileSync(path.resolve(__dirname, 'api-response.json'))
            .toString()
        )
      )

    const conditions = await OutsideConditionsFinder.getLatest()
    expect(conditions).toEqual({
      humidity: 82,
      lastUpdated: new Date('2021-11-07T12:40:00.000Z'),
      temperature: -0.6,
    })
  })
})
