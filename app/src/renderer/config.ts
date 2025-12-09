import { cfg } from '../config'

const rendererConfig = {
  ...cfg,
  hideCursor: process.env.HIDE_CURSOR === 'true',
  logLevel: 'level',
}

export { rendererConfig as cfg }
