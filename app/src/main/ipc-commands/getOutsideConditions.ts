import { IPCCommandHandler } from '../IPCCommandHandler'
import { OutsideConditionsFinder } from '../conditions/OutsideConditionsFinder'
import type { GetOutsideConditionsResult } from '../../types'
import { COMMANDS } from '../../commands'

export function getOutsideConditions(commandHandler: IPCCommandHandler) {
  commandHandler.addHandler<undefined, GetOutsideConditionsResult>(
    COMMANDS.GET_OUTSIDE_CONDITIONS,
    () => OutsideConditionsFinder.getLatest(),
  )
}
