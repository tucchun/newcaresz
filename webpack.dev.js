const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = Merge(CommonConfig, {
  entry: {
    'articlelist/index': './src/inhabitant/articlelist/index.js',
  },
  devtool: 'cheap-module-source-map',
  /*module: {
    rules: [ {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },*/
  plugins: [
    new CleanWebpackPlugin(['dev']),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      title: '文章列表',
      filename: 'articlelist/index.html',
      template: path.join(__dirname, './src/inhabitant/article_list.ejs'),
      chunks: ['articlelist/index', 'vendor', 'runtime']
    }),
  ],
  devServer: {
    port: 9000,
    // host: '192.168.1.51',
    historyApiFallback: true,
    noInfo: false,
    stats: 'minimal',
    publicPath: '/',
    // contentBase: path.join(__dirname, './dist'),
    hot: true
  },
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
    publicPath: '../',
    path: path.join(__dirname, './dev')
  }
});
