// "ReferenceError: TextEncoder is not defined" is thrown in jest tests form jsdom,
// because jsdom doesn't include TextEncoder itself. Apparently it's only a problem with jest.
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { TextEncoder, TextDecoder } from 'util'

// @ts-ignore
global.TextEncoder = TextEncoder
// @ts-ignore
global.TextDecoder = TextDecoder
