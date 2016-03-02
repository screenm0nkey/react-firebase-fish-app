var path = require('path');
var webpack = require('webpack');
var cssPath = path.resolve(__dirname, 'css');

module.exports = {
  entry: [
    'babel-polyfill',
    "./app/main.js"
  ],
  output: {
    path: "./public",
    filename: "bundle.js"
  },
  debug: true,
  devtool: 'source-map',
  module: {
    loaders: [
      // Load ES6/JSX
      {
        test: /\.jsx?$/,
        include: [path.resolve(__dirname, 'app')],
        loader: 'babel-loader',
        plugins: ['transform-runtime'],
        presets: ['es2015', 'stage-0', 'react']
      },
      // Load styles
      { test: /\.styl$/,
        loader: 'style!css!stylus',
        include: [cssPath]
      },
      // load fonts
      { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff',
        include: [cssPath]
      },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream',
        include: [cssPath]
      },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file',
        include: [cssPath]
      },
      //load images
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml',
        include: [cssPath]
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    port : 8080,
    contentBase : 'public'
  },
  extensions: ["", ".js", ".jsx"]
}