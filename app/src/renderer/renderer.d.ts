export interface ElectronAPI {
  ipcRenderer: {
    send<P = unknown>(channel: string, event?: P): void

    on<P = unknown>(
      channel: string,
      func: (e: Electron.IpcRendererEvent, payload: P) => void,
    ): void

    once<P = unknown>(
      channel: string,
      func: (e: Electron.IpcRendererEvent, payload: P) => void,
    ): void

    off<P = unknown>(
      channel: string,
      func: (e: Electron.IpcRendererEvent, payload: P) => void,
    ): void
  }
}

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}
