import got from 'got'
import parseDate from 'date-fns/parse'
import { ConditionData } from '../../../types'

export class OutsideConditionsFinder {
  /**
   * fmisid 101794 = Oulu, Vihreäsaari satama
   * fmisid 101799 = Oulu, Oulunsalo Pellonpää
   * fmisid 108040 = Oulu, Kaukovainio
   */
  private static fmisid = '108040'

  private static get url() {
    return `https://www.ilmatieteenlaitos.fi/api/weather/observations?fmisid=${this.fmisid}&observations=true`
  }

  public static async getLatest() {
    const data = await this.getJSON(this.url)
    // iterating in reverse, get first observation with temperature
    for (let i = data.observations.length - 1; i >= 0; i--) {
      const observation = data.observations[i]
      if (observation.t2m !== null) {
        return this.formatObservation(observation)
      }
    }

    throw new Error('No valid observations were found!')
  }

  private static formatObservation(observation: any): ConditionData {
    return {
      temperature: observation.t2m,
      humidity: observation.Humidity,
      lastUpdated: parseDate(
        observation.localtime,
        "yyyyMMdd'T'HHmmss",
        new Date(),
      ),
      location: this.getLocation(),
    }
  }

  private static getLocation(): string | undefined {
    switch (this.fmisid) {
      case '101794':
        return 'Vihreäsaari, Oulu'
      case '101799':
        return 'Oulunsalo, Oulu'
      case '108040':
        return 'Kaukovainio, Oulu'
    }
    return undefined
  }

  private static async getJSON(url: string) {
    const res = await got.get(url, { responseType: 'text' })
    return JSON.parse(res.body)
  }
}
