const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
const webpack = require('webpack');

const path = require('path');

module.exports = Merge(CommonConfig, {
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  devServer: {
    port: 9000,
    host: '192.168.1.51',
    historyApiFallback: true,
    noInfo: false,
    stats: 'minimal',
    // publicPath: publicPath

    contentBase: path.join(__dirname, './'),
    hot: true
  },
  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, './dist/src')
  },
});