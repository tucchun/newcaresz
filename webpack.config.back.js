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
    // index: './src/index.js',
    // another: './src/another-module.js',
    // web: './module/web/webMain.js' // application code
  },
  devtool: 'inline-source-map',
  plugins: [
    // new CleanWebpackPlugin(['dist']),
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: ['vendor', 'manifest'], // vendor libs + extracted manifest
    //   minChunks: Infinity,
    // }),
    // new ChunkManifestPlugin({
    //   filename: 'manifest.json',
    //   manifestVariable: 'webpackManifest',
    //   inlineManifest: false
    // }),
    new HtmlWebpackPlugin({
      title: 'cache',
      template: path.join(__dirname, './src/app/details.ejs'),
      chunks: ['app']
    }),
    // new HtmlWebpackPlugin({
    //   title: 'cache',
    //   template: path.join(__dirname, './module/web/details.ejs'),
    //   chunks: ['web']
    // }),
    // new webpack.HashedModuleIdsPlugin(),
    // new WebpackChunkHash(),

  ],
  devServer: {
    contentBase: path.join(__dirname, './'),
    hot: true
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
      // chunkFilename: '[name].[chunkhash].js'
      // filename: '[name].[hash].js'
  }
};
