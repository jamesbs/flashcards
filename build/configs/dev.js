const merge = require('webpack-merge')
import { generatePath as path } from '../tools'
import { baseConfig } from './base'

export const devOnlyConfig = {
  mode: 'development',
  output: {
    pathinfo: true
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.(jpg|jpeg|gif|png|tif|ttf|eot|woff|woff2)(\?[a-z0-9=&.]+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              context: './src',
            }
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
        test: /\.svg(\?[a-z0-9=&.]+)?/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
            context: './src'
          },
        },
        exclude: /icons/,
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
