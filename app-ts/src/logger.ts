import winston from 'winston'

export function createLogger(
  logLevel: winston.LoggerOptions['level'],
  dev?: boolean
) {
  const format = dev
    ? winston.format.combine(
        winston.format.timestamp(),
        winston.format.prettyPrint()
      )
    : winston.format.combine(winston.format.timestamp(), winston.format.json())

  return winston.createLogger({
    level: logLevel,
    format,
    transports: [new winston.transports.Console()],
  })
}
