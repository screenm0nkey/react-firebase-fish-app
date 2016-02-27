var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: "./app/App.js",
  output: {
    path: "./public",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel', query: { presets: ['react', 'es2015']}},
      { test: /\.styl$/, loader: 'style!css!stylus' },
      { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
    ],
    noParse: [ path.join(__dirname, 'node_modules', 'angular2', 'bower_components', 'bundles') ]
  },
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    port : 1970,
    inline : true,
    colors : true,
    progress:true,
    contentBase : 'public'
  }
}