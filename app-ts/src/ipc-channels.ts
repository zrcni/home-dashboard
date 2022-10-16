export const IPC_CHANNELS = {
  LIVING_ROOM_CONDITIONS_UPDATE_RECEIVED:
    'conditions/living-room/update-received' as const,

  OUTSIDE_CONDITIONS_REQUEST_UPDATE:
    'conditions/outside/request-update' as const,
  OUTSIDE_CONDITIONS_UPDATE_RECEIVED:
    'conditions/outside/update-received' as const,

  CALENDAR_EVENTS_REQUEST_UPDATE: 'calendar-events/request-update' as const,
  CALENDAR_EVENTS_UPDATE_RECEIVED: 'calendar-events/update-received' as const,
}