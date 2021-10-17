/* eslint import/no-mutable-exports: off */
import { URL } from 'url'
import path from 'path'
import { cfg } from './config'

export let resolveHtmlPath: (htmlFileName: string) => string

if (cfg.dev) {
  const port = process.env.PORT || 1212
  resolveHtmlPath = (htmlFileName: string) => {
    const url = new URL(`http://localhost:${port}`)
    url.pathname = htmlFileName
    return url.href
  }
} else {
  resolveHtmlPath = (htmlFileName: string) => {
    return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`
  }
}
