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
        test: /\.(jpg|jpeg|gif|png|tif|ttf|eot|woff|woff2)(\?[a-z0-9=&.]+)?$/,
        loaders: [
          {
            loader: 'file-loader',
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
          'to-string-loader',
          'css-loader',
          'stylus-loader',
        ],
      },
      {
        test: /\.svg/,
        loader: 'file-loader',
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
