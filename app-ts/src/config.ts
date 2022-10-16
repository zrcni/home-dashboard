export const cfg = {
  dev: process.env.NODE_ENV === 'development',
  prod: process.env.NODE_ENV === 'production',
  logLevel: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
}
