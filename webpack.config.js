const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('./build/paths');
const path = require('./build/tools').generatePath;

console.log(path`${'dist'}/index.ts`);
module.exports = {
  context: paths.project, 

  entry: path`${'dist'}/index.ts`,

  output: {
    path: 'dist',
    filename: 'app.js',
    pathinfo: true
  },

  devtool: 'source-map',

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(jpg|jpeg|gif|png|svg|tif|ttf)$/,
        loaders: [
          {
            loader: 'url-loader',
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
          'style-loader',
          'css-loader',
          'stylus-loader',
        ],
      },
      {
        test: /\.css$/, 
        loaders: [
          'style-loader',
          'css-loader',
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body'
    })
  ],

  devServer: {
    contentBase: paths.dist,
    historyApiFallback: true,
    inline: true,
    compress: true,
    port: 8057,
  }
};
