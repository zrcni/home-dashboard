import { nanoid } from 'nanoid'

interface ErrorPayload<Err extends Error = Error> {
  error: Err
}

interface QueryResultPayload<T = any> {
  payload: T
}

interface QueryOptions {
  timeout?: number
}

const TIMEOUT_DURATION_MS_DEFAULT = 5000

export class RendererCommand {
  static run<Params = any, Result = any, Err extends Error = Error>(
    commandName: string,
    params?: Params,
    opts?: QueryOptions
  ): Promise<Result> {
    const requestId = nanoid(12)

    const eventNames = this.eventNames(commandName, requestId)

    return new Promise((_resolve, _reject) => {
      let timedOut = false
      let timeout = setTimeout(() => {
        timedOut = true
        _reject(new Error('query timed out'))
      }, opts?.timeout ?? TIMEOUT_DURATION_MS_DEFAULT)

      function resolve(a: any) {
        if (!timedOut) {
          clearTimeout(timeout)
          _resolve(a)
        }
      }

      function reject(a: any) {
        if (!timedOut) {
          clearTimeout(timeout)
          _reject(a)
        }
      }

      window.electronAPI.ipcRenderer.on(
        eventNames.succeeded,
        (_, payload: QueryResultPayload<Result>) => {
          resolve(payload.payload)
        }
      )

      window.electronAPI.ipcRenderer.on(
        eventNames.failed,
        (_, payload: ErrorPayload<Err>) => reject(payload.error)
      )

      window.electronAPI.ipcRenderer.send(eventNames.request, {
        payload: params,
        requestId,
      })
    })
  }

  private static eventNames(commandName: string, requestId: string) {
    return {
      request: `${commandName}_cmd_request`,
      succeeded: `${commandName}_cmd_succeeded:${requestId}`,
      failed: `${commandName}_cmd_failed:${requestId}`,
    }
  }
}
