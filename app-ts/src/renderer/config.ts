import { cfg } from '../config'

const rendererConfig = {
  ...cfg,
  hideCursor: cfg.prod,
}

export { rendererConfig as cfg }
