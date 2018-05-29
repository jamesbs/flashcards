import * as webpack from 'webpack'
const merge = require('webpack-merge')
import { baseConfig } from './base'

export const prodOnlyConfig = {
  module: {
    rules: [
      {
        test: /\.(jpg|jpeg|gif|png|tif|ttf|eot|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[path][name].[ext]',
              context: './src'
            },
          },
        ],
      },
      {
        test: /\.styl/,
        use: [
          { loader: 'to-string-loader' },
          { loader: 'css-loader' },
          { loader: 'stylus-loader' },
        ],
      },
      {
        test: /\.svg/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[path][name].[ext]',
            context: './src'
          },
        },
        exclude: /icons/,
      },
    ]
  },

  optimization: {
    minimize: true,
  },
}

export const prodConfig = merge(baseConfig, prodOnlyConfig)
