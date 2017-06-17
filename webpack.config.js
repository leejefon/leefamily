const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AppCachePlugin = require('appcache-webpack-plugin');

module.exports = (() => {
  let contentBase;
  let entry;
  let plugins;
  let devtool;

  const react = [
    'react',
    'react-cookie',
    'react-dom',
    'react-intl',
    'react-redux',
    'react-router'
  ];

  const lib = [
    'immutable',
    'redux',
    'redux-thunk',
    'redux-immutable',
    'react-ga',
    'classnames',
    'es6-promise',
    'whatwg-fetch'
  ];

  if (process.env.NODE_ENV === 'production') {
    contentBase = 'client';
    entry = {
      app: path.resolve(__dirname, 'client-dev/js/app.jsx'),
      react,
      lib
    };
    plugins = [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
      }),
      new webpack.optimize.CommonsChunkPlugin({
        names: ['react', 'lib'],
        filename: 'js/[name].js'
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        sourcemap: false,
        comments: false,
        compress: {
          warnings: false
        }
      }),
      new HtmlWebpackPlugin({
        template: './client-dev/index.html',
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
      }),
      new AppCachePlugin()
    ];
  } else {
    contentBase = 'client-dev';
    devtool = 'source-map';
    entry = {
      app: [
        'webpack-dev-server/client?http://localhost:3001',
        'webpack/hot/only-dev-server',
        path.resolve(__dirname, 'client-dev/js/app.jsx')
      ],
      react,
      lib
    };
    plugins = [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
      }),
      new webpack.optimize.CommonsChunkPlugin({
        names: ['react', 'lib'],
        filename: 'js/[name].js'
      }),
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        template: './client-dev/index.html',
        inject: 'body'
      }),
      new AppCachePlugin()
    ];
  }

  return {
    contentBase: path.resolve(__dirname, contentBase),
    devtool,
    entry,
    output: {
      path: path.resolve(__dirname, contentBase),
      filename: 'js/app.js',
      publicPath: '/' // HACK: https://github.com/webpack/webpack/issues/497#issuecomment-56948560
    },
    module: {
      loaders: [{
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: path.join(__dirname, '/node_modules/')
      }, {
        test: /\.(css|scss)$/,
        loaders: ['style', 'css', 'sass']
      }]
    },
    plugins,
    target: 'web',
    stats: false,
    progress: true,
    resolve: {
      extensions: ['', '.js', '.jsx']
    }
  };
})();
