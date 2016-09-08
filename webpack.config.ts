import * as webpack from 'webpack' // throwing error on importing uglify-js
const HtmlWebpackPlugin = require('html-webpack-plugin') // typings are not up to date
const merge = require('webpack-merge') // typings are not up to date
import { vendor, app } from './build/entry'
import { generatePath as path } from './build/tools'

const chunkOrder = [ 'vendor', 'app' ]

export const baseConfig = {
  context: path`${'dist'}`,

  entry: { vendor, app },

  output: {
    path: 'dist',
    filename: '[name].js',
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
      inject: 'body',
      chunksSortMode: (chunk1, chunk2) => {
        const c1i = chunkOrder.indexOf(chunk1.names[0])
        const c2i = chunkOrder.indexOf(chunk2.names[0])

        if(c1i < c2i)
          return -1
        else if(c1i === c2i)
          return chunk1.id < chunk2.id ? -1 : 1
        else
          return 1
      }
    })
  ]
}

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

export const devConfig = merge(baseConfig, devOnlyConfig)
export const prodConfig = merge(baseConfig, prodOnlyConfig)
export const testConfig = {
  context: devConfig.context,
  resolve: devConfig.resolve,
  devtool: devConfig.devtool,
  module: devConfig.module,
}


export default process.env.NODE_ENV === 'dev'
    ? devConfig
    : prodConfig
