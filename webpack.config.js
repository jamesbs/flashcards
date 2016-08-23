const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('./build/tools').generatePath;
const merge = require('webpack-merge');

const baseConfig = {
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
        loaders: ['awesome-typescript', 'angular2-template'],
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
};

const devConfig = {

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
};


const prodConfig = {
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

module.exports = process.env.NODE_ENV === 'dev'
  ? merge(baseConfig, devConfig)
  : merge(baseConfig, prodConfig);