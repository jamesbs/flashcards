const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('./build/tools').generatePath;

module.exports = {
  context: path`${'dist'}`, 

  entry: {
    app: './index.ts'
  },

  output: {
    path: 'dist',
    filename: 'app.js',
    pathinfo: true
  },

  devtool: 'source-map',

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
    /*
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      mangle: false,
    }),
    */
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: 'body'
    })
  ],

  devServer: {
    contentBase: path`${'dist'}`,
    historyApiFallback: true,
    inline: true,
    compress: true,
    port: 8057,
  }
};
