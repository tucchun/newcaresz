const path = require('path');
const webpack = require('webpack');
// const WebpackManifestHash = require('webpack-manifest-plugin');
// const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
// const WebpackChunkHash = require('webpack-chunk-hash');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
  entry: {
    app: './src/app/app.js',
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
          'css-loader'
        ]
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: 'file-loader'
      }
    ]
  },

  plugins: [
    // new ForkCheckerPlugin(),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      // title: 'cache',
      template: path.join(__dirname, './src/app/details.ejs'),
      chunks: ['app', 'vendor']
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      // filename: 'vendor.[chunkhash].js'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime',
      // filename: 'runtime.[chunkhash].js'
    })
  ],
  output: {
    filename: '[name].[chunkhash].js',
    path: path.join(__dirname, './dist/src')
    
  },
};