import { WebCalEventFinder } from './WebCalEventFinder'

const IDS = {
  HOLIDAY: 52,
  GOOD_TO_KNOW: 180,
  THEME: 899,
  NAMEDAY: 263,
}

export const holiday = new WebCalEventFinder(IDS.HOLIDAY)
export const goodToKnow = new WebCalEventFinder(IDS.GOOD_TO_KNOW)
export const theme = new WebCalEventFinder(IDS.THEME)
export const nameday = new WebCalEventFinder(IDS.NAMEDAY)
