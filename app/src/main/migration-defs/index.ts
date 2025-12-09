import conditionsDown from './conditions.down'
import conditionsUp from './conditions.up'
import conditionsFixDataTypesUp from './conditions-fix-data-types.up'
import conditionsFixDataTypesDown from './conditions-fix-data-types.down'

export const up = [...conditionsUp, ...conditionsFixDataTypesUp]

export const down = [...conditionsFixDataTypesDown, ...conditionsDown]
