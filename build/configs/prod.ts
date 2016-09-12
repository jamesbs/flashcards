import * as webpack from 'webpack'
const merge = require('webpack-merge')
import { baseConfig } from './base'

export const prodOnlyConfig = {
  module: {
    loaders: [
      {
        test: /\.(jpg|jpeg|gif|png|tif|ttf)$/,
        loaders: [
          {
            loader: 'url',
            query: {
              name: '[path][name].[ext]',
              context: './src'
            }
          }
        ]
      },
      {
        test: /\.styl/,
        loaders: [
          'to-string',
          'css?minimize',
          'stylus',
        ],
      },
      {
        test: /\.svg/,
        loader: 'url',
        exclude: /icons/,
        query: {
          name: '[path][name].[ext]',
          context: './src'
        }
      },
    ]
  },

  plugins: [
    // dedupe plugin causing bug: https://github.com/webpack/webpack/issues/2644
    // new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      mangle: false,
    })
  ]
}

export const prodConfig = merge(baseConfig, prodOnlyConfig)
