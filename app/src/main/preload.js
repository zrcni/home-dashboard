const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  env: {
    HIDE_CURSOR: process.env.HIDE_CURSOR,
  },
  ipcRenderer: {
    send(channel, ...args) {
      ipcRenderer.send(channel, ...args)
    },
    on(channel, func) {
      ipcRenderer.on(channel, func)
    },
    once(channel, func) {
      ipcRenderer.once(channel, func)
    },
    off(channel, func) {
      ipcRenderer.off(channel, func)
    },
  },
})
