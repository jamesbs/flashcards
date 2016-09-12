const merge = require('webpack-merge')
import { generatePath as path } from '../tools'
import { baseConfig } from './base'

export const devOnlyConfig = {

  output: {
    pathinfo: true
  },

  devtool: 'source-map',

  module: {
    loaders: [
      {
        test: /\.(jpg|jpeg|gif|png|tif|ttf)$/,
        loaders: [
          {
            loader: 'file',
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
          'css',
          'stylus',
        ],
      },
      {
        test: /\.svg/,
        loader: 'file',
        exclude: /icons/,
        query: {
          name: '[path][name].[ext]',
          context: './src'
        }
      },
    ]
  },

  devServer: {
    contentBase: path`${'dist'}`,
    historyApiFallback: true,
    inline: true,
    compress: true,
    port: 8057,
  },
}

export const devConfig = merge(baseConfig, devOnlyConfig)
