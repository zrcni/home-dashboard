import { createLogger } from '../logger'
import { cfg } from './config'

export const logger = createLogger(cfg.logLevel, cfg.dev)
