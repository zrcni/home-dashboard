import type IForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import { DefinePlugin } from 'webpack'
import 'dotenv/config'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin: typeof IForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

export const plugins = [
  new ForkTsCheckerWebpackPlugin({
    logger: 'webpack-infrastructure',
  }),
  new DefinePlugin({
    'process.env.GOOGLE_CALENDAR_IDS': JSON.stringify(
      process.env.GOOGLE_CALENDAR_IDS,
    ),
  }),
]
