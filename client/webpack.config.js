const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: './src/index',
  output: {
    path: path.join(__dirname, '../public'),
    filename: 'app.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      loaders: ['babel-loader'],
      include: path.join(__dirname, 'src')
    }, {
      test: /\.scss$/,
      loaders: ['style-loader', 'css-loader?module', 'sass-loader'],
      include: path.join(__dirname, 'src')
    }, {
      test: /\.css$/,
      loaders: ['style-loader', 'css-loader'],
      include: [
        path.join(__dirname, 'src'),
        path.join(__dirname, 'node_modules') // Mainly for external libs
      ]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: 'body',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    })
  ]
};
