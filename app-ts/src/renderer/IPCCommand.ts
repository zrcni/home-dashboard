import { TimeoutError } from 'errors'
import { nanoid } from 'nanoid'
import { CommandError } from 'types'

const TIMEOUT_DURATION_MS_DEFAULT = 5000

/**
 * TODO: update error handling to be {ok,error} instead of promise .then/.catch
 */
export class IPCCommand {
  static run<Params = any, Result = any, Err extends Error = CommandError>(
    commandName: string,
    params?: Params,
    opts?: QueryOptions
  ): Promise<Result> {
    const requestId = nanoid(12)

    const eventNames = this.eventNames(commandName, requestId)

    return new Promise((_resolve, _reject) => {
      let timedOut = false
      const startTimestamp = Date.now()

      let timeout = setTimeout(() => {
        timedOut = true
        _reject(
          new TimeoutError('query timed out', Date.now() - startTimestamp)
        )
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

interface ErrorPayload<Err extends Error = CommandError> {
  error: Err
}

interface QueryResultPayload<Result = any> {
  payload: Result
}

interface QueryOptions {
  timeout?: number
}
