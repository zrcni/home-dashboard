import { TimeoutError } from 'errors'
import { nanoid } from 'nanoid'
import { CommandError } from 'types'

// Running on Raspberry Pi it can sometimes take quite a long time to respond
const TIMEOUT_DURATION_MS_DEFAULT = 20000

/**
 * TODO: update error handling to be {ok,error} instead of promise .then/.catch
 */
export class IPCCommand {
  static run<Params = any, Result = any, Err extends Error = CommandError>(
    commandName: string,
    params?: Params,
    opts?: QueryOptions,
  ): Promise<Result> {
    const requestId = nanoid(12)

    const eventNames = this.eventNames(commandName, requestId)

    return new Promise((_resolve, _reject) => {
      let timedOut = false
      const startTimestamp = Date.now()

      const timeout = setTimeout(() => {
        timedOut = true
        _reject(
          new TimeoutError('query timed out', Date.now() - startTimestamp),
        )
        cleanup()
      }, opts?.timeout ?? TIMEOUT_DURATION_MS_DEFAULT)

      function resolve(a: any) {
        if (!timedOut) {
          clearTimeout(timeout)
          _resolve(a)
          cleanup()
        }
      }

      function reject(a: any) {
        if (!timedOut) {
          clearTimeout(timeout)
          _reject(a)
          cleanup()
        }
      }

      function handleSucceeded(
        _: unknown,
        payload: QueryResultPayload<Result>,
      ) {
        resolve(payload.payload)
      }

      function handleFailed(_: unknown, payload: ErrorPayload<Err>) {
        reject(payload.error)
      }

      function cleanup() {
        window.electronAPI.ipcRenderer.off(
          eventNames.succeeded,
          handleSucceeded,
        )
        window.electronAPI.ipcRenderer.off(eventNames.failed, handleFailed)
      }

      window.electronAPI.ipcRenderer.once(eventNames.succeeded, handleSucceeded)
      window.electronAPI.ipcRenderer.once(eventNames.failed, handleFailed)

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
