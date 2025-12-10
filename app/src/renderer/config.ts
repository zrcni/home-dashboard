import { cfg } from '../config'

const rendererConfig = {
  ...cfg,
  hideCursor: window.electronAPI.env.HIDE_CURSOR === 'true',
  logLevel: 'level',
}

export { rendererConfig as cfg }
