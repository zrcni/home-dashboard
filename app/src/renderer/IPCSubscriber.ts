import { IpcRendererEvent } from 'electron'
import { nanoid } from 'nanoid'

export class IPCSubscriber {
  static subscribe<Params = any, Payload = any>(
    subscriptionName: string,
    params: Params,
    handler: (payload: Payload) => void,
  ) {
    function _handler(_: IpcRendererEvent, payload: Payload) {
      handler(payload)
    }

    window.electronAPI.ipcRenderer.on(subscriptionName, _handler)

    const subscriptionId = nanoid(12)

    window.electronAPI.ipcRenderer.send('subscribe-request', {
      subscriptionId,
      subscriptionName,
      params,
    })

    return function unsubscribe() {
      window.electronAPI.ipcRenderer.off(subscriptionName, _handler)

      window.electronAPI.ipcRenderer.send('unsubscribe-request', {
        subscriptionId,
      })
    }
  }
}
