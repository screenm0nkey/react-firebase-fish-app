var cssPath, folder;
function getPath (path) {
  path = require('path').resolve(__dirname, path);
  console.log(path);
  return path;
}
cssPath = getPath('css');
folder = "src";

module.exports = {
  entry: ['babel-polyfill', `./${folder}/main.js`],//AppAsSingleFile.js
  output: {
    path: "./public",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: [getPath(folder)],
        query: {
          cacheDirectory: true,
          plugins: ['transform-decorators-legacy'],
          presets: ['es2015', 'stage-1', 'react']
        }
      },
      // styles
      { test: /\.styl$/, loader: 'style!css!stylus',
        include: [cssPath]
      },
      // fonts
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
      // svg images
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