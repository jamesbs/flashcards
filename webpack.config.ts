import * as webpack from 'webpack'
const HtmlWebpackPlugin = require('html-webpack-plugin') // typings are not up to date
const merge = require('webpack-merge') // typings are not up to date
import { generatePath as path } from './build/tools'

export const baseConfig = {
  context: path`${'dist'}`,

  entry: {
    app: './index.ts'
  },

  output: {
    path: 'dist',
    filename: 'app.js',
    pathinfo: true
  },

  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js', '.styl']
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: [
          {
            loader: 'awesome-typescript',
            query: {
              tsconfig: './tsconfig.webpack.json'
            },
          },
          'angular2-template'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.html/,
        loader: 'html',
        exclude: /node_modules/
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
        loader: 'raw'
      },
      {
        test: /\.css$/,
        loaders: [
          'to-string',
          'css',
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: 'body'
    })
  ]
}

export const devOnlyConfig = {

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
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      mangle: false,
    })
  ]
}

export const devConfig = merge(baseConfig, devOnlyConfig)
export const prodConfig = merge(baseConfig, prodOnlyConfig)
export const testConfig = {
  context: devConfig.context,
  resolve: devConfig.resolve,
  devtool: devConfig.devtool,
  module: devConfig.module,
  verbose: false,
}


export default process.env.NODE_ENV === 'dev'
    ? devConfig
    : prodConfig
