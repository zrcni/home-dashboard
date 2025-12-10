import 'jest-extended'
// "ReferenceError: TextEncoder is not defined" is thrown in jest tests form jsdom,
// because jsdom doesn't include TextEncoder itself. Apparently it's only a problem with jest.
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { TextEncoder, TextDecoder } from 'util'

// @ts-ignore
global.TextEncoder = TextEncoder
// @ts-ignore
global.TextDecoder = TextDecoder

// @ts-ignore
global.ReadableStream = global.ReadableStream || require('stream/web').ReadableStream

const nodeFetch = require('node-fetch')
// @ts-ignore
global.fetch = global.fetch || nodeFetch
// @ts-ignore
global.Request = global.Request || nodeFetch.Request
// @ts-ignore
global.Response = global.Response || nodeFetch.Response
// @ts-ignore
global.Headers = global.Headers || nodeFetch.Headers

// @ts-ignore
global.setImmediate = global.setTimeout
