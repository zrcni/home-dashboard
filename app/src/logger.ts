import {
  format,
  transports,
  LoggerOptions,
  createLogger as createWinstonLogger,
} from 'winston'

export function createLogger(logLevel: LoggerOptions['level'], dev?: boolean) {
  const selectedFormat = dev
    ? format.combine(
        format.timestamp(),
        format.errors({ stack: true }),
        format.prettyPrint(),
      )
    : format.combine(
        format.timestamp(),
        format.errors({ stack: false }),
        format.json(),
      )

  return createWinstonLogger({
    level: logLevel,
    format: selectedFormat,
    transports: [new transports.Console()],
  })
}
