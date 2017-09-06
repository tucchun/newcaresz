const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
  entry: {
    'app/app': './src/app/app.js',
    'web/app': './src/web/app.js',
    vendor: ['jquery', 'dot', 'lodash']
  },

  // resolve: {
  //   extensions: ['.ts', '.js', '.json'],
  //   modules: [path.join(__dirname, 'src'), 'node_modules']
  // },

  module: {
    rules: [{
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: 'file-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      filename: 'app/app.html',
      template: path.join(__dirname, './src/app/details.ejs'),
      chunks: ['app/app', 'vendor', 'runtime']
    }),
    new HtmlWebpackPlugin({
      // title: 'cache',
      filename: 'web/app.html',
      template: path.join(__dirname, './src/web/details.ejs'),
      chunks: ['web/app', 'vendor', 'runtime']
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
      // filename: 'vendor.[chunkhash].js'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
      // filename: 'runtime.[chunkhash].js'
    })
  ]
};