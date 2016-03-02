var path = require('path');
var cssPath = path.resolve(__dirname, 'css');

module.exports = {
  entry: ['babel-polyfill', "./app/main.js"],
  output: {
    path: "./public",
    filename: "bundle.js"
  },
  module: {
    loaders: [

      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: [path.resolve(__dirname, 'app')],
        query: {
          cacheDirectory: true,
          plugins: ['transform-decorators-legacy'],
          presets: ['es2015', 'stage-1', 'react']
        }

      },
      { test: /\.styl$/, loader: 'style!css!stylus',
        include: [cssPath]
      },
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
  }
}