var path = require('path');
var cssPath = path.resolve(__dirname, 'css');

module.exports = {
  entry: "./app/App.js",
  output: {
    path: "./public",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: [path.resolve(__dirname, 'app')],
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
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