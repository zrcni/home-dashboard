import type { Configuration } from 'webpack'
import webpack from 'webpack'
import 'dotenv/config'

import { rules } from './webpack.rules'
import { plugins } from './webpack.plugins'

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
})

export const rendererConfig: Configuration = {
  module: {
    rules,
  },
  plugins: [
    ...plugins,
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development',
      ),
      'process.env.HIDE_CURSOR': JSON.stringify(
        process.env.HIDE_CURSOR || 'false',
      ),
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    modules: ['node_modules', 'src'],
  },
}
