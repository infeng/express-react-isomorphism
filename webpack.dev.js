process.env.NODE_ENV = 'development';

var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: __dirname,
  ts: {
    configFileName: './client/tsconfig.json',
  }, 
  devtool: '#source-map',
  entry: {
    index: [
      './client/index.tsx',
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',      
    ],
  },
  output: {
    path: path.join(__dirname, '/build/public/static'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['', '.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['react-hot', 'babel'],
    }, {
      test: /\.tsx?$/,
      exclude: /node_modules/,
      loaders: ['react-hot', 'babel', 'ts'],
    }],
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};