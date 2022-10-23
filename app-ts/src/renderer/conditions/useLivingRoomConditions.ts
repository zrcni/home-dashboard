import { useStore } from '../store'
import { ConditionData } from '../../types'
import { useSubscription } from 'renderer/hooks/useSubscription'
import { SUBSCRIPTIONS } from '../../subscriptions'

export function useLivingRoomConditions() {
  const [conditions, setConditions] = useStore((state) => [
    state.insideConditions,
    state.setInsideConditions,
  ])

  useSubscription<ConditionData>(
    SUBSCRIPTIONS.LIVING_ROOM_CONDITIONS,
    undefined,
    (payload) => setConditions(payload)
  )

  return conditions
}
