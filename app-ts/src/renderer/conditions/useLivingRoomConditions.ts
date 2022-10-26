import { useStore } from '../store'
import { ConditionData } from '../../types'
import { useIPCSubscription } from 'renderer/hooks/useIPCSubscription'
import { SUBSCRIPTIONS } from '../../subscriptions'

export function useLivingRoomConditions() {
  const [conditions, setConditions] = useStore((state) => [
    state.insideConditions,
    state.setInsideConditions,
  ])

  useIPCSubscription<ConditionData>(
    SUBSCRIPTIONS.LIVING_ROOM_CONDITIONS,
    undefined,
    (payload) => setConditions(payload)
  )

  return conditions
}
