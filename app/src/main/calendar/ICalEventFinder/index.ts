import { ICalEventFinder } from './ICalEventFinder'
import { cfg } from '../../config'

export const iCalEventFinders = cfg.icals.map(
  (ical) => new ICalEventFinder(ical.url, ical.categoryId),
)
