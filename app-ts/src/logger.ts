import winston from 'winston'
import { cfg } from './config'

const format = cfg.dev
  ? winston.format.combine(
      winston.format.timestamp(),
      winston.format.prettyPrint()
    )
  : winston.format.combine(winston.format.timestamp(), winston.format.json())

export const logger = winston.createLogger({
  level: cfg.logLevel,
  format,
  transports: [new winston.transports.Console()],
})
